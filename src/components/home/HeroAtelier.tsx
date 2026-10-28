import Link from 'next/link'

import { PRIMARY_CTA } from '@/content/site'
import HeroSheet from './HeroSheet'
import styles from './HeroAtelier.module.css'

/*
  01 — Hero. A drawing set on a dark studio table. The headline crosses from the room
  onto the sheet and inverts as it goes, so type and drawing read as one object.
*/
export default function HeroAtelier() {
  return (
    <section className={styles.room} aria-labelledby="hero-title">
      <div className={styles.hero}>
        <p className={styles.kicker}>
          <span>System study 001</span>
          <span aria-hidden="true">—</span>
          <span>One job, drawn through the company</span>
        </p>

        <h1 id="hero-title" className={styles.title}>
          <span className={styles.titleLine}>You built the business.</span>
          <span className={`${styles.titleLine} ${styles.titleIndent}`}>We engineer what runs it.</span>
        </h1>

        <p className={styles.lede}>
          We connect the software, workflows, and equipment behind established companies, and build what is missing.
          Less work between teams. More control over the operation.
        </p>

        <div className={styles.actions}>
          <Link href={PRIMARY_CTA.href} className={styles.primary}>
            {PRIMARY_CTA.label}
            <span aria-hidden="true" className={styles.arrow}>
              →
            </span>
          </Link>
          <a href="#operation" className={styles.secondary}>
            Explore the systems
          </a>
        </div>

        <HeroSheet />
      </div>
    </section>
  )
}
