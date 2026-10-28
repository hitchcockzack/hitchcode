import { NextRequest, NextResponse } from 'next/server';
import twilio from 'twilio';

import { env, getEnv } from '@/lib/ai-concierge/env';
import { getSupabaseAdmin } from '@/lib/supabase/admin';
import type { CallRow, LeadStatus } from '@/lib/ai-concierge/types';

export const runtime = 'nodejs';

const TERMINAL_STATUSES = new Set(['completed', 'busy', 'failed', 'no-answer', 'canceled']);

/**
 * Optional Twilio signature validation. Enable by setting
 * TWILIO_VALIDATE_SIGNATURE=true once you've confirmed the public URL Twilio
 * sees matches what the app reconstructs (proxies can rewrite host/proto).
 */
function isValidTwilioRequest(request: NextRequest, params: Record<string, string>): boolean {
  if (getEnv('TWILIO_VALIDATE_SIGNATURE') !== 'true') return true;
  const signature = request.headers.get('x-twilio-signature');
  if (!signature) return false;
  try {
    return twilio.validateRequest(env.twilioAuthToken(), signature, request.url, params);
  } catch {
    return false;
  }
}

export async function POST(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const callId = searchParams.get('callId');
  const leadId = searchParams.get('leadId');

  // Twilio posts application/x-www-form-urlencoded.
  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const params: Record<string, string> = {};
  for (const [key, value] of form.entries()) {
    params[key] = typeof value === 'string' ? value : '';
  }

  if (!isValidTwilioRequest(request, params)) {
    return NextResponse.json({ ok: false, error: 'invalid signature' }, { status: 403 });
  }

  const callSid = params.CallSid || null;
  const callStatus = params.CallStatus || null;
  const durationRaw = params.CallDuration || params.Duration;
  const duration = durationRaw ? Number.parseInt(durationRaw, 10) : null;
  const errorCode = params.ErrorCode || params.SipResponseCode || null;
  const timestamp = params.Timestamp ? new Date(params.Timestamp).toISOString() : new Date().toISOString();

  // Always respond 200 quickly so Twilio doesn't retry; do the write best-effort.
  try {
    const supabase = getSupabaseAdmin();

    const update: Partial<CallRow> = {};
    if (callStatus) update.status = callStatus;
    if (callSid) update.twilio_call_sid = callSid;
    if (callStatus === 'in-progress') update.started_at = timestamp;
    if (callStatus && TERMINAL_STATUSES.has(callStatus)) {
      update.ended_at = timestamp;
      if (duration !== null && !Number.isNaN(duration)) update.duration_seconds = duration;
      if (callStatus !== 'completed' && errorCode) {
        update.internal_notes = `Call ${callStatus} (code ${errorCode})`;
      }
    }

    // Match by callId (from query) when present, else fall back to the SID.
    let query = supabase.from('calls').update(update);
    query = callId ? query.eq('id', callId) : query.eq('twilio_call_sid', callSid ?? '');
    const { data: updated } = await query.select('id, lead_id').maybeSingle();

    const resolvedCallId = updated?.id ?? callId ?? null;
    const resolvedLeadId = updated?.lead_id ?? leadId ?? null;

    if (resolvedCallId) {
      await supabase.from('call_events').insert({
        call_id: resolvedCallId,
        event_type: `twilio_status:${callStatus ?? 'unknown'}`,
        payload: params,
      });
    }

    // Reflect terminal state onto the lead for the admin view.
    if (resolvedLeadId && callStatus && TERMINAL_STATUSES.has(callStatus)) {
      const leadStatus: LeadStatus = callStatus === 'completed' ? 'completed' : 'failed';
      await supabase.from('leads').update({ status: leadStatus }).eq('id', resolvedLeadId);
    }
  } catch (err) {
    console.error('[twilio/status] update failed:', err);
  }

  return NextResponse.json({ ok: true });
}
