'use client'
import { Inter } from 'next/font/google'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { ArrowRight, Zap, GitBranch, Cpu, Check, CalendarCheck2 } from 'lucide-react'
// Removed Proven Impact ribbon in favor of immersive scroll section
import { StickyScroll } from '@/components/ui/sticky-scroll-reveal'
import NeuralIntro from './components/NeuralIntro'
import MirrorRubiksCube from './components/MirrorRubiksCube'
import { Vortex } from '@/components/ui/vortex'
import Steps from '@/components/magicui/steps'


const FutureHero = dynamic(() => import('./components/FutureHero'), { ssr: false })

const inter = Inter({ subsets: ['latin'] })

const useScrollReveal = (enabled: boolean) => {
  useEffect(() => {
    if (!enabled) return;
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1,
    }

    const handleIntersect = (
      entries: IntersectionObserverEntry[],
      observer: IntersectionObserver
    ) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in')
          observer.unobserve(entry.target)
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

const ServiceCard = ({ icon: Icon, title, description, delay = 0 }: any) => (
  <div
    className="reveal-on-scroll opacity-0 translate-y-8 transition-all duration-700 ease-out p-8 bg-zinc-900/50 rounded-2xl border border-zinc-800"
    style={{ transitionDelay: `${delay}ms` }}
  >
    <div className="flex items-center justify-center h-12 w-12 bg-blue-600/10 border border-blue-500/20 rounded-lg mb-6">
      <Icon className="h-6 w-6 text-blue-400" />
    </div>
    <h3 className="text-xl font-bold text-zinc-100 mb-3">{title}</h3>
    <p className="text-zinc-400 leading-relaxed">{description}</p>
  </div>
)

const ProjectShowcase = ({
  title,
  subtitle,
  description,
  tags,
  delay = 0,
}: any) => (
  <div
    className="reveal-on-scroll opacity-0 translate-y-8 transition-all duration-700 ease-out py-12 border-b border-zinc-800 last:border-b-0"
    style={{ transitionDelay: `${delay}ms` }}
  >
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
      <div className="md:col-span-1">
        <div className="text-sm font-semibold text-blue-400 uppercase tracking-wider mb-2">
          {subtitle}
        </div>
        <h3 className="text-2xl font-bold text-zinc-100">{title}</h3>
      </div>
      <div className="md:col-span-2">
        <p className="text-zinc-400 leading-relaxed mb-6">{description}</p>
        <div className="flex flex-wrap gap-3">
          {tags.map((tag: string, i: number) => (
            <div
              key={i}
              className="flex items-center gap-2 px-3 py-1 bg-zinc-800/50 border border-zinc-700 rounded-full"
            >
              <Check className="h-4 w-4 text-green-500" />
              <span className="text-sm text-zinc-300 font-medium">{tag}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
)

function CubeMedia() {
  return (
    <div className="w-full h-full relative">
      <Canvas
        className="pointer-events-none block w-full h-full z-0 bg-transparent"
        camera={{ position: [0, 0, 8], fov: 60 }}
        dpr={[1, 1.5]}
      >
        {/* Balanced lighting; leave reflections to Environment HDRI */}
        <ambientLight intensity={0.5} />
        <hemisphereLight args={[0xffffff, 0x222222, 0.3]} position={[0, 1, 0]} />
        <directionalLight position={[5, 5, 5]} intensity={0.9} />
        <directionalLight position={[-4, 3, 4]} intensity={0.6} />
        {/* Render cube directly; its internal environment now loads in its own Suspense */}
        <MirrorRubiksCube position={[0, 0.35, 0]} scaleFactor={1.9} />
        <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} enabled={false} />
      </Canvas>
    </div>
  )
}

export default function HomePage() {
  const [isMobile, setIsMobile] = useState(false)
  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768)
    onResize()
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])
  useScrollReveal(!isMobile)
  const revealY = isMobile ? '' : 'reveal-on-scroll opacity-0 translate-y-8 transition-all duration-700 ease-out'
  const revealX = isMobile ? '' : 'reveal-on-scroll opacity-0 -translate-x-8 transition-all duration-700 ease-out'

  return (
    <main
      className={`min-h-screen bg-black text-zinc-300 ${inter.className}`}
    >
      {/* Hero aligned exactly to services page structure */}
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
            Your One‑Person Systems Team
          </h1>
          <p className="text-lg md:text-2xl text-zinc-300 leading-relaxed max-w-3xl mx-auto">
            I’m Zack — a full‑stack software developer and systems architect who designs AI agents, automations, and custom software.
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
      {/* Full-width sticky scroll reveal – Proven Impact case studies */}
      <section className="w-full">
        {/* Section header */}
        <div className="px-6 md:px-10 pt-8 md:pt-12 text-center relative z-30">
          <h2 className="text-3xl md:text-5xl font-bold text-zinc-100 tracking-tight">
            What I Can Do For You
          </h2>
          <p className="text-zinc-400 mt-3 max-w-2xl mx-auto">
            Practical systems that save time, scale operations, and create real leverage—built with today’s best AI and automation tools.
          </p>
        </div>
        {!isMobile ? (
        <StickyScroll
          content={[
            {
              title: 'Workflow Automation with Make, n8n, Zapier — or Fully Custom',
              description:
              'I audit your workflows and connect the dots between tools so work moves automatically. Whether it’s Make.com, n8n, Zapier, or custom code, I’ll design robust, scalable automations—hosted on-prem, on-site, or in the cloud. Instantly reply to your DMs, reach out to new leads, send welcome emails, and handle the busywork you hate—freeing you to grow your business.',
              content: <CubeMedia />,
            },
            {
              title: 'Custom Software',
              description:
              'Off-the-shelf tools don’t always cut it. I’ll design software that’s built around how you work, not the other way around. Simple landing pages to enterprise-level SaaS.',
              content: <CubeMedia />,
            },
            {
              title: 'MCP Agents & Connectors',
              description:
              "MCP is like a universal adapter that lets AI safely use your systems. I build custom MCP connectors and guardrails so your AI can fetch the right data, take the right actions, and stay within your rules—securely and predictably.",
              content: <CubeMedia />,
            },
            {
              title: 'One-Click Documents',
              description:
              'Need invoices, contracts, proposals, or reports? I set you up to generate them instantly, perfectly formatted, every single time.',
              content: <CubeMedia />,
            },
            {
              title: 'Lead Generation',
              description:
              'I build targeted, automated lead generation systems that fill your inbox with qualified prospects while you sleep.',
              content: <CubeMedia />,
            },
            {
              title: 'Data Management',
              description:
              'I’ll pull, clean, and organize your data so you actually get answers you can use — no more spreadsheet chaos.',
              content: <CubeMedia />,
            },
            {
              title: 'Strategic Tech Partnership',
              description:
              'Need a second brain for your tech decisions? I help you choose the right tools, integrations, and strategies to grow faster.',
              content: <CubeMedia />,
            },
            {
              title: 'AI Agents That Never Sleep',
              description:
              'I build AI agents that instantly reply to your DMs, reach out to new leads, send welcome emails, and handle the busywork you hate—freeing you to grow your business.',
              content: <CubeMedia/>,
            },
            {
              title: 'Integrations',
              description:
                'Your systems will talk to each other — CRM, email, scheduling, invoicing — no more manual copying and pasting.',
              content: <CubeMedia />,
            },
            {
              title: 'Always in Your Corner',
              description:
                'I don’t just “deliver a project” — I stick around to make sure it’s running smoothly and keep improving it as your needs grow.',
              content: <CubeMedia />,
            },
          ]}
        />) : (
          <div className="px-6 pt-6 grid grid-cols-1 gap-4 max-w-2xl mx-auto">
            {[
              'Custom Software',
              'Workflow Automation',
              'Strategic Tech Partnership',
              'One-Click Documents',
              'Lead Generation',
              'AI Agents',
              'Data Management',
              'MCP Agents & Connectors',
              'Integrations',
              'Always Reachable',
            ].map((title, idx) => (
              <div key={title + idx} className="p-4 rounded-xl border border-zinc-800 bg-zinc-900/40">
                <h3 className="text-zinc-100 font-semibold">{title}</h3>
              </div>
            ))}
          </div>
        )}
        {/* Section CTA */}
        <div className="px-6 md:px-10 pb-10 md:pb-14 text-center">
          <p className="text-zinc-300 mb-6 max-w-2xl mx-auto">
            One of these catch your eye? Click the button below to reach out for a quick demo or to talk through your use case.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 group bg-blue-600 hover:bg-blue-700 text-white font-semibold text-base md:text-lg px-6 md:px-8 py-3 md:py-4 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-[0_0_20px_rgba(59,130,246,0.2)]"
          >
            Get a Demo or Consultation
            <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </section>
      {/* Removed Autonomous Stability/NeuralIntro section per request */}

      {/* INTRODUCTION */}
      <section className="py-24 px-4 bg-zinc-950 border-y border-zinc-800">
        <div className="container mx-auto max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-center">
            <div
              className={`md:col-span-1 ${revealX}`}
              style={{ transitionDelay: '200ms' }}
            >
              <div className="p-1.5 bg-gradient-to-br from-zinc-700 via-zinc-900 to-zinc-950 rounded-full max-w-max mx-auto md:mx-0">
                <img
                  src="/optimized/zack.webp"
                  alt="Zack Hitchcock"
                  className="w-48 h-48 rounded-full object-cover border-4 border-zinc-950"
                />
              </div>
            </div>
            <div
              className={`md:col-span-2 text-center md:text-left ${revealY}`}
              style={{ transitionDelay: '400ms' }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-zinc-100 mb-6">
                Hi, I'm Zack Hitchcock.
                <br />A Partner, Not a Programmer.
              </h2>
              <div className="text-lg text-zinc-400 space-y-6 leading-relaxed">
                <p>
                  I don't just write code. I architect end-to-end systems that
                  solve core business problems. My expertise lies in translating
                  complex operational challenges into streamlined, automated,
                  and intelligent platforms.
                </p>
                <p>
                  Think of me as a technical co-founder for hire—deeply invested
                  in your success, relentlessly focused on results, and committed
                  to building technology that creates lasting value.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

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

      {/* FINAL CTA */}
      <section className="py-32 px-4 text-center relative z-10">
        <div className="container mx-auto max-w-3xl">
          <div
            className={revealY}
            style={{ transitionDelay: '100ms' }}
          >
            <h2 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-zinc-50 to-zinc-400 mb-8 leading-[1.07] tracking-tighter pb-[10px] -mb-[10px] relative z-20 overflow-visible">
              Ready to Build Your Advantage?
            </h2>
            <p className="text-xl text-zinc-400 mb-12 leading-relaxed overflow-visible relative z-10">
              Let's discuss how a thoughtfully architected system can transform
              your business. I partner with a select group of clients to ensure
              maximum focus and impact.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 group bg-blue-600 hover:bg-blue-700 text-white font-semibold text-lg px-8 py-4 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-[0_0_20px_rgba(59,130,246,0.2)]"
              >
                Book a Consultation
                <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 group text-zinc-300 hover:text-white font-semibold text-lg px-8 py-4 rounded-lg transition-colors duration-300"
              >
                Learn More About Me
              </Link>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        .bg-grid-zinc-800\\/20 {
          background-image: linear-gradient(
              to right,
              rgba(63, 63, 70, 0.2) 1px,
              transparent 1px
            ),
            linear-gradient(to bottom, rgba(63, 63, 70, 0.2) 1px, transparent 1px);
          background-size: 40px 40px;
        }

        .animate-in {
          opacity: 1 !important;
          transform: translateY(0) !important;
          transform: translateX(0) !important;
        }

        /* Smooth scrolling */
        html {
          scroll-behavior: smooth;
        }

        /* Responsive adjustments */
        @media (max-width: 768px) {
          .text-7xl {
            font-size: 3.5rem;
          }
          .text-5xl {
            font-size: 2.75rem;
          }
          .text-4xl {
            font-size: 2.25rem;
          }
          .py-24 {
            padding-top: 4rem;
            padding-bottom: 4rem;
          }
          .py-32 {
            padding-top: 5rem;
            padding-bottom: 5rem;
          }
          .min-h-screen {
            min-height: auto;
            padding-top: 0rem;
            padding-bottom: 3.5rem;
          }
        }
      `}</style>
    </main>
  )
}
