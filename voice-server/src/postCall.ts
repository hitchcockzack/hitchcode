import { config } from './config.js';
import type { TranscriptTurn } from './conversationOrchestrator.js';

export interface PostCallPayload {
  leadId: string;
  callId: string;
  transcript: string;
  turns?: TranscriptTurn[];
  metadata?: {
    twilioCallSid?: string;
    startedAt?: string;
    endedAt?: string;
    durationSeconds?: number;
    followUpRequested?: boolean;
    /** Why the call ended, e.g. "completed", "voicemail", "caller_hung_up", "time_limit". */
    endReason?: string;
  };
}

/**
 * Notify the Next.js app that a call has ended. The app generates the summary,
 * stores it, and emails the recap. Authenticated with the shared secret.
 */
export async function sendPostCall(
  payload: PostCallPayload,
): Promise<{ ok: boolean; status: number; body?: unknown }> {
  try {
    const res = await fetch(config.postCallUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(config.postCallSharedSecret
          ? { 'x-internal-secret': config.postCallSharedSecret }
          : {}),
      },
      body: JSON.stringify(payload),
    });

    let body: unknown;
    try {
      body = await res.json();
    } catch {
      body = undefined;
    }

    if (!res.ok) {
      console.error(`[postCall] ${config.postCallUrl} -> ${res.status}`, body);
    }
    return { ok: res.ok, status: res.status, body };
  } catch (err) {
    console.error('[postCall] request failed:', err);
    return { ok: false, status: 0 };
  }
}
