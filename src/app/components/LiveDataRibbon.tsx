"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

type Metric = {
  label: string
  value: string
}

function formatNumber(n: number) {
  return Intl.NumberFormat(undefined, { maximumFractionDigits: 0 }).format(n)
}

export default function LiveDataRibbon() {
  const [metrics, setMetrics] = useState<Metric[]>([])
  const seed = useRef(Math.floor(Math.random() * 100000))

  useEffect(() => {
    const id = setInterval(() => {
      const t = Date.now() / 1000
      const base = (x: number) => Math.abs(Math.sin(t * 0.15 + x))
      setMetrics([
        { label: "Compute Saved", value: formatNumber(2000 + base(1) * 2500) + " CPU-hrs/mo" },
        { label: "Manual Tasks Removed", value: formatNumber(12000 + base(2) * 5000) },
        { label: "Median Latency", value: (120 - base(3) * 40).toFixed(0) + "ms" },
        { label: "Automations Online", value: formatNumber(37 + base(4) * 9) },
      ])
    }, 1500)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="py-4 sm:py-5 border-y border-zinc-800 bg-zinc-950/50">
      <div className="max-w-6xl mx-auto px-4 overflow-hidden">
        <div className="flex gap-6 animate-[scroll_24s_linear_infinite] [--tw-translate-x:0] hover:[animation-play-state:paused]">
          {[...Array(2)].map((_, k) => (
            <div key={k} className="flex gap-6 min-w-full">
              {metrics.map((m, i) => (
                <div key={k + "-" + i} className="shrink-0 rounded-xl bg-zinc-900/60 border border-zinc-800 px-4 py-3">
                  <div className="text-xs uppercase tracking-widest text-zinc-400">{m.label}</div>
                  <div className="text-lg sm:text-xl font-semibold text-zinc-100">{m.value}</div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
      <style jsx>{`
        @keyframes scroll { from { transform: translateX(0); } to { transform: translateX(-50%); } }
      `}</style>
    </div>
  )
}
