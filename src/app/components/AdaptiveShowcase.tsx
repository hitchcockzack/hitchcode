"use client"

import { useMemo, useState } from "react"
import { usePersonalization, computeIntentScore } from "@/lib/personalization"

type ShowcaseItem = {
  title: string
  blurb: string
  tags: string[]
}

const ITEMS: ShowcaseItem[] = [
  {
    title: "Zero-Touch Commerce",
    blurb:
      "Autonomous fulfillment and supplier orchestration. A 100-hour/week operation reduced to a self-sustaining pipeline.",
    tags: ["Automation", "APIs", "Logistics"],
  },
  {
    title: "Performance Analytics",
    blurb:
      "Granular tracking with intelligent insights for serious operators. Designed for signal over noise.",
    tags: ["Data", "UX", "PostgreSQL"],
  },
  {
    title: "Compliance Automation",
    blurb:
      "OCR, verification flows, and role-based dashboards that make fairness a default, not an aspiration.",
    tags: ["OCR", "SaaS", "Security"],
  },
]

export default function AdaptiveShowcase() {
  const { interactionIntensity, deviceClass } = usePersonalization()
  const [selectedIndex, setSelectedIndex] = useState(0)
  const intent = useMemo(
    () => computeIntentScore(interactionIntensity, deviceClass),
    [interactionIntensity, deviceClass]
  )

  return (
    <section className="py-20 md:py-28 px-4 bg-zinc-950 border-y border-zinc-800">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
        <div className="md:col-span-1">
          <h2 className="text-3xl md:text-4xl font-bold text-zinc-100">Proven Impact</h2>
          <p className="mt-3 text-zinc-400">Not demos—operational systems driving real results.</p>
          <div className="mt-6 flex gap-2">
            {ITEMS.map((_, i) => (
              <button
                key={i}
                onClick={() => setSelectedIndex(i)}
                className={`px-3 py-1.5 rounded-lg text-sm border ${
                  i === selectedIndex ? "border-blue-500/30 bg-blue-600/10 text-blue-300" : "border-zinc-800 text-zinc-400 hover:text-zinc-200"
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </div>
        <div className="md:col-span-2">
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 overflow-hidden">
            <div className="p-6 md:p-8">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm uppercase tracking-widest text-blue-400/80">Case {selectedIndex + 1}</div>
                  <h3 className="mt-1 text-2xl md:text-3xl font-bold text-zinc-100">{ITEMS[selectedIndex].title}</h3>
                </div>
                <div className="text-sm text-zinc-400">Intent: {(intent * 100).toFixed(0)}%</div>
              </div>
              <p className="mt-4 text-zinc-300 leading-relaxed">{ITEMS[selectedIndex].blurb}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {ITEMS[selectedIndex].tags.map((t) => (
                  <span key={t} className="px-3 py-1 rounded-full text-sm bg-zinc-800/60 border border-zinc-700 text-zinc-300">
                    {t}
                  </span>
                ))}
              </div>
            </div>
            <div className="relative h-56 md:h-72 bg-gradient-to-br from-zinc-900 to-zinc-950">
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "radial-gradient(120px 120px at 20% 30%, rgba(37,99,235,0.2), transparent 60%)," +
                    "radial-gradient(200px 200px at 80% 60%, rgba(34,211,238,0.15), transparent 60%)",
                  filter: `saturate(${1 + intent * 0.6}) brightness(${0.95 + intent * 0.2})`,
                }}
              />
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 800 300">
                <path
                  d={Array.from({ length: 48 })
                    .map((_, i) => {
                      const x = (i / 47) * 800
                      const y = 150 + Math.sin(i * 0.35 + intent * 6) * 40
                      return `${i === 0 ? "M" : "L"}${x},${y}`
                    })
                    .join(" ")}
                  stroke="url(#g)"
                  strokeWidth={2.2}
                  fill="none"
                />
                <defs>
                  <linearGradient id="g" x1="0" x2="1" y1="0" y2="0">
                    <stop offset="0%" stopColor="#60a5fa" />
                    <stop offset="100%" stopColor="#22d3ee" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
