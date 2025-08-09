"use client"

import { useEffect, useMemo, useState } from "react"
import { deriveThemeFromHour, usePersonalization } from "@/lib/personalization"

function useNeuralCopy() {
  const { localHour } = usePersonalization()
  const theme = deriveThemeFromHour(localHour)
  return useMemo(() => {
    switch (theme) {
      case "dawn":
        return {
          title: "Calibrating Systems",
          body: "Early signals synthesized. Opportunity mapping initialized.",
        }
      case "day":
        return {
          title: "Operational Clarity",
          body: "Throughput optimized. Latency minimized. Feedback loops engaged.",
        }
      case "dusk":
        return {
          title: "Strategic Reconfiguration",
          body: "Complexity distilled. Next-order effects modeled.",
        }
      case "night":
      default:
        return {
          title: "Autonomous Stability",
          body: "Systems running. Insights accruing. Scale unlocked.",
        }
    }
  }, [theme])
}

export default function NeuralIntro() {
  const copy = useNeuralCopy()
  const { deviceClass } = usePersonalization()
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  return (
    <section className="py-16 md:py-20 px-4 bg-black">
      <div className="max-w-5xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-zinc-800 px-3 py-1.5 text-xs uppercase tracking-widest text-zinc-400">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
          Live System Intelligence
        </div>
        <h2 className="mt-5 text-3xl md:text-5xl font-bold text-zinc-100 tracking-tight">
          {copy.title}
        </h2>
        <p className="mt-4 text-zinc-400 text-lg max-w-3xl mx-auto">
          {copy.body}
        </p>
        <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4">
          {["Latency", "Reliability", "Autonomy", "Security"].map((metric, i) => (
            <div key={metric} className="rounded-xl bg-zinc-900/50 border border-zinc-800 p-4 text-left">
              <div className="text-xs text-zinc-400">{metric}</div>
              <div className="mt-1 text-xl font-semibold text-zinc-100">
                {mounted ? (
                  metric === "Latency" ? "~120ms" : metric === "Reliability" ? "99.98%" : metric === "Autonomy" ? "37 ops" : "ISO-ready"
                ) : (
                  "—"
                )}
              </div>
              <div className="mt-2 h-1.5 rounded-full bg-zinc-800 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-blue-500 to-cyan-400"
                  style={{ width: `${70 + i * 6 + (deviceClass === "pointer" ? 6 : 0)}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
