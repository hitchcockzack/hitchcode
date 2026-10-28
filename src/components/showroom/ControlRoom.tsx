'use client'

import { useEffect, useState } from 'react'

import { SAMPLE_LABEL } from '@/content/demo/job-j2417'
import type { TerminalChannel } from '@/content/demo/managed-outputs'
import { useMotionAllowed } from '@/lib/useMotionAllowed'
import DispatchDiorama from './DispatchDiorama'
import styles from './ControlRoom.module.css'

const LINE_GAP_MS = 1900
const HOLD_MS = 5600
const VAN_FPS = 8

type Props = {
  channels: readonly TerminalChannel[]
  /** Scale model of the yard; reads the job channel's progress. */
  diorama?: boolean
  id?: string
  badge?: string
  className?: string
}

/*
  The control-room terminal (study B). The server renders a channel mid-flight so the
  first frame already tells the story; the loop carries it on and replays. The hardware
  keys are the real controls: channel, pause, step, replay.
*/
export default function ControlRoom({ channels, diorama = false, id, badge = 'Hitchcode · Ops monitor', className }: Props) {
  const motionAllowed = useMotionAllowed()
  const [channelIdx, setChannelIdx] = useState(0)
  const channel = channels[channelIdx]
  const [count, setCount] = useState(channel.firstFrame)
  const [paused, setPaused] = useState(false)
  const [vanP, setVanP] = useState(0)

  // Reduced motion: show the whole channel at once and stop.
  useEffect(() => {
    if (!motionAllowed) setCount(channel.log.length)
  }, [motionAllowed, channel])

  const running = motionAllowed && !paused

  useEffect(() => {
    if (!running) return
    const atEnd = count >= channel.log.length
    const timer = window.setTimeout(
      () => setCount((c) => (c >= channel.log.length ? channel.replayFrom : c + 1)),
      atEnd ? HOLD_MS : LINE_GAP_MS,
    )
    return () => window.clearTimeout(timer)
  }, [count, running, channel])

  const vanTarget = diorama && count >= 9 ? 1 : 0

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

  const switchChannel = (i: number) => {
    setChannelIdx(i)
    setCount(motionAllowed ? channels[i].firstFrame : channels[i].log.length)
    setPaused(false)
  }

  const lines = channel.log.slice(0, count)
  const latest = lines[lines.length - 1]
  const complete = count >= channel.log.length
  const stageIdx = channel.stages.findIndex((stage) => stage.id === latest.stage)
  const activeIdx = complete ? channel.stages.length : stageIdx
  const review = latest.status === 'REVIEW'

  const replay = () => {
    setPaused(false)
    setCount(channel.replayFrom)
  }
  const step = () => setCount((c) => (c >= channel.log.length ? channel.replayFrom : c + 1))

  return (
    <div className={`${styles.console} ${className ?? ''}`} id={id} data-diorama={diorama ? '' : undefined}>
      <div className={styles.monitor}>
        <div className={styles.housing}>
          <span className={styles.powerLed} aria-hidden="true" />
          <span className={styles.housingLabel} aria-hidden="true">
            {badge}
          </span>

          <div className={styles.bezel}>
            <div className={styles.screen}>
              <div className={styles.crt}>
                <p className={styles.crtHead}>
                  <span>{channel.title}</span>
                  <span className={styles.reverse}>Sample data</span>
                </p>
                <ol className={styles.log} aria-label={`${channel.title}, sample log`}>
                  {lines.map((line, i) => (
                    <li key={`${line.at}-${i}`} className={i === lines.length - 1 ? styles.fresh : undefined}>
                      <span className={styles.day}>{line.at.slice(0, 3)}</span>
                      <span className={styles.time}>{line.at.slice(4)}</span>
                      <span className={styles.sys}>{line.system}</span>
                      <span className={styles.msg}>{line.text}</span>
                      <span className={line.status === 'REVIEW' ? styles.statusReview : styles.status}>{line.status}</span>
                    </li>
                  ))}
                </ol>
                <p className={styles.prompt}>
                  &gt; {complete ? channel.complete : channel.watching}
                  <span className={styles.cursor} aria-hidden="true" />
                </p>
              </div>
              <span className={styles.scanlines} aria-hidden="true" />
              <span className={styles.sweep} aria-hidden="true" />
              <span className={styles.glare} aria-hidden="true" />
            </div>
          </div>

          <div className={styles.chin}>
            <ol className={styles.lamps} aria-label="Stage">
              {channel.stages.map((stage, i) => {
                const state = i < activeIdx ? 'done' : i === activeIdx ? (review ? 'review' : 'active') : 'off'
                return (
                  <li key={stage.id} className={styles.lamp} data-state={state}>
                    <span className={styles.lens} aria-hidden="true" />
                    <span className={styles.lampLabel}>{stage.code}</span>
                    <span className={styles.srOnly}>
                      {state === 'done' ? 'done' : state === 'off' ? 'not started' : review ? 'needs a person' : 'in progress'}
                    </span>
                  </li>
                )
              })}
            </ol>

            <div className={styles.keys} role="group" aria-label="Terminal controls">
              {channels.length > 1 &&
                channels.map((c, i) => (
                  <button
                    key={c.id}
                    type="button"
                    className={`${styles.key} ${styles.channelKey}`}
                    aria-pressed={i === channelIdx}
                    onClick={() => switchChannel(i)}
                  >
                    {c.label}
                  </button>
                ))}
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

      {diorama && (
        <div className={styles.dioramaWrap}>
          <DispatchDiorama
            vanP={vanP}
            palletsLoaded={count >= 8}
            officeLit={['estimate', 'scheduling', 'invoice'].includes(latest.stage) && !complete}
            jobDone={count >= 10}
            review={review}
          />
        </div>
      )}
    </div>
  )
}
