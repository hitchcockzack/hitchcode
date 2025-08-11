'use client';

import React, { useMemo, useState } from 'react';
import { cn } from '@/lib/utils';
import { CheckCircle2, Mail, Send, Sparkles, Users } from 'lucide-react';

type Persona = 'founder' | 'revops' | 'marketing';
type Channel = 'email' | 'linkedin';

const SAMPLE_PROSPECTS = [
  { name: 'Ava Thompson', company: 'Northstar Labs', title: 'Founder', signal: 'Hiring SDRs' },
  { name: 'Marco Ruiz', company: 'Fleetly', title: 'Head of RevOps', signal: 'Manual lead routing' },
  { name: 'Jin Park', company: 'StoryForge', title: 'VP Marketing', signal: 'Launching new PLG tier' },
  { name: 'Leah Kim', company: 'ParcelPath', title: 'Founder', signal: 'Scaling outbound' },
];

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="text-center">
      <div className="text-2xl md:text-3xl font-bold text-zinc-100 mb-1">{value}</div>
      <div className="text-zinc-400 text-sm">{label}</div>
    </div>
  );
}

export default function OutboundEngineDemo() {
  const [persona, setPersona] = useState<Persona>('founder');
  const [channel, setChannel] = useState<Channel>('email');
  const [tone, setTone] = useState<'direct' | 'friendly' | 'analytical'>('direct');
  const [includeCaseStudy, setIncludeCaseStudy] = useState(true);
  const [includeMcp, setIncludeMcp] = useState(true);

  const sampleCopy = useMemo(() => {
    const who = persona === 'founder' ? 'a founder' : persona === 'revops' ? 'RevOps lead' : 'marketing lead';
    const opener = tone === 'direct'
      ? `Saw you're ${persona === 'founder' ? 'hiring for outbound' : 'moving leads manually'} — we can 3x replies with safe AI personalization.`
      : tone === 'friendly'
      ? `Noticed you're ${persona === 'founder' ? 'spinning up outbound' : 'juggling lead flow'} — I build fast, friendly outreach that actually gets replies.`
      : `Based on public signals, your team may be losing pipeline to non‑personalized outreach and routing inefficiencies.`;
    const mcp = includeMcp ? ' with MCP‑style connectors so guardrails and data access stay within your rules' : '';
    const cs = includeCaseStudy ? ' Shipped a similar system that booked 38 meetings in 21 days (no spam, all opted‑in).' : '';
    const action = channel === 'email' ? 'If useful, I can show a live 5‑min run this week.' : 'Happy to send a 30‑sec loom; want a peek?';
    return `${opener}\n\nI build an outbound engine that:\n• auto‑personalizes from LinkedIn/CRM signals\n• enforces deliverability & compliance${mcp}\n• routes positive replies straight to your calendar.\n\n${action}${cs}`;
  }, [persona, tone, includeCaseStudy, includeMcp, channel]);

  const stats = [
    { label: 'Personalized per hour', value: '120+' },
    { label: 'Avg reply lift', value: '3–5x' },
    { label: 'Setup time', value: '48 hrs' },
  ];

  return (
    <div className="w-full max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-6">
      {/* Controls – mirrors brand surfaces/borders */}
      <div className="md:col-span-2 bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6">
        <div className="flex items-center gap-2 text-zinc-300 font-semibold mb-4">
          <Sparkles className="h-5 w-5 text-blue-400" aria-hidden /> Configure outreach
        </div>
        <div className="space-y-5">
          {/* Persona */}
          <div>
            <div className="text-sm text-zinc-400 mb-2">Persona</div>
            <div className="inline-flex items-center rounded-lg p-1 bg-zinc-900/60 border border-zinc-800">
              {(['founder','revops','marketing'] as const).map((p)=> (
                <button key={p} onClick={()=>setPersona(p)} className={cn("px-3 py-1.5 rounded-md text-xs font-medium transition-all", persona===p? 'bg-zinc-800 text-zinc-100':'text-zinc-400 hover:text-zinc-200')}>{p}</button>
              ))}
            </div>
          </div>

          {/* Channel */}
          <div>
            <div className="text-sm text-zinc-400 mb-2">Channel</div>
            <div className="inline-flex items-center rounded-lg p-1 bg-zinc-900/60 border border-zinc-800">
              {(['email','linkedin'] as const).map((c)=> (
                <button key={c} onClick={()=>setChannel(c)} className={cn("px-3 py-1.5 rounded-md text-xs font-medium transition-all", channel===c? 'bg-zinc-800 text-zinc-100':'text-zinc-400 hover:text-zinc-200')}>{c}</button>
              ))}
            </div>
          </div>

          {/* Tone */}
          <div>
            <div className="text-sm text-zinc-400 mb-2">Tone</div>
            <div className="inline-flex items-center rounded-lg p-1 bg-zinc-900/60 border border-zinc-800">
              {(['direct','friendly','analytical'] as const).map((t)=> (
                <button key={t} onClick={()=>setTone(t)} className={cn("px-3 py-1.5 rounded-md text-xs font-medium transition-all", tone===t? 'bg-zinc-800 text-zinc-100':'text-zinc-400 hover:text-zinc-200')}>{t}</button>
              ))}
            </div>
          </div>

          {/* Guardrails */}
          <div className="grid grid-cols-2 gap-3">
            <label className="flex items-center gap-2 text-sm text-zinc-300">
              <input type="checkbox" checked={includeCaseStudy} onChange={(e)=>setIncludeCaseStudy(e.target.checked)} className="accent-blue-500" />
              Include recent result
            </label>
            <label className="flex items-center gap-2 text-sm text-zinc-300">
              <input type="checkbox" checked={includeMcp} onChange={(e)=>setIncludeMcp(e.target.checked)} className="accent-blue-500" />
              MCP connectors
            </label>
          </div>
        </div>

        {/* Micro-stats for credibility */}
        <div className="mt-6 grid grid-cols-3 gap-3">
          {stats.map((s)=> <Stat key={s.label} {...s} />)}
        </div>
      </div>

      {/* Output & Pipeline */}
      <div className="md:col-span-3 grid grid-cols-1 gap-6">
        {/* Copy preview */}
        <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 h-full">
          <div className="flex items-center gap-2 text-zinc-300 font-semibold mb-3">
            {channel === 'email' ? <Mail className="h-5 w-5 text-blue-400" aria-hidden /> : <Users className="h-5 w-5 text-blue-400" aria-hidden />} Sample {channel}
          </div>
          <pre className="whitespace-pre-wrap text-sm md:text-base text-zinc-200 leading-relaxed">{sampleCopy}</pre>
        </div>

        {/* Prospects + pipeline simulation */}
        <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6">
          <div className="flex items-center justify-between gap-4 mb-4">
            <div className="flex items-center gap-2 text-zinc-300 font-semibold">
              <Send className="h-5 w-5 text-blue-400" aria-hidden /> Pipeline preview
            </div>
            <div className="grid grid-cols-4 gap-4 text-center">
              <div>
                <div className="text-zinc-100 font-bold">{SAMPLE_PROSPECTS.length}</div>
                <div className="text-zinc-400 text-xs">Prospects</div>
              </div>
              <div>
                <div className="text-zinc-100 font-bold">{Math.ceil(SAMPLE_PROSPECTS.length * 0.95)}</div>
                <div className="text-zinc-400 text-xs">Delivered</div>
              </div>
              <div>
                <div className="text-zinc-100 font-bold">{Math.ceil(SAMPLE_PROSPECTS.length * 0.6)}</div>
                <div className="text-zinc-400 text-xs">Opens</div>
              </div>
              <div>
                <div className="text-zinc-100 font-bold">{Math.max(1, Math.ceil(SAMPLE_PROSPECTS.length * 0.25))}</div>
                <div className="text-zinc-400 text-xs">Replies</div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {SAMPLE_PROSPECTS.map((p, i)=> (
              <div key={p.name} className="rounded-xl border border-zinc-800 bg-zinc-950/60 p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-zinc-100 font-medium">{p.name} <span className="text-zinc-400 font-normal">· {p.title}</span></div>
                    <div className="text-zinc-400 text-sm">{p.company} — <span className="text-zinc-300">{p.signal}</span></div>
                  </div>
                  <div className="flex items-center gap-2 text-green-300 text-xs">
                    <CheckCircle2 className="h-4 w-4" aria-hidden /> personalized
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

