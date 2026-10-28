-- AI Concierge demo schema
-- Apply via the Supabase SQL editor or `supabase db push`.
-- Safe to run multiple times (idempotent: create-if-not-exists + guarded index/trigger creation).

-- Required for gen_random_uuid()
create extension if not exists "pgcrypto";

-- ─────────────────────────────────────────────────────────────
-- leads: one row per person who requested a concierge call
-- ─────────────────────────────────────────────────────────────
create table if not exists leads (
  id uuid primary key default gen_random_uuid(),
  name text,
  phone text not null,
  email text,
  company text,
  problem_hint text,
  consent boolean not null default false,
  consent_timestamp timestamptz,
  consent_ip text,
  consent_user_agent text,
  source text default 'ai_concierge_demo',
  status text default 'new',
  lead_score int,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- ─────────────────────────────────────────────────────────────
-- calls: one row per outbound call attempt for a lead
-- ─────────────────────────────────────────────────────────────
create table if not exists calls (
  id uuid primary key default gen_random_uuid(),
  lead_id uuid references leads(id) on delete cascade,
  twilio_call_sid text,
  status text default 'created',
  started_at timestamptz,
  ended_at timestamptz,
  duration_seconds int,
  transcript text,
  summary text,
  recommended_solution text,
  mvp_scope text,
  follow_up_email text,
  internal_notes text,
  raw_summary jsonb,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- ─────────────────────────────────────────────────────────────
-- call_events: append-only audit log (twilio status, ws lifecycle, etc.)
-- ─────────────────────────────────────────────────────────────
create table if not exists call_events (
  id uuid primary key default gen_random_uuid(),
  call_id uuid references calls(id) on delete cascade,
  event_type text not null,
  payload jsonb,
  created_at timestamptz default now()
);

-- ─────────────────────────────────────────────────────────────
-- Indexes
-- ─────────────────────────────────────────────────────────────
create index if not exists leads_phone_idx on leads (phone);
create index if not exists leads_created_at_idx on leads (created_at desc);
create index if not exists calls_lead_id_idx on calls (lead_id);
create index if not exists calls_twilio_call_sid_idx on calls (twilio_call_sid);
create index if not exists call_events_call_id_idx on call_events (call_id);

-- ─────────────────────────────────────────────────────────────
-- updated_at maintenance
-- ─────────────────────────────────────────────────────────────
create or replace function set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists leads_set_updated_at on leads;
create trigger leads_set_updated_at
  before update on leads
  for each row execute function set_updated_at();

drop trigger if exists calls_set_updated_at on calls;
create trigger calls_set_updated_at
  before update on calls
  for each row execute function set_updated_at();

-- ─────────────────────────────────────────────────────────────
-- Row Level Security
-- These tables are only ever touched by server-side code using the
-- service-role key (which bypasses RLS). We enable RLS and add NO
-- public policies so the anon/public key cannot read or write them.
-- ─────────────────────────────────────────────────────────────
alter table leads enable row level security;
alter table calls enable row level security;
alter table call_events enable row level security;
