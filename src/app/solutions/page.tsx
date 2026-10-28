import type { Metadata } from 'next'
import Link from 'next/link'

import ControlRoom from '@/components/showroom/ControlRoom'
import page from '@/components/site/Page.module.css'
import { JOB_CHANNEL } from '@/content/demo/managed-outputs'
import { PRIMARY_CTA } from '@/content/site'
import styles from './solutions.module.css'

export const metadata: Metadata = {
  title: 'Solutions',
  description:
    'Managed lead handling and managed invoicing: finished operational work delivered to you, with every exception reviewed by a person.',
  alternates: { canonical: '/solutions' },
}

const SERVICES = [
  {
    id: 'leads',
    no: '01',
    name: 'Managed lead handling',
    line: 'Every call and form answered, qualified and booked, without your office stopping work.',
    flow: 'Answer → match → qualify → book → recap',
    receive: [
      'Qualified site visits placed on your calendar',
      'A written recap for every lead, in your inbox and on the record',
      'No duplicate customers: callers are matched to who you already know',
    ],
    exceptions:
      'Anything outside your standard scope, service area or price range goes to a person on your side, with the recap attached.',
    need: 'Your service area, what you sell, how you price visits, and who takes exceptions.',
    status: 'Offered. Built on the same technology as the AI concierge running on this site.',
  },
  {
    id: 'invoicing',
    no: '02',
    name: 'Managed invoicing',
    line: 'Invoices drafted when the work ends, checked against what was signed, and sent.',
    flow: 'Close → draft → check → send → paid',
    receive: [
      'Invoices drafted from the signed estimate the day a job closes',
      'A check against scope and change orders before anything is sent',
      'A weekly report of anything finished but not yet billed',
    ],
    exceptions:
      'Mismatches, unsigned change orders and unusual amounts are held for a person to approve. Nothing unusual is sent automatically.',
    need: 'Access to where jobs close and where invoices live, plus your approval rules.',
    status: 'Offered. Scope, review rules and response times are agreed with each company before go-live.',
  },
]

const STATUS = [
  { what: 'AI concierge (demo calls)', state: 'Live on this site', href: '/#concierge' },
  { what: 'Managed lead handling', state: 'Offered · scoped per company', href: '#leads' },
  { what: 'Managed invoicing', state: 'Offered · scoped per company', href: '#invoicing' },
  { what: 'Interactive prototypes', state: 'Earlier prototypes · sample data', href: '/demos' },
]

/*
  Solutions. The hero is study B, the Control Room: a period terminal and a scale model
  of the yard running one sample job, with the hardware keys as the real controls.
*/
export default function SolutionsPage() {
  return (
    <main id="main" className="hc-page">
      <section className={styles.room} aria-labelledby="solutions-title">
        <div className={styles.copy}>
          <p className={styles.kicker}>Solutions · Managed operations</p>
          <h1 id="solutions-title" className={styles.title}>
            <span className={styles.dim}>Some work is better bought finished.</span> You receive the result, not
            another dashboard.
          </h1>
          <p className={styles.lede}>
            Lead handling and invoicing, delivered as finished work. The system does the routine, a person handles every
            exception, and you get a plain record of what was done.
          </p>
          <div className={styles.actions}>
            <Link href={PRIMARY_CTA.href} className={styles.primary}>
              {PRIMARY_CTA.label} <span aria-hidden="true">→</span>
            </Link>
            <a href="#leads" className={styles.secondary}>
              The two services <span aria-hidden="true">↓</span>
            </a>
          </div>
        </div>
        <ControlRoom channels={[JOB_CHANNEL]} diorama className={styles.console} badge="Hitchcode · Ops monitor · SS-001" />
      </section>

      <section className={page.ink} aria-labelledby="services-title">
        <div className={page.inner}>
          <div className={page.head}>
            <div>
              <p className={page.kicker}>Two managed services</p>
              <h2 id="services-title" className={page.h2}>
                Finished outputs, with a person on every exception.
              </h2>
            </div>
            <p className={page.intro}>
              These are services, not software licenses. You do not log in to anything to get the value; you receive
              the work, and a record of it.
            </p>
          </div>

          <ol className={page.rows}>
            {SERVICES.map((service) => (
              <li key={service.id} id={service.id} className={page.row}>
                <p className={page.rowNo}>
                  {service.no}
                  <span className={page.rowType}>{service.flow}</span>
                </p>
                <div>
                  <h3 className={page.rowTitle}>{service.name}</h3>
                  <p className={page.rowSub}>{service.line}</p>
                </div>
                <div className={page.rowBody}>
                  <ul className={page.ticks} aria-label="What you receive">
                    {service.receive.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                  <dl className={page.dl}>
                    <div>
                      <dt className={page.dlKey}>Exceptions</dt>
                      <dd>{service.exceptions}</dd>
                    </div>
                    <div>
                      <dt className={page.dlKey}>From you</dt>
                      <dd>{service.need}</dd>
                    </div>
                    <div>
                      <dt className={page.dlKey}>Status</dt>
                      <dd>{service.status}</dd>
                    </div>
                  </dl>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className={page.sheet} aria-labelledby="status-title">
        <div className={page.inner}>
          <div className={page.head}>
            <div>
              <p className={page.kickerDark}>What is live and what is offered</p>
              <h2 id="status-title" className={page.h2}>
                Plainly labelled.
              </h2>
            </div>
            <p className={page.intro}>
              Anything shown with sample data says so. Services become live for a company only after scope and review
              rules are agreed in writing.
            </p>
          </div>
          <table className={styles.status}>
            <thead>
              <tr>
                <th scope="col">What</th>
                <th scope="col">Status</th>
                <th scope="col">
                  <span className={styles.srOnly}>Link</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {STATUS.map((row) => (
                <tr key={row.what}>
                  <td>{row.what}</td>
                  <td>{row.state}</td>
                  <td>
                    <Link href={row.href}>
                      Open <span aria-hidden="true">→</span>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className={page.band} aria-labelledby="solutions-cta">
        <div className={page.inner}>
          <p className={page.kicker}>Hear it before you buy it</p>
          <h2 id="solutions-cta" className={page.bandTitle}>
            Let the AI concierge call you.
          </h2>
          <p className={page.lede}>
            The concierge on the homepage is the same kind of system that runs managed lead handling. It calls in
            seconds, asks about your operation, and emails you a recap.
          </p>
          <div className={page.actions}>
            <Link href="/#concierge" className={page.primary}>
              Request the call <span aria-hidden="true">→</span>
            </Link>
            <Link href={PRIMARY_CTA.href} className={page.secondary}>
              Or {PRIMARY_CTA.label.toLowerCase()}
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
