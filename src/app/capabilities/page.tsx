import type { Metadata } from 'next'
import Link from 'next/link'

import JobReveal from '@/components/showroom/JobReveal'
import page from '@/components/site/Page.module.css'
import { ENGAGEMENT_STEPS } from '@/content/engagement'
import { PRIMARY_CTA } from '@/content/site'
import styles from './capabilities.module.css'

export const metadata: Metadata = {
  title: 'Capabilities',
  description:
    'Systems engineering and integration, fractional technology leadership, custom software and AI workflows, and equipment connectivity for established operations.',
  alternates: { canonical: '/capabilities' },
}

const CAPABILITIES = [
  {
    id: 'integration',
    no: '01',
    type: 'Systems engineering and integration',
    title: 'Connect what exists.',
    sub: 'Your tools should agree about what happened.',
    body: [
      'Most companies already pay for capable software. The trouble is that each department keeps its own copy of the job, and people spend their days keeping the copies in sync by hand.',
      'We map how information actually moves, decide what should be the single record, and connect the tools around it. What already works is left alone.',
    ],
    gets: [
      'A map of the tools you pay for and how jobs move between them',
      'One job record the departments share',
      'Connections across CRM, estimating, scheduling, inventory and accounting',
      'Monitoring, so a broken connection is caught before a customer notices',
      'Plain documentation your team can read',
    ],
  },
  {
    id: 'leadership',
    no: '02',
    type: 'Fractional technology leadership',
    title: 'Lead the technical decisions.',
    sub: 'Someone needs to own the technical decisions.',
    body: [
      'Growing companies make expensive technology decisions without anyone whose job it is to make them: which system to keep, what to replace, what a renewal should cost, and whether a vendor is delivering.',
      'We take that seat part-time. Every decision is written down with the trade-off, the cost and who approved it, so the next one is easier.',
    ],
    gets: [
      'A roadmap tied to operating problems, not feature lists',
      'Vendor evaluations, renewals and contract reviews',
      'Oversight of other developers and implementation partners',
      'A written decision record',
      'A standing monthly review with the owner',
    ],
  },
  {
    id: 'software',
    no: '03',
    type: 'Custom software and AI workflows',
    title: 'Build what’s missing.',
    sub: 'When the right tool doesn’t exist, we make it.',
    body: [
      'Sometimes the gap is a crew close-out on a phone, a pricing tool your estimators trust, or an agent that answers the phone at 7 a.m. We build these as small systems you own, shaped around how your people already work.',
      'AI is used where it removes routine work, with checks, logs and a person in the loop wherever money or customers are affected.',
    ],
    gets: [
      'Internal tools: field apps, pricing tools, screens that answer one question',
      'AI workflows with checks and human review: call handling, document drafting, follow-ups',
      'Customer-facing portals when they remove phone calls',
      'Full ownership of the code and the data',
    ],
  },
  {
    id: 'hardware',
    no: '04',
    type: 'Equipment and hardware connectivity',
    title: 'Make equipment report in.',
    sub: 'Machines and devices belong on the same record.',
    body: [
      'Phones, scanners, sensors, audio and on-site equipment create information that rarely reaches the business systems. We connect devices to the record, so what happens on site is known in the office.',
      'Example of this kind of work: a software audio controller and multiplexer with deduplication and remote control, built for an audio monitoring operation (client name withheld).',
    ],
    gets: [
      'Device and equipment data written to the business record',
      'Remote control and status for on-site equipment',
      'Alerts that reach a person, not a dashboard nobody opens',
    ],
  },
]

/*
  Capabilities. The hero is study C, the Living Blueprint: the page opens on a blueprint
  where the same job console is drawn and running, divided by a build line.
*/
export default function CapabilitiesPage() {
  return (
    <main id="main" className="hc-page">
      <section className={styles.field} aria-labelledby="capabilities-hero-title">
        <div className={styles.ticks} aria-hidden="true">
          {Array.from({ length: 26 }, (_, i) => (
            <span key={i}>{String(i).padStart(2, '0')}</span>
          ))}
        </div>
        <div className={styles.heroGrid}>
          <div className={styles.copy}>
            <p className={styles.kicker}>
              <span className={styles.kickerMark} aria-hidden="true" />
              Capabilities · From plan to live system
            </p>
            <h1 id="capabilities-hero-title" className={styles.title}>
              Drawn first. Then built to run.
            </h1>
            <p className={styles.lede}>
              Every engagement starts as a blueprint you can read and approve, and ends as a working system your people
              use. Drag the line across the console to see both.
            </p>
            <div className={styles.actions}>
              <Link href={PRIMARY_CTA.href} className={styles.primary}>
                {PRIMARY_CTA.label} <span aria-hidden="true">→</span>
              </Link>
              <a href="#integration" className={styles.secondary}>
                The four capabilities
              </a>
            </div>
          </div>
          <JobReveal id="console" material="blueprint" />
        </div>
      </section>

      <section className={page.sheet} aria-labelledby="capabilities-list-title">
        <div className={page.inner}>
          <div className={page.head}>
            <div>
              <p className={page.kickerDark}>Capabilities · Four kinds of work</p>
              <h2 id="capabilities-list-title" className={page.h2}>
                What we do, and what you receive.
              </h2>
            </div>
            <p className={page.intro}>
              Most engagements start with one capability and grow into the others. All of them are delivered by the
              same accountable engineer.
            </p>
          </div>

          <ol className={page.rows}>
            {CAPABILITIES.map((cap) => (
              <li key={cap.id} id={cap.id} className={page.row}>
                <p className={page.rowNo}>
                  {cap.no}
                  <span className={page.rowType}>{cap.type}</span>
                </p>
                <div>
                  <h3 className={page.rowTitle}>{cap.title}</h3>
                  <p className={page.rowSub}>{cap.sub}</p>
                </div>
                <div className={page.rowBody}>
                  {cap.body.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                  <ul className={page.ticks} aria-label="What you receive">
                    {cap.gets.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className={page.sheetAlt} aria-labelledby="engagement-title">
        <div className={page.inner}>
          <div className={page.head}>
            <div>
              <p className={page.kickerDark}>If you choose Hitchcode</p>
              <h2 id="engagement-title" className={page.h2}>
                What working together looks like.
              </h2>
            </div>
            <p className={page.intro}>
              Five sheets, in order. Nothing is built before you have approved the drawing, and nothing goes live in one
              big launch.
            </p>
          </div>
          <ol className={page.steps}>
            {ENGAGEMENT_STEPS.map((step) => (
              <li key={step.no}>
                <span className={page.stepNo}>Sheet {step.no}</span>
                <span className={page.stepName}>{step.name}</span>
                <span className={page.stepBody}>{step.detail}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className={page.band} aria-labelledby="capabilities-cta">
        <div className={page.inner}>
          <p className={page.kicker}>Start with the map</p>
          <h2 id="capabilities-cta" className={page.bandTitle}>
            Where is the work getting stuck?
          </h2>
          <div className={page.actions}>
            <Link href={PRIMARY_CTA.href} className={page.primary}>
              {PRIMARY_CTA.label} <span aria-hidden="true">→</span>
            </Link>
            <Link href="/solutions" className={page.secondary}>
              Or buy the result: managed operations
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
