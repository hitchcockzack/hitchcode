import { RAIL_META, SAMPLE_JOB, STAGES, stageIndex, type JobPhase } from '@/content/demo/job-j2417'
import styles from './JobConsole.module.css'

/** A value the live system fills in. In the drawing it renders as a hatched placeholder. */
function V({ children }: { children: React.ReactNode }) {
  return <span className={styles.v}>{children}</span>
}

function Note({ className, children }: { className?: string; children: React.ReactNode }) {
  return <span className={`${styles.note} ${className ?? ''}`}>{children}</span>
}

type Props = {
  mode: 'draft' | 'live'
  phase: JobPhase
  onApprove?: () => void
}

/*
  One operations console, rendered twice with identical markup: once as the drawing,
  once as working software. Draft-only annotations are absolutely positioned, so
  both layers keep exactly the same geometry at every width.
*/
export default function JobConsole({ mode, phase, onApprove }: Props) {
  const draft = mode === 'draft'
  const activeIdx = phase.active === 'complete' ? STAGES.length : stageIndex(phase.active)
  const progress = Math.min(activeIdx, STAGES.length - 1) / (STAGES.length - 1)

  return (
    <div className={styles.console} data-mode={mode}>
      <div className={styles.head}>
        <div>
          <p className={styles.id}>
            Job <V>{SAMPLE_JOB.id}</V>
          </p>
          <p className={styles.scope}>
            <V>{SAMPLE_JOB.scope}</V>
          </p>
          <p className={styles.site}>
            <V>
              {SAMPLE_JOB.site} · {SAMPLE_JOB.siteNote}
            </V>
          </p>
        </div>
        <p className={styles.status} data-review={phase.needsReview ? '' : undefined}>
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
          <p className={styles.main}>
            <V>{SAMPLE_JOB.crew}</V>
          </p>
          <p>
            <V>{SAMPLE_JOB.slot}</V>
          </p>
          <p className={styles.meta}>
            <V>{phase.schedule}</V>
          </p>
          {draft && <Note>From the signed estimate</Note>}
        </section>
        <section className={styles.panel}>
          <h3>Materials</h3>
          <p className={styles.main}>
            <V>{SAMPLE_JOB.material.name}</V>
          </p>
          <p>
            <V>
              {SAMPLE_JOB.material.qty} · {SAMPLE_JOB.material.location}
            </V>
          </p>
          <p className={styles.meta}>
            <V>{phase.materials}</V>
          </p>
          {draft && <Note>Held with the crew</Note>}
        </section>
        <section className={styles.panel} data-review={phase.needsReview ? '' : undefined}>
          <h3>Billing</h3>
          <p className={styles.main}>
            <V>{phase.billing}</V>
          </p>
          <p>
            <V>{phase.billingNote}</V>
          </p>
          <p className={styles.meta}>
            {phase.needsReview && !draft ? (
              <button type="button" className={styles.approve} onClick={onApprove}>
                Approve and send
              </button>
            ) : phase.needsReview ? (
              <span className={styles.approve}>Approve and send</span>
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
