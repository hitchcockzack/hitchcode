'use client'
import { Inter } from 'next/font/google'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import { Suspense, useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { ArrowRight, Zap, GitBranch, Cpu, Check } from 'lucide-react'
// Removed Proven Impact ribbon in favor of immersive scroll section
import { StickyScroll } from '@/components/ui/sticky-scroll-reveal'
import NeuralIntro from './components/NeuralIntro'
import MirrorRubiksCube from './components/MirrorRubiksCube'
import { Vortex } from '@/components/ui/vortex'

const FutureHero = dynamic(() => import('./components/FutureHero'), { ssr: false })

const inter = Inter({ subsets: ['latin'] })

const useScrollReveal = () => {
  useEffect(() => {
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
      <Canvas className="pointer-events-none block w-full h-full z-0 bg-transparent" camera={{ position: [0, 0, 8], fov: 60 }} dpr={[1, 2]}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 5, 5]} intensity={1.8} />
        <Suspense fallback={null}>
          <MirrorRubiksCube position={[0, 0.35, 0]} scaleFactor={1.9} />
        </Suspense>
        <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} enabled={false} />
      </Canvas>
    </div>
  )
}

export default function HomePage() {
  useScrollReveal()

  return (
    <main
      className={`min-h-screen bg-black text-zinc-300 ${inter.className}`}
    >
      <div className="absolute inset-0 z-0 h-full w-full">
        <Vortex
          backgroundColor="black"
          colors={['#2563eb', '#a21caf']}
          intensity={0.25}
          className="h-full w-full"
        />
      </div>
      <FutureHero />
      {/* Full-width sticky scroll reveal – Proven Impact case studies */}
      <section className="w-full">
        <StickyScroll
          content={[
            {
              title: 'Make Your Business Run on Autopilot',
              description:
                "I design automations that take the repetitive stuff off your plate so you can focus on the things that actually move the needle.",
              content: <CubeMedia />,
            },
            {
              title: 'AI That Works Like a Team Member',
              description:
                "From answering leads to generating reports, I’ll build AI tools that think, respond, and act like they’re part of your business.",
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
              title: 'Custom Software',
              description:
                'Off-the-shelf tools don’t always cut it. I’ll design software that’s built around how you work, not the other way around.',
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
              title: 'From Idea to Reality — Fast',
              description:
                'Got a concept for an app, service, or workflow? I’ll turn it into something real, tested, and ready to launch.',
              content: <CubeMedia />,
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
        />
      </section>
      <NeuralIntro />

      {/* INTRODUCTION */}
      <section className="py-24 px-4 bg-zinc-950 border-y border-zinc-800">
        <div className="container mx-auto max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-center">
            <div
              className="md:col-span-1 reveal-on-scroll opacity-0 -translate-x-8 transition-all duration-700 ease-out"
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
              className="md:col-span-2 text-center md:text-left reveal-on-scroll opacity-0 translate-y-8 transition-all duration-700 ease-out"
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

      {/* SERVICES */}
      <section className="py-24 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div
              className="reveal-on-scroll opacity-0 translate-y-8 transition-all duration-700 ease-out"
              style={{ transitionDelay: '100ms' }}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-zinc-100 mb-4">
                What I Build
              </h2>
              <p className="text-lg text-zinc-400 leading-relaxed">
                I specialize in three core areas of system development, each designed
                to eliminate friction and unlock scale.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <ServiceCard
              icon={GitBranch}
              title="Full-Stack System Development"
              description="From concept to deployment, I build complete, production-grade applications. This includes architecting the database, crafting the user interface, and engineering the business logic that powers it all."
              delay={200}
            />
            <ServiceCard
              icon={Zap}
              title="Intelligent Automation"
              description="I identify and eliminate your most time-consuming manual workflows by designing intelligent automation systems. This frees up your team to focus on high-impact work, not repetitive tasks."
              delay={400}
            />
            <ServiceCard
              icon={Cpu}
              title="Technology Consulting & Refinement"
              description="For businesses with existing technology, I provide strategic guidance to optimize performance, enhance security, and scale your infrastructure. We'll turn your tech debt into a competitive asset."
              delay={600}
            />
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-32 px-4 text-center relative z-10">
        <div className="container mx-auto max-w-3xl">
          <div
            className="reveal-on-scroll opacity-0 translate-y-8 transition-all duration-700 ease-out"
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
            padding-top: 6rem;
            padding-bottom: 4rem;
          }
        }
      `}</style>
    </main>
  )
}
