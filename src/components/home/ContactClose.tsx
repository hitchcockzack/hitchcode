import Link from 'next/link'

import { PRIMARY_CTA, SITE } from '@/content/site'
import ConciergeCall from '@/components/showroom/ConciergeCall'
import styles from './HomeSections.module.css'

/*
  09 — Contact. One invitation, one clear action, and the live AI concierge for anyone who
  would rather talk now. The job thread at the bottom loops back to sheet 001.
*/
export default function ContactClose() {
  return (
    <section className={styles.close} aria-labelledby="close-title" id="concierge">
      <div className={styles.closeInner}>
        <div className={styles.closeCopy}>
          <p className={styles.kickerDark}>09 · Start here</p>
          <h2 id="close-title" className={styles.closeTitle}>
            Where is the work getting stuck?
          </h2>
          <p className={styles.closeBody}>
            Tell us where the handoffs break. The first conversation is about your operation, not our software, and
            you will leave it with a clearer picture either way.
          </p>
          <Link href={PRIMARY_CTA.href} className={styles.closeCta}>
            {PRIMARY_CTA.label}
            <span aria-hidden="true">→</span>
          </Link>
          <p className={styles.direct}>
            <span>Or directly</span>
            <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
            <a href={SITE.phoneHref}>{SITE.phone}</a>
          </p>
        </div>

        <div className={styles.closeConcierge}>
          <p className={styles.conciergeIntro}>
            <b>Rather talk now?</b> Our AI concierge will call you in seconds, ask about your operation, and email you a
            recap. It is a working example of what we build.
          </p>
          <ConciergeCall />
        </div>
      </div>

      <a href="#main" className={styles.loop}>
        <span className={styles.loopLine} aria-hidden="true" />
        <span>Back to sheet 001</span>
        <span aria-hidden="true">↑</span>
      </a>
    </section>
  )
}
