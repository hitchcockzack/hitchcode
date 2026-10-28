import Link from 'next/link'

import BlueprintAppDrawing from './BlueprintAppDrawing'
import PrintedSlip from './PrintedSlip'
import WiringDiagram from './WiringDiagram'
import styles from './CapabilityChapters.module.css'

// Sample decision record: illustrates the kind of decisions a fractional technology lead owns.
const DECISIONS = [
  {
    rev: 'A',
    when: 'Week 1',
    decision: 'Keep the accounting system. Connect it instead of replacing it.',
    why: 'Clean books, trained staff, no reason to migrate',
    by: 'Owner',
  },
  {
    rev: 'B',
    when: 'Week 2',
    decision: 'Retire the whiteboard. One schedule the warehouse can read.',
    why: 'Date changes were not reaching inventory',
    by: 'Ops lead',
  },
  {
    rev: 'C',
    when: 'Week 4',
    decision: 'Renew the CRM at the lower tier.',
    why: 'Half the paid seats were unused',
    by: 'Owner',
  },
  {
    rev: 'D',
    when: 'Week 6',
    decision: 'Build a crew close-out app instead of buying one.',
    why: 'No field app fit the checklist the crews use',
    by: 'Owner',
  },
]

/*
  04 — Capabilities as editorial chapters. Each kind of work gets its own material:
  integration is wired on paper, new software is drafted on blueprint, leadership is a
  decision record, and managed work arrives as a printout.
*/
export default function CapabilityChapters() {
  return (
    <section className={styles.section} aria-labelledby="capabilities-title" id="capabilities">
      <header className={styles.head}>
        <p className={styles.kicker}>04 · What we do</p>
        <h2 id="capabilities-title" className={styles.title}>
          Four kinds of work, one accountable engineer.
        </h2>
        <p className={styles.intro}>
          Most engagements start with one and grow into the others. Each is different work, so each is drawn
          differently.
        </p>
      </header>

      <article className={`${styles.chapter} ${styles.ch01}`} aria-labelledby="ch01-title">
        <div className={styles.copy}>
          <p className={styles.no}>01</p>
          <h3 id="ch01-title" className={styles.chTitle}>
            Connect what exists.
          </h3>
          <p className={styles.sub}>Your tools should agree about what happened.</p>
          <p className={styles.body}>
            Most companies already pay for the right software, but the CRM, the schedule, the warehouse and the books
            each keep their own version of the job. We connect them so one change lands everywhere it should, and we
            leave alone what already works.
          </p>
          <p className={styles.example}>
            <span>Example</span> The connected operation above: one record from the first call to the paid invoice.
          </p>
          <Link href="/capabilities#integration" className={styles.more}>
            Systems engineering and integration <span aria-hidden="true">→</span>
          </Link>
        </div>
        <WiringDiagram />
      </article>

      <article className={`${styles.chapter} ${styles.ch02}`} aria-labelledby="ch02-title">
        <div className={styles.drawing}>
          <BlueprintAppDrawing />
        </div>
        <div className={styles.copy}>
          <p className={styles.no}>02</p>
          <h3 id="ch02-title" className={styles.chTitle}>
            Build what&apos;s missing.
          </h3>
          <p className={styles.sub}>When the right tool doesn&apos;t exist, we make it.</p>
          <p className={styles.body}>
            A crew close-out on a phone, a pricing tool your estimators trust, an agent that answers the phone at
            7 a.m. We build small systems you own, around how your people already work, with checks and a person in
            the loop where it matters.
          </p>
          <p className={styles.example}>
            <span>Example</span> The AI concierge at the bottom of this page. It calls you, asks real questions, and
            emails a recap.
          </p>
          <Link href="/capabilities#software" className={styles.more}>
            Custom software and AI workflows <span aria-hidden="true">→</span>
          </Link>
        </div>
      </article>

      <article className={`${styles.chapter} ${styles.ch03}`} aria-labelledby="ch03-title">
        <div className={styles.copyWide}>
          <div>
            <p className={styles.no}>03</p>
            <h3 id="ch03-title" className={styles.chTitle}>
              Lead the technical decisions.
            </h3>
          </div>
          <div>
            <p className={styles.sub}>Someone needs to own the technical decisions.</p>
            <p className={styles.body}>
              Which system to keep, what to replace, what a renewal should cost, and what to build next. We take that
              seat part-time, and every decision is written down with the trade-off and who approved it.
            </p>
          </div>
        </div>

        <div className={styles.tableWrap}>
          <table className={styles.revisions}>
            <caption>Decision record · sample, concept demonstration</caption>
            <thead>
              <tr>
                <th scope="col">Rev</th>
                <th scope="col">When</th>
                <th scope="col">Decision</th>
                <th scope="col">Why</th>
                <th scope="col">Approved</th>
              </tr>
            </thead>
            <tbody>
              {DECISIONS.map((row) => (
                <tr key={row.rev}>
                  <td className={styles.rev}>
                    <span aria-hidden="true">△</span>
                    {row.rev}
                  </td>
                  <td>{row.when}</td>
                  <td className={styles.decision}>{row.decision}</td>
                  <td>{row.why}</td>
                  <td>{row.by}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Link href="/capabilities#leadership" className={styles.more}>
          Fractional technology leadership <span aria-hidden="true">→</span>
        </Link>
      </article>

      <article className={`${styles.chapter} ${styles.ch04}`} aria-labelledby="ch04-title">
        <div className={styles.copy}>
          <p className={styles.no}>04</p>
          <h3 id="ch04-title" className={styles.chTitle}>
            Take work off the operation.
          </h3>
          <p className={styles.sub}>You should receive the result, not another dashboard to manage.</p>
          <p className={styles.body}>
            For lead handling and invoicing you can buy the finished output instead of software: leads answered,
            qualified and booked; invoices drafted, checked and sent. Exceptions go to a person, and you get a plain
            record of everything done.
          </p>
          <p className={styles.example}>
            <span>Example</span> A lead recap, as the office receives it.
          </p>
          <Link href="/solutions" className={styles.more}>
            Managed operations <span aria-hidden="true">→</span>
          </Link>
        </div>
        <PrintedSlip
          className={styles.slip}
          ariaLabel="Sample lead recap printout, concept demonstration"
          title="Lead recap"
          reference="MON 07:05"
          lines={[
            { label: 'Caller', value: 'Homeowner' },
            { label: 'Site', value: '14 Larch St.' },
            { label: 'Scope', value: 'Attic insulation' },
            { label: 'Fit', value: 'Service area · 3 wks' },
            { label: 'Booked', value: 'Visit Thu 10:00' },
            { label: 'Duplicate', value: 'None' },
          ]}
          stamp="Ready for estimator"
        />
      </article>
    </section>
  )
}
