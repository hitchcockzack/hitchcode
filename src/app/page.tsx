import type { Metadata } from 'next'

import CapabilityChapters from '@/components/home/CapabilityChapters'
import ContactClose from '@/components/home/ContactClose'
import HeroAtelier from '@/components/home/HeroAtelier'
import ManagedOutputs from '@/components/home/ManagedOutputs'
import Principle from '@/components/home/Principle'
import Recognition from '@/components/home/Recognition'
import SelectedWork from '@/components/home/SelectedWork'
import JobReveal from '@/components/showroom/JobReveal'
import OperationMap from '@/components/showroom/OperationMap'
import styles from './home.module.css'

export const metadata: Metadata = {
  alternates: { canonical: '/' },
}

/*
  The homepage follows the PRD storyboard, sheet by sheet:
  01 hero · 02 recognition · 03 connected operation · 04 capabilities · 05 plan to live
  06 proof · 07 managed outputs · 08 principle · 09 contact (with the live AI concierge).
*/
export default function HomePage() {
  return (
    <main id="main" className="hc-page">
      <HeroAtelier />
      <Recognition />

      <section id="operation" className={styles.sheet} aria-label="The connected operation">
        <div className={styles.frame}>
          <OperationMap />
        </div>
      </section>

      <CapabilityChapters />

      <section id="plan-to-live" className={styles.sheet} aria-labelledby="plan-title">
        <div className={styles.frame}>
          <div className={styles.revealHead}>
            <div>
              <p className={styles.kicker}>05 · From plan to live system</p>
              <h2 id="plan-title" className={styles.h2}>
                The same console, drawn and running.
              </h2>
            </div>
            <p className={styles.lede}>
              Every engagement starts as a drawing you can read and approve. Drag the build line to see the same job
              console as the plan and as working software, or switch to the live system and watch the job run to an
              approved invoice.
            </p>
          </div>
          <JobReveal id="system" />
        </div>
      </section>

      <SelectedWork />
      <ManagedOutputs />
      <Principle />
      <ContactClose />
    </main>
  )
}
