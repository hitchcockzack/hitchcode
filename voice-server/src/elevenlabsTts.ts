import { config } from './config.js';

/**
 * ElevenLabs TTS (the raw API — NOT ElevenLabs Agents).
 *
 * NOTE: Not used in the live realtime loop (OpenAI Realtime produces the call
 * audio). Retained for the optional post-call recap voicemail / a cascade
 * pipeline, where voice quality matters and latency does not.
 *
 * Twilio Media Streams expect 8kHz mono μ-law ("audio/x-mulaw"). ElevenLabs can
 * emit exactly that via `output_format=ulaw_8000`, so the bytes returned here
 * can be base64-encoded and sent straight to Twilio with no resampling.
 */

const ELEVEN_BASE = 'https://api.elevenlabs.io/v1';

export interface TtsResult {
  /** Raw μ-law 8kHz audio bytes. */
  audio: Buffer;
}

/** Synthesize a full utterance to μ-law 8kHz (buffered, simplest path). */
export async function synthesizeUlaw8000(text: string): Promise<TtsResult> {
  if (!config.elevenlabs.apiKey || !config.elevenlabs.voiceId) {
    // No key/voice yet — return empty audio so the call flow keeps working.
    return { audio: Buffer.alloc(0) };
  }

  const url = `${ELEVEN_BASE}/text-to-speech/${config.elevenlabs.voiceId}?output_format=ulaw_8000`;
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'xi-api-key': config.elevenlabs.apiKey,
      'Content-Type': 'application/json',
      Accept: 'audio/basic',
    },
    body: JSON.stringify({
      text,
      model_id: config.elevenlabs.ttsModel,
      voice_settings: { stability: 0.5, similarity_boost: 0.75 },
    }),
  });

  if (!res.ok) {
    const detail = await res.text().catch(() => '');
    throw new Error(`ElevenLabs TTS failed (${res.status}): ${detail.slice(0, 300)}`);
  }

  const arrayBuf = await res.arrayBuffer();
  return { audio: Buffer.from(arrayBuf) };
}

/**
 * Streaming variant.
 *
 * TODO(realtime): use the ElevenLabs streaming endpoint
 * (`/text-to-speech/{voiceId}/stream?output_format=ulaw_8000`) and forward
 * chunks to `onChunk` as they arrive for lower time-to-first-audio. For now this
 * falls back to the buffered call and emits a single chunk.
 */
export async function streamUlaw8000(
  text: string,
  onChunk: (chunk: Buffer) => void,
): Promise<void> {
  const { audio } = await synthesizeUlaw8000(text);
  if (audio.length > 0) onChunk(audio);
}
