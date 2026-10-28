import Image from 'next/image'
import Link from 'next/link'

import { ENGAGEMENT_STEPS } from '@/content/engagement'
import styles from './HomeSections.module.css'

/*
  08 — The principle. One operating philosophy, the person behind it, and the five
  sheets of a typical engagement.
*/
export default function Principle() {
  return (
    <section className={styles.principle} aria-labelledby="principle-title">
      <div className={styles.principleInner}>
        <figure className={styles.portrait}>
          <Image
            src="/optimized/zack.webp"
            alt="Zack Hitchcock, founder of Hitchcode"
            width={256}
            height={256}
            sizes="(max-width: 899px) 160px, 220px"
          />
          <figcaption>Zack Hitchcock · Founder</figcaption>
        </figure>

        <div className={styles.principleCopy}>
          <p className={styles.kicker}>08 · How we work</p>
          <h2 id="principle-title" className={styles.statement}>
            Fix the handoffs before buying more software.
          </h2>
          <p className={styles.principleBody}>
            Most operations do not need another platform. They need the tools they already have to agree, and someone
            accountable for making that happen. Hitchcode is Zack Hitchcock: carpenter, Army Airborne infantryman and
            construction project manager before he was a software engineer. You work directly with the person doing the
            engineering.
          </p>
          <Link href="/about" className={styles.more}>
            About Zack <span aria-hidden="true">→</span>
          </Link>
        </div>

        <ol className={styles.sheetIndex} aria-label="How an engagement runs">
          {ENGAGEMENT_STEPS.map((step) => (
            <li key={step.no}>
              <span className={styles.sheetNo}>Sheet {step.no}</span>
              <span className={styles.sheetName}>{step.name}</span>
              <span className={styles.sheetLine}>{step.line}</span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
