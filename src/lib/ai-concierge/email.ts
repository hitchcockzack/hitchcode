import { Resend } from 'resend';

import { env } from '@/lib/ai-concierge/env';
import type { EmailContent } from '@/lib/ai-concierge/emailTemplates';

let cached: Resend | null = null;

function getResend(): Resend {
  if (!cached) {
    cached = new Resend(env.resendApiKey());
  }
  return cached;
}

export async function sendEmail(params: {
  to: string | string[];
  content: EmailContent;
  replyTo?: string;
}): Promise<{ ok: boolean; id?: string; error?: string }> {
  try {
    const { data, error } = await getResend().emails.send({
      from: env.fromEmail(),
      to: params.to,
      subject: params.content.subject,
      html: params.content.html,
      text: params.content.text,
      ...(params.replyTo ? { replyTo: params.replyTo } : {}),
    });

    if (error) {
      return { ok: false, error: error.message };
    }
    return { ok: true, id: data?.id };
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : 'send failed' };
  }
}
