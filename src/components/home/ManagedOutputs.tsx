import Link from 'next/link'

import { INVOICES_CHANNEL, LEADS_CHANNEL } from '@/content/demo/managed-outputs'
import ControlRoom from '@/components/showroom/ControlRoom'
import styles from './HomeSections.module.css'

const OFFERS = [
  {
    name: 'Managed lead handling',
    input: 'Calls, web forms and missed calls',
    review: 'Anything outside your standard scope goes to a person',
    result: 'Qualified visits on your calendar, and a recap for every lead',
  },
  {
    name: 'Managed invoicing',
    input: 'Closed jobs, signed estimates and change orders',
    review: 'Mismatches and unsigned changes go to a person',
    result: 'Invoices sent when the work ends, and a weekly unbilled report',
  },
]

/*
  07 — Managed outputs, in the control room. The terminal switches between the two
  managed services; each line is a finished output or a hand-off to a person.
*/
export default function ManagedOutputs() {
  return (
    <section className={styles.managed} aria-labelledby="managed-title" id="managed">
      <div className={styles.managedInner}>
        <div className={styles.managedCopy}>
          <p className={styles.kickerDark}>07 · Managed operations</p>
          <h2 id="managed-title" className={styles.h2Dark}>
            You should receive the result, not another dashboard to manage.
          </h2>
          <p className={styles.managedLede}>
            Some work is better bought finished. We run lead handling and invoicing as a service: the system does the
            routine, a person handles the exceptions, and you get a plain record of what was done.
          </p>

          <dl className={styles.offers}>
            {OFFERS.map((offer) => (
              <div key={offer.name} className={styles.offer}>
                <dt>{offer.name}</dt>
                <dd>
                  <span>In</span>
                  {offer.input}
                </dd>
                <dd>
                  <span>Review</span>
                  {offer.review}
                </dd>
                <dd>
                  <span>Result</span>
                  {offer.result}
                </dd>
              </div>
            ))}
          </dl>

          <p className={styles.status}>
            Offered as a service. Scope, review rules and response times are agreed with each company before anything
            goes live.
          </p>
          <Link href="/solutions" className={styles.moreDark}>
            How managed operations work <span aria-hidden="true">→</span>
          </Link>
        </div>

        <ControlRoom channels={[LEADS_CHANNEL, INVOICES_CHANNEL]} className={styles.terminal} />
      </div>
    </section>
  )
}
