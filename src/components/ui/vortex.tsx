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
  intensity = 0.25,
}: VortexProps) {
  const [c1, c2] = colors
  const glowOpacity = Math.max(0, Math.min(1, intensity))

  return (
    <div className={`relative overflow-hidden ${className}`} style={{ backgroundColor }}>
      {/* Subtle base glow */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background: `radial-gradient(70% 70% at 50% 40%, ${c1}1f 0%, transparent 60%), radial-gradient(55% 55% at 55% 60%, ${c2}19 0%, transparent 70%)`,
          filter: "saturate(1.02) brightness(1.02)",
        }}
      />
      {/* Swirl layers */}
      <div
        aria-hidden
        className="absolute -inset-[20%] opacity-[0.12]"
        style={{
          background: `conic-gradient(from 0deg at 50% 50%, ${c1}33, transparent 45%, ${c2}33 70%, transparent 90%)`,
          filter: "blur(40px)",
          animation: "vortex-rotate 60s linear infinite",
          mixBlendMode: "screen",
        }}
      />
      <div
        aria-hidden
        className="absolute -inset-[22%] opacity-[0.10]"
        style={{
          background: `conic-gradient(from 180deg at 50% 50%, ${c2}33, transparent 50%, ${c1}33 75%, transparent 95%)`,
          filter: "blur(48px)",
          animation: "vortex-rotate-rev 90s linear infinite",
          mixBlendMode: "screen",
        }}
      />
      {/* Tie-in glow scaled by intensity */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background: `radial-gradient(60% 60% at 50% 35%, ${c1}${Math.round(
            glowOpacity * 96,
          ).toString(16).padStart(2, "0")} 0%, transparent 60%), radial-gradient(45% 45% at 55% 60%, ${c2}${
            Math.round(glowOpacity * 96).toString(16).padStart(2, "0")
          } 0%, transparent 70%)`,
        }}
      />

      {/* Content */}
      <div className="relative z-10">{children}</div>

      {/* Keyframes */}
      <style jsx>{`
        @keyframes vortex-rotate {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes vortex-rotate-rev {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(-360deg); }
        }
      `}</style>
    </div>
  )
}
