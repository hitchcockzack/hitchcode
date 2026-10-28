import { env } from '@/lib/ai-concierge/env'
import { getSupabaseAdmin } from '@/lib/supabase/admin'
import type { CallRow, LeadRow } from '@/lib/ai-concierge/types'

// Always render fresh; never statically cache lead data.
export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

/**
 * TODO(auth): This page is protected only by a shared token in the URL
 * (?key=...) compared against ADMIN_DASHBOARD_TOKEN. The project currently has
 * no auth system. Replace this with real authentication before relying on it
 * for anything sensitive.
 */

type LeadWithCalls = LeadRow & { calls: CallRow[] }

function Gate({ message }: { message: string }) {
  return (
    <main className="min-h-screen bg-stone-950 text-stone-300 flex items-center justify-center px-6">
      <div className="max-w-md text-center">
        <h1 className="text-2xl font-semibold text-stone-100">AI Concierge Admin</h1>
        <p className="mt-3 text-stone-500">{message}</p>
        <p className="mt-6 text-xs text-stone-600">
          Append <code className="text-[#D4A574]">?key=YOUR_TOKEN</code> to the URL. The token is set
          via the <code className="text-[#D4A574]">ADMIN_DASHBOARD_TOKEN</code> environment variable.
        </p>
      </div>
    </main>
  )
}

function statusColor(status: string | null): string {
  switch (status) {
    case 'completed':
      return 'text-emerald-300 border-emerald-500/30 bg-emerald-500/10'
    case 'failed':
    case 'no-answer':
    case 'busy':
    case 'canceled':
      return 'text-red-300 border-red-500/30 bg-red-500/10'
    case 'in-progress':
    case 'ringing':
    case 'queued':
      return 'text-[#D4A574] border-[#D4A574]/30 bg-[#D4A574]/10'
    default:
      return 'text-stone-400 border-stone-700/40 bg-stone-900/40'
  }
}

function scoreColor(score: number | null): string {
  if (score == null) return 'text-stone-500'
  if (score >= 70) return 'text-emerald-300'
  if (score >= 40) return 'text-[#D4A574]'
  return 'text-stone-400'
}

export default async function AdminConciergePage({
  searchParams,
}: {
  searchParams: Promise<{ key?: string }>
}) {
  const token = env.adminDashboardToken()
  if (!token) {
    return <Gate message="This dashboard is locked. Set ADMIN_DASHBOARD_TOKEN to enable it." />
  }

  const { key } = await searchParams
  if (key !== token) {
    return <Gate message="Unauthorized. The provided key does not match." />
  }

  let leads: LeadWithCalls[] = []
  let loadError: string | null = null
  try {
    const supabase = getSupabaseAdmin()
    const { data, error } = await supabase
      .from('leads')
      .select('*, calls(*)')
      .order('created_at', { ascending: false })
      .limit(50)
    if (error) throw new Error(error.message)
    leads = (data ?? []) as unknown as LeadWithCalls[]
  } catch (err) {
    loadError = err instanceof Error ? err.message : 'Failed to load leads'
  }

  return (
    <main className="min-h-screen bg-stone-950 text-stone-300 px-4 sm:px-6 md:px-10 py-12">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-[10px] tracking-[0.2em] uppercase font-medium text-stone-500">
              Hitchcode · Internal
            </p>
            <h1 className="mt-2 text-2xl md:text-3xl font-semibold text-stone-100">
              AI Concierge Leads
            </h1>
          </div>
          <p className="text-sm text-stone-500">{leads.length} recent lead(s)</p>
        </div>

        {loadError && (
          <div className="mt-8 rounded-xl border border-red-500/40 bg-red-950/20 p-4 text-sm text-red-300">
            {loadError}
          </div>
        )}

        <div className="mt-8 space-y-4">
          {leads.length === 0 && !loadError && (
            <div className="rounded-2xl border border-stone-800/40 bg-stone-900/30 p-8 text-center text-stone-500">
              No leads yet.
            </div>
          )}

          {leads.map((lead) => {
            const latestCall = [...(lead.calls ?? [])].sort(
              (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
            )[0]
            const transcript = latestCall?.transcript
            const summary = latestCall?.summary

            return (
              <div
                key={lead.id}
                className="rounded-2xl border border-stone-800/40 bg-stone-950/60 p-5 md:p-6"
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-3">
                      <h2 className="text-lg font-semibold text-stone-100 truncate">
                        {lead.name || lead.company || 'Unknown'}
                      </h2>
                      {lead.company && lead.name && (
                        <span className="text-sm text-stone-500">· {lead.company}</span>
                      )}
                      <span
                        className={`rounded-full border px-2.5 py-0.5 text-xs ${statusColor(
                          latestCall?.status ?? lead.status,
                        )}`}
                      >
                        {latestCall?.status ?? lead.status ?? 'new'}
                      </span>
                    </div>
                    <div className="mt-1.5 flex flex-wrap gap-x-4 gap-y-1 text-sm text-stone-500">
                      <a href={`tel:${lead.phone}`} className="hover:text-stone-300">
                        {lead.phone}
                      </a>
                      {lead.email && <span>{lead.email}</span>}
                      <span>{new Date(lead.created_at).toLocaleString()}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] uppercase tracking-wider text-stone-600">Lead score</p>
                    <p className={`text-2xl font-semibold ${scoreColor(lead.lead_score)}`}>
                      {lead.lead_score ?? '—'}
                    </p>
                  </div>
                </div>

                {lead.problem_hint && (
                  <p className="mt-3 text-sm text-stone-400">
                    <span className="text-stone-600">Wants to automate: </span>
                    {lead.problem_hint}
                  </p>
                )}

                {summary && (
                  <div className="mt-4 rounded-xl border border-stone-800/40 bg-stone-900/30 p-4">
                    <p className="text-xs uppercase tracking-wider text-[#D4A574]">Summary</p>
                    <p className="mt-1.5 text-sm text-stone-300 leading-relaxed">{summary}</p>
                    {latestCall?.recommended_solution && (
                      <p className="mt-2 text-sm text-stone-400">
                        <span className="text-stone-600">Recommended: </span>
                        {latestCall.recommended_solution}
                      </p>
                    )}
                  </div>
                )}

                {transcript && (
                  <details className="mt-3 group">
                    <summary className="cursor-pointer text-sm text-stone-500 hover:text-stone-300 select-none">
                      View transcript
                    </summary>
                    <pre className="mt-2 max-h-80 overflow-auto whitespace-pre-wrap rounded-xl border border-stone-800/40 bg-stone-950 p-4 text-xs text-stone-400">
                      {transcript}
                    </pre>
                  </details>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </main>
  )
}
