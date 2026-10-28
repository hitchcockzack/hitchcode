import { env } from '@/lib/ai-concierge/env';
import { POST_CALL_SUMMARY_PROMPT } from '@/lib/ai-concierge/prompts';
import { conciergeSummarySchema } from '@/lib/ai-concierge/schemas';
import type { ConciergeSummary } from '@/lib/ai-concierge/types';

/**
 * Provider-agnostic summary generation.
 *
 * The route depends only on `generateSummary`. Swap providers by implementing
 * this interface and changing `getSummaryProvider()` — nothing else changes.
 */
export interface SummaryProvider {
  generateSummary(transcript: string): Promise<ConciergeSummary>;
}

class OpenAISummaryProvider implements SummaryProvider {
  async generateSummary(transcript: string): Promise<ConciergeSummary> {
    const res = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${env.openaiApiKey()}`,
      },
      body: JSON.stringify({
        model: env.openaiSummaryModel(),
        temperature: 0.2,
        response_format: { type: 'json_object' },
        messages: [
          { role: 'system', content: POST_CALL_SUMMARY_PROMPT },
          {
            role: 'user',
            content: `Call transcript:\n\n${transcript}`,
          },
        ],
      }),
    });

    if (!res.ok) {
      const detail = await res.text().catch(() => '');
      throw new Error(`OpenAI summary request failed (${res.status}): ${detail.slice(0, 500)}`);
    }

    const data = (await res.json()) as {
      choices?: Array<{ message?: { content?: string } }>;
    };
    const content = data.choices?.[0]?.message?.content ?? '{}';

    let parsedJson: unknown;
    try {
      parsedJson = JSON.parse(content);
    } catch {
      throw new Error('OpenAI summary response was not valid JSON');
    }

    // Coerce/validate into our shape. Every field has a `.catch()` fallback, so
    // even an unexpected/empty payload yields a valid summary instead of throwing.
    const result = conciergeSummarySchema.safeParse(parsedJson);
    return result.success ? result.data : conciergeSummarySchema.parse({});
  }
}

let provider: SummaryProvider | null = null;

export function getSummaryProvider(): SummaryProvider {
  if (!provider) {
    provider = new OpenAISummaryProvider();
  }
  return provider;
}
