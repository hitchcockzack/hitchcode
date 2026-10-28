import styles from './Recognition.module.css'

type Copy = {
  dept: string
  where: string
  lines: { text: string; drift?: string }[]
}

// The same job as each department has it written down. Drift is marked, not explained.
const COPIES: Copy[] = [
  {
    dept: 'Sales',
    where: 'CRM',
    lines: [{ text: 'J-2417 · 14 Larch St.' }, { text: 'Attic insulation + air sealing' }, { text: 'R-49 · 2-story colonial' }],
  },
  {
    dept: 'Estimating',
    where: 'Spreadsheet',
    lines: [{ text: '14 Larch Street' }, { text: 'Attic + air seal · 62 bags' }, { text: 'Total $8,940' }],
  },
  {
    dept: 'Scheduling',
    where: 'Whiteboard',
    lines: [{ text: 'Larch St' }, { text: 'Mon', drift: 'time?' }, { text: 'Crew 3' }],
  },
  {
    dept: 'Warehouse',
    where: 'Pick sheet',
    lines: [{ text: 'Larch' }, { text: '48 bags R-49', drift: 'should be 62' }, { text: 'Staged Tue' }],
  },
  {
    dept: 'Field',
    where: 'Crew sheet',
    lines: [{ text: '14 Larch · 7:30' }, { text: 'Bring sealant' }, { text: 'Closed Mon 15:12' }],
  },
  {
    dept: 'Accounting',
    where: 'Invoice',
    lines: [{ text: 'Not started', drift: 'waiting on paperwork' }],
  },
]

const OBSERVATIONS = [
  'The lead is typed into the CRM, then typed again into the estimate.',
  'The schedule moves. The warehouse is still working from Tuesday.',
  'The truck leaves with 48 bags for a 62-bag job.',
  'The work is finished Monday. The invoice goes out when someone finds the paperwork.',
]

/*
  02 — Recognition. Light warm surface, one large statement, and one job written down
  six times. Horizontal on wide screens, a vertical stack on phones.
*/
export default function Recognition() {
  return (
    <section className={styles.section} aria-labelledby="recognition-title">
      <div className={styles.inner}>
        <p className={styles.kicker}>02 · Where the work gets stuck</p>
        <div className={styles.lead}>
          <h2 id="recognition-title" className={styles.statement}>
            Growth can hide a remarkable amount of friction.
          </h2>
          <ol className={styles.observations}>
            {OBSERVATIONS.map((line, i) => (
              <li key={line}>
                <span className={styles.delta} aria-hidden="true">
                  △{i + 1}
                </span>
                {line}
              </li>
            ))}
          </ol>
        </div>

        <figure className={styles.copies}>
          <figcaption className={styles.caption}>
            One job, as six departments have it written down · Sample job J-2417
          </figcaption>
          <ol className={styles.slips}>
            {COPIES.map((copy, i) => (
              <li key={copy.dept} className={styles.slip} style={{ '--i': i } as React.CSSProperties}>
                <p className={styles.slipHead}>
                  <span>{copy.dept}</span>
                  <span>{copy.where}</span>
                </p>
                {copy.lines.map((line) => (
                  <p key={line.text} className={styles.slipLine} data-drift={line.drift ? '' : undefined}>
                    <span>{line.text}</span>
                    {line.drift && <span className={styles.driftNote}>{line.drift}</span>}
                  </p>
                ))}
              </li>
            ))}
          </ol>
        </figure>
      </div>
    </section>
  )
}
