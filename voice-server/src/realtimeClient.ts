import WebSocket from 'ws';

import { config } from './config.js';

/**
 * Thin wrapper around the OpenAI Realtime API (speech-to-speech).
 *
 * Audio in/out is G.711 μ-law 8kHz ("audio/pcmu"), which is byte-for-byte what
 * Twilio Media Streams send/expect — so caller audio and model audio pass
 * through with zero transcoding. Turn-taking (when the caller is "done") is
 * handled server-side by semantic VAD, which is the main lever on how human the
 * call feels.
 *
 * This class is provider-specific on purpose; the bridge (twilioMediaStream)
 * depends only on the callbacks below, so a different realtime provider can be
 * dropped in by implementing the same surface.
 */

const REALTIME_URL = 'wss://api.openai.com/v1/realtime';

/** Lets the model hang up. The bridge only acts on it once the response completes. */
const END_CALL_TOOL = {
  type: 'function',
  name: 'end_call',
  description:
    'Hang up the phone call. Call it right after your final goodbye: when the call flow is complete, when the caller wants to stop, or after leaving your voicemail message. Never call it mid-conversation.',
  parameters: {
    type: 'object',
    properties: {
      reason: {
        type: 'string',
        enum: ['completed', 'caller_ended', 'voicemail', 'no_response'],
      },
      follow_up_requested: {
        type: 'boolean',
        description: 'True only if the caller said they want Zack to personally follow up.',
      },
    },
    required: ['reason', 'follow_up_requested'],
  },
};

export interface EndCallRequest {
  reason: string;
  followUpRequested: boolean;
  /** Realtime function-call id, used to tell the model if the hangup is cancelled. */
  toolCallId?: string;
}

export interface RealtimeCallbacks {
  /** Base64 μ-law audio chunk from the model -> forward to Twilio. */
  onAudioDelta: (base64Mulaw: string) => void;
  /** Final transcript of a caller utterance. */
  onUserTranscript: (text: string) => void;
  /** Final transcript of something the model said. */
  onAssistantTranscript: (text: string) => void;
  /** Caller started speaking -> barge-in (flush Twilio's playback buffer). */
  onSpeechStarted: () => void;
  onSpeechStopped: () => void;
  /** The model started generating a response. */
  onResponseStarted: () => void;
  /**
   * A response finished streaming. `endCall` is set only when the model called
   * end_call in a response that completed; interrupted responses never hang up.
   */
  onResponseDone: (endCall: EndCallRequest | null) => void;
  /** Session is configured and ready for audio. */
  onReady: () => void;
  onError: (err: unknown) => void;
  onClose: () => void;
}

function readEndCall(response: unknown): EndCallRequest | null {
  const res = response as
    | {
        status?: string;
        output?: Array<{ type?: string; name?: string; call_id?: string; arguments?: string }>;
      }
    | undefined;
  if (res?.status !== 'completed') return null;
  const call = res.output?.find((item) => item.type === 'function_call' && item.name === 'end_call');
  if (!call) return null;

  let args: { reason?: unknown; follow_up_requested?: unknown } = {};
  try {
    args = JSON.parse(call.arguments ?? '{}');
  } catch {
    // Malformed arguments still mean the model wants to hang up.
  }
  return {
    reason: typeof args.reason === 'string' ? args.reason : 'completed',
    followUpRequested: args.follow_up_requested === true,
    toolCallId: call.call_id,
  };
}

export class OpenAIRealtimeSession {
  private ws: WebSocket | null = null;
  private ready = false;

  constructor(
    private readonly instructions: string,
    private readonly cb: RealtimeCallbacks,
  ) {}

  connect(): void {
    const url = `${REALTIME_URL}?model=${encodeURIComponent(config.openai.realtimeModel)}`;
    // NOTE: do NOT send the "OpenAI-Beta: realtime=v1" header — it opts into the
    // deprecated Beta API shape, which OpenAI now rejects with
    // "beta_api_shape_disabled". The GA endpoint uses the nested session shape
    // configured below.
    this.ws = new WebSocket(url, {
      headers: {
        Authorization: `Bearer ${config.openai.apiKey}`,
      },
    });

    this.ws.on('open', () => this.configureSession());
    this.ws.on('message', (raw) => this.onMessage(raw));
    this.ws.on('error', (err) => this.cb.onError(err));
    this.ws.on('close', () => this.cb.onClose());
  }

  private configureSession(): void {
    const turnDetection =
      config.realtime.turnDetection === 'semantic_vad'
        ? {
            type: 'semantic_vad',
            eagerness: config.realtime.eagerness,
            create_response: true,
            interrupt_response: true,
          }
        : {
            type: 'server_vad',
            threshold: config.realtime.vadThreshold,
            prefix_padding_ms: config.realtime.prefixPaddingMs,
            silence_duration_ms: config.realtime.silenceMs,
            create_response: true,
            interrupt_response: true,
          };

    // GA Realtime "session.update" shape (nested audio.input/output).
    this.send({
      type: 'session.update',
      session: {
        type: 'realtime',
        model: config.openai.realtimeModel,
        output_modalities: ['audio'],
        instructions: this.instructions,
        tools: [END_CALL_TOOL],
        tool_choice: 'auto',
        audio: {
          input: {
            format: { type: 'audio/pcmu' },
            turn_detection: turnDetection,
            transcription: { model: config.openai.transcribeModel },
          },
          output: {
            format: { type: 'audio/pcmu' },
            voice: config.openai.realtimeVoice,
          },
        },
      },
    });
  }

  /** Append a base64 μ-law chunk from Twilio into the model's input buffer. */
  sendAudio(base64Mulaw: string): void {
    if (!this.ready) return;
    this.send({ type: 'input_audio_buffer.append', audio: base64Mulaw });
  }

  /** Ask the model to speak now (used for the opening greeting). */
  createResponse(): void {
    this.send({ type: 'response.create' });
  }

  /** Replace the session instructions mid-call (e.g. the time-limit wrap-up). */
  updateInstructions(instructions: string): void {
    // GA requires session.type on every session.update, even instruction-only ones.
    this.send({ type: 'session.update', session: { type: 'realtime', instructions } });
  }

  /** Give the model a one-off instruction and have it respond right away. */
  prompt(note: string): void {
    this.send({
      type: 'conversation.item.create',
      item: { type: 'message', role: 'system', content: [{ type: 'input_text', text: note }] },
    });
    this.send({ type: 'response.create' });
  }

  /** Answer a function call so the model knows its outcome. */
  sendFunctionOutput(toolCallId: string, output: string): void {
    this.send({
      type: 'conversation.item.create',
      item: { type: 'function_call_output', call_id: toolCallId, output },
    });
  }

  close(): void {
    try {
      this.ws?.close();
    } catch {
      /* ignore */
    }
  }

  private onMessage(raw: WebSocket.RawData): void {
    let evt: { type?: string; [k: string]: unknown };
    try {
      evt = JSON.parse(raw.toString());
    } catch {
      return;
    }
    const type = evt.type ?? '';

    // Ready to receive audio once the session is configured.
    if (type === 'session.updated' || type === 'session.created') {
      if (!this.ready) {
        this.ready = true;
        this.cb.onReady();
      }
      return;
    }

    // Model audio out. Matches GA 'response.output_audio.delta' and the older
    // 'response.audio.delta'; excludes '*audio_transcript.delta'.
    if (type.endsWith('audio.delta')) {
      const delta = evt.delta;
      if (typeof delta === 'string') this.cb.onAudioDelta(delta);
      return;
    }

    // Caller speech transcript (final).
    if (type.endsWith('input_audio_transcription.completed')) {
      const transcript = evt.transcript;
      if (typeof transcript === 'string' && transcript.trim()) {
        this.cb.onUserTranscript(transcript.trim());
      }
      return;
    }

    // Model speech transcript (final). GA: 'response.output_audio_transcript.done'.
    if (type.endsWith('audio_transcript.done')) {
      const transcript = evt.transcript;
      if (typeof transcript === 'string' && transcript.trim()) {
        this.cb.onAssistantTranscript(transcript.trim());
      }
      return;
    }

    // Caller started talking -> barge-in.
    if (type === 'input_audio_buffer.speech_started') {
      this.cb.onSpeechStarted();
      return;
    }

    if (type === 'input_audio_buffer.speech_stopped') {
      this.cb.onSpeechStopped();
      return;
    }

    if (type === 'response.created') {
      this.cb.onResponseStarted();
      return;
    }

    if (type === 'response.done') {
      this.cb.onResponseDone(readEndCall(evt.response));
      return;
    }

    if (type === 'error') {
      this.cb.onError(evt.error ?? evt);
    }
  }

  private send(obj: unknown): void {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify(obj));
    }
  }
}
