"use client"

import React from "react"

type VortexProps = {
  children?: React.ReactNode
  className?: string
  backgroundColor?: string
  colors?: string[]
  intensity?: number // 0.0 - 1.0 controls glow strength
}

// Lightweight animated conic-gradient vortex. No external deps.
export function Vortex({
  children,
  className = "",
  backgroundColor = "#000000",
  colors = ["#2563eb", "#a21caf"],
  intensity = 0.6,
}: VortexProps) {
  const [c1, c2] = colors
  const glowOpacity = Math.max(0, Math.min(1, intensity))

  return (
    <div className={`relative overflow-hidden ${className}`} style={{ backgroundColor }}>
      {/* Base visible glow */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background: `radial-gradient(80% 80% at 50% 35%, ${c1}80 0%, transparent 60%), radial-gradient(65% 65% at 55% 60%, ${c2}66 0%, transparent 70%)`,
          filter: "saturate(1.08) brightness(1.06)",
        }}
      />
      {/* Swirl layers */}
      <div
        aria-hidden
        className="absolute -inset-[18%] opacity-70"
        style={{
          background: `conic-gradient(from 0deg at 50% 50%, ${c1}cc 0deg 140deg, transparent 140deg 180deg, ${c2}cc 180deg 320deg, transparent 320deg 360deg)`,
          filter: "blur(22px)",
          animation: "vortex-rotate 30s linear infinite",
          mixBlendMode: "screen",
        }}
      />
      <div
        aria-hidden
        className="absolute -inset-[22%] opacity-60"
        style={{
          background: `conic-gradient(from 180deg at 50% 50%, ${c2}b3 0deg 150deg, transparent 150deg 210deg, ${c1}b3 210deg 340deg, transparent 340deg 360deg)`,
          filter: "blur(26px)",
          animation: "vortex-rotate-rev 42s linear infinite",
          mixBlendMode: "screen",
        }}
      />
      {/* Soft radial tie-in */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background: `radial-gradient(55% 55% at 50% 38%, ${c1}${Math.round(glowOpacity * 192)
            .toString(16)
            .padStart(2, "0")} 0%, transparent 60%), radial-gradient(45% 45% at 56% 62%, ${c2}${
            Math.round(glowOpacity * 192).toString(16).padStart(2, "0")
          } 0%, transparent 70%)`,
        }}
      />

      {/* Content */}
      <div className="relative z-10">{children}</div>

      {/* Keyframes */}
      <style jsx>{`
        @keyframes vortex-rotate {
          0% { transform: rotate(0deg) scale(1.05); }
          50% { transform: rotate(180deg) scale(1.1); }
          100% { transform: rotate(360deg) scale(1.05); }
        }
        @keyframes vortex-rotate-rev {
          0% { transform: rotate(0deg) scale(1.05); }
          50% { transform: rotate(-180deg) scale(1.0); }
          100% { transform: rotate(-360deg) scale(1.05); }
        }
      `}</style>
    </div>
  )
}
