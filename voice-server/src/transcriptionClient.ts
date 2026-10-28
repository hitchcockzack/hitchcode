import { config } from './config.js';

export type TranscriptHandler = (text: string, isFinal: boolean) => void;

/**
 * Streaming speech-to-text abstraction.
 *
 * NOTE: Not used in the live realtime loop (OpenAI Realtime transcribes caller
 * speech for us). Retained for an optional cascade pipeline (Deepgram, etc.).
 *
 * Twilio sends inbound caller audio as 8kHz μ-law base64 frames. A real
 * implementation opens a streaming STT socket (Deepgram, AssemblyAI, OpenAI
 * Realtime, etc.), forwards each decoded frame, and emits interim/final
 * transcripts via `onTranscript`.
 */
export interface Transcriber {
  /** Feed a raw μ-law 8kHz audio chunk from Twilio. */
  pushAudio(mulawChunk: Buffer): void;
  /** Register a callback for interim + final transcripts. */
  onTranscript(handler: TranscriptHandler): void;
  /** Flush + close the upstream connection. */
  close(): Promise<void>;
}

/**
 * Placeholder transcriber: accepts audio but produces no transcripts.
 *
 * This keeps the media pipeline fully wired (audio flows in, lifecycle is
 * correct) while STT is stubbed. Swap in a real provider in `createTranscriber`.
 */
class NoopTranscriber implements Transcriber {
  private handler: TranscriptHandler | null = null;
  private warned = false;

  pushAudio(_chunk: Buffer): void {
    if (!this.warned) {
      this.warned = true;
      // eslint-disable-next-line no-console
      console.warn('[stt] NoopTranscriber active — wire DEEPGRAM_API_KEY for real transcripts.');
    }
  }

  onTranscript(handler: TranscriptHandler): void {
    this.handler = handler;
  }

  /** Allow tests/manual injection of a transcript during development. */
  emit(text: string, isFinal = true): void {
    this.handler?.(text, isFinal);
  }

  async close(): Promise<void> {
    /* nothing to close */
  }
}

/*
 * TODO(stt): Deepgram streaming sketch.
 *
 *   import WebSocket from 'ws';
 *   const ws = new WebSocket(
 *     'wss://api.deepgram.com/v1/listen?encoding=mulaw&sample_rate=8000&model=nova-2-phonecall&interim_results=true',
 *     { headers: { Authorization: `Token ${config.deepgram.apiKey}` } },
 *   );
 *   pushAudio -> ws.send(mulawChunk)
 *   ws.on('message', (raw) => {
 *     const evt = JSON.parse(raw.toString());
 *     const alt = evt.channel?.alternatives?.[0];
 *     if (alt?.transcript) handler(alt.transcript, evt.is_final);
 *   });
 */

export function createTranscriber(): Transcriber {
  // When DEEPGRAM_API_KEY (or another provider) is configured, return the real
  // implementation here. Until then, the no-op keeps the pipeline intact.
  if (config.deepgram.apiKey) {
    // TODO(stt): return new DeepgramTranscriber();
    console.warn('[stt] DEEPGRAM_API_KEY set but DeepgramTranscriber is not implemented yet.');
  }
  return new NoopTranscriber();
}
