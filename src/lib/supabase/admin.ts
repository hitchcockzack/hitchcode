import { createClient, type SupabaseClient } from '@supabase/supabase-js';

import { env } from '@/lib/ai-concierge/env';
import type { Database } from '@/lib/ai-concierge/types';

/**
 * Server-only Supabase client using the service-role key.
 *
 * This bypasses RLS and must NEVER be imported into a client component or
 * shipped to the browser. Use only inside route handlers / server actions.
 */
let cached: SupabaseClient<Database> | null = null;

export function getSupabaseAdmin(): SupabaseClient<Database> {
  if (cached) return cached;

  cached = createClient<Database>(env.supabaseUrl(), env.supabaseServiceRoleKey(), {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });

  return cached;
}
