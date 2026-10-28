'use client'

import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react'

import styles from './BlueprintReveal.module.css'
import PixelPointer from './PixelPointer'

export type RevealEnd = 'live' | 'blueprint'

type Props = {
  /** The drawing. Rendered aria-hidden: it mirrors the live layer's geometry. */
  draft: ReactNode
  /** The working system. Must share the draft layer's markup and layout. */
  live: ReactNode
  /** Percent built on first paint, 0–100. Both states show in the first frame. */
  initial?: number
  /** Fires when the line settles at either end (toggle, drag, keyboard). */
  onSettle?: (end: RevealEnd) => void
  sampleLabel: string
  caption?: ReactNode
  id?: string
}

const SNAP = 3
// Phones run the build line horizontally; the stage stacks top to bottom.
const VERTICAL_QUERY = '(max-width: 767px)'

/*
  Blueprint → Working System (PRD §4, module A). One scene, two aligned layers,
  divided by a build line the visitor controls. The engine owns input and timing;
  the scene owns what changes when the system goes live.
*/
export default function BlueprintReveal({ draft, live, initial = 46, onSettle, sampleLabel, caption, id }: Props) {
  const [pos, setPos] = useState(initial)
  const [animating, setAnimating] = useState(false)
  const [touched, setTouched] = useState(false)
  const stageRef = useRef<HTMLDivElement>(null)
  const dragging = useRef(false)
  const glideTimer = useRef<number | undefined>(undefined)

  useEffect(() => () => window.clearTimeout(glideTimer.current), [])

  const glide = useCallback(
    (next: number, end?: RevealEnd) => {
      window.clearTimeout(glideTimer.current)
      setTouched(true)
      setAnimating(true)
      setPos(next)
      glideTimer.current = window.setTimeout(() => setAnimating(false), 950)
      if (end) onSettle?.(end)
    },
    [onSettle],
  )

  const toLive = useCallback(() => glide(100, 'live'), [glide])
  const toBlueprint = useCallback(() => glide(0, 'blueprint'), [glide])

  const fromPointer = (clientX: number, clientY: number) => {
    const el = stageRef.current
    if (!el) return pos
    const r = el.getBoundingClientRect()
    const vertical = window.matchMedia(VERTICAL_QUERY).matches
    const ratio = vertical ? (clientY - r.top) / r.height : (clientX - r.left) / r.width
    return Math.round(Math.min(100, Math.max(0, ratio * 100)) * 10) / 10
  }

  const settle = (value: number) => {
    if (value >= 100 - SNAP) toLive()
    else if (value <= SNAP) toBlueprint()
  }

  const onKeyDown = (e: React.KeyboardEvent) => {
    const steps: Record<string, number> = {
      ArrowRight: 5,
      ArrowDown: 5,
      ArrowLeft: -5,
      ArrowUp: -5,
      PageDown: 20,
      PageUp: -20,
    }
    let next: number | null = null
    if (e.key in steps) next = Math.min(100, Math.max(0, pos + steps[e.key]))
    if (e.key === 'Home') next = 0
    if (e.key === 'End') next = 100
    if (next === null) return
    e.preventDefault()
    setTouched(true)
    if (next >= 100) return toLive()
    if (next <= 0) return toBlueprint()
    setAnimating(false)
    setPos(next)
  }

  // Once a glide lands at either end, the hidden layer is removed from paint.
  const end = animating ? undefined : pos >= 100 ? 'live' : pos <= 0 ? 'blueprint' : undefined
  const valueText = pos >= 100 ? 'Live system' : pos <= 0 ? 'Blueprint' : `${Math.round(pos)}% built`

  return (
    <figure className={styles.reveal} id={id} data-touched={touched ? '' : undefined}>
      <div className={styles.controls}>
        <div className={styles.toggle} role="group" aria-label="View">
          <button type="button" aria-pressed={pos <= 0} onClick={toBlueprint}>
            Blueprint
          </button>
          <button type="button" aria-pressed={pos >= 100} onClick={toLive}>
            Live system
          </button>
        </div>
        <p className={styles.sample}>{sampleLabel}</p>
      </div>

      <div
        ref={stageRef}
        className={styles.stage}
        data-animating={animating ? '' : undefined}
        data-end={end}
        style={{ '--pos': `${pos}%` } as React.CSSProperties}
      >
        <div className={styles.layerDraft} aria-hidden="true">
          {draft}
        </div>
        <div className={styles.layerLive}>{live}</div>

        <div
          className={styles.handle}
          role="slider"
          tabIndex={0}
          aria-label="Build line: drag to turn the drawing into the working system"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(pos)}
          aria-valuetext={valueText}
          onKeyDown={onKeyDown}
          onPointerDown={(e) => {
            dragging.current = true
            e.currentTarget.setPointerCapture(e.pointerId)
            window.clearTimeout(glideTimer.current)
            setAnimating(false)
            setTouched(true)
          }}
          onPointerMove={(e) => {
            if (dragging.current) setPos(fromPointer(e.clientX, e.clientY))
          }}
          onPointerUp={(e) => {
            dragging.current = false
            settle(fromPointer(e.clientX, e.clientY))
          }}
          onPointerCancel={() => {
            dragging.current = false
          }}
        >
          <span className={styles.handleLabel} aria-hidden="true">
            Build line
          </span>
          <span className={styles.grip} aria-hidden="true">
            <svg viewBox="0 0 16 10" width="16" height="10">
              <path d="M5 1 L1 5 L5 9 M11 1 L15 5 L11 9" fill="none" stroke="currentColor" strokeWidth="1.6" />
            </svg>
          </span>
          {!touched && (
            <span className={styles.hint} aria-hidden="true">
              <PixelPointer />
              <span>Drag</span>
            </span>
          )}
        </div>
      </div>

      {caption && <figcaption className={styles.caption}>{caption}</figcaption>}
    </figure>
  )
}
