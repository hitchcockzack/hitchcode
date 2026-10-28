import { NextRequest, NextResponse, after } from 'next/server';

import { env } from '@/lib/ai-concierge/env';
import { sendPush } from '@/lib/ai-concierge/notify';
import { startCallSchema } from '@/lib/ai-concierge/schemas';
import { getSupabaseAdmin } from '@/lib/supabase/admin';
import { normalizePhone } from '@/lib/phone';
import {
  CALL_TIME_LIMIT_SECONDS,
  buildStatusCallbackUrl,
  buildVoiceWebhookUrl,
  getTwilioClient,
} from '@/lib/ai-concierge/twilio';

// Twilio + Supabase SDKs need the Node runtime (not edge).
export const runtime = 'nodejs';

// Cost guards for the public demo line, counted over a rolling 24 hours.
const DAILY_CALL_LIMITS = { perPhone: 2, perIp: 3, total: 15 } as const;
const DAY_MS = 24 * 60 * 60 * 1000;

function clientIp(request: NextRequest): string | null {
  const xff = request.headers.get('x-forwarded-for');
  if (xff) return xff.split(',')[0]?.trim() ?? null;
  return request.headers.get('x-real-ip');
}

function limitMessage(counts: { phone: number; ip: number; total: number }): string | null {
  if (counts.phone >= DAILY_CALL_LIMITS.perPhone) {
    return 'This number has already had its demo calls today. Please try again tomorrow.';
  }
  if (counts.ip >= DAILY_CALL_LIMITS.perIp) {
    return "You've reached today's limit for demo calls. Please try again tomorrow.";
  }
  if (counts.total >= DAILY_CALL_LIMITS.total) {
    return 'The demo line is at capacity for today. Please try again tomorrow.';
  }
  return null;
}

export async function POST(request: NextRequest) {
  // 1. Parse + validate body
  let json: unknown;
  try {
    json = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid JSON body' }, { status: 400 });
  }

  const parsed = startCallSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      {
        ok: false,
        error: 'Validation failed',
        fields: parsed.error.flatten().fieldErrors,
      },
      { status: 400 },
    );
  }
  const input = parsed.data;

  // 2. Normalize phone -> E.164
  const phone = normalizePhone(input.phone);
  if (!phone.isValid) {
    return NextResponse.json(
      { ok: false, error: 'Please enter a valid phone number with country code.' },
      { status: 400 },
    );
  }
  // International rates are far higher than US calls and a common toll-fraud
  // target, so the demo only dials US numbers.
  if (phone.country !== 'US') {
    return NextResponse.json(
      { ok: false, error: 'The demo can only call US phone numbers right now.' },
      { status: 400 },
    );
  }

  // 3. Request metadata
  const userAgent = request.headers.get('user-agent');
  const ip = clientIp(request);
  const now = new Date().toISOString();
  const source = input.sourcePath || 'ai_concierge_demo';

  // Everything past validation is internal — never leak SDK/db errors to the browser.
  try {
    const supabase = getSupabaseAdmin();

    // 4. Rate limits. Every accepted request inserts a lead, so recent leads
    // are the call count.
    const since = new Date(Date.now() - DAY_MS).toISOString();
    const recentLeads = () =>
      supabase.from('leads').select('id', { count: 'exact', head: true }).gte('created_at', since);
    const [byPhone, byIp, total] = await Promise.all([
      recentLeads().eq('phone', phone.e164),
      ip ? recentLeads().eq('consent_ip', ip) : null,
      recentLeads(),
    ]);
    const countError = byPhone.error ?? byIp?.error ?? total.error;
    if (countError) throw new Error(`rate limit check failed: ${countError.message}`);

    const callsToday = total.count ?? 0;
    const blocked = limitMessage({
      phone: byPhone.count ?? 0,
      ip: byIp?.count ?? 0,
      total: callsToday,
    });
    if (blocked) {
      console.warn('[ai-concierge/start-call] rate limited:', blocked);
      return NextResponse.json({ ok: false, error: blocked }, { status: 429 });
    }

    // 5. Insert lead
    const { data: lead, error: leadError } = await supabase
      .from('leads')
      .insert({
        name: input.name,
        phone: phone.e164,
        email: input.email || null,
        company: input.company || null,
        problem_hint: input.problemHint || null,
        consent: input.consent,
        consent_timestamp: now,
        consent_ip: ip,
        consent_user_agent: userAgent,
        source,
        status: 'new',
      })
      .select('id')
      .single();

    if (leadError || !lead) {
      throw new Error(`lead insert failed: ${leadError?.message ?? 'unknown'}`);
    }

    // 6. Insert initial call record
    const { data: call, error: callError } = await supabase
      .from('calls')
      .insert({ lead_id: lead.id, status: 'created' })
      .select('id')
      .single();

    if (callError || !call) {
      throw new Error(`call insert failed: ${callError?.message ?? 'unknown'}`);
    }

    // 7. Trigger outbound Twilio call, passing leadId/callId through the webhooks
    const twilioCall = await getTwilioClient().calls.create({
      to: phone.e164,
      from: env.twilioPhoneNumber(),
      url: buildVoiceWebhookUrl(lead.id, call.id),
      method: 'POST',
      statusCallback: buildStatusCallbackUrl(lead.id, call.id),
      statusCallbackMethod: 'POST',
      statusCallbackEvent: ['initiated', 'ringing', 'answered', 'completed'],
      // Hang up if no human/machine picks up within the window.
      timeout: 30,
      // Twilio hangs up at the cap itself, even if the voice-server never does.
      timeLimit: CALL_TIME_LIMIT_SECONDS,
      // Record the call so it can be reviewed in the Twilio Console
      // (Monitor -> Logs -> Recordings). Consent for recording is captured by
      // the form's required consent checkbox. Dual channel keeps caller and AI
      // on separate tracks for clearer QA.
      record: true,
      recordingChannels: 'dual',
    });

    // 8. Persist the Twilio SID + mark queued
    await supabase
      .from('calls')
      .update({ twilio_call_sid: twilioCall.sid, status: 'queued' })
      .eq('id', call.id);

    await supabase.from('call_events').insert({
      call_id: call.id,
      event_type: 'call_requested',
      payload: { twilioCallSid: twilioCall.sid, to: phone.e164, source },
    });

    await supabase.from('leads').update({ status: 'called' }).eq('id', lead.id);

    // 9. Tell the operator a call is happening (after the response is sent).
    const capReached = callsToday + 1 >= DAILY_CALL_LIMITS.total;
    after(async () => {
      const push = await sendPush({
        title: `Concierge call starting: ${input.name}`,
        message: [
          [input.company, phone.e164].filter(Boolean).join(' · '),
          input.problemHint ? `Wants to automate: ${input.problemHint}` : null,
          capReached
            ? `That's ${DAILY_CALL_LIMITS.total} calls in 24 hours, so new requests are paused until the window clears.`
            : null,
        ]
          .filter(Boolean)
          .join('\n'),
      });
      if (!push.ok) console.error('[ai-concierge/start-call] push failed:', push.error);
      await supabase.from('call_events').insert({
        call_id: call.id,
        event_type: push.ok ? 'push_start_sent' : 'push_start_failed',
        payload: push.ok ? null : { error: push.error },
      });
    });

    return NextResponse.json({ ok: true, leadId: lead.id, callId: call.id });
  } catch (err) {
    // Log full detail server-side; return a generic message to the browser.
    console.error('[ai-concierge/start-call] failed:', err);
    // A prospect just hit a broken demo — make sure the operator hears about it.
    after(async () => {
      const push = await sendPush({
        title: 'Concierge call failed to start',
        message: `${input.name} (${phone.e164}) tried the demo: ${
          err instanceof Error ? err.message : String(err)
        }`,
      });
      if (!push.ok) console.error('[ai-concierge/start-call] push failed:', push.error);
    });
    return NextResponse.json(
      { ok: false, error: 'We could not start the call right now. Please try again shortly.' },
      { status: 500 },
    );
  }
}

// Explicitly reject non-POST verbs.
export function GET() {
  return NextResponse.json({ ok: false, error: 'Method not allowed' }, { status: 405 });
}
