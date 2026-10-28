import styles from './PrintedSlip.module.css'

type Props = {
  title: string
  reference: string
  lines: { label?: string; value: string }[]
  stamp?: string
  className?: string
  ariaLabel: string
}

/* A dot-matrix printout on tractor-feed paper: what a managed service hands back. */
export default function PrintedSlip({ title, reference, lines, stamp, className, ariaLabel }: Props) {
  return (
    <div className={`${styles.wrap} ${className ?? ''}`} role="group" aria-label={ariaLabel}>
      <div className={styles.paper}>
        <p className={styles.line}>
          <span>{title}</span>
          <span>{reference}</span>
        </p>
        {lines.map((line) => (
          <p key={`${line.label}-${line.value}`} className={styles.line}>
            {line.label && <span className={styles.key}>{line.label}</span>}
            <span>{line.value}</span>
          </p>
        ))}
        {stamp && <p className={styles.stamp}>{stamp}</p>}
      </div>
    </div>
  )
}
