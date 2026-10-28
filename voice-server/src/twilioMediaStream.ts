import type { FastifyRequest } from 'fastify';
import type { WebSocket } from 'ws';

import { ConversationOrchestrator } from './conversationOrchestrator.js';
import { OpenAIRealtimeSession, type EndCallRequest } from './realtimeClient.js';
import { sendPostCall } from './postCall.js';

/** Shapes of the JSON frames Twilio sends over the media stream. */
interface TwilioStartEvent {
  event: 'start';
  start: {
    streamSid: string;
    callSid: string;
    customParameters?: Record<string, string>;
    mediaFormat?: { encoding: string; sampleRate: number; channels: number };
  };
  streamSid: string;
}
interface TwilioMediaEvent {
  event: 'media';
  media: { track: string; chunk: string; timestamp: string; payload: string };
  streamSid: string;
}
interface TwilioStopEvent {
  event: 'stop';
  stop: { accountSid: string; callSid: string };
  streamSid: string;
}
type TwilioEvent =
  | { event: 'connected' }
  | TwilioStartEvent
  | TwilioMediaEvent
  | { event: 'mark'; mark: { name: string }; streamSid: string }
  | TwilioStopEvent;

// Matches the app's CALL_TIME_LIMIT_SECONDS; the TwiML passes the real value.
const DEFAULT_MAX_CALL_SECONDS = 300;
// How long before the cap the model is told to wrap up.
const WRAP_UP_LEAD_SECONDS = 60;
const HANGUP_MARK = 'hangup';
// Fallback if Twilio never confirms the goodbye finished playing.
const HANGUP_FALLBACK_MS = 15_000;
// Caller silence before the AI checks in, then after the check-in before it hangs up.
const SILENCE_CHECK_IN_MS = 30_000;
const SILENCE_HANG_UP_MS = 20_000;
const SILENCE_POLL_MS = 5_000;

function readIds(req: FastifyRequest): { leadId: string; callId: string } {
  const q = (req.query ?? {}) as Record<string, string | undefined>;
  return { leadId: q.leadId ?? '', callId: q.callId ?? '' };
}

/**
 * Bridges one live call: Twilio media stream <-> OpenAI Realtime (speech-to-speech).
 *
 * Both sides speak G.711 μ-law 8kHz, so audio is forwarded verbatim in each
 * direction. The AI hangs up by calling end_call; the bridge waits for its
 * goodbye to finish playing, then closes the stream so Twilio runs the TwiML
 * <Hangup/>. On hangup, the transcript is shipped to the Next.js post-call
 * endpoint, which generates + emails the summary.
 *
 * Every path that can leave a line open (silence, the time cap, a dropped AI
 * session) ends the call, because an idle line still bills per minute.
 */
class TwilioMediaSession {
  private streamSid = '';
  private twilioCallSid = '';
  private leadId: string;
  private callId: string;

  private readonly orchestrator = new ConversationOrchestrator();
  private realtime: OpenAIRealtimeSession | null = null;

  private startedAt: string | null = null;
  private maxCallSeconds = DEFAULT_MAX_CALL_SECONDS;
  private finalized = false;
  private closing = false;
  private endReason = 'caller_hung_up';

  // Turn state for the silence watchdog.
  private aiResponding = false;
  private callerSpeaking = false;
  private lastActivityAt = Date.now();
  private silenceCheckedIn = false;

  // A hangup the AI has asked for, waiting on its goodbye to finish playing.
  private pendingHangup: EndCallRequest | null = null;
  private hangupFallback: NodeJS.Timeout | null = null;
  private readonly timers: NodeJS.Timeout[] = [];
  private silenceWatchdog: NodeJS.Timeout | null = null;

  constructor(
    private readonly socket: WebSocket,
    ids: { leadId: string; callId: string },
  ) {
    this.leadId = ids.leadId;
    this.callId = ids.callId;

    socket.on('message', (raw) => void this.onMessage(raw));
    socket.on('close', () => void this.finalize('socket_close'));
    socket.on('error', (err) => console.error('[twilio-media] socket error:', err));
  }

  private async onMessage(raw: unknown): Promise<void> {
    let evt: TwilioEvent;
    try {
      evt = JSON.parse(String(raw)) as TwilioEvent;
    } catch {
      return;
    }

    switch (evt.event) {
      case 'start':
        this.onStart(evt);
        break;
      case 'media':
        this.realtime?.sendAudio(evt.media.payload);
        break;
      case 'mark':
        // Twilio echoes a mark once everything queued before it has played.
        if (evt.mark.name === HANGUP_MARK && this.pendingHangup) {
          this.closeCall(this.pendingHangup.reason);
        }
        break;
      case 'stop':
        await this.finalize('twilio_stop');
        break;
      default:
        break; // 'connected', etc.
    }
  }

  private onStart(evt: TwilioStartEvent): void {
    this.streamSid = evt.start.streamSid ?? evt.streamSid;
    this.twilioCallSid = evt.start.callSid ?? '';
    this.startedAt = new Date().toISOString();

    // Prefer TwiML custom parameters; fall back to query params.
    const params = evt.start.customParameters ?? {};
    if (params.leadId) this.leadId = params.leadId;
    if (params.callId) this.callId = params.callId;
    this.maxCallSeconds = Number(params.maxCallSeconds) || DEFAULT_MAX_CALL_SECONDS;

    console.log(
      `[twilio-media] start stream=${this.streamSid} lead=${this.leadId} call=${this.callId} max=${this.maxCallSeconds}s`,
    );

    this.realtime = new OpenAIRealtimeSession(this.orchestrator.instructions(), {
      onReady: () => {
        // Have the AI greet first (VAD only auto-responds after the caller speaks).
        this.realtime?.createResponse();
      },
      onAudioDelta: (b64) => {
        this.send({ event: 'media', streamSid: this.streamSid, media: { payload: b64 } });
      },
      onSpeechStarted: () => this.onCallerSpeechStarted(),
      onSpeechStopped: () => {
        this.callerSpeaking = false;
        this.lastActivityAt = Date.now();
      },
      onResponseStarted: () => {
        this.aiResponding = true;
      },
      onResponseDone: (endCall) => this.onResponseDone(endCall),
      onUserTranscript: (text) => this.orchestrator.noteUser(text),
      onAssistantTranscript: (text) => this.orchestrator.noteAssistant(text),
      onError: (err) => console.error('[twilio-media] realtime error:', err),
      onClose: () => {
        console.log('[twilio-media] realtime closed');
        if (!this.finalized) this.closeCall('ai_session_closed');
      },
    });
    this.realtime.connect();

    this.timers.push(
      setTimeout(
        () => this.wrapUp(),
        Math.max(0, this.maxCallSeconds - WRAP_UP_LEAD_SECONDS) * 1000,
      ),
      // Twilio's timeLimit should end the call first; this covers calls placed without it.
      setTimeout(() => this.closeCall('time_limit'), (this.maxCallSeconds + 5) * 1000),
    );
    this.silenceWatchdog = setInterval(() => this.checkSilence(), SILENCE_POLL_MS);
  }

  private onCallerSpeechStarted(): void {
    this.callerSpeaking = true;
    this.lastActivityAt = Date.now();
    this.silenceCheckedIn = false;

    // A person picked up while the AI was leaving a voicemail: keep the call going.
    if (this.pendingHangup?.reason === 'voicemail') {
      const { toolCallId } = this.pendingHangup;
      this.cancelHangup();
      if (toolCallId) {
        this.realtime?.sendFunctionOutput(
          toolCallId,
          'Not hung up: a person answered. Greet them and continue the call.',
        );
      }
    }

    // Barge-in: drop whatever audio Twilio still has buffered.
    this.send({ event: 'clear', streamSid: this.streamSid });
  }

  private onResponseDone(endCall: EndCallRequest | null): void {
    this.aiResponding = false;
    this.lastActivityAt = Date.now();

    if (endCall) {
      if (endCall.followUpRequested) this.orchestrator.followUpRequested = true;
      this.requestHangup(endCall);
    }

    // All of this response's audio has been forwarded, so the mark lands after it.
    if (this.pendingHangup) {
      this.send({ event: 'mark', streamSid: this.streamSid, mark: { name: HANGUP_MARK } });
    }
  }

  /** Hang up once the audio already sent to Twilio finishes playing. */
  private requestHangup(request: EndCallRequest): void {
    if (this.pendingHangup) return;
    this.pendingHangup = request;
    this.hangupFallback = setTimeout(() => this.closeCall(request.reason), HANGUP_FALLBACK_MS);
  }

  private cancelHangup(): void {
    this.pendingHangup = null;
    if (this.hangupFallback) clearTimeout(this.hangupFallback);
    this.hangupFallback = null;
  }

  /** Near the time cap: have the model recap and close on its own. */
  private wrapUp(): void {
    if (this.pendingHangup || !this.orchestrator.beginWrapUp()) return;
    this.realtime?.updateInstructions(this.orchestrator.instructions());
  }

  /** Check in on a silent caller once, then hang up if they stay quiet. */
  private checkSilence(): void {
    if (this.pendingHangup || this.aiResponding || this.callerSpeaking || !this.realtime) return;
    const idle = Date.now() - this.lastActivityAt;

    if (!this.silenceCheckedIn && idle >= SILENCE_CHECK_IN_MS) {
      this.silenceCheckedIn = true;
      this.realtime.prompt('The caller has gone quiet. Briefly check whether they are still there.');
    } else if (this.silenceCheckedIn && idle >= SILENCE_HANG_UP_MS) {
      this.realtime.prompt(
        'The caller is still silent. Say a short goodbye and call end_call with reason "no_response".',
      );
      // Hang up after the goodbye even if the model never calls end_call.
      this.requestHangup({ reason: 'no_response', followUpRequested: false });
    }
  }

  /** End the call by closing the stream; Twilio then runs the TwiML <Hangup/>. */
  private closeCall(reason: string): void {
    if (this.finalized || this.closing) return;
    this.closing = true;
    this.endReason = reason;
    console.log(`[twilio-media] hanging up (${reason}) call=${this.callId}`);
    try {
      this.socket.close();
    } catch {
      void this.finalize(reason);
    }
  }

  private send(obj: unknown): void {
    try {
      if (this.socket.readyState === 1 /* OPEN */) this.socket.send(JSON.stringify(obj));
    } catch (err) {
      console.error('[twilio-media] send failed:', err);
    }
  }

  /** Close realtime, ship transcript to Next.js, tear down. Idempotent. */
  private async finalize(reason: string): Promise<void> {
    if (this.finalized) return;
    this.finalized = true;
    for (const timer of this.timers) clearTimeout(timer);
    if (this.silenceWatchdog) clearInterval(this.silenceWatchdog);
    this.cancelHangup();

    const endedAt = new Date().toISOString();
    const durationSeconds = this.startedAt
      ? Math.max(0, Math.round((Date.parse(endedAt) - Date.parse(this.startedAt)) / 1000))
      : undefined;
    // Twilio ended the call (not us): either the caller hung up or the time cap hit.
    if (!this.closing && durationSeconds !== undefined && durationSeconds >= this.maxCallSeconds - 2) {
      this.endReason = 'time_limit';
    }
    console.log(`[twilio-media] finalize (${reason}, ended: ${this.endReason}) call=${this.callId}`);

    this.realtime?.close();

    if (this.leadId && this.callId) {
      const snap = this.orchestrator.snapshot();
      await sendPostCall({
        leadId: this.leadId,
        callId: this.callId,
        transcript: this.orchestrator.buildTranscriptText(),
        turns: this.orchestrator.transcript,
        metadata: {
          twilioCallSid: this.twilioCallSid || undefined,
          startedAt: this.startedAt ?? undefined,
          endedAt,
          durationSeconds,
          followUpRequested: snap.followUpRequested,
          endReason: this.endReason,
        },
      });
    } else {
      console.warn('[twilio-media] missing leadId/callId — skipping post-call.');
    }

    try {
      if (this.socket.readyState === 1) this.socket.close();
    } catch {
      /* ignore */
    }
  }
}

/** Fastify wsHandler entrypoint for GET /twilio-media. */
export function handleTwilioMediaStream(socket: WebSocket, req: FastifyRequest): void {
  const ids = readIds(req);
  new TwilioMediaSession(socket, ids);
}
