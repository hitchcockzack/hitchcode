import { getEnv } from '@/lib/ai-concierge/env';

// Pushover rejects longer fields.
const MAX_TITLE = 250;
const MAX_MESSAGE = 1024;

/**
 * Best-effort Pushover notification to the site operator. Never throws, so a
 * notification problem can't fail the call flow that triggered it.
 */
export async function sendPush(params: {
  title: string;
  message: string;
}): Promise<{ ok: boolean; error?: string }> {
  const token = getEnv('PUSHOVER_TOKEN');
  const user = getEnv('PUSHOVER_USER');
  if (!token || !user) return { ok: false, error: 'Pushover not configured' };

  try {
    const res = await fetch('https://api.pushover.net/1/messages.json', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        token,
        user,
        title: params.title.slice(0, MAX_TITLE),
        message: params.message.slice(0, MAX_MESSAGE),
      }),
      signal: AbortSignal.timeout(10_000),
    });
    return res.ok ? { ok: true } : { ok: false, error: `Pushover returned ${res.status}` };
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : 'push failed' };
  }
}
