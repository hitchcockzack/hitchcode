'use client'

import Link from 'next/link'
import { useMemo, useState } from 'react'
import {
  ArrowRight,
  CalendarCheck2,
  ChartNoAxesCombined,
  Cpu,
  GitBranch,
  Handshake,
  MessagesSquare,
  ShieldCheck,
  Wrench,
  Zap,
} from 'lucide-react'

import { BentoCard, BentoGrid } from '@/components/magicui/bento-grid'
import { BlurFade } from '@/components/magicui/blur-fade'
import { MagicCard } from '@/components/magicui/magic-card'
import Steps from '@/components/magicui/steps'
import { Vortex } from '@/components/ui/vortex'
import AIConciergeSection from './components/AIConciergeSection'

type ExplorerOption = {
  id: string
  label: string
  question: string
  likelyBuild: string[]
  outcome: string
  fitNote: string
}

const explorerOptions: ExplorerOption[] = [
  {
    id: 'internal-tools',
    label: 'Custom internal tools',
    question: 'We like our current software, but we need one custom feature it does not have. Can you build it?',
    likelyBuild: [
      'A custom feature or app built around your workflow',
      'Connections to the tools you already use',
      'Tools that process and display information exactly how your team needs it',
    ],
    outcome: 'You get software that fits your business instead of forcing your business to fit software.',
    fitNote: 'Great when off-the-shelf tools are close, but not enough.',
  },
  {
    id: 'client-ops',
    label: 'Client work and admin',
    question: 'Every week we repeat the same tasks. Can you automate this for us?',
    likelyBuild: [
      'Auto-generated docs, updates, and checklists',
      'Automated workflows for scheduling, handoffs, and recurring tasks',
      'A clean board that shows what is done and what is behind',
      'Client updates sent automatically at the right time',
    ],
    outcome: 'Your team spends less time on admin and more time doing the work that matters.',
    fitNote: 'Great for service teams buried in repetitive work.',
  },
  {
    id: 'ai-systems',
    label: 'Custom AI agents',
    question: 'Everyone talks about AI. Can you build agents that are actually useful for my business?',
    likelyBuild: [
      'Small AI agents built for one real job',
      'Multiple agents working together for bigger workflows',
      'A dashboard so you can see what they did',
      'They can run automatically or ask for approval every step of the way',
    ],
    outcome: 'You get AI that feels like magic when done right, and usually costs less than people expect.',
    fitNote: 'Great for teams that want practical AI, not hype.',
  },
]

const proofSnapshots = [
  {
    client: 'Audio monitoring platform',
    pain: 'Audio control was spread across tools, making monitoring messy and hard to trust.',
    result:
      'I built a software audio controller and multiplexer with deduplication and remote control built in.',
    impact: 'Cleaner monitoring, fewer duplicate signals, and way less operator friction.',
  },
  {
    client: 'Age Verified Lax app',
    pain: 'Sports organizers needed a fair way to verify player age and run operations in one place.',
    result:
      'I built ageverifiedlax.com/info using proprietary machine learning for age checks, plus CRM workflows, email automation, in-app payments, and customer communications.',
    impact: 'More trusted competition, less manual admin, and smoother league operations.',
  },
  {
    client: 'Custom AI agent systems',
    pain: 'Teams wanted AI help but did not want a fragile, expensive mess.',
    result: 'I built focused agents for specific tasks, connected to existing tools and rules.',
    impact: 'High leverage for low cost when scoped correctly.',
  },
]

const capabilityPillars = [
  {
    title: 'I figure out what is actually broken first',
    description:
      'Before writing code, I find the real pain point and pick the simplest fix that works.',
    icon: ChartNoAxesCombined,
    bullets: ['Clear plan', 'Right order of work', 'No fluff features'],
    className: 'md:col-span-3',
  },
  {
    title: 'Then I build it myself',
    description:
      'I build custom software, automations, and integrations with your team involved the whole way.',
    icon: Wrench,
    bullets: ['Custom app', 'Automation setup', 'Tool connections'],
    className: 'md:col-span-3',
  },
  {
    title: 'I build custom AI agents',
    description:
      'When done right, these feel like magic. They can also be surprisingly cheap to run.',
    icon: ShieldCheck,
    bullets: ['Purpose-built agents', 'Safe limits', 'Low run cost'],
    className: 'md:col-span-4',
  },
  {
    title: 'You work with me directly',
    description:
      'No handoffs, no account manager, no agency layers. Just me and your team.',
    icon: Handshake,
    bullets: ['Direct access', 'Fast communication', 'Ongoing support'],
    className: 'md:col-span-2',
  },
]

const processSteps = [
  {
    title: 'You show me the pain',
    description:
      'In one call, you show me what is frustrating and what a win looks like.',
  },
  {
    title: 'I map the fix',
    description:
      'I send a simple plan: what we automate, what stays manual, and what we build first.',
  },
  {
    title: 'We build in small steps',
    description:
      'You see progress often, we adjust quickly, and keep it tied to real business needs.',
  },
  {
    title: 'We launch and clean up',
    description:
      'We test it, fix rough edges, and make sure your team knows how to use it.',
  },
  {
    title: 'Then we improve it',
    description:
      'Once the first version works, we improve it step by step.',
  },
]

function trackHomepageEvent(eventName: string, payload: Record<string, string> = {}) {
  if (typeof window === 'undefined') return
  const eventDetail = { eventName, ...payload }

  window.dispatchEvent(new CustomEvent('homepage-analytics', { detail: eventDetail }))

  const tracker = (window as { gtag?: (...args: unknown[]) => void }).gtag
  if (typeof tracker === 'function') {
    tracker('event', eventName, payload)
  }
}

function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string
  title: string
  description: string
}) {
  return (
    <div className="max-w-3xl text-center mx-auto">
      <p className="text-[10px] tracking-[0.2em] uppercase font-medium text-stone-500">{eyebrow}</p>
      <h2 className="mt-4 text-[clamp(1.7rem,5.8vw,3.25rem)] font-semibold text-stone-100 leading-[1.08] tracking-[-0.02em]">
        {title}
      </h2>
      <p className="mt-5 text-stone-500 leading-relaxed text-[clamp(1rem,2.6vw,1.15rem)]">{description}</p>
    </div>
  )
}

export default function HomePage() {
  const [selectedExplorer, setSelectedExplorer] = useState(explorerOptions[0].id)

  const activeExplorer = useMemo(
    () => explorerOptions.find((item) => item.id === selectedExplorer) ?? explorerOptions[0],
    [selectedExplorer],
  )

  return (
    <main className="min-h-screen overflow-x-hidden bg-stone-950 text-stone-300">
      {/* ─── Hero ─── */}
      <Vortex
        backgroundColor="#0C0A09"
        particleCount={350}
        rangeY={200}
        baseHue={28}
        baseSpeed={0.08}
        rangeSpeed={0.5}
        baseRadius={0.4}
        rangeRadius={0.9}
        className="relative flex items-center min-h-[88dvh] px-4 sm:px-6 md:px-10 py-16 md:py-20 w-full"
      >
        <div className="pointer-events-auto max-w-5xl mx-auto text-center relative z-20">
          <BlurFade inView>
            <p className="inline-flex items-center gap-2 rounded-full border border-stone-700/50 bg-stone-900/50 px-4 py-2 text-xs md:text-sm text-stone-400">
              <Zap className="h-4 w-4 text-[#D4A574]" />
              Talk to Zack for free
            </p>
          </BlurFade>

          <BlurFade inView delay={0.08}>
            <h1 className="mt-8 text-[clamp(2.4rem,8.4vw,5.8rem)] font-semibold leading-[1.04] tracking-[-0.03em] text-stone-50 text-wrap-balance">
              Need software, systems, or AI?
            </h1>
          </BlurFade>

          <BlurFade inView delay={0.14}>
            <p className="mt-7 max-w-2xl mx-auto text-[clamp(1.02rem,2.7vw,1.3rem)] text-stone-400 leading-relaxed">
              I am Zack Hitchcock. Tell me what is slowing your business down, and I will build a clean software system
              to handle it. Whether you need a website, full application, internal tool, or custom AI agent, I build it to fit
              your real workflow.
            </p>
          </BlurFade>

          <BlurFade inView delay={0.2}>
            <div className="mt-10 flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/contact"
                onClick={() => trackHomepageEvent('hero_primary_cta_click', { cta: 'book_consultation' })}
                className="group inline-flex items-center gap-3 px-7 md:px-8 py-3.5 md:py-4 rounded-full bg-[#D4A574] text-stone-950 text-sm md:text-base font-semibold transition-all duration-500 ease-out-expo hover:bg-[#E0B68A] active:scale-[0.97]"
              >
                Book a free consultation
                <span className="flex items-center justify-center w-7 h-7 rounded-full bg-stone-950/15 transition-all duration-500 ease-out-expo group-hover:translate-x-0.5 group-hover:-translate-y-px group-hover:scale-105">
                  <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </Link>
              <a
                href="#proof"
                onClick={() => trackHomepageEvent('hero_secondary_cta_click', { cta: 'view_proof' })}
                className="inline-flex items-center justify-center rounded-full border border-stone-700/50 bg-stone-950/50 px-7 md:px-8 py-3.5 md:py-4 text-sm md:text-base font-semibold text-stone-300 transition-all duration-500 ease-out-expo hover:border-stone-500 hover:text-white active:scale-[0.97]"
              >
                View case snapshots
              </a>
            </div>
          </BlurFade>
        </div>
      </Vortex>

      {/* ─── Engagement strip ─── */}
      <section className="bg-stone-950 px-4 sm:px-6 md:px-10">
        <div className="max-w-5xl mx-auto pt-4 md:pt-5 pb-5 md:pb-6 text-center">
          <p className="max-w-3xl mx-auto text-sm md:text-base text-stone-500 leading-relaxed">
            Looking for a long-term technical expert who can advise what is possible and implement the right systems as
            your business grows? <span className="text-stone-300 font-medium">Accepting select engagements in 2026.</span>{' '}
            <Link
              href="/contact"
              onClick={() => trackHomepageEvent('hero_cto_hook_click', { cta: 'lets_talk' })}
              className="text-[#D4A574] hover:text-[#E0B68A] underline underline-offset-4 transition-colors duration-300"
            >
              Let&apos;s talk.
            </Link>
          </p>
        </div>
        <div className="h-px bg-stone-800/30" />
      </section>

      {/* ─── Explorer: "Does any of this sound familiar?" ─── */}
      <section className="px-4 sm:px-6 md:px-10 pt-20 md:pt-28 pb-24 md:pb-32 bg-gradient-to-b from-stone-950 to-stone-950">
        <SectionHeading
          eyebrow="Start Here"
          title="Does any of this sound familiar?"
          description="Pick one and I will show you what I would build to fix it."
        />

        <div className="mt-12 max-w-6xl mx-auto">
          <div className="flex gap-2.5 overflow-x-auto pb-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
            {explorerOptions.map((option) => {
              const isActive = option.id === activeExplorer.id
              return (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => {
                    setSelectedExplorer(option.id)
                    trackHomepageEvent('explorer_option_selected', { option: option.id })
                  }}
                  className={`whitespace-nowrap rounded-full px-4 py-2.5 text-sm font-medium border transition-all duration-500 ease-out-expo ${
                    isActive
                      ? 'bg-[#D4A574] text-stone-950 border-[#D4A574]'
                      : 'bg-stone-900/40 text-stone-400 border-stone-800/40 hover:border-stone-700 hover:text-stone-300'
                  }`}
                >
                  {option.label}
                </button>
              )
            })}
          </div>

          {/* Double-bezel explorer card */}
          <div className="mt-6 p-1.5 rounded-[1.75rem] bg-stone-900/20 border border-stone-800/25">
            <MagicCard
              className="rounded-[calc(1.75rem-0.375rem)] border border-stone-800/30 bg-stone-950/50"
              gradientOpacity={0.2}
              gradientFrom="#D4A574"
              gradientTo="#5C4432"
            >
              <div className="relative grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-9 p-5 sm:p-7 md:p-9">
                <div className="absolute inset-0 rounded-[inherit] bg-[radial-gradient(circle_at_20%_10%,rgba(212,165,116,0.07),transparent_34%),radial-gradient(circle_at_80%_85%,rgba(180,130,80,0.06),transparent_35%)]" />
                <div className="relative lg:col-span-3 space-y-5">
                  <p className="inline-flex items-center gap-2 rounded-full border border-stone-700/40 bg-stone-900/50 px-3 py-1 text-xs text-stone-400">
                    <MessagesSquare className="h-3.5 w-3.5 text-[#D4A574]" />
                    What you might be asking
                  </p>
                  <h3 className="text-[clamp(1.2rem,4vw,2rem)] font-semibold leading-tight text-stone-100">
                    {activeExplorer.question}
                  </h3>
                  <p className="text-stone-400 leading-relaxed">{activeExplorer.outcome}</p>
                  <p className="text-sm text-stone-500">{activeExplorer.fitNote}</p>
                </div>

                <div className="relative lg:col-span-2 rounded-2xl border border-stone-800/30 bg-stone-950/60 p-4 sm:p-5 overflow-hidden">
                  <div className="absolute inset-0 opacity-60 bg-[linear-gradient(120deg,rgba(212,165,116,0.06),transparent_50%),linear-gradient(320deg,rgba(180,130,80,0.08),transparent_50%)]" />
                  <div className="absolute inset-0 [background-size:22px_22px] [background-image:linear-gradient(to_right,rgba(120,113,108,0.07)_1px,transparent_1px),linear-gradient(to_bottom,rgba(120,113,108,0.07)_1px,transparent_1px)]" />
                  <div className="relative">
                    <p className="text-stone-200 font-medium">What I would build</p>
                    <ul className="mt-3 space-y-2">
                      {activeExplorer.likelyBuild.map((item) => (
                        <li key={item} className="flex items-start gap-2 text-sm text-stone-400">
                          <GitBranch className="h-4 w-4 text-[#D4A574] mt-0.5 shrink-0" />
                          <span className="break-words">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </MagicCard>
          </div>
        </div>
      </section>

      {/* ─── Proof: asymmetric layout ─── */}
      <section id="proof" className="px-4 sm:px-6 md:px-10 py-24 md:py-32">
        <SectionHeading
          eyebrow="Proof"
          title="Real work I have already done"
          description="Some names and details are hidden for privacy, but the work and results are real."
        />

        <div className="mt-12 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-5 md:grid-rows-2 gap-4 md:gap-5">
          {proofSnapshots.map((snapshot, index) => (
            <BlurFade
              key={snapshot.client}
              inView
              delay={0.06 * index}
              className={index === 0 ? 'md:col-span-3 md:row-span-2' : 'md:col-span-2'}
            >
              {/* Double-bezel card */}
              <div className="h-full p-1.5 rounded-[1.75rem] bg-stone-900/20 border border-stone-800/25 transition-all duration-500 ease-out-expo hover:border-stone-700/30">
                <article className="h-full rounded-[calc(1.75rem-0.375rem)] bg-stone-950/60 p-5 md:p-7 shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]">
                  <p className="text-[10px] uppercase tracking-[0.2em] font-medium text-stone-600">{snapshot.client}</p>
                  <p className="mt-5 text-stone-500 text-sm leading-relaxed">{snapshot.pain}</p>
                  <p className="mt-4 text-stone-200 leading-relaxed">{snapshot.result}</p>
                  <p className="mt-4 text-sm text-[#D4A574] leading-relaxed">{snapshot.impact}</p>
                </article>
              </div>
            </BlurFade>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/contact"
            onClick={() => trackHomepageEvent('proof_cta_click', { cta: 'request_relevant_example' })}
            className="group inline-flex items-center gap-2 text-stone-400 hover:text-white font-medium transition-all duration-500 ease-out-expo"
          >
            Ask me for examples like your business
            <ArrowRight className="h-4 w-4 transition-transform duration-500 ease-out-expo group-hover:translate-x-1" />
          </Link>
        </div>
      </section>

      {/* ─── Capabilities: bento grid ─── */}
      <section className="px-4 sm:px-6 md:px-10 py-24 md:py-32 border-t border-stone-800/25">
        <SectionHeading
          eyebrow="Capabilities"
          title="What I can build for you"
          description="Simple version: I listen, I design, and I build the system myself."
        />

        <div className="max-w-6xl mx-auto mt-12">
          <BentoGrid className="auto-rows-[minmax(14rem,auto)]">
            {capabilityPillars.map((pillar) => {
              const Icon = pillar.icon
              return (
                <BentoCard key={pillar.title} className={pillar.className}>
                  <article className="h-full rounded-[inherit]">
                    <div className="inline-flex items-center justify-center h-10 w-10 rounded-xl border border-stone-800/40 bg-stone-900/40">
                      <Icon className="h-5 w-5 text-[#D4A574]" />
                    </div>
                    <h3 className="mt-5 text-stone-100 text-xl font-semibold leading-tight">{pillar.title}</h3>
                    <p className="mt-3 text-stone-500 leading-relaxed">{pillar.description}</p>
                    <ul className="mt-5 flex flex-wrap gap-2">
                      {pillar.bullets.map((bullet) => (
                        <li
                          key={bullet}
                          className="rounded-full border border-stone-800/40 bg-stone-900/30 px-3 py-1 text-xs text-stone-400"
                        >
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  </article>
                </BentoCard>
              )
            })}
          </BentoGrid>
        </div>
      </section>

      {/* ─── About Zack ─── */}
      <section className="px-4 sm:px-6 md:px-10 py-24 md:py-32">
        <div className="max-w-5xl mx-auto">
          {/* Double-bezel container */}
          <div className="p-2 rounded-[2rem] bg-stone-900/15 border border-stone-800/25">
            <div className="rounded-[calc(2rem-0.5rem)] bg-stone-950/50 p-6 md:p-10 shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-7 md:gap-10 items-center">
                <div className="lg:col-span-1 flex justify-center lg:justify-start">
                  <div className="relative p-1 rounded-full bg-gradient-to-br from-stone-700/40 via-stone-800/20 to-stone-900/40">
                    <img
                      src="/optimized/zack.webp"
                      alt="Zack Hitchcock"
                      className="w-28 h-28 sm:w-36 sm:h-36 md:w-44 md:h-44 rounded-full object-cover border-2 border-stone-900"
                    />
                  </div>
                </div>
                <div className="lg:col-span-2 text-center lg:text-left">
                  <h2 className="text-[clamp(1.55rem,4.4vw,2.55rem)] text-stone-100 font-semibold tracking-[-0.02em]">
                    Hi, I am Zack.
                  </h2>
                  <p className="mt-4 text-stone-300 leading-relaxed">
                    If you hire me, you work with me directly. No agency layers, no handoffs.
                  </p>
                  <p className="mt-4 text-stone-500 leading-relaxed">
                    I care about one thing: your business should run smoother after we ship than before.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Process timeline ─── */}
      <section className="relative px-4 sm:px-6 md:px-10 py-24 md:py-32 border-t border-stone-800/25">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-stone-900/30 border border-stone-800/25 text-sm text-stone-400">
              <CalendarCheck2 className="h-4 w-4 text-[#D4A574]" aria-hidden />
              How it works
            </div>
            <h2 className="mt-5 text-[clamp(1.7rem,5.8vw,3.2rem)] font-semibold text-stone-100 tracking-[-0.02em]">
              Clear process, no guesswork
            </h2>
            <p className="mt-4 text-stone-500 max-w-2xl mx-auto leading-relaxed">
              You will always know what I am building, what is next, and why it matters.
            </p>
          </div>
          <Steps steps={processSteps} />
        </div>
      </section>

      {/* ─── AI Concierge live demo ─── */}
      <AIConciergeSection />

      {/* ─── Final CTA ─── */}
      <section className="px-4 sm:px-6 md:px-10 py-24 md:py-32 text-center">
        <div className="max-w-3xl mx-auto">
          {/* Double-bezel container */}
          <div className="p-2 rounded-[2rem] bg-stone-900/15 border border-stone-800/25">
            <div className="rounded-[calc(2rem-0.5rem)] bg-stone-950/50 p-8 md:p-14 shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]">
              <p className="inline-flex items-center gap-2 rounded-full border border-stone-700/30 bg-stone-900/30 px-4 py-2 text-[10px] uppercase tracking-[0.2em] font-medium text-stone-500">
                <Cpu className="h-4 w-4 text-[#D4A574]" />
                Built by Zack
              </p>
              <h2 className="mt-8 text-[clamp(1.8rem,6.2vw,3.6rem)] font-semibold leading-[1.05] tracking-[-0.02em] text-stone-50">
                If your work feels messy, I can help you clean it up with software.
              </h2>
              <p className="mt-6 text-stone-500 leading-relaxed text-[clamp(1rem,2.5vw,1.15rem)]">
                The call is free. Bring your problem. I will tell you what I would build and if I am the right person to do it.
              </p>
              <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/contact"
                  onClick={() => trackHomepageEvent('final_primary_cta_click', { cta: 'book_consultation' })}
                  className="group inline-flex items-center gap-3 px-7 py-3.5 md:px-8 md:py-4 rounded-full bg-[#D4A574] text-stone-950 font-semibold text-base md:text-lg transition-all duration-500 ease-out-expo hover:bg-[#E0B68A] active:scale-[0.97]"
                >
                  Book a free consultation
                  <span className="flex items-center justify-center w-7 h-7 rounded-full bg-stone-950/15 transition-all duration-500 ease-out-expo group-hover:translate-x-0.5 group-hover:-translate-y-px group-hover:scale-105">
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </Link>
                <Link
                  href="/about"
                  onClick={() => trackHomepageEvent('final_secondary_cta_click', { cta: 'about_zack' })}
                  className="group inline-flex items-center gap-2 text-stone-500 hover:text-stone-200 font-medium text-base md:text-lg transition-all duration-500 ease-out-expo"
                >
                  Learn about my background
                  <ArrowRight className="h-4 w-4 transition-transform duration-500 ease-out-expo group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
