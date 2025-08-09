"use client"

import { create } from "zustand"

type MotionPreference = "reduced" | "standard"
type DeviceClass = "touch" | "pointer"

export type PersonalizationState = {
  motionPreference: MotionPreference
  deviceClass: DeviceClass
  localHour: number
  interactionIntensity: number
  setInteractionIntensity: (value: number | ((prev: number) => number)) => void
  refreshEnvironment: () => void
}

export const usePersonalization = create<PersonalizationState>((set) => ({
  motionPreference:
    typeof window !== "undefined" && window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ? "reduced"
      : "standard",
  deviceClass:
    typeof window !== "undefined" &&
    ("ontouchstart" in window || navigator.maxTouchPoints > 0)
      ? "touch"
      : "pointer",
  localHour: typeof window !== "undefined" ? new Date().getHours() : 12,
  interactionIntensity: 0,
  setInteractionIntensity: (value: number | ((prev: number) => number)) =>
    set((state) => ({
      interactionIntensity:
        typeof value === "function" ? (value as (p: number) => number)(state.interactionIntensity) : value,
    })),
  refreshEnvironment: () =>
    set({
      motionPreference:
        typeof window !== "undefined" && window.matchMedia &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "reduced"
          : "standard",
      deviceClass:
        typeof window !== "undefined" &&
        ("ontouchstart" in window || navigator.maxTouchPoints > 0)
          ? "touch"
          : "pointer",
      localHour: typeof window !== "undefined" ? new Date().getHours() : 12,
    }),
}))

export function deriveThemeFromHour(hour: number): "dawn" | "day" | "dusk" | "night" {
  if (hour >= 5 && hour < 9) return "dawn"
  if (hour >= 9 && hour < 17) return "day"
  if (hour >= 17 && hour < 21) return "dusk"
  return "night"
}

export function computeIntentScore(intensity: number, deviceClass: DeviceClass): number {
  const base = deviceClass === "pointer" ? 1.0 : 0.85
  return Math.max(0, Math.min(1, (intensity / 1000) * base))
}
