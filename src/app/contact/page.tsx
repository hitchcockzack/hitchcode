import type { Metadata } from 'next'

import ConciergeCall from '@/components/showroom/ConciergeCall'
import ContactForm from '@/components/site/ContactForm'
import page from '@/components/site/Page.module.css'
import { SITE } from '@/content/site'
import styles from './contact-page.module.css'

export const metadata: Metadata = {
  title: 'Discuss your operation',
  description:
    'Tell Hitchcode where the work is getting stuck. Zack replies personally, or the AI concierge can call you now.',
  alternates: { canonical: '/contact' },
}

export default function ContactPage() {
  return (
    <main id="main" className="hc-page">
      <section className={page.hero} aria-labelledby="contact-title">
        <div className={`${page.heroInner} ${styles.grid}`}>
          <div>
            <p className={page.kicker}>Contact · Discuss your operation</p>
            <h1 id="contact-title" className={page.title}>
              Where is the work getting stuck?
            </h1>
            <p className={page.lede}>
              A few sentences are enough: the department, the handoff, or the thing that keeps landing on your desk.
              Zack reads every message himself.
            </p>

            <dl className={styles.direct}>
              <div>
                <dt>Email</dt>
                <dd>
                  <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
                </dd>
              </div>
              <div>
                <dt>Phone</dt>
                <dd>
                  <a href={SITE.phoneHref}>{SITE.phone}</a>
                </dd>
              </div>
              <div>
                <dt>LinkedIn</dt>
                <dd>
                  <a href={SITE.linkedin} target="_blank" rel="noopener noreferrer">
                    Zack Hitchcock
                  </a>
                </dd>
              </div>
            </dl>

            <div className={styles.expect}>
              <p className={styles.expectHead}>What happens next</p>
              <ol>
                <li>A personal reply, usually within one business day.</li>
                <li>One call about your operation. No pitch deck.</li>
                <li>A straight answer on whether an engagement is worth it.</li>
              </ol>
            </div>
          </div>

          <ContactForm />
        </div>
      </section>

      <section className={page.ink} aria-labelledby="concierge-title" id="concierge">
        <div className={`${page.inner} ${styles.grid}`}>
          <div>
            <p className={page.kicker}>Or talk now</p>
            <h2 id="concierge-title" className={page.h2}>
              Let the AI concierge call you.
            </h2>
            <p className={page.lede}>
              It calls within seconds, asks what is slowing the operation down, and emails a written recap. It is also
              a working example of what we build.
            </p>
          </div>
          <ConciergeCall />
        </div>
      </section>
    </main>
  )
}
