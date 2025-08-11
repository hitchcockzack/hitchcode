'use client'
import { Inter } from 'next/font/google'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { ArrowLeft, Play, CheckCircle, Clock, TrendingUp, Zap, Target, ChevronRight, Bookmark, LineChart, CalendarClock } from 'lucide-react'
import SmartSchedulerDemo from "../SmartSchedulerDemo"
import AutomatedInvoiceDemo from "../AutomatedInvoiceDemo"
import SocialMediaContentStudio from "../SocialMediaPlannerDemo"
import RevenueIntelligenceDemo from "../RevenueIntelligenceDemo"
import OutboundEngineDemo from "../OutboundEngineDemo"
import SupportAutopilotDemo from "../SupportAutopilotDemo"
import { BentoGrid, BentoCard } from '@/components/magicui/bento-grid'
import { Steps } from '@/components/magicui/steps'

const inter = Inter({ subsets: ['latin'] })

// Scroll reveal hook for smooth animations
const useScrollReveal = () => {
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px 0px -100px 0px',
      threshold: 0.1
    }

    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in')
        }
      })
    }

    const observer = new IntersectionObserver(handleIntersect, observerOptions)
    document.querySelectorAll('.reveal-on-scroll').forEach(item => {
      observer.observe(item)
    })

    return () => observer.disconnect()
  }, [])
}

export default function DemosPage() {
  const [currentDemo, setCurrentDemo] = useState(0)

  useScrollReveal()

  const demos = [
    {
      id: 'invoicing',
      title: 'Automated Invoicing',
      problem: 'I spend hours every week creating and sending invoices manually',
      solution: 'Watch invoices generate and send themselves in seconds',
      component: <AutomatedInvoiceDemo />,
      stats: [
        { label: 'Time Saved', value: '95%' },
        { label: 'Error Rate', value: '0%' },
        { label: 'Payment Speed', value: '3x Faster' }
      ]
    },
    {
      id: 'social',
      title: 'Social Media Content Studio',
      problem: 'Creating consistent social content is overwhelming and time-consuming',
      solution: 'Generate weeks of content in minutes with AI-powered planning',
      component: <SocialMediaContentStudio />,
      stats: [
        { label: 'Content Created', value: '30+ Posts' },
        { label: 'Time Investment', value: '5 Minutes' },
        { label: 'Engagement Boost', value: '250%' },
        { label: 'Schedule Consistency', value: '100%' }
      ]
    },
    {
      id: 'revenue',
      title: 'Predictive Revenue Intelligence',
      problem: "I'm working harder than ever but my revenue has plateaued - I don't know what opportunities I'm missing",
      solution: 'AI discovers hidden revenue streams and automatically implements growth strategies',
      component: <RevenueIntelligenceDemo />,
      stats: [
        { label: 'Revenue Increase', value: '+420%' },
        { label: 'Opportunities Found', value: '5 Major' },
        { label: 'Implementation Time', value: '6 Weeks' }
      ]
    },
    {
      id: 'outbound',
      title: 'AI‑Personalized Outbound Engine',
      problem: 'We’re sending messages but replies are low and deliverability is risky',
      solution: 'Personalized at scale with strict guardrails: signal-based copy, compliant sending, routed to your calendar',
      component: <OutboundEngineDemo />,
      stats: [
        { label: 'Reply Lift', value: '3–5x' },
        { label: 'Personalized/Hr', value: '120+' },
        { label: 'Setup Time', value: '48 hrs' }
      ]
    },
    {
      id: 'support',
      title: 'Support Autopilot (Smart Triage + Actions)',
      problem: 'Support inbox is drowning: refunds, shipping, account updates, and VIP bugs miss SLAs',
      solution: 'Auto-resolve FAQs, small refunds, and shipping updates; escalate VIP bugs with full context; measure time saved',
      component: <SupportAutopilotDemo />,
      stats: [
        { label: 'Auto‑resolved', value: '60–80%' },
        { label: 'SLA Breaches', value: '−90%' },
        { label: 'Time Saved', value: '6m/ticket' }
      ]
    }
  ]

  return (
    <main className={`min-h-screen bg-black text-zinc-300 ${inter.className}`}>
      {/* Hero – premium dark style, no Vortex, matching homepage typography */}
      <section className="relative py-20 md:py-28">
        <div className="container mx-auto px-6 md:px-10">
          <div className="max-w-5xl mx-auto text-center">
            <div className="reveal-on-scroll opacity-0 translate-y-8 transition-all duration-700 mb-8">
              <Link
                href="/"
                className="inline-flex items-center text-zinc-400 hover:text-white transition-colors mb-8 group"
              >
                <ArrowLeft className="h-4 w-4 mr-2 transition-transform group-hover:-translate-x-1" />
                Back to Home
              </Link>

              <div className="w-20 h-20 mx-auto mb-8 rounded-2xl flex items-center justify-center bg-blue-600/10 border border-blue-500/20">
                <Play className="h-10 w-10 text-blue-400 ml-1" aria-hidden />
              </div>
            </div>

            <div className="reveal-on-scroll opacity-0 translate-y-8 transition-all duration-700 mb-6" style={{ transitionDelay: '200ms' }}>
              <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter leading-[1.07] bg-clip-text text-transparent bg-gradient-to-b from-zinc-100 to-zinc-500 drop-shadow-[0_0_18px_rgba(0,0,0,0.6)]">
                Live Demos
              </h1>
              <p className="mt-4 text-lg md:text-2xl text-zinc-300 leading-relaxed max-w-3xl mx-auto">
                See real systems solve real problems—fast, reliable, and built to scale.
              </p>
            </div>

            {/* Pillars – consistent dark surfaces/borders */}
            <div className="reveal-on-scroll opacity-0 translate-y-8 transition-all duration-700 grid grid-cols-1 md:grid-cols-3 gap-5 max-w-5xl mx-auto" style={{ transitionDelay: '380ms' }}>
              {[
                { icon: Clock, label: 'Save Hours Daily', desc: 'Automate repetitive work across tools' },
                { icon: Target, label: 'Zero‑Error Ops', desc: 'Deterministic workflows with guardrails' },
                { icon: TrendingUp, label: 'Scale Instantly', desc: 'Systems that grow without headcount' }
              ].map((benefit, index) => (
                <div key={index} className="bg-zinc-950/60 border border-zinc-800 rounded-2xl p-6 hover:border-zinc-700 transition-all">
                  <benefit.icon className="h-7 w-7 text-blue-400 mb-3" aria-hidden />
                  <h3 className="font-semibold mb-2 text-zinc-100">{benefit.label}</h3>
                  <p className="text-zinc-400 text-sm leading-relaxed">{benefit.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Overview (Bento) – quick navigation to each demo */}
      <section className="relative py-12 md:py-16 border-t border-zinc-800">
        <div className="container mx-auto px-6 md:px-10 max-w-6xl">
          <BentoGrid>
            <BentoCard className="md:col-span-3">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-blue-600/10 border border-blue-500/20 flex items-center justify-center">
                  <Bookmark aria-hidden className="h-5 w-5 text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold text-zinc-100">Automated Invoicing</h3>
              </div>
              <p className="text-zinc-400 text-sm leading-relaxed">Invoices generate and send themselves—accurate, branded, and fast.</p>
              <div className="mt-4"><Link href="#invoicing" className="text-sm text-blue-300 hover:text-blue-200">Jump to demo →</Link></div>
            </BentoCard>
            <BentoCard className="md:col-span-3">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-purple-600/10 border border-purple-500/20 flex items-center justify-center">
                  <LineChart aria-hidden className="h-5 w-5 text-purple-400" />
                </div>
                <h3 className="text-xl font-semibold text-zinc-100">Predictive Revenue Intelligence</h3>
              </div>
              <p className="text-zinc-400 text-sm leading-relaxed">Find hidden growth opportunities and act on them automatically.</p>
              <div className="mt-4"><Link href="#revenue" className="text-sm text-blue-300 hover:text-blue-200">Jump to demo →</Link></div>
            </BentoCard>
            <BentoCard className="md:col-span-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-pink-600/10 border border-pink-500/20 flex items-center justify-center">
                  <CalendarClock aria-hidden className="h-5 w-5 text-pink-400" />
                </div>
                <h3 className="text-xl font-semibold text-zinc-100">Social Media Content Studio</h3>
              </div>
              <p className="text-zinc-400 text-sm leading-relaxed">Plan weeks of content in minutes with AI‑assisted ideation and scheduling.</p>
              <div className="mt-4"><Link href="#social" className="text-sm text-blue-300 hover:text-blue-200">Jump to demo →</Link></div>
            </BentoCard>
            <BentoCard className="md:col-span-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-600/10 border border-emerald-500/20 flex items-center justify-center">
                  <Target aria-hidden className="h-5 w-5 text-emerald-400" />
                </div>
                <h3 className="text-xl font-semibold text-zinc-100">AI‑Personalized Outbound Engine</h3>
              </div>
              <p className="text-zinc-400 text-sm leading-relaxed">Personalize at scale from live signals, guardrails on, and route replies straight to calendar.</p>
              <div className="mt-4"><Link href="#outbound" className="text-sm text-blue-300 hover:text-blue-200">Jump to demo →</Link></div>
            </BentoCard>
            <BentoCard className="md:col-span-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-yellow-600/10 border border-yellow-500/20 flex items-center justify-center">
                  <span className="text-yellow-300 text-sm font-bold">SLA</span>
                </div>
                <h3 className="text-xl font-semibold text-zinc-100">Support Autopilot</h3>
              </div>
              <p className="text-zinc-400 text-sm leading-relaxed">Auto‑resolve FAQs and small refunds, live shipping updates, and VIP bug escalations with full context.</p>
              <div className="mt-4"><Link href="#support" className="text-sm text-blue-300 hover:text-blue-200">Jump to demo →</Link></div>
            </BentoCard>
          </BentoGrid>
        </div>
      </section>

      {/* Demo Sections – dark surfaces, consistent with brand */}
      {demos.map((demo) => (
        <section id={demo.id} key={demo.id} className="relative py-20 md:py-24 border-t border-zinc-800">
          <div className="container mx-auto px-6 md:px-10">
            {/* Problem Statement */}
            <div className="max-w-5xl mx-auto text-center mb-12 reveal-on-scroll opacity-0 translate-y-8 transition-all duration-700" style={{ transitionDelay: '100ms' }}>
              <div className="inline-flex items-center px-3 py-1.5 bg-red-900/10 border border-red-800/40 rounded-full text-red-300 text-xs font-medium mb-6">
                <span className="w-2 h-2 bg-red-500 rounded-full mr-2 animate-pulse" aria-hidden></span>
                Real client concern
              </div>

              <div className="bg-red-900/10 border border-red-800/40 rounded-2xl p-6 md:p-8 mb-8">
                <h2 className="text-2xl md:text-3xl font-bold text-red-200">
                  “{demo.problem}”
                </h2>
              </div>

              {/* Solution Announcement */}
              <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 md:p-8">
                <div className="flex items-center justify-center mb-3">
                  <CheckCircle className="h-7 w-7 text-green-400 mr-2" aria-hidden />
                  <span className="text-green-300 font-semibold text-base">Solution</span>
                </div>
                <h3 className="text-3xl md:text-4xl font-bold text-zinc-100 mb-3">
                  {demo.title}
                </h3>
                <p className="text-lg text-zinc-300/90 mb-6 leading-relaxed">{demo.solution}</p>

                {/* Stats */}
                <div className={`grid grid-cols-2 gap-6 max-w-2xl mx-auto ${demo.stats.length === 4 ? 'md:grid-cols-4' : 'md:grid-cols-3'}`}>
                  {demo.stats.map((stat, statIndex) => (
                    <div key={statIndex} className="text-center">
                      <div className="text-2xl md:text-3xl font-bold text-zinc-100 mb-1">{stat.value}</div>
                      <div className="text-zinc-400 text-sm">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Demo Component */}
            <div className="reveal-on-scroll opacity-0 translate-y-8 transition-all duration-700" style={{ transitionDelay: '200ms' }}>
              {demo.component}
            </div>
          </div>
        </section>
      ))}

      {/* Process & CTA */}
      <section className="relative py-20 md:py-28 border-t border-zinc-800">
        <div className="container mx-auto px-6 md:px-10">
          <div className="max-w-5xl mx-auto text-center">
            <div className="reveal-on-scroll opacity-0 translate-y-8 transition-all duration-700" style={{ transitionDelay: '80ms' }}>
              <h2 className="text-4xl md:text-5xl font-bold text-zinc-100 mb-6">
                Book a Live Demo
              </h2>
              <p className="text-xl text-zinc-400 mb-10 max-w-2xl mx-auto">
                We’ll tailor it to your workflow and show exactly how it fits your stack.
              </p>
            </div>

            <div className="reveal-on-scroll opacity-0 translate-y-8 transition-all duration-700 mb-10" style={{ transitionDelay: '160ms' }}>
              <Steps
                steps={[
                  { title: 'Quick Intake', description: 'Share your current tools and pain points.' },
                  { title: 'Tailored Demo', description: 'We focus only on what matters to you.' },
                  { title: 'Clear Next Steps', description: 'Get a short action plan with options.' },
                ]}
              />
            </div>

            <div className="reveal-on-scroll opacity-0 translate-y-8 transition-all duration-700" style={{ transitionDelay: '240ms' }}>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                <Link
                  href="/contact"
                  className="relative inline-flex items-center justify-center p-[3px] rounded-full group"
                >
                  <span className="absolute inset-0 rounded-full bg-gradient-to-r from-[#2563eb] to-[#a21caf]" />
                  <span className="px-8 py-4 bg-black rounded-full text-white text-lg font-semibold relative transition-colors duration-200 group-hover:bg-transparent">Start Your Project</span>
                </Link>
                <Link
                  href="/services"
                  className="inline-flex items-center gap-2 text-zinc-300 hover:text-white transition-colors"
                >
                  <span>Explore Services</span>
                  <ChevronRight className="h-5 w-5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Minimal custom CSS for reveals; rest handled by globals */}
      <style jsx>{`
        .animate-in { opacity: 1 !important; transform: translateY(0) !important; }
        @media (prefers-reduced-motion: reduce) { .transition-all, .transition-colors, .transition-transform { transition: none; } .animate-pulse { animation: none; } }
      `}</style>
    </main>
  )
}
