'use client'

import { useCallback, useEffect, useRef, useState } from 'react'

import { JOB_PHASES, PHASE_DELAYS_MS, SAMPLE_JOB, SAMPLE_LABEL } from '@/content/demo/job-j2417'
import { useMotionAllowed } from '@/lib/useMotionAllowed'
import BlueprintReveal, { type RevealEnd } from './BlueprintReveal'
import JobConsole from './JobConsole'
import styles from './JobConsole.module.css'

/*
  Section 05 scene: job J-2417's console as a drawing and as working software.
  Going live starts the data: crew checks in, the job closes, the invoice drafts
  for review, and is sent (or the visitor approves it first).
*/
type Props = {
  id?: string
  material?: 'paper' | 'blueprint'
  initial?: number
}

export default function JobReveal({ id = 'system', material = 'paper', initial }: Props) {
  const motionAllowed = useMotionAllowed()
  const [phaseIdx, setPhaseIdx] = useState(0)
  const timers = useRef<number[]>([])

  const clear = useCallback(() => {
    timers.current.forEach((t) => window.clearTimeout(t))
    timers.current = []
  }, [])

  useEffect(() => clear, [clear])

  const run = useCallback(() => {
    clear()
    if (!motionAllowed) {
      setPhaseIdx(JOB_PHASES.length - 1)
      return
    }
    setPhaseIdx(0)
    let at = 500
    PHASE_DELAYS_MS.forEach((delay, i) => {
      if (i === 0) return
      at += delay
      timers.current.push(window.setTimeout(() => setPhaseIdx((p) => Math.max(p, i)), at))
    })
  }, [clear, motionAllowed])

  const onSettle = useCallback(
    (end: RevealEnd) => {
      if (end === 'live') return run()
      clear()
      setPhaseIdx(0)
    },
    [clear, run],
  )

  const approve = () => {
    clear()
    setPhaseIdx(JOB_PHASES.length - 1)
  }

  const phase = JOB_PHASES[phaseIdx]
  const finished = phaseIdx === JOB_PHASES.length - 1

  return (
    <>
      <BlueprintReveal
        id={id}
        tone={material}
        initial={initial}
        sampleLabel={SAMPLE_LABEL}
        onSettle={onSettle}
        draft={<JobConsole mode="draft" phase={phase} material={material} />}
        live={<JobConsole mode="live" phase={phase} onApprove={approve} material={material} />}
        caption={
          <>
            <span>
              Job {SAMPLE_JOB.id} for a fictional insulation contractor. Drag the build line or use the arrow keys.
            </span>
            {finished && (
              <button type="button" className={styles.replay} onClick={run}>
                Replay the job
              </button>
            )}
          </>
        }
      />
      <p className={styles.srOnly} role="status">
        {`Job ${SAMPLE_JOB.id}: ${phase.status}`}
      </p>
    </>
  )
}
