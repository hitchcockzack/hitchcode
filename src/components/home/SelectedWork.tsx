import Link from 'next/link'

import styles from './HomeSections.module.css'

const AVL_FLOW = [
  { who: 'Parent', does: 'Uploads a birth certificate once' },
  { who: 'AgeLock verifier', does: 'Checks the document' },
  { who: 'Coach', does: 'Sees a verified roster' },
  { who: 'Club director', does: 'Assigns players to teams' },
  { who: 'Event director', does: 'Confirms eligibility at check-in' },
]

/*
  06 — Proof. Two working systems and one operating history, presented as exhibits
  laid on the dark table. No logos, no invented results.
*/
export default function SelectedWork() {
  return (
    <section className={styles.work} aria-labelledby="work-title" id="work">
      <div className={styles.inner}>
        <p className={styles.kickerDark}>06 · Selected work</p>
        <h2 id="work-title" className={styles.h2Dark}>
          Work that is running today.
        </h2>

        <article className={styles.exhibit} aria-labelledby="avl-title">
          <div className={styles.exhibitCopy}>
            <p className={styles.exhibitKicker}>Product · built and operated by Hitchcode&apos;s founder</p>
            <h3 id="avl-title" className={styles.exhibitTitle}>
              AgeVerified Lax
            </h3>
            <p className={styles.exhibitBody}>
              Youth lacrosse runs on age divisions, and checking ages by hand is slow and easy to game. AgeVerified Lax
              puts verification, rosters, scheduling and event eligibility on one platform for club directors, coaches,
              parents and event organizers.
            </p>
            <p className={styles.exhibitBody}>
              The pattern is the one this site is about: one action, recorded once, trusted everywhere downstream.
            </p>
            <p className={styles.links}>
              <Link href="/work/ageverified-lax">
                Read the case study <span aria-hidden="true">→</span>
              </Link>
              <a href="https://ageverifiedlax.com/info" target="_blank" rel="noopener noreferrer">
                ageverifiedlax.com <span aria-hidden="true">↗</span>
              </a>
            </p>
          </div>

          <figure className={styles.flowSheet}>
            <figcaption className={styles.flowCaption}>One upload, every role · AgeVerified Lax</figcaption>
            <ol className={styles.flow}>
              {AVL_FLOW.map((step, i) => (
                <li key={step.who} className={styles.flowStep}>
                  <span className={styles.flowNo}>{String(i + 1).padStart(2, '0')}</span>
                  <span className={styles.flowWho}>{step.who}</span>
                  <span className={styles.flowDoes}>{step.does}</span>
                </li>
              ))}
            </ol>
          </figure>
        </article>

        <div className={styles.pair}>
          <article className={styles.minor} aria-labelledby="concierge-title">
            <p className={styles.exhibitKicker}>Running on this site</p>
            <h3 id="concierge-title" className={styles.minorTitle}>
              The AI concierge
            </h3>
            <p className={styles.exhibitBody}>
              Enter a number and it calls within seconds, asks what is slowing the operation down, and emails a written
              recap. Behind it: a phone line, a realtime voice model, a record of every lead and call, consent and rate
              limits, and a summary a person can act on.
            </p>
            <p className={styles.links}>
              <a href="#concierge">
                Have it call you <span aria-hidden="true">↓</span>
              </a>
            </p>
          </article>

          <article className={styles.minor} aria-labelledby="history-title">
            <p className={styles.exhibitKicker}>Before Hitchcode</p>
            <h3 id="history-title" className={styles.minorTitle}>
              Field operations
            </h3>
            <p className={styles.exhibitBody}>
              Carpenter, Army Airborne infantryman, then construction project manager on a $3M+ school retrofit
              program with several crews working at once. The handoff problems on this page are the ones that program
              ran into.
            </p>
            <p className={styles.links}>
              <Link href="/about">
                About Zack <span aria-hidden="true">→</span>
              </Link>
            </p>
          </article>
        </div>
      </div>
    </section>
  )
}
