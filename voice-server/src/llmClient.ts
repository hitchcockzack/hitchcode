import { config } from './config.js';

export interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

/**
 * Provider-agnostic conversation LLM.
 *
 * NOTE: Not used in the live realtime loop (OpenAI Realtime handles reasoning +
 * speech). Retained for an optional text/cascade pipeline and easy provider swaps.
 *
 * The orchestrator depends only on this interface. To swap providers (Groq,
 * Anthropic, a local model, OpenAI Realtime, etc.), implement `LLMClient` and
 * change `createLLMClient()` — nothing upstream changes.
 */
export interface LLMClient {
  /** Single-shot completion used per conversational turn. */
  complete(messages: ChatMessage[], opts?: { maxTokens?: number; temperature?: number }): Promise<string>;
}

class OpenAILLMClient implements LLMClient {
  async complete(
    messages: ChatMessage[],
    opts: { maxTokens?: number; temperature?: number } = {},
  ): Promise<string> {
    if (!config.openai.apiKey) {
      // Stubbed fallback so the call still progresses without a key configured.
      return "I'm the Hitchcode AI concierge. (LLM is not configured yet — set OPENAI_API_KEY.)";
    }

    const res = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${config.openai.apiKey}`,
      },
      body: JSON.stringify({
        model: config.openai.liveModel,
        temperature: opts.temperature ?? 0.6,
        max_tokens: opts.maxTokens ?? 120,
        messages,
      }),
    });

    if (!res.ok) {
      const detail = await res.text().catch(() => '');
      throw new Error(`LLM completion failed (${res.status}): ${detail.slice(0, 300)}`);
    }

    const data = (await res.json()) as {
      choices?: Array<{ message?: { content?: string } }>;
    };
    return data.choices?.[0]?.message?.content?.trim() ?? '';
  }

  // TODO(realtime): add a streaming variant (SSE) and pipe token deltas into
  // sentence-chunked TTS for lower latency. Kept single-shot for clarity here.
}

export function createLLMClient(): LLMClient {
  return new OpenAILLMClient();
}
