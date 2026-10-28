import { NextRequest, NextResponse } from 'next/server';

import { env } from '@/lib/ai-concierge/env';
import { postCallSchema, type TranscriptTurn } from '@/lib/ai-concierge/schemas';
import { getSupabaseAdmin } from '@/lib/supabase/admin';
import { getSummaryProvider } from '@/lib/ai-concierge/llm';
import { buildInternalEmail, buildLeadEmail } from '@/lib/ai-concierge/emailTemplates';
import { sendEmail } from '@/lib/ai-concierge/email';
import { sendPush } from '@/lib/ai-concierge/notify';
import type { CallEventRow, CallRow, LeadRow } from '@/lib/ai-concierge/types';

export const runtime = 'nodejs';
// Summaries call out to the LLM; give it room.
export const maxDuration = 60;

type DeliveryResult = { ok: boolean; id?: string; error?: string };

/** Event-log row recording whether an email or push actually went out. */
function deliveryEvent(
  callId: string,
  kind: 'email_internal' | 'email_lead' | 'push_end',
  result: DeliveryResult,
): Partial<CallEventRow> {
  return {
    call_id: callId,
    event_type: `${kind}_${result.ok ? 'sent' : 'failed'}`,
    payload: result.ok ? { id: result.id ?? null } : { error: result.error ?? 'unknown' },
  };
}

function formatDuration(seconds: number | undefined): string {
  if (typeof seconds !== 'number') return 'Unknown length';
  return `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, '0')}`;
}

function turnsToTranscript(turns: TranscriptTurn[]): string {
  return turns
    .map((t) => {
      const speaker = t.role === 'assistant' ? 'AI' : t.role === 'user' ? 'Caller' : 'System';
      return `${speaker}: ${t.text}`;
    })
    .join('\n');
}

/** Shared-secret gate for this server-to-server endpoint (voice-server -> Next). */
function isAuthorized(request: NextRequest): boolean {
  const secret = env.postCallSharedSecret();
  // TODO: make the secret required in production. Left optional so the demo can
  // run before the voice-server is fully wired up.
  if (!secret) {
    console.warn('[post-call-summary] POST_CALL_SHARED_SECRET not set — endpoint is unprotected.');
    return true;
  }
  const provided =
    request.headers.get('x-internal-secret') ??
    request.headers.get('authorization')?.replace(/^Bearer\s+/i, '');
  return provided === secret;
}

export async function POST(request: NextRequest) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 });
  }

  let json: unknown;
  try {
    json = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid JSON body' }, { status: 400 });
  }

  const parsed = postCallSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: 'Validation failed', fields: parsed.error.flatten().fieldErrors },
      { status: 400 },
    );
  }
  const { leadId, callId, transcript, turns, metadata } = parsed.data;

  const transcriptText = (transcript ?? (turns ? turnsToTranscript(turns) : '')).trim();

  try {
    const supabase = getSupabaseAdmin();

    // 1. Persist transcript + any call metadata first (so we keep data even if
    // the LLM step later fails).
    const callUpdate: Partial<CallRow> = { transcript: transcriptText };
    if (metadata?.twilioCallSid) callUpdate.twilio_call_sid = metadata.twilioCallSid;
    if (metadata?.startedAt) callUpdate.started_at = metadata.startedAt;
    if (metadata?.endedAt) callUpdate.ended_at = metadata.endedAt;
    if (typeof metadata?.durationSeconds === 'number') {
      callUpdate.duration_seconds = metadata.durationSeconds;
    }
    await supabase.from('calls').update(callUpdate).eq('id', callId);

    await supabase.from('call_events').insert({
      call_id: callId,
      event_type: 'post_call_received',
      payload: {
        followUpRequested: metadata?.followUpRequested ?? null,
        endReason: metadata?.endReason ?? null,
      },
    });

    // 2. Load the lead for context + emails.
    const { data: lead } = await supabase
      .from('leads')
      .select('*')
      .eq('id', leadId)
      .maybeSingle<LeadRow>();

    // 3. Generate the structured summary (provider is swappable in lib/llm.ts).
    const generated = await getSummaryProvider().generateSummary(
      transcriptText || '(empty transcript)',
    );
    // The live model also reports follow-up through end_call; either signal counts.
    const summary = {
      ...generated,
      follow_up_requested:
        generated.follow_up_requested || metadata?.followUpRequested === true,
    };

    // 4. Persist summary fields.
    await supabase
      .from('calls')
      .update({
        summary: summary.overview,
        recommended_solution: summary.recommended_solution,
        mvp_scope: summary.mvp_scope,
        follow_up_email: summary.suggested_follow_up_message,
        internal_notes: summary.internal_notes,
        raw_summary: summary,
        status: 'completed',
      })
      .eq('id', callId);

    await supabase
      .from('leads')
      .update({ lead_score: summary.lead_score, status: 'completed' })
      .eq('id', leadId);

    // 5. Email the internal summary (best-effort; failures don't fail the call).
    const leadForEmail = lead ?? { phone: 'unknown' };
    const internalEmail = buildInternalEmail({
      lead: leadForEmail,
      summary,
      transcript: transcriptText,
    });
    const internalResult = await sendEmail({
      to: env.internalLeadEmail(),
      content: internalEmail,
      replyTo: lead?.email ?? undefined,
    });
    if (!internalResult.ok) {
      console.error('[post-call-summary] internal email failed:', internalResult.error);
    }

    // 6. Optionally email the lead.
    let leadResult: DeliveryResult | null = null;
    if (lead?.email) {
      const leadEmail = buildLeadEmail({ lead, summary });
      leadResult = await sendEmail({ to: lead.email, content: leadEmail });
      if (!leadResult.ok) {
        console.error('[post-call-summary] lead email failed:', leadResult.error);
      }
    }

    // 7. Push the outcome to the operator, flagging any email that didn't send.
    const who = lead?.name?.trim() || lead?.company?.trim() || 'Unknown caller';
    const pushResult = await sendPush({
      title: `Concierge call ended: ${who} — score ${summary.lead_score}`,
      message: [
        `${formatDuration(metadata?.durationSeconds)} · ${
          summary.follow_up_requested ? 'Wants a follow-up' : 'No follow-up requested'
        }`,
        summary.overview,
        internalResult.ok ? null : `Your recap email failed: ${internalResult.error}`,
        leadResult && !leadResult.ok ? `Client recap email failed: ${leadResult.error}` : null,
      ]
        .filter(Boolean)
        .join('\n'),
    });
    if (!pushResult.ok) {
      console.error('[post-call-summary] push failed:', pushResult.error);
    }

    // 8. Record what actually went out, so a silent delivery failure shows up here.
    await supabase.from('call_events').insert([
      deliveryEvent(callId, 'email_internal', internalResult),
      ...(leadResult ? [deliveryEvent(callId, 'email_lead', leadResult)] : []),
      deliveryEvent(callId, 'push_end', pushResult),
    ]);

    return NextResponse.json({
      ok: true,
      leadScore: summary.lead_score,
      internalEmailed: internalResult.ok,
      leadEmailed: leadResult?.ok ?? false,
    });
  } catch (err) {
    console.error('[ai-concierge/post-call-summary] failed:', err);
    const push = await sendPush({
      title: 'Concierge call ended, but processing failed',
      message: `Call ${callId}: ${err instanceof Error ? err.message : String(err)}`,
    });
    if (!push.ok) console.error('[post-call-summary] push failed:', push.error);
    return NextResponse.json(
      { ok: false, error: 'Failed to process post-call summary.' },
      { status: 500 },
    );
  }
}
