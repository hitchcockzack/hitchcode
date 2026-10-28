import { NextRequest, NextResponse } from 'next/server';

import { env, getEnv } from '@/lib/ai-concierge/env';
import { sendPush } from '@/lib/ai-concierge/notify';
import { getTwilioClient } from '@/lib/ai-concierge/twilio';
import { getSupabaseAdmin } from '@/lib/supabase/admin';

export const runtime = 'nodejs';
export const maxDuration = 60;

/**
 * Daily health check for the concierge's external dependencies, triggered by
 * the Vercel cron in vercel.json.
 *
 * The Supabase step doubles as a keep-alive: Free-plan projects pause after
 * ~7 days without database activity, and a paused project makes every
 * start-call fail before Twilio is ever reached. Failures are pushed to
 * Pushover so an outage is caught the day it starts.
 */

const CHECK_TIMEOUT_MS = 10_000;
const DAY_MS = 24 * 60 * 60 * 1000;
const HEARTBEAT_RETENTION_DAYS = 14;
// Headroom for the phone number's monthly renewal plus a batch of demo calls;
// Twilio stops placing calls once the balance runs out.
const MIN_TWILIO_BALANCE_USD = 5;

/** Vercel cron sends `Authorization: Bearer $CRON_SECRET` when it is set. */
function isAuthorized(request: NextRequest): boolean {
  const secret = getEnv('CRON_SECRET');
  if (!secret) {
    console.warn('[ai-concierge/health] CRON_SECRET not set — endpoint is unprotected.');
    return true;
  }
  return request.headers.get('authorization') === `Bearer ${secret}`;
}

async function checkDatabase(): Promise<string | null> {
  const supabase = getSupabaseAdmin();
  const signal = AbortSignal.timeout(CHECK_TIMEOUT_MS);
  const cutoff = new Date(Date.now() - HEARTBEAT_RETENTION_DAYS * DAY_MS).toISOString();
  const results = await Promise.all([
    // Writes, not just reads: read-only traffic may not reset Supabase's
    // inactivity timer. Old heartbeats are pruned so the event log stays clean.
    supabase.from('call_events').insert({ event_type: 'keepalive' }).abortSignal(signal),
    supabase
      .from('call_events')
      .delete()
      .eq('event_type', 'keepalive')
      .lt('created_at', cutoff)
      .abortSignal(signal),
    supabase.from('leads').select('id', { count: 'exact', head: true }).abortSignal(signal),
    supabase.from('calls').select('id', { count: 'exact', head: true }).abortSignal(signal),
  ]);
  const failed = results.find((result) => result.error);
  return failed?.error ? failed.error.message : null;
}

async function checkTwilioBalance(): Promise<string | null> {
  const { balance, currency } = await getTwilioClient().balance.fetch();
  const amount = Number.parseFloat(balance);
  return amount < MIN_TWILIO_BALANCE_USD
    ? `balance is low (${amount.toFixed(2)} ${currency}) — top up before calls start failing`
    : null;
}

async function checkVoiceServer(): Promise<string | null> {
  // Probe the same host Twilio streams call audio to.
  const { protocol, host } = new URL(env.voiceServerWsUrl());
  const res = await fetch(`${protocol === 'ws:' ? 'http:' : 'https:'}//${host}/health`, {
    signal: AbortSignal.timeout(CHECK_TIMEOUT_MS),
  });
  return res.ok ? null : `/health returned ${res.status}`;
}

async function runCheck(
  name: string,
  check: () => Promise<string | null>,
): Promise<string | null> {
  try {
    const problem = await check();
    return problem ? `${name}: ${problem}` : null;
  } catch (err) {
    return `${name}: ${err instanceof Error ? err.message : String(err)}`;
  }
}

export async function GET(request: NextRequest) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 });
  }

  const results = await Promise.all([
    runCheck('Supabase', checkDatabase),
    runCheck('Twilio', checkTwilioBalance),
    runCheck('Voice server', checkVoiceServer),
  ]);
  const problems = results.filter((problem): problem is string => problem !== null);

  if (problems.length > 0) {
    console.error('[ai-concierge/health] failing checks:', problems);
    const push = await sendPush({
      title: 'AI concierge health check failed',
      message: problems.join('\n'),
    });
    if (!push.ok) console.error('[ai-concierge/health] alert failed:', push.error);
    // Details stay in the logs + alert; this endpoint may be public until CRON_SECRET is set.
    return NextResponse.json({ ok: false }, { status: 503 });
  }

  return NextResponse.json({ ok: true });
}
