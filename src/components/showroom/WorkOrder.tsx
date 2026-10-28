import { SAMPLE_JOB } from '@/content/demo/job-j2417'
import styles from './WorkOrder.module.css'

type Props = {
  /** Rubber-stamp text. Re-lands whenever it changes. */
  stamp: string
  tone?: 'alert' | 'settled'
  status: string
  className?: string
}

/*
  Printed work order on tractor-feed paper: the system's retro artifact. It carries
  real job information and its stamp reports the state of the demo it sits beside.
*/
export default function WorkOrder({ stamp, tone = 'alert', status, className }: Props) {
  return (
    <aside className={`${styles.wrap} ${className ?? ''}`} aria-label="Sample work order, concept demonstration">
      <div className={styles.ticket}>
        <p className={styles.line}>
          <span>Work order</span>
          <span>{SAMPLE_JOB.id}</span>
        </p>
        <p className={styles.line}>
          <span>{SAMPLE_JOB.scope}</span>
        </p>
        <p className={styles.line}>
          <span>{SAMPLE_JOB.site}</span>
          <span>{SAMPLE_JOB.crew}</span>
        </p>
        <p className={styles.line}>
          <span>Mon 11/3 07:30</span>
          <span>62 bags R-49</span>
        </p>
        <p className={styles.line}>
          <span>{status}</span>
        </p>
        <p key={stamp} className={styles.stamp} data-tone={tone} role="status">
          {stamp}
        </p>
      </div>
    </aside>
  )
}
