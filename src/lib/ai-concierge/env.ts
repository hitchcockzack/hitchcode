/**
 * Server-only environment access for the AI concierge feature.
 *
 * Everything here reads from `process.env` lazily so that a missing variable
 * only throws when the relevant code path actually runs (not at import time /
 * build time). Never import this from a client component — it intentionally
 * touches secrets like the Supabase service-role key.
 */

export function getEnv(name: string): string | undefined {
  const value = process.env[name];
  return value && value.length > 0 ? value : undefined;
}

export function requireEnv(name: string): string {
  const value = getEnv(name);
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

export const env = {
  // App
  siteUrl: () => getEnv('NEXT_PUBLIC_SITE_URL') ?? 'http://localhost:3000',
  voiceServerWsUrl: () => requireEnv('VOICE_SERVER_WS_URL'),

  // Supabase (server-side, service role)
  supabaseUrl: () =>
    getEnv('NEXT_PUBLIC_SUPABASE_URL') ?? requireEnv('SUPABASE_URL'),
  supabaseServiceRoleKey: () => requireEnv('SUPABASE_SERVICE_ROLE_KEY'),

  // Twilio
  twilioAccountSid: () => requireEnv('TWILIO_ACCOUNT_SID'),
  twilioAuthToken: () => requireEnv('TWILIO_AUTH_TOKEN'),
  twilioPhoneNumber: () => requireEnv('TWILIO_PHONE_NUMBER'),
  twilioStatusCallbackUrl: () => getEnv('TWILIO_STATUS_CALLBACK_URL'),

  // AI / OpenAI (summary pathway)
  openaiApiKey: () => requireEnv('OPENAI_API_KEY'),
  openaiSummaryModel: () => getEnv('OPENAI_SUMMARY_MODEL') ?? 'gpt-4.1',

  // Email
  resendApiKey: () => requireEnv('RESEND_API_KEY'),
  internalLeadEmail: () => requireEnv('INTERNAL_LEAD_EMAIL'),
  fromEmail: () => requireEnv('FROM_EMAIL'),

  // Shared secret protecting server-to-server endpoints (voice-server -> Next).
  // Added beyond the base spec list for security; see .env.example.
  postCallSharedSecret: () => getEnv('POST_CALL_SHARED_SECRET'),

  // Simple env-gated protection for the admin debug page (TODO: real auth).
  adminDashboardToken: () => getEnv('ADMIN_DASHBOARD_TOKEN'),
};
