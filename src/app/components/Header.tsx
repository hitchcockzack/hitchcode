'use client'

import React, { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'motion/react'

type NavLink = { href: string; label: string; highlight?: boolean }

const NAV_LINKS: NavLink[] = [
  { href: '/', label: 'Home' },
  { href: '/demos', label: 'Demos' },
  { href: '/#ai-concierge', label: 'AI Concierge', highlight: true },
  { href: '/services', label: 'Services' },
  { href: '/blog', label: 'Blog' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
]

const EASE_OUT_EXPO: [number, number, number, number] = [0.32, 0.72, 0, 1]

export default function Header() {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const pathname = usePathname()
  const [mounted, setMounted] = useState(false)

  useEffect(() => { setMounted(true) }, [])

  useEffect(() => {
    if (!drawerOpen) return
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setDrawerOpen(false)
    }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [drawerOpen])

  useEffect(() => {
    document.body.style.overflow = drawerOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [drawerOpen])

  return (
    <>
      {/* Gradient fade masks scrolling content behind the floating nav */}
      <header className="sticky top-0 z-50 px-3 sm:px-4 pt-3 sm:pt-4 pb-4 bg-gradient-to-b from-stone-950 via-stone-950/80 to-transparent pointer-events-none">
        <nav className="pointer-events-auto mx-auto lg:w-fit flex items-center rounded-2xl lg:rounded-full bg-stone-950/60 backdrop-blur-2xl border border-stone-800/20 shadow-[0_4px_24px_rgba(0,0,0,0.25)] px-3 py-2 lg:py-1.5 transition-all duration-700 ease-out-expo">
          {/* Brand */}
          <Link href="/" className="flex items-center gap-2 px-2 py-1.5 mr-auto lg:mr-3 group">
            <span className="text-lg font-semibold tracking-tight text-stone-200 transition-colors duration-300 ease-out-expo group-hover:text-white">
              hitchcode
            </span>
          </Link>

          {/* Desktop navigation */}
          <div className="hidden lg:flex items-center gap-0.5">
            {NAV_LINKS.map(link => {
              const active = pathname === link.href
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative inline-flex items-center gap-1.5 px-3.5 py-1.5 text-[13px] font-medium rounded-full transition-all duration-300 ease-out-expo ${
                    active
                      ? 'text-stone-100 bg-stone-800/50'
                      : link.highlight
                        ? 'text-[#D4A574] hover:text-[#E0B68A] hover:bg-stone-800/25'
                        : 'text-stone-500 hover:text-stone-200 hover:bg-stone-800/25'
                  }`}
                >
                  {link.highlight && (
                    <span className="h-1.5 w-1.5 rounded-full bg-[#D4A574] animate-pulse" aria-hidden />
                  )}
                  {link.label}
                </Link>
              )
            })}
          </div>

          {/* Desktop CTA */}
          <Link
            href="/contact"
            className="hidden lg:inline-flex items-center ml-3 px-5 py-2 rounded-full bg-[#D4A574] text-stone-950 text-sm font-semibold transition-all duration-500 ease-out-expo hover:bg-[#E0B68A] active:scale-[0.97]"
          >
            Let&apos;s talk
          </Link>

          {/* Mobile hamburger */}
          <button
            className="lg:hidden p-2 rounded-xl text-stone-400 hover:text-stone-200 hover:bg-stone-800/30 transition-all duration-300 ease-out-expo"
            aria-label="Open navigation menu"
            onClick={() => setDrawerOpen(true)}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
              <line x1="3" y1="6" x2="17" y2="6" />
              <line x1="3" y1="14" x2="17" y2="14" />
            </svg>
          </button>
        </nav>
      </header>

      {/* Full-screen mobile overlay with staggered reveal */}
      {mounted && createPortal(
        <AnimatePresence>
          {drawerOpen && (
            <motion.div
              key="mobile-menu"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: EASE_OUT_EXPO }}
              className="fixed inset-0 z-[9998] bg-stone-950/95 backdrop-blur-3xl lg:hidden"
              onClick={() => setDrawerOpen(false)}
            >
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 24 }}
                transition={{ duration: 0.45, ease: EASE_OUT_EXPO }}
                className="flex flex-col items-center justify-center min-h-[100dvh] p-8"
                onClick={e => e.stopPropagation()}
              >
                {/* Close button */}
                <button
                  className="absolute top-5 right-5 p-3 rounded-full bg-stone-800/30 text-stone-400 hover:text-white transition-colors duration-300 ease-out-expo"
                  aria-label="Close menu"
                  onClick={() => setDrawerOpen(false)}
                >
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                    <line x1="5" y1="5" x2="15" y2="15" />
                    <line x1="15" y1="5" x2="5" y2="15" />
                  </svg>
                </button>

                <nav className="flex flex-col items-center gap-1">
                  {NAV_LINKS.map((link, idx) => {
                    const active = pathname === link.href
                    return (
                      <motion.div
                        key={link.href}
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.06 + idx * 0.04, duration: 0.45, ease: EASE_OUT_EXPO }}
                      >
                        <Link
                          href={link.href}
                          className={`block px-8 py-3 text-2xl font-medium tracking-tight transition-colors duration-300 ${
                            active
                              ? 'text-white'
                              : link.highlight
                                ? 'text-[#D4A574] hover:text-[#E0B68A]'
                                : 'text-stone-600 hover:text-stone-300'
                          }`}
                          onClick={() => setDrawerOpen(false)}
                        >
                          {link.label}
                        </Link>
                      </motion.div>
                    )
                  })}
                </nav>

                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.32, duration: 0.45, ease: EASE_OUT_EXPO }}
                  className="mt-8"
                >
                  <Link
                    href="/contact"
                    className="inline-flex items-center px-8 py-3.5 rounded-full bg-[#D4A574] text-stone-950 text-lg font-semibold transition-all duration-500 ease-out-expo hover:bg-[#E0B68A] active:scale-[0.97]"
                    onClick={() => setDrawerOpen(false)}
                  >
                    Let&apos;s talk
                  </Link>
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  )
}
