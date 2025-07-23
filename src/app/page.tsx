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
  Command,
  ChevronDown,
  ChevronUp
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

// New flagship project card component with expandable details
const FlagshipProjectCard = ({
  title,
  subtitle,
  headline,
  shortDescription,
  detailedDescription,
  delay = 0
}: {
  title: string
  subtitle: string
  headline: string
  shortDescription: string
  detailedDescription: string
  delay?: number
}) => {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <div
      className={`reveal-on-scroll opacity-0 translate-y-8 transition-all duration-700 ease-out`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="bg-white border border-zinc-200 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden">
        {/* Header */}
        <div className="p-8 border-b border-zinc-100 bg-gradient-to-r from-zinc-50 to-white">
          <div className="mb-4">
            <div className="text-sm font-semibold text-blue-600 uppercase tracking-wide mb-2">{subtitle}</div>
            <h3 className="text-2xl md:text-3xl font-bold text-zinc-900 mb-2">{title}</h3>
            <p className="text-lg font-medium text-zinc-700">{headline}</p>
          </div>
        </div>

        {/* Content */}
        <div className="p-8">
          <p className="text-zinc-600 leading-relaxed mb-6">{shortDescription}</p>

          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="inline-flex items-center justify-center w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-lg transition-all duration-200 shadow-md hover:shadow-lg group"
          >
            {isExpanded ? 'Show Less' : 'Learn More About This System'}
            {isExpanded ? (
              <ChevronUp className="h-4 w-4 ml-2 transition-transform duration-200" />
            ) : (
              <ChevronDown className="h-4 w-4 ml-2 transition-transform duration-200" />
            )}
          </button>
        </div>

        {/* Expanded Details */}
        <div className={`grid transition-all duration-500 ease-in-out ${
          isExpanded ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
        }`}>
          <div className="overflow-hidden">
            <div className="border-t border-zinc-100 bg-zinc-50/50">
              <div className="px-8 py-8">
                <h4 className="text-lg font-semibold text-zinc-900 mb-4">System Details</h4>
                <div className="prose prose-zinc max-w-none">
                  <p className="text-zinc-700 leading-relaxed whitespace-pre-line">{detailedDescription}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

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

      {/* FLAGSHIP PROJECTS SECTION */}
      <section className="relative py-24 bg-zinc-50/50 border-t border-zinc-200">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">

            {/* Section header */}
            <div className="text-center mb-16 reveal-on-scroll opacity-0 translate-y-8 transition-all duration-700">
              <h2 className="text-4xl md:text-6xl font-bold text-zinc-900 mb-6">
                Flagship Systems
              </h2>
              <p className="text-xl text-zinc-600 max-w-3xl mx-auto leading-relaxed">
                Three complete system transformations that eliminated manual workflows,
                saved thousands of hours, and revolutionized entire industries.
              </p>
            </div>

            {/* Project cards grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

              {/* FD Shirts */}
              <FlagshipProjectCard
                title="FD Shirts"
                subtitle="E-Commerce Automation"
                headline="Fully Automated Clothing Brand Fulfillment"
                shortDescription="A complete end-to-end fulfillment system that transforms how fire departments manage their merchandise operations."
                detailedDescription="This is a fully automated clothing brand fulfillment service where all logistics are handled for the shop owner, essentially eliminating any manual workload they once had. What used to take 100 hours is now fully automated, with zero instances of error.

The shop owner simply announces a drop and opens the store. The system handles inventory management, order processing, fulfillment coordination, shipping logistics, customer service, and financial reconciliation.

Every aspect of the business that once required manual intervention—from processing orders to managing supplier relationships—now runs seamlessly in the background. This allows fire departments to focus on their core mission while generating revenue through branded merchandise without any operational overhead."
                delay={0}
              />

              {/* TrackTap */}
              <FlagshipProjectCard
                title="TrackTap"
                subtitle="Fitness Technology"
                headline="The First App for Experienced Lifters"
                shortDescription="Revolutionary fitness tracking designed specifically for serious athletes who know what they're doing in the gym."
                detailedDescription="TrackTap is the first app catered specifically for experienced lifters in the gym. Users create their own splits and exercise order—they're free to roam about the gym with their plan in their head, or reference a different workout of the same type.

The platform provides key insights for hypertrophy, progressive overload, rest time, work time, total volume, and detailed comparisons of the same lift against other users. This creates a comprehensive database that gives individual users feedback on how they stack up against the community.

Unlike other fitness apps that assume you need guidance, TrackTap respects that experienced lifters know their bodies and goals. It simply provides the intelligent tracking and analytics to optimize their performance, with advanced metrics that serious athletes actually care about.

The social comparison feature creates a competitive environment where users can benchmark their progress against others performing similar routines, driving motivation and providing real-world context for their achievements."
                delay={200}
              />

              {/* Verified Youth Lax */}
              <FlagshipProjectCard
                title="Verified Youth Lax"
                subtitle="Sports Compliance Platform"
                headline="Eliminating Cheating in Youth Athletics"
                shortDescription="Advanced age verification system that ensures fair competition in high-stakes youth tournaments."
                detailedDescription="Verified Youth Lax solves the problem of cheating in high-stakes competitive tournaments for young athletes. For many of these kids, they work tirelessly to compete at their maximum capacity for a shot to make it to a great college. The old system made it easy for a parent to sign a player up for leagues their child was too old to play in, not giving other teams a fair shot.

We solved this by creating a scan algorithm that processes birth certificates, checking for validity and age, and automates the entire intake process for new applicants. The result is a pool of players that have all been age-verified in the database.

Previously, the limited resources for checking birth certificates used to take weeks and cost organizations thousands in salary. Now it all happens at the click of a button with cutting-edge technology.

On top of the verification platform, we built a comprehensive UI for officials where they can create rosters near-instantly, assign them to events, create schedules for those events, and much more. Parents, players, coaches, event directors, and club directors all have their own use cases and dashboards to monitor what's important to them.

This application effectively replaced 12 full-time salaried workers and runs for pennies a day, while ensuring complete fairness and transparency in youth athletics."
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
