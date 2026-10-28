'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import styles from './lab-nav.module.css'

const STUDIES = [
  { href: '/design-lab/a', key: 'A', name: 'Technical Atelier' },
  { href: '/design-lab/b', key: 'B', name: 'The Control Room' },
  { href: '/design-lab/c', key: 'C', name: 'The Living Blueprint' },
  { href: '/design-lab/system', key: 'G3', name: 'Gate 3 system sheet' },
]

// Review-only switcher. Screenshot runs hide it via [data-lab-nav].
export default function LabNav() {
  const pathname = usePathname()

  return (
    <nav aria-label="Design lab studies" className={styles.nav} data-lab-nav>
      <Link href="/design-lab" className={styles.home} aria-current={pathname === '/design-lab' ? 'page' : undefined}>
        Lab
      </Link>
      {STUDIES.map((study) => (
        <Link
          key={study.key}
          href={study.href}
          title={study.name}
          aria-label={`Study ${study.key}: ${study.name}`}
          aria-current={pathname === study.href ? 'page' : undefined}
          className={styles.item}
        >
          {study.key}
        </Link>
      ))}
    </nav>
  )
}
