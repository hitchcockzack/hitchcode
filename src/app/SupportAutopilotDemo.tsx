'use client';

import React, { useMemo, useState } from 'react';
import { cn } from '@/lib/utils';
import { AlertTriangle, CheckCircle2, Clock3, Inbox, MessageSquare, ShieldAlert, Wrench } from 'lucide-react';

type Ticket = {
  id: string;
  subject: string;
  body: string;
  channel: 'email' | 'chat';
  topic: 'shipping' | 'billing' | 'password' | 'bug' | 'account' | 'other';
  sentiment: 'negative' | 'neutral' | 'positive';
  tier: 'vip' | 'standard';
  slaHoursLeft: number;
  orderValue?: number;
};

type Actioned = {
  ticket: Ticket;
  action: 'auto-replied' | 'auto-refunded' | 'updated-shipping' | 'password-reset' | 'escalated' | 'queued';
  note: string;
};

const SAMPLE_TICKETS: Ticket[] = [
  {
    id: 'TKT-1001',
    subject: 'Where is my order? Tracking link?',
    body: 'Placed 7 days ago. No update since Monday.',
    channel: 'email',
    topic: 'shipping',
    sentiment: 'negative',
    tier: 'standard',
    slaHoursLeft: 20,
  },
  {
    id: 'TKT-1002',
    subject: 'Refund request: item arrived damaged',
    body: 'The keyboard arrived with a broken key. Please refund or replace.',
    channel: 'email',
    topic: 'billing',
    sentiment: 'negative',
    tier: 'vip',
    slaHoursLeft: 8,
    orderValue: 89,
  },
  {
    id: 'TKT-1003',
    subject: "Can't login — password reset link not working",
    body: 'Tried twice, the link says expired.',
    channel: 'chat',
    topic: 'password',
    sentiment: 'negative',
    tier: 'standard',
    slaHoursLeft: 30,
  },
  {
    id: 'TKT-1004',
    subject: 'Dashboard error: 500 on analytics tab',
    body: 'Happening for multiple teammates.',
    channel: 'email',
    topic: 'bug',
    sentiment: 'negative',
    tier: 'vip',
    slaHoursLeft: 3,
  },
  {
    id: 'TKT-1005',
    subject: 'Update billing address',
    body: 'We moved offices and need to update the billing address on file.',
    channel: 'email',
    topic: 'account',
    sentiment: 'neutral',
    tier: 'standard',
    slaHoursLeft: 24,
  },
  {
    id: 'TKT-1006',
    subject: 'Upgrade plan & add SSO',
    body: 'What is required to enable SSO and upgrade to Business tier?',
    channel: 'chat',
    topic: 'other',
    sentiment: 'positive',
    tier: 'vip',
    slaHoursLeft: 36,
  },
];

export default function SupportAutopilotDemo() {
  const [autoResolveFAQs, setAutoResolveFAQs] = useState(true);
  const [autoRefundMax, setAutoRefundMax] = useState(100);
  const [alwaysEscalateVIPBugs, setAlwaysEscalateVIPBugs] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [results, setResults] = useState<Actioned[]>([]);
  const [processingIndex, setProcessingIndex] = useState<number>(-1);
  const [phase, setPhase] = useState<'idle' | 'intake' | 'categorize' | 'execute' | 'done'>('idle');

  const total = SAMPLE_TICKETS.length;
  const resolvedCount = results.filter(r => ['auto-replied','auto-refunded','updated-shipping','password-reset'].includes(r.action)).length;
  const escalatedCount = results.filter(r => r.action === 'escalated').length;
  const queuedCount = results.filter(r => r.action === 'queued').length;

  const timeSavedMinutes = resolvedCount * 6; // assume 6 minutes saved per auto-resolve

  function triageTicket(t: Ticket): Actioned {
    // Password issues
    if (autoResolveFAQs && t.topic === 'password') {
      return { ticket: t, action: 'password-reset', note: 'Sent secure password reset and invalidated previous token.' };
    }
    // Shipping status
    if (autoResolveFAQs && t.topic === 'shipping') {
      return { ticket: t, action: 'updated-shipping', note: 'Fetched tracking and sent status ETA. Subscribed customer to updates.' };
    }
    // Small refunds
    if (t.topic === 'billing' && (t.orderValue ?? 0) > 0 && (t.orderValue ?? 0) <= autoRefundMax) {
      return { ticket: t, action: 'auto-refunded', note: `Issued refund of $${t.orderValue}. Notified customer and finance.` };
    }
    // Critical VIP bug or near‑SLA
    if (t.topic === 'bug' && (t.tier === 'vip' || t.slaHoursLeft <= 4) && alwaysEscalateVIPBugs) {
      return { ticket: t, action: 'escalated', note: 'Opened Jira P1 and paged on‑call with context and user repro.' };
    }
    // Account updates and other
    if (autoResolveFAQs && (t.topic === 'account' || t.topic === 'other')) {
      return { ticket: t, action: 'auto-replied', note: 'Provided step‑by‑step instructions and relevant links.' };
    }
    return { ticket: t, action: 'queued', note: 'Left in queue for human review.' };
  }

  const handleRun = async () => {
    setProcessing(true);
    setResults([]);
    setPhase('intake');
    // short staged reveal to make process explicit
    await new Promise(r => setTimeout(r, 200));
    setPhase('categorize');
    await new Promise(r => setTimeout(r, 200));
    setPhase('execute');
    // Simulate progressive processing
    for (let i = 0; i < SAMPLE_TICKETS.length; i++) {
      setProcessingIndex(i);
      const actioned = triageTicket(SAMPLE_TICKETS[i]);
      setResults(prev => [...prev, actioned]);
      // eslint-disable-next-line no-await-in-loop
      await new Promise(r => setTimeout(r, 250));
    }
    setProcessing(false);
    setProcessingIndex(-1);
    setPhase('done');
  };

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="mb-4">
        <div className="flex items-center gap-3 text-xs md:text-sm text-zinc-400">
          <span className={cn('px-2 py-1 rounded-md border', phase!=='idle' ? 'border-zinc-700 bg-zinc-900 text-zinc-200' : 'border-zinc-800')}>1 · Intake</span>
          <span className={cn('px-2 py-1 rounded-md border', ['categorize','execute','done'].includes(phase) ? 'border-zinc-700 bg-zinc-900 text-zinc-200' : 'border-zinc-800')}>2 · Categorize</span>
          <span className={cn('px-2 py-1 rounded-md border', ['execute','done'].includes(phase) ? 'border-zinc-700 bg-zinc-900 text-zinc-200' : 'border-zinc-800')}>3 · Apply Playbooks</span>
          <span className={cn('px-2 py-1 rounded-md border', phase==='done' ? 'border-zinc-700 bg-zinc-900 text-zinc-200' : 'border-zinc-800')}>4 · Log & Metrics</span>
        </div>
        <div className="mt-3 h-2 w-full bg-zinc-900 rounded-full border border-zinc-800 overflow-hidden">
          <div className="h-full bg-gradient-to-r from-blue-600 to-fuchsia-600 transition-all" style={{ width: `${(results.length/total)*100}%` }} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
      <div className="md:col-span-2 bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6">
        <div className="flex items-center gap-2 text-zinc-300 font-semibold mb-4">
          <Wrench className="h-5 w-5 text-blue-400" aria-hidden /> Configure triage rules
        </div>
        <div className="space-y-5">
          <label className="flex items-center justify-between gap-4 text-sm text-zinc-300">
            <span>Auto‑resolve FAQs (password, shipping, account)</span>
            <input type="checkbox" className="accent-blue-500" checked={autoResolveFAQs} onChange={(e)=>setAutoResolveFAQs(e.target.checked)} />
          </label>
          <div className="text-sm text-zinc-300">
            <div className="flex items-center justify-between">
              <span>Auto‑refund up to</span>
              <span className="font-semibold text-zinc-100">{`$${autoRefundMax}`}</span>
            </div>
            <input aria-label="Auto refund max" className="w-full mt-2" type="range" min={0} max={250} value={autoRefundMax} onChange={(e)=>setAutoRefundMax(parseInt(e.target.value))} />
          </div>
          <label className="flex items-center justify-between gap-4 text-sm text-zinc-300">
            <span>Always escalate VIP bugs / near‑SLA</span>
            <input type="checkbox" className="accent-blue-500" checked={alwaysEscalateVIPBugs} onChange={(e)=>setAlwaysEscalateVIPBugs(e.target.checked)} />
          </label>
        </div>

        <button
          onClick={handleRun}
          disabled={processing}
          className={cn(
            'mt-6 w-full relative inline-flex items-center justify-center p-[3px] rounded-full group',
            processing ? 'opacity-70 cursor-not-allowed' : 'cursor-pointer'
          )}
        >
          <span className="absolute inset-0 rounded-full bg-gradient-to-r from-[#2563eb] to-[#a21caf]" />
          <span className="px-6 py-3 bg-black rounded-full text-white text-sm font-semibold relative transition-colors duration-200 group-hover:bg-transparent">
            {processing ? 'Processing…' : 'Run Triage'}
          </span>
        </button>

        <div className="mt-6 grid grid-cols-3 gap-3">
          <div className="text-center">
            <div className="text-2xl md:text-3xl font-bold text-zinc-100">{resolvedCount}</div>
            <div className="text-zinc-400 text-xs">Auto‑resolved</div>
          </div>
          <div className="text-center">
            <div className="text-2xl md:text-3xl font-bold text-zinc-100">{escalatedCount}</div>
            <div className="text-zinc-400 text-xs">Escalated</div>
          </div>
          <div className="text-center">
            <div className="text-2xl md:text-3xl font-bold text-zinc-100">{timeSavedMinutes}m</div>
            <div className="text-zinc-400 text-xs">Time saved</div>
          </div>
        </div>
      </div>
      </div>

      <div className="md:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 max-h-[520px] overflow-auto">
          <div className="flex items-center gap-2 text-zinc-300 font-semibold mb-3">
            <Inbox className="h-5 w-5 text-blue-400" aria-hidden /> Incoming
          </div>
          <div className="space-y-3">
            {SAMPLE_TICKETS.map((t, i) => (
              <div key={t.id} className={cn("rounded-xl border bg-zinc-950/60 p-4 break-words", processingIndex===i ? 'border-blue-400/50' : 'border-zinc-800') }>
                <div className="flex items-center justify-between gap-3">
                  <div className="text-zinc-100 font-medium leading-snug">{t.subject}</div>
                  <span className={cn('shrink-0 text-xs px-2 py-0.5 rounded-full', t.tier==='vip' ? 'bg-purple-500/20 text-purple-200 border border-purple-400/30' : 'bg-zinc-800 text-zinc-300 border border-zinc-700')}>{t.tier.toUpperCase()}</span>
                </div>
                <div className="text-zinc-300/90 text-sm mt-1 whitespace-normal break-words leading-relaxed">{t.body}</div>
                <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-zinc-400">
                  <span className="inline-flex items-center gap-1"><MessageSquare className="h-3.5 w-3.5" /> {t.channel}</span>
                  <span className="inline-flex items-center gap-1"><Clock3 className="h-3.5 w-3.5" /> {t.slaHoursLeft}h SLA</span>
                  <span className="inline-flex items-center gap-1"><AlertTriangle className="h-3.5 w-3.5" /> {t.topic}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 max-h-[520px] overflow-auto">
          <div className="flex items-center gap-2 text-zinc-300 font-semibold mb-3">
            <CheckCircle2 className="h-5 w-5 text-green-400" aria-hidden /> Actions
          </div>
          <div className="space-y-3 min-h-[280px]">
            {results.filter(r => ['auto-replied','auto-refunded','updated-shipping','password-reset'].includes(r.action)).map(r => (
              <div key={r.ticket.id} className="rounded-xl border border-zinc-800 bg-zinc-950/60 p-4">
                <div className="flex items-center justify-between gap-3">
                  <div className="text-zinc-100 font-medium leading-snug">{r.ticket.subject}</div>
                  <span className={cn('text-xs px-2 py-0.5 rounded-full border',
                    r.action==='auto-refunded' ? 'bg-emerald-500/20 text-emerald-200 border-emerald-400/30' :
                    r.action==='updated-shipping' ? 'bg-cyan-500/20 text-cyan-200 border-cyan-400/30' :
                    r.action==='password-reset' ? 'bg-blue-500/20 text-blue-200 border-blue-400/30' : 'bg-zinc-800 text-zinc-300 border-zinc-700'
                  )}>
                    Resolved
                  </span>
                </div>
                <div className="mt-1 text-xs text-zinc-300/90 leading-relaxed break-words">{r.note}</div>
              </div>
            ))}
            {results.length === 0 && (
              <div className="text-zinc-500 text-sm">Run triage to see automated actions.</div>
            )}
          </div>
        </div>

        <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 max-h-[520px] overflow-auto">
          <div className="flex items-center gap-2 text-zinc-300 font-semibold mb-3">
            <ShieldAlert className="h-5 w-5 text-pink-400" aria-hidden /> Escalations
          </div>
          <div className="space-y-3 min-h-[280px]">
            {results.filter(r => r.action === 'escalated').map(r => (
              <div key={r.ticket.id} className="rounded-xl border border-zinc-800 bg-zinc-950/60 p-4">
                <div className="flex items-center justify-between gap-3">
                  <div className="text-zinc-100 font-medium leading-snug">{r.ticket.subject}</div>
                  <span className="text-xs px-2 py-0.5 rounded-full border bg-pink-500/20 text-pink-200 border-pink-400/30">Escalated</span>
                </div>
                <div className="mt-1 text-xs text-zinc-300/90 leading-relaxed break-words">{r.note}</div>
              </div>
            ))}
            {results.filter(r => r.action === 'escalated').length === 0 && (
              <div className="text-zinc-500 text-sm">No escalations yet.</div>
            )}
          </div>
        </div>
      </div>

      {/* Close outer grid (controls + streams) before legend */}

      <div className="mt-6 grid grid-cols-1 md:grid-cols-5 gap-6">
        <div className="md:col-span-2 bg-zinc-900/40 border border-zinc-800 rounded-2xl p-5">
          <div className="text-zinc-300 font-semibold mb-3">Playbooks</div>
          <ul className="grid grid-cols-1 gap-2 text-sm text-zinc-300">
            <li className="flex items-center justify-between"><span>Password issues</span><span className="text-blue-300">Password reset</span></li>
            <li className="flex items-center justify-between"><span>Shipping status</span><span className="text-cyan-300">Updated shipping</span></li>
            <li className="flex items-center justify-between"><span>{`Refunds ≤ $${autoRefundMax}`}</span><span className="text-emerald-300">Auto‑refund</span></li>
            <li className="flex items-center justify-between"><span>VIP bugs / near SLA</span><span className="text-pink-300">Escalate P1</span></li>
            <li className="flex items-center justify-between"><span>Account / Other</span><span className="text-zinc-300">Helpful reply</span></li>
          </ul>
        </div>
        <div className="md:col-span-3 bg-zinc-900/40 border border-zinc-800 rounded-2xl p-5">
          <div className="text-zinc-300 font-semibold mb-3">What happens when you press Triage</div>
          <ol className="list-decimal list-inside space-y-1 text-sm text-zinc-300">
            <li>Pulls tickets from inbox and normalizes content</li>
            <li>Classifies topic, tier, sentiment, and SLA risk</li>
            <li>Applies matching playbook with guardrails</li>
            <li>Logs actions and updates metrics</li>
          </ol>
        </div>
      </div>
    </div>
  );
}
