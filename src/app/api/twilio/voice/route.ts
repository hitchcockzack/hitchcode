import { NextRequest } from 'next/server';
import twilio from 'twilio';

import { env } from '@/lib/ai-concierge/env';
import { CALL_TIME_LIMIT_SECONDS } from '@/lib/ai-concierge/twilio';
import { getSupabaseAdmin } from '@/lib/supabase/admin';

export const runtime = 'nodejs';

const XML_HEADERS = { 'Content-Type': 'text/xml; charset=utf-8' } as const;

/**
 * Build the wss URL the Twilio <Stream> connects to. `VOICE_SERVER_WS_URL`
 * should already point at the media endpoint, e.g.
 *   wss://voice.hitchcode.net/twilio-media
 */
function buildStreamUrl(leadId: string, callId: string): string {
  const base = env.voiceServerWsUrl().replace(/\/$/, '');
  const withPath = base.includes('/twilio-media') ? base : `${base}/twilio-media`;
  const params = new URLSearchParams({ leadId, callId });
  return `${withPath}?${params.toString()}`;
}

async function handle(request: NextRequest): Promise<Response> {
  const { searchParams } = new URL(request.url);
  const leadId = searchParams.get('leadId') ?? '';
  const callId = searchParams.get('callId') ?? '';

  const response = new twilio.twiml.VoiceResponse();

  if (!leadId || !callId) {
    response.say(
      "Sorry, we couldn't start the concierge session. Please try requesting your call again.",
    );
    response.hangup();
    return new Response(response.toString(), { headers: XML_HEADERS });
  }

  // Best-effort: stamp the call as in-progress + log the lifecycle event.
  try {
    const supabase = getSupabaseAdmin();
    await supabase.from('call_events').insert({
      call_id: callId,
      event_type: 'voice_webhook_hit',
      payload: { leadId },
    });
  } catch (err) {
    console.error('[twilio/voice] event log failed:', err);
  }

  // Bridge the live audio to the external realtime websocket server.
  const connect = response.connect();
  const stream = connect.stream({ url: buildStreamUrl(leadId, callId) });
  // Pass ids as custom parameters too, so the voice-server can read them from
  // the Twilio "start" event even if query parsing is unavailable.
  stream.parameter({ name: 'leadId', value: leadId });
  stream.parameter({ name: 'callId', value: callId });
  stream.parameter({ name: 'maxCallSeconds', value: String(CALL_TIME_LIMIT_SECONDS) });
  // Twilio only reaches this once the voice-server closes the stream, which is
  // how the AI hangs up.
  response.hangup();

  return new Response(response.toString(), { headers: XML_HEADERS });
}

export async function POST(request: NextRequest) {
  return handle(request);
}

// Twilio can be configured to GET the webhook as well.
export async function GET(request: NextRequest) {
  return handle(request);
}
