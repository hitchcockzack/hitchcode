import 'dotenv/config';

/**
 * Centralized, typed config for the voice server.
 *
 * Core values (PORT, APP_BASE_URL) have safe defaults. AI/TTS keys are optional
 * here on purpose: the server should still boot and accept calls while you wire
 * providers incrementally. `assertReady()` logs what's missing at startup.
 */

function str(name: string, fallback = ''): string {
  return process.env[name]?.trim() || fallback;
}

export const config = {
  port: Number.parseInt(str('PORT', '8080'), 10),

  // Next.js app base URL + derived post-call endpoint.
  appBaseUrl: str('APP_BASE_URL', 'http://localhost:3000').replace(/\/$/, ''),
  get postCallUrl(): string {
    return `${this.appBaseUrl}/api/ai-concierge/post-call-summary`;
  },
  postCallSharedSecret: str('POST_CALL_SHARED_SECRET'),

  openai: {
    apiKey: str('OPENAI_API_KEY'),
    // Speech-to-speech model that powers the live call.
    realtimeModel: str('OPENAI_REALTIME_MODEL', 'gpt-realtime'),
    // Voice used by the realtime model (marin/cedar/alloy/ash/ballad/...).
    realtimeVoice: str('OPENAI_REALTIME_VOICE', 'marin'),
    // Transcription model for caller speech (used to build the transcript).
    transcribeModel: str('OPENAI_TRANSCRIBE_MODEL', 'whisper-1'),
    // Only used by the OPTIONAL cascade pipeline (llmClient.ts), not the live loop.
    liveModel: str('OPENAI_LIVE_MODEL', 'gpt-4.1-mini'),
  },

  // Turn detection tuning — the single biggest lever on how the call feels.
  // Default is server_vad with a confident threshold so the AI keeps talking
  // through background noise and only stops on real, sustained interruption.
  realtime: {
    turnDetection: str('REALTIME_TURN_DETECTION', 'server_vad') as
      | 'semantic_vad'
      | 'server_vad',
    // semantic_vad only: how eagerly it ends the caller's turn.
    eagerness: str('REALTIME_EAGERNESS', 'low') as 'low' | 'medium' | 'high' | 'auto',
    // server_vad: 0–1. Higher = needs louder/clearer speech to count as an
    // interruption, so a stray noise won't make the AI stutter. 0.5 is the
    // default; we raise it for confidence.
    vadThreshold: Number.parseFloat(str('REALTIME_VAD_THRESHOLD', '0.6')),
    // Audio included before detected speech start (ms).
    prefixPaddingMs: Number.parseInt(str('REALTIME_PREFIX_PADDING_MS', '300'), 10),
    // Trailing silence (ms) before the caller's turn is considered finished.
    silenceMs: Number.parseInt(str('REALTIME_SILENCE_MS', '700'), 10),
  },

  // Retained for the OPTIONAL post-call recap voicemail / alternative cascade.
  // Not used in the live realtime loop.
  elevenlabs: {
    apiKey: str('ELEVENLABS_API_KEY'),
    voiceId: str('ELEVENLABS_VOICE_ID'),
    ttsModel: str('ELEVENLABS_TTS_MODEL', 'eleven_flash_v2_5'),
  },

  deepgram: {
    apiKey: str('DEEPGRAM_API_KEY'),
  },
} as const;

/** Log (don't crash) which integrations are not yet configured. */
export function assertReady(log: (msg: string) => void): void {
  const missing: string[] = [];
  // Required for the live realtime call + post-call handoff.
  if (!config.openai.apiKey) missing.push('OPENAI_API_KEY (live call)');
  if (!config.postCallSharedSecret) missing.push('POST_CALL_SHARED_SECRET (post-call auth)');

  if (missing.length > 0) {
    log(`Starting with incomplete config — missing: ${missing.join(', ')}.`);
    log('The server will run, but affected features are degraded until set.');
  }
  // ELEVENLABS_* and DEEPGRAM_API_KEY are optional — only used by the cascade /
  // post-call recap paths, not the realtime live loop.
}
