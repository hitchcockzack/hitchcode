'use client'
import { Inter } from 'next/font/google'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import {
  ArrowRight,
  CheckCircle,
  ExternalLink,
  Play,
  Zap,
  Target,
  Shield,
  TrendingUp,
  Users,
  Timer,
  Camera,
  BarChart3,
  Activity,
  Smartphone,
  Database,
  Cpu,
  GitBranch,
  Command
} from 'lucide-react'

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

// Modern card component
const ProjectCard = ({
  subtitle,
  headline,
  metric,
  description,
  buttonText,
  href,
  icon: Icon,
  delay = 0
}: {
  subtitle: string
  headline: string
  metric: string
  description: string
  buttonText: string
  href: string
  icon: any
  delay?: number
}) => (
  <div
    className={`reveal-on-scroll opacity-0 translate-y-8 transition-all duration-700 ease-out group`}
    style={{ transitionDelay: `${delay}ms` }}
  >
    <div className="bg-white border border-zinc-200 rounded-xl p-8 hover:border-zinc-300 hover:shadow-md transition-all duration-200 h-full">
      <div className="flex items-start justify-between mb-6">
        <div className="p-3 bg-zinc-50 rounded-lg">
          <Icon className="h-6 w-6 text-zinc-700" />
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-zinc-900 font-mono">{metric}</div>
          <div className="text-sm text-zinc-500">improvement</div>
        </div>
      </div>

      <div className="mb-6">
        <div className="text-sm font-medium text-zinc-500 mb-2">{subtitle}</div>
        <h3 className="text-xl font-semibold text-zinc-900 mb-3">{headline}</h3>
        <p className="text-zinc-600 leading-relaxed">{description}</p>
      </div>

      <Link
        href={href}
        className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200 group"
      >
        {buttonText}
        <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform duration-200" />
      </Link>
    </div>
  </div>
)

export default function Home() {
  useScrollReveal()

  return (
    <main className={`min-h-screen bg-white ${inter.className}`}>

      {/* HERO SECTION */}
      <section className="relative bg-white">
        <div className="container mx-auto px-4 pt-24 pb-32">
          <div className="max-w-4xl mx-auto text-center">

            {/* Highlight bar */}


            {/* Main headline */}
            <div className="reveal-on-scroll opacity-0 translate-y-8 transition-all duration-700 mb-8" style={{ transitionDelay: '200ms' }}>
              <h1 className="text-5xl md:text-7xl font-bold text-zinc-900 mb-6 tracking-tight">
                Your System Architect
                <br />
                <span className="text-zinc-600">Not Another Developer</span>
              </h1>

              <p className="text-xl md:text-2xl text-zinc-700 max-w-3xl mx-auto leading-relaxed">
                I build intelligent automation systems that eliminate complexity
                and let you scale without friction.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="reveal-on-scroll opacity-0 translate-y-8 transition-all duration-700 flex flex-col sm:flex-row items-center justify-center gap-4" style={{ transitionDelay: '400ms' }}>
              <Link
                href="/contact"
                className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors duration-200 shadow-sm hover:shadow-md"
              >
                Book Consultation
              </Link>

              <Link
                href="/demos"
                className="px-8 py-4 bg-white border border-zinc-200 hover:border-zinc-300 text-zinc-900 rounded-lg font-semibold transition-all duration-200 group flex items-center"
              >
                See My Work
                <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CASE STUDIES SECTION */}
      <section className="relative py-24 bg-zinc-50/50 border-t border-zinc-200">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">

            {/* Section header */}
            <div className="text-center mb-16 reveal-on-scroll opacity-0 translate-y-8 transition-all duration-700">
              <h2 className="text-3xl md:text-5xl font-bold text-zinc-900 mb-6">
                Real Systems. Real Results.
              </h2>
              <p className="text-xl text-zinc-600 max-w-2xl mx-auto">
                Three transformations across different industries,
                each solving unique operational complexity.
              </p>
            </div>

            {/* Project cards grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

              {/* FD Shirts */}
              <ProjectCard
                subtitle="Fire Department Merch Platform"
                headline="From Clunky Ordering to Mobile-First Flow"
                metric="300%"
                description="Transformed manual email ordering into a seamless PWA with real-time customization, mobile admin workflows, and automated fulfillment."
                buttonText="View Case Study"
                href="/demos"
                icon={Zap}
                delay={0}
              />

              {/* TrackTap */}
              <ProjectCard
                subtitle="Progressive Overload Tracker"
                headline="Strength Gains, Automated"
                metric="80%"
                description="Built intelligent gym tracking with progressive overload automation, smart rescheduling, and streak motivation that keeps users consistent."
                buttonText="See How It Works"
                href="/demos"
                icon={TrendingUp}
                delay={200}
              />

              {/* Verified Roster */}
              <ProjectCard
                subtitle="Youth Sports Compliance"
                headline="Age Verification in Seconds"
                metric="95%"
                description="Created OCR-powered age verification system with automated roster generation, eliminating hours of manual compliance work."
                buttonText="Explore Platform"
                href="/demos"
                icon={Shield}
                delay={400}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section className="relative py-24 bg-white border-t border-zinc-200">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

              {/* Content */}
              <div className="reveal-on-scroll opacity-0 translate-y-8 transition-all duration-700">
                <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 mb-6">
                  Built by Zack Hitchcock
              </h2>

                <div className="prose prose-lg text-zinc-700 leading-relaxed">
                  <p>
                    I'm not a generalist. I work deep within niche verticals where
                    workflow inefficiencies destroy scale. My work combines automation,
                    analytics, and UX to create real systems change.
                  </p>

                  <p>
                    Every solution I build starts with understanding the specific friction
                    points that slow your operation down. Then I architect intelligence
                    that makes those problems disappear.
              </p>
            </div>

                <div className="mt-8 grid grid-cols-2 gap-6">
                  <div>
                    <div className="text-2xl font-bold text-zinc-900">10+</div>
                    <div className="text-sm text-zinc-600">Years building systems</div>
                      </div>
                      <div>
                    <div className="text-2xl font-bold text-zinc-900">50+</div>
                    <div className="text-sm text-zinc-600">Businesses transformed</div>
                  </div>
                </div>
              </div>

              {/* Visual element */}
              <div className="reveal-on-scroll opacity-0 translate-y-8 transition-all duration-700" style={{ transitionDelay: '200ms' }}>
                <div className="bg-zinc-50 rounded-2xl p-8 border border-zinc-200">
                  <div className="space-y-6">
                    <div className="flex items-center justify-between py-3 border-b border-zinc-200">
                      <span className="text-zinc-700">System Architecture</span>
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    </div>
                    <div className="flex items-center justify-between py-3 border-b border-zinc-200">
                      <span className="text-zinc-700">Process Automation</span>
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    </div>
                    <div className="flex items-center justify-between py-3 border-b border-zinc-200">
                      <span className="text-zinc-700">UX/UI Design</span>
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    </div>
                    <div className="flex items-center justify-between py-3">
                      <span className="text-zinc-700">Performance Optimization</span>
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TECH STACK SECTION */}
      <section className="relative py-16 bg-zinc-50/50 border-t border-zinc-200">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">

            <div className="text-center mb-12 reveal-on-scroll opacity-0 translate-y-8 transition-all duration-700">
              <h3 className="text-lg font-semibold text-zinc-600 mb-4">
                Built with Modern Stack
              </h3>
            </div>

            <div className="reveal-on-scroll opacity-0 translate-y-8 transition-all duration-700" style={{ transitionDelay: '200ms' }}>
              <div className="grid grid-cols-2 md:grid-cols-6 gap-8 items-center">
                {[
                  { name: 'Next.js', icon: '▲' },
                  { name: 'Supabase', icon: '⚡' },
                  { name: 'TypeScript', icon: 'TS' },
                  { name: 'Tailwind', icon: '🎨' },
                  { name: 'PostgreSQL', icon: '🐘' },
                  { name: 'Vercel', icon: '△' }
                ].map((tech, index) => (
                  <div key={index} className="text-center group">
                    <div className="w-12 h-12 bg-white border border-zinc-200 rounded-lg flex items-center justify-center mx-auto mb-3 group-hover:border-zinc-300 transition-colors duration-200">
                      <span className="text-lg font-bold text-zinc-700">{tech.icon}</span>
                  </div>
                    <div className="text-sm text-zinc-600 font-medium">{tech.name}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA SECTION */}
      <section className="relative py-32 bg-white border-t border-zinc-200">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">

            <div className="reveal-on-scroll opacity-0 translate-y-8 transition-all duration-700">
              <h2 className="text-4xl md:text-6xl font-bold text-zinc-900 mb-8">
                Reclaim Your Time.
              </h2>

              <p className="text-xl text-zinc-600 mb-12 leading-relaxed">
                Stop accepting operational friction as "just part of business."
                Let's architect a system that makes your workflows disappear.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Link
                    href="/contact"
                  className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors duration-200 shadow-sm hover:shadow-md"
                >
                  Start a Project
                  </Link>

                  <Link
                    href="/contact"
                  className="px-8 py-4 bg-white border border-zinc-200 hover:border-zinc-300 text-zinc-900 rounded-lg font-semibold transition-all duration-200"
                >
                  Get Audit
                  </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Custom CSS for animations */}
      <style jsx>{`
        .animate-in {
          opacity: 1 !important;
          transform: translateY(0) !important;
        }

        /* Smooth scrolling */
        html {
          scroll-behavior: smooth;
        }

        /* Custom scrollbar for webkit browsers */
        ::-webkit-scrollbar {
          width: 6px;
        }

        ::-webkit-scrollbar-track {
          background: #f1f1f1;
        }

        ::-webkit-scrollbar-thumb {
          background: #c1c1c1;
          border-radius: 3px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: #a8a8a8;
        }

        /* Focus styles for accessibility */
        .focus-visible:focus {
          outline: 2px solid #3A5AFF;
          outline-offset: 2px;
        }

        /* Mobile optimizations */
        @media (max-width: 768px) {
          .prose {
            font-size: 1rem;
          }

          .text-5xl {
            font-size: 2.5rem;
          }

          .text-7xl {
            font-size: 3.5rem;
          }
        }

        /* Reduce motion for accessibility */
        @media (prefers-reduced-motion: reduce) {
          .transition-all,
          .transition-colors,
          .transition-transform {
            transition: none;
          }

          .animate-pulse {
            animation: none;
          }
        }

        /* High contrast mode support */
        @media (prefers-contrast: high) {
          .border-zinc-200 {
            border-color: #000;
          }

          .text-zinc-600 {
            color: #000;
          }
        }
      `}</style>
    </main>
  )
}
