'use client'

import { useCallback, useEffect, useRef, useState } from 'react'

import { SAMPLE_JOB, SAMPLE_LABEL, STAGES, stageIndex } from '../_shared/sample-operation'
import { useMotionAllowed } from '../_shared/useMotionAllowed'
import { JOB_PHASES, PHASE_DELAYS_MS, RAIL_META, type JobPhase } from './job-phases'
import styles from './blueprint.module.css'

// pos = how much of the console is built, 0–100, measured from the left (top on phones).
const FIRST_FRAME_POS = 46
const SNAP = 3

/** A value the live system fills in. In the draft layer it renders as a hatched placeholder. */
function V({ children }: { children: React.ReactNode }) {
  return <span className={styles.v}>{children}</span>
}

function Note({ className, children }: { className?: string; children: React.ReactNode }) {
  return <span className={`${styles.note} ${className ?? ''}`}>{children}</span>
}

/*
  The console is rendered twice with identical markup: once as the drawing, once as
  the working application. Draft-only annotations are absolutely positioned, so both
  layers keep exactly the same geometry at every viewport width.
*/
function JobConsole({
  mode,
  phase,
  onReview,
}: {
  mode: 'draft' | 'live'
  phase: JobPhase
  onReview?: () => void
}) {
  const draft = mode === 'draft'
  const activeIdx = phase.active === 'complete' ? STAGES.length : stageIndex(phase.active)
  const progress = Math.min(activeIdx, STAGES.length - 1) / (STAGES.length - 1)

  return (
    <div className={styles.console} data-mode={mode}>
      <div className={styles.cHead}>
        <div>
          <p className={styles.cId}>
            Job <V>{SAMPLE_JOB.id}</V>
          </p>
          <p className={styles.cScope}>
            <V>{SAMPLE_JOB.scope}</V>
          </p>
          <p className={styles.cSite}>
            <V>
              {SAMPLE_JOB.site} · {SAMPLE_JOB.siteNote}
            </V>
          </p>
        </div>
        <p className={styles.cStatus} data-review={phase.needsReview ? '' : undefined}>
          <span className={styles.statusDot} aria-hidden="true" />
          <V>{phase.status}</V>
        </p>
        {draft && <Note className={styles.noteStatus}>Status comes from the rail, never retyped</Note>}
      </div>

      <div className={styles.railWrap} style={{ '--p': progress } as React.CSSProperties}>
        <span className={styles.railTrack} aria-hidden="true">
          <span className={styles.railFill} />
          {!draft && <span className={styles.railPulse} />}
        </span>
        <ol className={styles.rail} aria-label="Job stages">
          {STAGES.map((stage, i) => (
            <li
              key={stage.id}
              data-state={i < activeIdx ? 'done' : i === activeIdx ? 'active' : 'next'}
              className={styles.stage}
            >
              <span className={styles.node} aria-hidden="true" />
              <span className={styles.nodeLabel}>{stage.label}</span>
              <span className={styles.nodeMeta}>
                <V>{RAIL_META[stage.id]}</V>
              </span>
            </li>
          ))}
        </ol>
        {draft && (
          <span className={styles.dimension} aria-hidden="true">
            <span>6 stages · one record</span>
          </span>
        )}
      </div>

      <div className={styles.panels}>
        <section className={styles.panel}>
          <h3>Schedule</h3>
          <p className={styles.pMain}>
            <V>{SAMPLE_JOB.crew}</V>
          </p>
          <p>
            <V>{SAMPLE_JOB.slot}</V>
          </p>
          <p className={styles.pMeta}>
            <V>{phase.schedule}</V>
          </p>
          {draft && <Note>From the signed estimate</Note>}
        </section>
        <section className={styles.panel}>
          <h3>Materials</h3>
          <p className={styles.pMain}>
            <V>{SAMPLE_JOB.material.name}</V>
          </p>
          <p>
            <V>
              {SAMPLE_JOB.material.qty} · {SAMPLE_JOB.material.location}
            </V>
          </p>
          <p className={styles.pMeta}>
            <V>{phase.materials}</V>
          </p>
          {draft && <Note>Held with the crew</Note>}
        </section>
        <section className={styles.panel} data-review={phase.needsReview ? '' : undefined}>
          <h3>Billing</h3>
          <p className={styles.pMain}>
            <V>{phase.billing}</V>
          </p>
          <p>
            <V>{phase.billingNote}</V>
          </p>
          <p className={styles.pMeta}>
            {phase.needsReview && !draft ? (
              <button type="button" className={styles.reviewBtn} onClick={onReview}>
                Approve and send
              </button>
            ) : phase.needsReview ? (
              <span className={styles.reviewBtn}>Approve and send</span>
            ) : (
              <V>A person approves before send</V>
            )}
          </p>
          {draft && <Note>Drafted at close · reviewed</Note>}
        </section>
      </div>

      <p className={styles.ticker}>
        <V>{phase.ticker}</V>
      </p>
    </div>
  )
}

// Classic 1-bit arrow pointer, drawn from a pixel map: the study's retro computing accent.
const POINTER = [
  'X...........',
  'XX..........',
  'XoX.........',
  'XooX........',
  'XoooX.......',
  'XooooX......',
  'XoooooX.....',
  'XooooooX....',
  'XoooooooX...',
  'XooooooooX..',
  'XoooooXXXXX.',
  'XooXooX.....',
  'XoX.XooX....',
  'XX..XooX....',
  'X....XooX...',
  '.....XooX...',
  '......XX....',
]

function PixelPointer() {
  return (
    <svg viewBox="0 0 12 17" className={styles.pointer} aria-hidden="true" shapeRendering="crispEdges">
      {POINTER.flatMap((row, y) =>
        row.split('').map((cell, x) =>
          cell === '.' ? null : (
            <rect key={`${x}-${y}`} x={x} y={y} width={1} height={1} fill={cell === 'X' ? '#101413' : '#edece5'} />
          ),
        ),
      )}
    </svg>
  )
}

export default function BlueprintReveal() {
  const motionAllowed = useMotionAllowed()
  const [pos, setPos] = useState(FIRST_FRAME_POS)
  const [phaseIdx, setPhaseIdx] = useState(0)
  const [animating, setAnimating] = useState(false)
  const [touched, setTouched] = useState(false)
  const stageRef = useRef<HTMLDivElement>(null)
  const dragging = useRef(false)
  const timers = useRef<number[]>([])

  const clearTimers = useCallback(() => {
    timers.current.forEach((t) => window.clearTimeout(t))
    timers.current = []
  }, [])

  useEffect(() => clearTimers, [clearTimers])

  const glide = useCallback((next: number) => {
    setAnimating(true)
    setPos(next)
    const t = window.setTimeout(() => setAnimating(false), 950)
    timers.current.push(t)
  }, [])

  // Going live starts the data flowing: install day, job close, invoice for review, sent.
  const goLive = useCallback(() => {
    clearTimers()
    setTouched(true)
    glide(100)
    if (!motionAllowed) {
      setPhaseIdx(JOB_PHASES.length - 1)
      return
    }
    setPhaseIdx(0)
    let elapsed = 500
    PHASE_DELAYS_MS.forEach((delay, i) => {
      if (i === 0) return
      elapsed += delay
      // Phase 3 waits for the visitor's approval when they are paying attention; it
      // still lands on its own so the story completes.
      timers.current.push(window.setTimeout(() => setPhaseIdx((p) => Math.max(p, i)), elapsed))
    })
  }, [clearTimers, glide, motionAllowed])

  const goBlueprint = useCallback(() => {
    clearTimers()
    setTouched(true)
    setPhaseIdx(0)
    glide(0)
  }, [clearTimers, glide])

  const approve = () => setPhaseIdx(JOB_PHASES.length - 1)

  const posFromPointer = (clientX: number, clientY: number) => {
    const el = stageRef.current
    if (!el) return pos
    const r = el.getBoundingClientRect()
    const vertical = window.matchMedia('(max-width: 767px)').matches
    const ratio = vertical ? (clientY - r.top) / r.height : (clientX - r.left) / r.width
    return Math.round(Math.min(100, Math.max(0, ratio * 100)) * 10) / 10
  }

  const settle = (value: number) => {
    if (value >= 100 - SNAP) goLive()
    else if (value <= SNAP) goBlueprint()
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
    if (next >= 100) return goLive()
    if (next <= 0) return goBlueprint()
    setAnimating(false)
    setPos(next)
  }

  const phase = JOB_PHASES[phaseIdx]
  // Once a glide finishes at either end, the hidden layer is removed from paint entirely.
  const end = animating ? undefined : pos >= 100 ? 'live' : pos <= 0 ? 'blueprint' : undefined
  const valueText = pos >= 100 ? 'Live system' : pos <= 0 ? 'Blueprint' : `${Math.round(pos)}% built`

  return (
    <figure className={styles.reveal} id="system" data-touched={touched ? '' : undefined}>
      <div className={styles.controls}>
        <div className={styles.toggle} role="group" aria-label="View">
          <button type="button" aria-pressed={pos <= 0} onClick={goBlueprint}>
            Blueprint
          </button>
          <button type="button" aria-pressed={pos >= 100} onClick={goLive}>
            Live system
          </button>
        </div>
        <p className={styles.sample}>{SAMPLE_LABEL}</p>
      </div>

      <div
        ref={stageRef}
        className={styles.stageBox}
        data-animating={animating ? '' : undefined}
        data-end={end}
        style={{ '--pos': `${pos}%` } as React.CSSProperties}
      >
        <div className={styles.layerDraft} aria-hidden="true">
          <JobConsole mode="draft" phase={phase} />
        </div>
        <div className={styles.layerLive}>
          <JobConsole mode="live" phase={phase} onReview={approve} />
        </div>

        <div
          className={styles.handle}
          role="slider"
          tabIndex={0}
          aria-label="Build line: drag to turn the blueprint into the live system"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(pos)}
          aria-valuetext={valueText}
          onKeyDown={onKeyDown}
          onPointerDown={(e) => {
            dragging.current = true
            e.currentTarget.setPointerCapture(e.pointerId)
            setAnimating(false)
            setTouched(true)
            clearTimers()
          }}
          onPointerMove={(e) => {
            if (!dragging.current) return
            setPos(posFromPointer(e.clientX, e.clientY))
          }}
          onPointerUp={(e) => {
            dragging.current = false
            settle(posFromPointer(e.clientX, e.clientY))
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

      <figcaption className={styles.caption}>
        <span>
          Job {SAMPLE_JOB.id} for a fictional insulation contractor. Drag the build line or use the arrow keys.
        </span>
        {pos >= 100 && phaseIdx === JOB_PHASES.length - 1 && (
          <button type="button" className={styles.replay} onClick={goLive}>
            Replay the job
          </button>
        )}
      </figcaption>
    </figure>
  )
}
