'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'

import { PRIMARY_CTA, PRIMARY_NAV, SITE } from '@/content/site'
import styles from './SiteHeader.module.css'

/*
  Sticky drafting-room header. Transparent over the top of a page so heroes can run
  underneath it, solid ink once the visitor scrolls. On phones the navigation opens
  as a full-height sheet with large links and the direct contact details.
*/
export default function SiteHeader() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const toggleRef = useRef<HTMLButtonElement>(null)
  const firstLinkRef = useRef<HTMLAnchorElement>(null)

  useEffect(() => {
    let frame = 0
    const onScroll = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => setScrolled(window.scrollY > 8))
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  // Close the sheet on navigation.
  useEffect(() => {
    setOpen(false)
  }, [pathname])

  useEffect(() => {
    if (!open) return
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    firstLinkRef.current?.focus()
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false)
        toggleRef.current?.focus()
      }
    }
    document.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = previous
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`)

  return (
    <header className={styles.header} data-scrolled={scrolled || open ? '' : undefined} data-open={open ? '' : undefined}>
      <div className={styles.bar}>
        <Link href="/" className={styles.brand} aria-label={`${SITE.name}, home`}>
          <span className={styles.wordmark}>{SITE.name}</span>
          <span className={styles.brandNote} aria-hidden="true">
            / Operations engineering
          </span>
        </Link>

        <nav aria-label="Primary" className={styles.nav}>
          {PRIMARY_NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={styles.navLink}
              aria-current={isActive(item.href) ? 'page' : undefined}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <Link href={PRIMARY_CTA.href} className={styles.cta} aria-current={isActive(PRIMARY_CTA.href) ? 'page' : undefined}>
          {PRIMARY_CTA.label}
        </Link>

        <button
          ref={toggleRef}
          type="button"
          className={styles.menuButton}
          aria-expanded={open}
          aria-controls="site-menu"
          onClick={() => setOpen((v) => !v)}
        >
          <span>{open ? 'Close' : 'Menu'}</span>
          <span className={styles.menuGlyph} aria-hidden="true" />
        </button>
      </div>

      <div id="site-menu" className={styles.sheet} hidden={!open}>
        <nav aria-label="Primary" className={styles.sheetNav}>
          <Link ref={firstLinkRef} href="/" className={styles.sheetLink} aria-current={pathname === '/' ? 'page' : undefined}>
            <span className={styles.sheetNo}>00</span>Home
          </Link>
          {PRIMARY_NAV.map((item, i) => (
            <Link
              key={item.href}
              href={item.href}
              className={styles.sheetLink}
              aria-current={isActive(item.href) ? 'page' : undefined}
            >
              <span className={styles.sheetNo}>{String(i + 1).padStart(2, '0')}</span>
              {item.label}
            </Link>
          ))}
        </nav>
        <Link href={PRIMARY_CTA.href} className={styles.sheetCta}>
          {PRIMARY_CTA.label}
          <span aria-hidden="true">→</span>
        </Link>
        <p className={styles.sheetContact}>
          <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
          <a href={SITE.phoneHref}>{SITE.phone}</a>
        </p>
      </div>
    </header>
  )
}
