import { z } from 'zod';

/** Payload from the public concierge form -> /api/ai-concierge/start-call */
export const startCallSchema = z.object({
  name: z.string().trim().min(1, 'Name is required').max(120),
  phone: z.string().trim().min(7, 'A valid phone number is required').max(40),
  company: z.string().trim().max(160).optional().or(z.literal('')),
  problemHint: z.string().trim().max(2000).optional().or(z.literal('')),
  email: z.string().trim().email('A valid email is required').max(160),
  consent: z.literal(true, { message: 'Consent is required to place the call' }),
  // Optional client-provided context.
  sourcePath: z.string().trim().max(512).optional(),
});

export type StartCallInput = z.infer<typeof startCallSchema>;

const urgency = z.enum(['low', 'medium', 'high', 'unknown']);
const budget = z.enum(['low', 'medium', 'high', 'unknown']);
const complexity = z.enum(['low', 'medium', 'high']);

/**
 * Structured summary returned by the LLM (and persisted to `calls`).
 *
 * Every field uses `.catch()` so a sparse/empty transcript or a slightly
 * off-spec model response can never throw (which previously 500'd the
 * post-call route). lead_score is coerced + clamped to 0–100 rather than a
 * strict 1–100 min that an empty call would violate.
 */
export const conciergeSummarySchema = z.object({
  overview: z.string().catch(''),
  business_type: z.string().catch(''),
  main_pain_point: z.string().catch(''),
  current_workflow: z.string().catch(''),
  tools_mentioned: z.array(z.string()).catch([]),
  urgency: urgency.catch('unknown'),
  budget_signal: budget.catch('unknown'),
  recommended_solution: z.string().catch(''),
  mvp_scope: z.string().catch(''),
  complexity_estimate: complexity.catch('medium'),
  lead_score: z
    .coerce.number()
    .catch(0)
    .transform((n) => Math.max(0, Math.min(100, Math.round(n)))),
  follow_up_requested: z.boolean().catch(false),
  suggested_follow_up_message: z.string().catch(''),
  internal_notes: z.string().catch(''),
});

/** A single transcript turn captured during the live call. */
export const transcriptTurnSchema = z.object({
  role: z.enum(['assistant', 'user', 'system']),
  text: z.string(),
  at: z.string().optional(),
});

/** Payload from the voice-server -> /api/ai-concierge/post-call-summary */
export const postCallSchema = z.object({
  leadId: z.string().uuid(),
  callId: z.string().uuid(),
  // Accept either a single transcript string or structured turns.
  transcript: z.string().optional(),
  turns: z.array(transcriptTurnSchema).optional(),
  metadata: z
    .object({
      twilioCallSid: z.string().optional(),
      startedAt: z.string().optional(),
      endedAt: z.string().optional(),
      durationSeconds: z.number().optional(),
      followUpRequested: z.boolean().optional(),
      endReason: z.string().max(64).optional(),
      collectedFields: z.record(z.string(), z.unknown()).optional(),
    })
    .optional(),
});

export type PostCallInput = z.infer<typeof postCallSchema>;
export type TranscriptTurn = z.infer<typeof transcriptTurnSchema>;
