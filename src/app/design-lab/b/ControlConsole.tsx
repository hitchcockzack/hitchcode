'use client'

import { useEffect, useState } from 'react'

import { EVENT_LOG, SAMPLE_JOB, SAMPLE_LABEL, STAGES, stageIndex } from '../_shared/sample-operation'
import { useMotionAllowed } from '../_shared/useMotionAllowed'
import DispatchDiorama from './DispatchDiorama'
import styles from './control-room.module.css'

// The server renders the job mid-flight (stock just reserved) so the first frame
// already tells the story; the loop then carries it to the invoice and replays.
const FIRST_FRAME = 8
const REPLAY_FROM = 3
const LINE_GAP_MS = 1900
const HOLD_MS = 5600
const VAN_FPS = 8

export default function ControlConsole() {
  const motionAllowed = useMotionAllowed()
  const [count, setCount] = useState(FIRST_FRAME)
  const [paused, setPaused] = useState(false)
  const [vanP, setVanP] = useState(0)

  // Reduced motion: show the whole job at once and stop.
  useEffect(() => {
    if (!motionAllowed) setCount(EVENT_LOG.length)
  }, [motionAllowed])

  const running = motionAllowed && !paused

  useEffect(() => {
    if (!running) return
    const atEnd = count >= EVENT_LOG.length
    const timer = window.setTimeout(
      () => setCount((c) => (c >= EVENT_LOG.length ? REPLAY_FROM : c + 1)),
      atEnd ? HOLD_MS : LINE_GAP_MS,
    )
    return () => window.clearTimeout(timer)
  }, [count, running])

  const vanTarget = count >= 9 ? 1 : 0

  // The van moves at a deliberately low frame rate, like a sprite, then holds.
  useEffect(() => {
    if (!motionAllowed) {
      setVanP(vanTarget)
      return
    }
    const step = 1 / (VAN_FPS * 1.6)
    const timer = window.setInterval(() => {
      setVanP((p) => {
        if (Math.abs(vanTarget - p) <= step) {
          window.clearInterval(timer)
          return vanTarget
        }
        return p + (vanTarget > p ? step : -step)
      })
    }, 1000 / VAN_FPS)
    return () => window.clearInterval(timer)
  }, [vanTarget, motionAllowed])

  const lines = EVENT_LOG.slice(0, count)
  const latest = lines[lines.length - 1]
  const complete = count >= EVENT_LOG.length
  const activeIdx = complete ? STAGES.length : stageIndex(latest.stage)
  const review = latest.status === 'REVIEW'

  const replay = () => {
    setPaused(false)
    setCount(REPLAY_FROM)
  }
  const step = () => setCount((c) => (c >= EVENT_LOG.length ? REPLAY_FROM : c + 1))

  return (
    <div className={styles.console} id="console">
      <div className={styles.monitor}>
        <div className={styles.housing}>
          <span className={styles.powerLed} aria-hidden="true" />
          <span className={styles.housingLabel} aria-hidden="true">
            Hitchcode · Ops monitor · SS-001
          </span>

          <div className={styles.bezel}>
            <div className={styles.screen}>
              <div className={styles.crt}>
                <p className={styles.crtHead}>
                  <span>OPS MONITOR · JOB {SAMPLE_JOB.id}</span>
                  <span className={styles.reverse}>SAMPLE DATA</span>
                </p>
                <ol className={styles.log} aria-label="Sample event log for one job">
                  {lines.map((line, i) => (
                    <li key={`${line.at}-${i}`} className={i === lines.length - 1 ? styles.fresh : undefined}>
                      <span className={styles.day}>{line.at.slice(0, 3)}</span>
                      <span className={styles.time}>{line.at.slice(4)}</span>
                      <span className={styles.sys}>{line.system}</span>
                      <span className={styles.msg}>{line.text}</span>
                      <span className={line.status === 'REVIEW' ? styles.statusReview : styles.status}>
                        {line.status}
                      </span>
                    </li>
                  ))}
                </ol>
                <p className={styles.prompt}>
                  &gt; {complete ? 'job complete · invoice sent' : `watching ${SAMPLE_JOB.id}`}
                  <span className={styles.cursor} aria-hidden="true" />
                </p>
              </div>
              <span className={styles.scanlines} aria-hidden="true" />
              <span className={styles.sweep} aria-hidden="true" />
              <span className={styles.glare} aria-hidden="true" />
            </div>
          </div>

          <div className={styles.chin}>
            <ol className={styles.lamps} aria-label="Job stage">
              {STAGES.map((stage, i) => {
                const state = i < activeIdx ? 'done' : i === activeIdx ? (review ? 'review' : 'active') : 'off'
                return (
                  <li key={stage.id} className={styles.lamp} data-state={state}>
                    <span className={styles.lens} aria-hidden="true" />
                    <span className={styles.lampLabel}>{stage.code}</span>
                    <span className={styles.srOnly}>
                      {state === 'done' ? 'done' : state === 'off' ? 'not started' : 'in progress'}
                    </span>
                  </li>
                )
              })}
            </ol>

            <div className={styles.keys} role="group" aria-label="Demo controls">
              <button
                type="button"
                className={styles.key}
                aria-pressed={paused}
                onClick={() => setPaused((p) => !p)}
                disabled={!motionAllowed}
              >
                {paused ? 'Run' : 'Pause'}
              </button>
              <button type="button" className={styles.key} onClick={step}>
                Step
              </button>
              <button type="button" className={styles.key} onClick={replay}>
                Replay
              </button>
            </div>
          </div>
        </div>
        <div className={styles.neck} aria-hidden="true" />
        <div className={styles.foot} aria-hidden="true" />
        <p className={styles.sampleTag}>{SAMPLE_LABEL}</p>
      </div>

      <div className={styles.dioramaWrap}>
        <DispatchDiorama
          vanP={vanP}
          palletsLoaded={count >= 8}
          officeLit={['estimate', 'scheduling', 'invoice'].includes(latest.stage) && !complete}
          jobDone={count >= 10}
          review={review}
        />
      </div>
    </div>
  )
}
