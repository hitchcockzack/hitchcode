import twilio, { type Twilio } from 'twilio';

import { env } from '@/lib/ai-concierge/env';

/**
 * Hard cap on every concierge call. Twilio enforces it, and the voice-server
 * receives it as a stream parameter to time the AI's wrap-up.
 */
export const CALL_TIME_LIMIT_SECONDS = 5 * 60;

let cached: Twilio | null = null;

export function getTwilioClient(): Twilio {
  if (!cached) {
    cached = twilio(env.twilioAccountSid(), env.twilioAuthToken());
  }
  return cached;
}

/** Build the absolute URL Twilio fetches for call instructions (TwiML). */
export function buildVoiceWebhookUrl(leadId: string, callId: string): string {
  const base = env.siteUrl().replace(/\/$/, '');
  const params = new URLSearchParams({ leadId, callId });
  return `${base}/api/twilio/voice?${params.toString()}`;
}

/** Build the absolute URL Twilio posts call status updates to. */
export function buildStatusCallbackUrl(leadId: string, callId: string): string {
  const explicit = env.twilioStatusCallbackUrl();
  const base = (explicit ?? `${env.siteUrl().replace(/\/$/, '')}/api/twilio/status`).replace(
    /\/$/,
    '',
  );
  const params = new URLSearchParams({ leadId, callId });
  return `${base}?${params.toString()}`;
}
