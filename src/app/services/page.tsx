"use client"

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { Inter } from 'next/font/google'
import { Vortex } from '@/components/ui/vortex'
import { ArrowRight, CheckCircle, Code, Compass, Cpu, Database, Gauge, Globe, Layers, RefreshCcw, Search, Server, Shield, ShieldCheck, Zap, CalendarCheck2, Rocket, Wrench } from 'lucide-react'
import { BentoGrid, BentoCard } from '@/components/magicui/bento-grid'
import { Steps } from '@/components/magicui/steps'

const inter = Inter({ subsets: ['latin'] })

const useScrollReveal = () => {
  useEffect(() => {
    const observerOptions = { root: null, rootMargin: '0px', threshold: 0.1 }
    const handleIntersect = (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
      entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('animate-in'); observer.unobserve(entry.target) } })
    }
    const observer = new IntersectionObserver(handleIntersect, observerOptions)
    document.querySelectorAll('.reveal-on-scroll').forEach(item => observer.observe(item))
    return () => observer.disconnect()
  }, [])
}

export default function ServicesPage() {
  const [activeTab, setActiveTab] = useState<'frontend' | 'backend' | 'architecture'>('frontend')
  useScrollReveal()

  useEffect(() => {
    const hash = window.location.hash
    if (hash) document.querySelector(hash)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [])

  return (
    <main className={`min-h-screen bg-black text-zinc-300 ${inter.className}`}>
      {/* Sticky subnav matches header translucency, borders, and spacing used site‑wide for cohesion */}
      <div className="sticky top-0 z-30 backdrop-blur supports-[backdrop-filter]:bg-black/50 bg-black/70 border-b border-zinc-800">
        <div className="container mx-auto px-6 md:px-10">
          <nav aria-label="Services sections" role="navigation" className="flex flex-wrap items-center gap-3 py-3 text-sm">
            <a href="#full-stack-development" className="px-3 py-1.5 rounded-md text-zinc-300 hover:text-white hover:bg-zinc-900 transition-colors">Full‑Stack Development</a>
            <a href="#technology-consulting" className="px-3 py-1.5 rounded-md text-zinc-300 hover:text-white hover:bg-zinc-900 transition-colors">Technology Consulting</a>
            <a href="#system-refinement" className="px-3 py-1.5 rounded-md text-zinc-300 hover:text-white hover:bg-zinc-900 transition-colors">System Refinement</a>
          </nav>
        </div>
      </div>

      {/* Hero aligns typography, gradient, and leading with homepage (FutureHero) for a consistent brand feel */}
      <Vortex
        backgroundColor="black"
        particleCount={800}
        rangeY={220}
        baseHue={220}
        baseSpeed={0.15}
        rangeSpeed={0.9}
        baseRadius={0.5}
        rangeRadius={1.25}
        className="flex items-center flex-col justify-center px-4 md:px-10 py-16 md:py-24 w-full min-h-[50vh]"
      >
        <div className="pointer-events-auto text-center max-w-5xl mx-auto relative z-20">
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter leading-[1.07] bg-clip-text text-transparent bg-gradient-to-b from-zinc-100 to-zinc-500 drop-shadow-[0_0_18px_rgba(0,0,0,0.6)] mb-4">
            Services
          </h1>
          <p className="text-lg md:text-2xl text-zinc-300 leading-relaxed max-w-3xl mx-auto">
            Custom engineering, strategic guidance, and system upgrades that compound your results.
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

      {/* Service Overview (Bento) */}
      <section className="relative py-16 md:py-20 border-t border-zinc-800">
        <div className="container mx-auto px-4 md:px-6 max-w-6xl">
          {/* High-level overview using a bento grid for strong visual scanning */}
          <BentoGrid>
            <BentoCard className="md:col-span-3 row-span-2">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-600/10 border border-blue-500/20 flex items-center justify-center">
                    <Code aria-hidden className="h-5 w-5 text-blue-400" />
                  </div>
                  <span className="text-sm font-medium text-blue-300/90">Build</span>
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-zinc-100 tracking-tight">Full‑Stack Development</h3>
                <p className="mt-3 text-zinc-400 leading-relaxed">Design and ship modern, performant apps tailored to your workflow—from pixel to prod.</p>
              </div>
              <div className="mt-6 flex flex-wrap gap-2">
                {["Next.js","TypeScript","Node.js","APIs","Performance"].map((t)=> (
                  <span key={t} className="px-3 py-1 rounded-full bg-zinc-900/60 border border-zinc-800 text-xs text-zinc-300">{t}</span>
                ))}
              </div>
            </BentoCard>
            <BentoCard className="md:col-span-3 row-span-2">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-purple-600/10 border border-purple-500/20 flex items-center justify-center">
                    <Compass aria-hidden className="h-5 w-5 text-purple-400" />
                  </div>
                  <span className="text-sm font-medium text-purple-300/90">Guide</span>
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-zinc-100 tracking-tight">Technology Consulting</h3>
                <p className="mt-3 text-zinc-400 leading-relaxed">Clear roadmaps. Pragmatic choices. I help you pick the right stack, scope, and sequencing.</p>
              </div>
              <div className="mt-6 grid grid-cols-2 gap-2 text-sm">
                {[
                  "Strategy & Roadmaps",
                  "Buy vs Build",
                  "Vendor Evaluation",
                  "Cost & Risk Modeling",
                ].map((t)=> (
                  <div key={t} className="flex items-center gap-2 text-zinc-300"><CheckCircle aria-hidden className="h-4 w-4 text-purple-400" />{t}</div>
                ))}
              </div>
            </BentoCard>
            <BentoCard className="md:col-span-2">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-pink-600/10 border border-pink-500/20 flex items-center justify-center">
                  <Gauge aria-hidden className="h-5 w-5 text-pink-400" />
                </div>
                <h4 className="text-lg font-semibold text-zinc-100">System Refinement</h4>
              </div>
              <p className="text-zinc-400 text-sm leading-relaxed">Tune performance, reliability, and scalability without pausing your business.</p>
            </BentoCard>
            <BentoCard className="md:col-span-2">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-blue-600/10 border border-blue-500/20 flex items-center justify-center">
                  <Rocket aria-hidden className="h-5 w-5 text-blue-400" />
                </div>
                <h4 className="text-lg font-semibold text-zinc-100">AI & Automation</h4>
              </div>
              <p className="text-zinc-400 text-sm leading-relaxed">Agents, workflows, and integrations that move work forward—fast.</p>
            </BentoCard>
            <BentoCard className="md:col-span-2">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-green-600/10 border border-green-500/20 flex items-center justify-center">
                  <Wrench aria-hidden className="h-5 w-5 text-green-400" />
                </div>
                <h4 className="text-lg font-semibold text-zinc-100">Ongoing Partnership</h4>
              </div>
              <p className="text-zinc-400 text-sm leading-relaxed">Ship, measure, iterate. I stay engaged so systems keep compounding value.</p>
            </BentoCard>
          </BentoGrid>
        </div>
      </section>

      {/* Full‑Stack Development */}
      <section id="full-stack-development" className="relative py-20 md:py-24 border-t border-zinc-800">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto text-center reveal-on-scroll opacity-0 translate-y-8 transition-all duration-700 ease-out" style={{ transitionDelay: '120ms' }}>
            <div className="flex justify-center mb-6">
              <div className="w-14 h-14 rounded-2xl bg-blue-600/10 border border-blue-500/20 flex items-center justify-center">
                <Code aria-hidden="true" className="h-7 w-7 text-blue-400" />
              </div>
            </div>
            {/* Section headings follow homepage scale and color; avoid gradient here to let the hero own the spotlight */}
            <h2 className="text-3xl md:text-5xl font-bold text-zinc-100 tracking-tight mb-4">Full‑Stack Development</h2>
            <p className="text-zinc-400 text-base md:text-lg leading-relaxed max-w-3xl mx-auto mb-8">Transforming complex ideas into elegant digital solutions—from concept to deployment and beyond.</p>
            <div className="flex flex-wrap justify-center gap-2">
              <span className="px-3 py-1 bg-zinc-900/60 border border-zinc-800 rounded-full text-xs text-zinc-300">React/Next.js</span>
              <span className="px-3 py-1 bg-zinc-900/60 border border-zinc-800 rounded-full text-xs text-zinc-300">Node.js</span>
              <span className="px-3 py-1 bg-zinc-900/60 border border-zinc-800 rounded-full text-xs text-zinc-300">TypeScript</span>
              <span className="px-3 py-1 bg-zinc-900/60 border border-zinc-800 rounded-full text-xs text-zinc-300">Modern APIs</span>
            </div>
          </div>

          <div className="max-w-5xl mx-auto mt-10 grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              { title: 'Tailored Solutions', description: 'Software built precisely for your unique challenges and opportunities—no wasted features.', icon: <Zap aria-hidden="true" className="h-6 w-6 text-blue-400" /> },
              { title: 'Technical Excellence', description: 'Clean, maintainable code that evolves with your business.', icon: <Code aria-hidden="true" className="h-6 w-6 text-blue-400" /> },
              { title: 'Business Impact', description: 'Technology that directly drives user growth and revenue.', icon: <Cpu aria-hidden="true" className="h-6 w-6 text-blue-400" /> },
            ].map((prop, i) => (
              <div key={i} className="reveal-on-scroll opacity-0 translate-y-8 transition-all duration-700 ease-out" style={{ transitionDelay: `${200 + i * 100}ms` }}>
                {/* Card style mirrors homepage: subtle surface, soft border, understated hover */}
                <div className="h-full p-6 bg-zinc-900/50 rounded-2xl border border-zinc-800 hover:border-zinc-700 transition-all">
                  <div className="flex items-center justify-center h-12 w-12 bg-blue-600/10 border border-blue-500/20 rounded-lg mb-4">{prop.icon}</div>
                  <h3 className="text-lg font-semibold text-zinc-100 mb-2">{prop.title}</h3>
                  <p className="text-zinc-400 text-sm leading-relaxed">{prop.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Approach tabs (condensed, dark) */}
          <div className="max-w-5xl mx-auto mt-12 reveal-on-scroll opacity-0 translate-y-8 transition-all duration-700" style={{ transitionDelay: '350ms' }}>
            <div className="inline-flex items-center rounded-lg p-1 bg-zinc-900/60 border border-zinc-800">
              {(['frontend','backend','architecture'] as const).map((t) => (
                <button key={t} onClick={() => setActiveTab(t)} className={`px-3 md:px-4 py-2 rounded-md text-xs md:text-sm font-medium transition-all ${activeTab===t? 'bg-zinc-800 text-zinc-100':'text-zinc-400 hover:text-zinc-200'}`}>{t[0].toUpperCase()+t.slice(1)}</button>
              ))}
            </div>
            <div className="mt-6 bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 md:p-8">
              {activeTab === 'frontend' && (
                <div className="flex flex-col md:flex-row gap-6 items-start">
                  <div className="md:w-1/3 flex justify-center"><div className="w-24 h-24 rounded-xl bg-blue-600/10 border border-blue-500/20 flex items-center justify-center"><Globe className="h-12 w-12 text-blue-400" /></div></div>
                  <div className="md:w-2/3"><h3 className="text-lg font-semibold text-zinc-100 mb-2">Intuitive User Experiences</h3><p className="text-zinc-400 mb-3">Performant, responsive interfaces that adapt seamlessly across devices.</p><ul className="space-y-2 text-sm">{['React & Next.js','TypeScript','Tailwind CSS','Framer Motion','State management'].map((s,i)=> (<li key={i} className="flex items-center"><CheckCircle className="h-4 w-4 text-blue-400 mr-2" /><span className="text-zinc-300">{s}</span></li>))}</ul></div>
                </div>
              )}
              {activeTab === 'backend' && (
                <div className="flex flex-col md:flex-row gap-6 items-start">
                  <div className="md:w-1/3 flex justify-center"><div className="w-24 h-24 rounded-xl bg-purple-600/10 border border-purple-500/20 flex items-center justify-center"><Server className="h-12 w-12 text-purple-400" /></div></div>
                  <div className="md:w-2/3"><h3 className="text-lg font-semibold text-zinc-100 mb-2">Robust & Scalable Systems</h3><p className="text-zinc-400 mb-3">Secure, high‑performance foundations for growth.</p><ul className="space-y-2 text-sm">{['Node.js & Express','FastAPI','PostgreSQL & MongoDB','REST & GraphQL','Auth systems'].map((s,i)=> (<li key={i} className="flex items-center"><CheckCircle className="h-4 w-4 text-purple-400 mr-2" /><span className="text-zinc-300">{s}</span></li>))}</ul></div>
                </div>
              )}
              {activeTab === 'architecture' && (
                <div className="flex flex-col md:flex-row gap-6 items-start">
                  <div className="md:w-1/3 flex justify-center"><div className="w-24 h-24 rounded-xl bg-pink-600/10 border border-pink-500/20 flex items-center justify-center"><Database className="h-12 w-12 text-pink-400" /></div></div>
                  <div className="md:w-2/3"><h3 className="text-lg font-semibold text-zinc-100 mb-2">Future‑Proof Architecture</h3><p className="text-zinc-400 mb-3">Designing for change with cloud‑native patterns and scalable infra.</p><ul className="space-y-2 text-sm">{['Microservices or monolith','Docker & orchestration','AWS/Azure/GCP','Caching & perf','CI/CD pipelines'].map((s,i)=> (<li key={i} className="flex items-center"><CheckCircle className="h-4 w-4 text-pink-400 mr-2" /><span className="text-zinc-300">{s}</span></li>))}</ul></div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Technology Consulting */}
      <section id="technology-consulting" className="relative py-20 md:py-24 border-t border-zinc-800">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-10 reveal-on-scroll opacity-0 translate-y-8 transition-all duration-700 ease-out" style={{ transitionDelay: '120ms' }}>
              <div className="flex justify-center mb-6"><div className="w-14 h-14 rounded-2xl bg-blue-600/10 border border-blue-500/20 flex items-center justify-center"><Compass aria-hidden="true" className="h-7 w-7 text-blue-400" /></div></div>
              {/* Maintain homepage section heading style (no gradient) for consistency */}
              <h2 className="text-3xl md:text-5xl font-bold text-zinc-100 tracking-tight mb-4">Technology Consulting</h2>
              <p className="text-zinc-400 max-w-2xl mx-auto leading-relaxed">Strategic guidance to navigate the evolving technology landscape and drive digital transformation.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {[
                { icon:<Compass aria-hidden="true" className="h-6 w-6 text-blue-400" />, title:'Technology Strategy', text:'Develop comprehensive technology roadmaps aligned with your business objectives. We help you make informed decisions about technology investments and implementation timelines.' },
                { icon:<RefreshCcw aria-hidden="true" className="h-6 w-6 text-purple-400" />, title:'Digital Transformation', text:'Guide your organization through digital transformation initiatives. We help identify opportunities, mitigate risks, and implement changes that drive business value.' },
                { icon:<Search aria-hidden="true" className="h-6 w-6 text-green-400" />, title:'Technology Assessment', text:'Evaluate your current technology stack and identify areas for improvement. We provide actionable recommendations to enhance efficiency and reduce technical debt.' },
              ].map((card,i)=> (
                <div key={i} className="reveal-on-scroll opacity-0 translate-y-8 transition-all duration-700 ease-out" style={{ transitionDelay: `${150 + i*100}ms` }}>
                  <div className="h-full p-6 bg-zinc-900/50 rounded-2xl border border-zinc-800 hover:border-zinc-700 transition-all">
                    <div className="w-12 h-12 rounded-lg bg-zinc-900/60 border border-zinc-800 flex items-center justify-center mb-4">{card.icon}</div>
                    <h3 className="text-lg font-semibold text-zinc-100 mb-2">{card.title}</h3>
                    <p className="text-zinc-400 text-sm leading-relaxed">{card.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* System Refinement */}
      <section id="system-refinement" className="relative py-20 md:py-24 border-t border-zinc-800">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-10 reveal-on-scroll opacity-0 translate-y-8 transition-all duration-700 ease-out" style={{ transitionDelay: '120ms' }}>
              <div className="flex justify-center mb-6"><div className="w-14 h-14 rounded-2xl bg-purple-600/10 border border-purple-500/20 flex items-center justify-center"><Gauge aria-hidden="true" className="h-7 w-7 text-purple-400" /></div></div>
              <h2 className="text-3xl md:text-5xl font-bold text-zinc-100 tracking-tight mb-4">System Refinement</h2>
              <p className="text-zinc-400 max-w-2xl mx-auto leading-relaxed">Elevate your existing systems to peak performance through strategic optimization and modernization.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {[
                { icon:<Gauge aria-hidden="true" className="h-6 w-6 text-purple-400" />, title:'Enhanced Performance', text:'Optimize system speed and responsiveness through advanced performance tuning and architecture improvements.' },
                { icon:<ShieldCheck aria-hidden="true" className="h-6 w-6 text-green-400" />, title:'Improved Reliability', text:'Strengthen system stability and reduce downtime through robust error handling and failover mechanisms.' },
                { icon:<Layers aria-hidden="true" className="h-6 w-6 text-blue-400" />, title:'Modern Architecture', text:'Update legacy systems with modern design patterns and technologies while maintaining business continuity.' },
                { icon:<Shield aria-hidden="true" className="h-6 w-6 text-pink-400" />, title:'Scalable Solutions', text:'Prepare your systems for growth with architectures that scale efficiently with your business needs.' },
              ].map((card,i)=> (
                <div key={i} className="reveal-on-scroll opacity-0 translate-y-8 transition-all duration-700 ease-out" style={{ transitionDelay: `${150 + i*100}ms` }}>
                  <div className="h-full p-6 bg-zinc-900/50 rounded-2xl border border-zinc-800 hover:border-zinc-700 transition-all">
                    <div className="w-12 h-12 rounded-lg bg-zinc-900/60 border border-zinc-800 flex items-center justify-center mb-4">{card.icon}</div>
                    <h3 className="text-lg font-semibold text-zinc-100 mb-2">{card.title}</h3>
                    <p className="text-zinc-400 text-sm leading-relaxed">{card.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Process Timeline (Steps) */}
      <section className="relative py-16 md:py-24 border-t border-zinc-800">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900/60 border border-zinc-800 text-sm text-zinc-300">
              <CalendarCheck2 className="h-4 w-4 text-blue-400" aria-hidden /> How we’ll work
            </div>
            <h2 className="mt-4 text-3xl md:text-5xl font-bold text-zinc-100 tracking-tight">A simple, effective process</h2>
            <p className="mt-3 text-zinc-400 max-w-2xl mx-auto leading-relaxed">From idea to shipped system—focused on speed, clarity, and measurable outcomes.</p>
          </div>
          <Steps
            steps={[
              { title: 'Discovery & Direction', description: 'Short call to define goals, constraints, and what success looks like. You’ll get an actionable plan within 24–48 hours.' },
              { title: 'Design & Architecture', description: 'We align on scope and choose the simplest robust approach. Wireframes and systems diagram as needed.' },
              { title: 'Build & Integrate', description: 'Implement features in tight iterations. Frequent demos keep everything visible and adjustable.' },
              { title: 'Refine & Launch', description: 'Polish UX, performance, and reliability. Ship with a minimal, maintainable stack.' },
              { title: 'Evolve & Scale', description: 'Monitor results, add capabilities, and keep compounding value through ongoing partnership.' },
            ]}
          />
        </div>
      </section>

      {/* CTA - dark gradient */}
      <section className="py-28 px-4 text-center relative z-10 border-t border-zinc-800">
        <div className="container mx-auto max-w-3xl">
          <div className="reveal-on-scroll opacity-0 translate-y-8 transition-all duration-700" style={{ transitionDelay: '120ms' }}>
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
