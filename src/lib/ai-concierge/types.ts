/**
 * Hand-written types for the AI concierge tables.
 *
 * These mirror `supabase/migrations/0001_ai_concierge.sql`. If you later run
 * `supabase gen types typescript`, you can replace this file with the generated
 * output — the table/column names are kept identical on purpose.
 */

export type LeadStatus = 'new' | 'called' | 'completed' | 'failed' | string;

export type CallStatus =
  | 'created'
  | 'queued'
  | 'initiated'
  | 'ringing'
  | 'in-progress'
  | 'completed'
  | 'busy'
  | 'no-answer'
  | 'canceled'
  | 'failed'
  | string;

export type Urgency = 'low' | 'medium' | 'high' | 'unknown';
export type BudgetSignal = 'low' | 'medium' | 'high' | 'unknown';
export type Complexity = 'low' | 'medium' | 'high';

/** Structured output of the post-call summary LLM call. */
export interface ConciergeSummary {
  overview: string;
  business_type: string;
  main_pain_point: string;
  current_workflow: string;
  tools_mentioned: string[];
  urgency: Urgency;
  budget_signal: BudgetSignal;
  recommended_solution: string;
  mvp_scope: string;
  complexity_estimate: Complexity;
  lead_score: number;
  follow_up_requested: boolean;
  suggested_follow_up_message: string;
  internal_notes: string;
}

// NOTE: these are `type` aliases (not `interface`) on purpose. The Supabase
// typed client requires each table's Row/Insert/Update to be assignable to
// `Record<string, unknown>`, which object-literal type aliases satisfy but
// interfaces do not (interfaces have no implicit index signature). Using
// `interface` here makes the client collapse to `never`.
export type LeadRow = {
  id: string;
  name: string | null;
  phone: string;
  email: string | null;
  company: string | null;
  problem_hint: string | null;
  consent: boolean;
  consent_timestamp: string | null;
  consent_ip: string | null;
  consent_user_agent: string | null;
  source: string | null;
  status: LeadStatus | null;
  lead_score: number | null;
  created_at: string;
  updated_at: string;
};

export type CallRow = {
  id: string;
  lead_id: string | null;
  twilio_call_sid: string | null;
  status: CallStatus | null;
  started_at: string | null;
  ended_at: string | null;
  duration_seconds: number | null;
  transcript: string | null;
  summary: string | null;
  recommended_solution: string | null;
  mvp_scope: string | null;
  follow_up_email: string | null;
  internal_notes: string | null;
  raw_summary: ConciergeSummary | null;
  created_at: string;
  updated_at: string;
};

export type CallEventRow = {
  id: string;
  call_id: string | null;
  event_type: string;
  payload: Record<string, unknown> | null;
  created_at: string;
};

type Insert<T> = Partial<T>;
type Update<T> = Partial<T>;

/** Minimal `Database` shape consumed by the typed Supabase client. */
export interface Database {
  public: {
    Tables: {
      leads: {
        Row: LeadRow;
        Insert: Insert<LeadRow>;
        Update: Update<LeadRow>;
        Relationships: [];
      };
      calls: {
        Row: CallRow;
        Insert: Insert<CallRow>;
        Update: Update<CallRow>;
        Relationships: [];
      };
      call_events: {
        Row: CallEventRow;
        Insert: Insert<CallEventRow>;
        Update: Update<CallEventRow>;
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
}
