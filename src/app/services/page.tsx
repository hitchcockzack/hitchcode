"use client"

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { Inter } from 'next/font/google'
import { Vortex } from '@/components/ui/vortex'
import { ArrowRight, Code2, Workflow, Handshake, FileText, Target, Bot, Database, PlugZap, Link2, MessageSquare, ChevronDown } from 'lucide-react'

const inter = Inter({ subsets: ['latin'] })

const useScrollReveal = (enabled: boolean) => {
  useEffect(() => {
    if (!enabled) return
    const observerOptions = { root: null, rootMargin: '0px', threshold: 0.1 }
    const handleIntersect = (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
      entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('animate-in'); observer.unobserve(entry.target) } })
    }
    const observer = new IntersectionObserver(handleIntersect, observerOptions)
    document.querySelectorAll('.reveal-on-scroll').forEach(item => observer.observe(item))
    return () => observer.disconnect()
  }, [enabled])
}

export default function ServicesPage() {
  const [isMobile, setIsMobile] = useState(false)
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768)
    onResize()
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])
  useScrollReveal(!isMobile)
  const revealY = isMobile ? '' : 'reveal-on-scroll opacity-0 translate-y-8 transition-all duration-700 ease-out'

  useEffect(() => {
    const hash = window.location.hash
    if (hash) document.querySelector(hash)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [])

  return (
    <main className={`min-h-screen bg-black text-zinc-300 ${inter.className}`}>
      {/* Condensed page: no sticky subnav */}

      {/* Hero aligned with homepage */}
      <Vortex
        backgroundColor="black"
        particleCount={isMobile ? 300 : 800}
        rangeY={isMobile ? 120 : 220}
        baseHue={220}
        baseSpeed={isMobile ? 0.05 : 0.15}
        rangeSpeed={isMobile ? 0.5 : 0.9}
        baseRadius={isMobile ? 0.4 : 0.5}
        rangeRadius={isMobile ? 0.9 : 1.25}
        className="flex items-center flex-col justify-center px-4 md:px-10 py-16 md:py-24 w-full min-h-[46vh] md:min-h-[50vh]"
      >
        <div className="pointer-events-auto text-center max-w-5xl mx-auto relative z-20">
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter leading-[1.07] bg-clip-text text-transparent bg-gradient-to-b from-zinc-100 to-zinc-500 drop-shadow-[0_0_18px_rgba(0,0,0,0.6)] mb-4">
            Services
          </h1>
          <p className="text-lg md:text-2xl text-zinc-300 leading-relaxed max-w-3xl mx-auto">
            A straightforward way to go from idea to working system — fast.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/contact" className="relative inline-flex items-center justify-center p-[3px] rounded-full group">
              <span className="absolute inset-0 rounded-full bg-gradient-to-r from-[#2563eb] to-[#a21caf]" />
              <span className="px-6 md:px-7 py-3 md:py-4 bg-black rounded-full text-white text-sm md:text-base font-semibold relative transition-colors duration-200 group-hover:bg-transparent">
                Start the Conversation
              </span>
            </Link>
          </div>
        </div>
      </Vortex>

      {/* Removed 'What you get' section as requested */}

      {/* Removed heavy multi-section detail for a tighter narrative */}

      {/* Offerings (matches homepage mobile list) */}
      <section className="relative py-16 md:py-20 border-t border-zinc-800">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-5xl font-bold text-zinc-100 tracking-tight">Offerings</h2>
            <p className="mt-3 text-zinc-400 max-w-2xl mx-auto leading-relaxed">The work that moves the needle—explained simply.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
            {[
              { title: 'Custom Software', desc: 'Software built around how you work—not one‑size‑fits‑all.', more: 'Web apps, internal tools, dashboards—shaped to your workflow and built to last.', Icon: Code2 },
              { title: 'Workflow Automation', desc: 'Connect your tools so work moves on its own.', more: 'Make.com, n8n, Zapier, or custom code. Save hours a week with reliable automations.', Icon: Workflow },
              { title: 'Strategic Tech Partnership', desc: 'Hands‑on help and clear direction when you need it.', more: 'Get a right‑hand technical partner who can plan, build, and keep things moving.', Icon: Handshake },
              { title: 'One-Click Documents', desc: 'Invoices, contracts, and reports—generated perfectly, instantly.', more: 'Templates wired to your data so paperwork takes seconds, not hours.', Icon: FileText },
              { title: 'Lead Generation', desc: 'Systems that bring you qualified leads while you sleep.', more: 'Outbound, capture, and follow‑up that run quietly in the background.', Icon: Target },
              { title: 'AI Agents', desc: 'Helpful bots that reply, follow up, and handle busywork.', more: 'DM replies, lead outreach, reminders—always on, always polite, always on brand.', Icon: Bot },
              { title: 'Data Management', desc: 'Clean, organized data you can actually use.', more: 'Pull, clean, and structure your info so answers are easy to find.', Icon: Database },
              { title: 'MCP Agents & Connectors', desc: 'Safe connections that let AI use your systems correctly.', more: 'Ask questions about your data in plain english, get the answers you’re looking for immediately.', Icon: PlugZap },
              { title: 'Integrations', desc: 'Make your apps talk to each other the right way.', more: 'CRMs, email, scheduling, billing—connected right the first time.', Icon: Link2 },
              { title: 'Always Reachable', desc: 'Fast support and straight answers—no runaround.', more: 'You’ll have a direct line. No tickets, no waiting rooms.', Icon: MessageSquare },
            ].map(({ title, desc, more, Icon }, idx) => {
              const isOpen = openIndex === idx
              return (
                <button
                  key={title}
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  aria-expanded={isOpen}
                  className="text-left p-5 bg-zinc-900/50 rounded-2xl border border-zinc-800 hover:border-zinc-700 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/40"
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-blue-600/10 border border-blue-500/20 flex items-center justify-center">
                        <Icon aria-hidden className="h-5 w-5 text-blue-400" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-zinc-100">{title}</h3>
                        <p className="text-zinc-400 text-sm leading-relaxed">{desc}</p>
                      </div>
                    </div>
                    <ChevronDown className={`h-5 w-5 text-zinc-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} aria-hidden />
                  </div>
                  {isOpen && (
                    <div className="mt-3 pt-3 border-t border-zinc-800 text-zinc-300 text-sm leading-relaxed">
                      {more}
                    </div>
                  )}
                </button>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA - dark gradient */}
      <section className="py-28 px-4 text-center relative z-10 border-t border-zinc-800">
        <div className="container mx-auto max-w-3xl">
          <div className={revealY} style={{ transitionDelay: '120ms' }}>
            <h2 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-zinc-50 to-zinc-400 mb-6 leading-[1.07] tracking-tighter">
              Ready to Build Your Advantage?
            </h2>
            <p className="text-xl text-zinc-400 mb-10 leading-relaxed">
              Let's discuss how a thoughtfully architected system can transform your business.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link href="/contact" className="relative inline-flex items-center justify-center p-[3px] rounded-full group">
                <span className="absolute inset-0 rounded-full bg-gradient-to-r from-[#2563eb] to-[#a21caf]" />
                <span className="px-8 py-4 bg-black rounded-full text-white text-lg font-semibold relative transition-colors duration-200 group-hover:bg-transparent">Book a Consultation</span>
              </Link>
              <Link href="/" className="inline-flex items-center gap-2 text-zinc-300 hover:text-white transition-colors">
                <span>Return to Home</span>
                <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        .animate-in { opacity: 1 !important; transform: translateY(0) !important; }
        @media (prefers-reduced-motion: reduce) { .transition-all, .transition-colors, .transition-transform { transition: none; } }
      `}</style>
    </main>
  )
}
