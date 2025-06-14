'use client'
import { Inter, JetBrains_Mono } from 'next/font/google'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { ArrowLeft, Play, CheckCircle, Clock, Users, TrendingUp, Zap, Target } from 'lucide-react'
import SmartSchedulerDemo from "../SmartSchedulerDemo"
import AutomatedInvoiceDemo from "../AutomatedInvoiceDemo"
import SocialMediaContentStudio from "../SocialMediaPlannerDemo"
import RevenueIntelligenceDemo from "../RevenueIntelligenceDemo"

const inter = Inter({ subsets: ['latin'] })
const jetbrains = JetBrains_Mono({ subsets: ['latin'] })

// Enhanced hex pattern for premium feel
const HexPattern = ({ className }: { className?: string }) => (
  <svg className={className} width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <pattern id="hexPatternDemos" width="60" height="104" patternUnits="userSpaceOnUse" patternTransform="scale(0.3)">
        <path
          d="M30 26l26 15v30l-26 15L4 71V41z"
          fill="none"
          stroke="currentColor"
          strokeOpacity="0.05"
          strokeWidth="1"
        />
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#hexPatternDemos)" />
  </svg>
)

export default function DemosPage() {
  const [currentDemo, setCurrentDemo] = useState(0)
  const [animateIn, setAnimateIn] = useState(false)

  useEffect(() => {
    setAnimateIn(true)

    // Intersection observer for reveal animations
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    }

    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed')
        }
      })
    }

    const observer = new IntersectionObserver(handleIntersect, observerOptions)
    document.querySelectorAll('.reveal-item').forEach(item => {
      observer.observe(item)
    })

    return () => observer.disconnect()
  }, [])

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
    }
  ]

  return (
    <main className={`min-h-screen bg-black text-white ${inter.className}`}>
      {/* Ambient background elements */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-0 w-4 h-full bg-gradient-to-b from-blue-600/20 via-purple-600/20 to-transparent" />
        <div className="absolute top-0 right-0 w-4 h-full bg-gradient-to-b from-transparent via-purple-600/20 to-blue-600/20" />
        <HexPattern className="absolute inset-0 text-white opacity-10" />
      </div>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-radial from-blue-900/30 via-purple-900/20 to-transparent opacity-60" />
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-blue-600/20 rounded-full filter blur-[120px]" />
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-purple-600/20 rounded-full filter blur-[120px]" />

        <div className="relative z-10 container mx-auto px-4 text-center">
          <div className={`transform transition-all duration-1000 ease-out ${animateIn ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
            <Link
              href="/"
              className="inline-flex items-center text-gray-400 hover:text-white transition-colors mb-8 group"
            >
              <ArrowLeft className="h-4 w-4 mr-2 transition-transform group-hover:-translate-x-1" />
              Back to Home
            </Link>

            <div className="flex justify-center mb-8">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center">
                <Play className="h-10 w-10 text-white ml-1" />
              </div>
            </div>

            <h1 className={`text-5xl md:text-7xl font-bold ${jetbrains.className} mb-6 tracking-tight`}>
              <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                LIVE DEMOS
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-12 leading-relaxed">
              Experience the future of business automation.
              <span className="text-white font-medium"> See real solutions</span> to real problems,
              demonstrated live.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto mb-16">
              {[
                { icon: Clock, label: 'Save Hours Daily', desc: 'Automate repetitive tasks' },
                { icon: Target, label: 'Zero Errors', desc: 'Eliminate human mistakes' },
                { icon: TrendingUp, label: 'Scale Instantly', desc: 'Grow without limits' }
              ].map((benefit, index) => (
                <div key={index} className={`transform transition-all duration-700 delay-${300 + index * 100} ${animateIn ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
                  <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                    <benefit.icon className="h-8 w-8 text-blue-400 mx-auto mb-3" />
                    <h3 className="font-semibold mb-2">{benefit.label}</h3>
                    <p className="text-gray-400 text-sm">{benefit.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Demo Sections */}
      {demos.map((demo, index) => (
        <section key={demo.id} className="relative py-24 border-t border-white/10">
          <div className="container mx-auto px-4">
            {/* Problem Statement */}
            <div className="max-w-4xl mx-auto text-center mb-16 reveal-item opacity-0 transition-all duration-1000 translate-y-8" style={{ transitionDelay: '100ms' }}>
              <div className="inline-flex items-center px-4 py-2 bg-red-500/10 border border-red-500/20 rounded-full text-red-400 text-sm font-medium mb-8">
                <span className="w-2 h-2 bg-red-500 rounded-full mr-2 animate-pulse"></span>
                REAL CLIENT CONCERN
              </div>

              <div className="bg-gradient-to-br from-red-900/40 to-orange-900/40 border border-red-400/20 rounded-2xl p-8 mb-12">
                <h2 className="text-2xl md:text-3xl font-bold text-red-100 mb-4">
                  "{demo.problem}"
                </h2>
                <p className="text-red-200/80">This is what we hear from business owners every day</p>
              </div>

              {/* Solution Announcement */}
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-pink-600/20 rounded-2xl blur-xl" />
                <div className="relative bg-gradient-to-br from-blue-900/60 to-purple-900/60 border border-blue-400/30 rounded-2xl p-8">
                  <div className="flex items-center justify-center mb-4">
                    <CheckCircle className="h-8 w-8 text-green-400 mr-3" />
                    <span className="text-green-400 font-semibold text-lg">SOLUTION</span>
                  </div>
                  <h3 className={`text-3xl md:text-4xl font-bold ${jetbrains.className} mb-4`}>
                    <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                      {demo.title}
                    </span>
                  </h3>
                  <p className="text-xl text-gray-300 mb-6">{demo.solution}</p>

                  {/* Stats */}
                  <div className={`grid grid-cols-2 gap-6 max-w-2xl mx-auto ${demo.stats.length === 4 ? 'md:grid-cols-4' : 'md:grid-cols-3'}`}>
                    {demo.stats.map((stat, statIndex) => (
                      <div key={statIndex} className="text-center">
                        <div className="text-2xl md:text-3xl font-bold text-white mb-1">{stat.value}</div>
                        <div className="text-gray-400 text-sm">{stat.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Demo Component */}
            <div className="reveal-item opacity-0 transition-all duration-1000 translate-y-8" style={{ transitionDelay: '200ms' }}>
              {demo.component}
            </div>
          </div>
        </section>
      ))}

      {/* CTA Section */}
      <section className="relative py-24 bg-gradient-to-br from-gray-900 to-black border-t border-white/10">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-600/10 rounded-full filter blur-[100px]" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-600/10 rounded-full filter blur-[100px]" />
        </div>

        <div className="relative z-10 container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto reveal-item opacity-0 transition-all duration-1000 translate-y-8" style={{ transitionDelay: '100ms' }}>
            <h2 className={`text-4xl md:text-5xl font-bold ${jetbrains.className} mb-6`}>
              Ready to Automate Your Business?
            </h2>
            <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto">
              These demos show just a fraction of what's possible. Let's build something custom for your specific needs.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link
                href="/contact"
                className="px-10 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white rounded-lg font-semibold transition-all duration-300 text-lg min-w-[200px] shadow-xl"
              >
                Start Your Project
              </Link>
              <Link
                href="/services/full-stack-development"
                className="px-10 py-4 bg-white/5 border border-white/20 hover:bg-white/10 rounded-lg font-semibold transition-colors text-lg min-w-[200px]"
              >
                Explore Services
              </Link>
            </div>
          </div>
        </div>
      </section>

      <style jsx global>{`
        .revealed {
          opacity: 1 !important;
          transform: translateY(0) !important;
        }

        @keyframes gradient-shift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }

        .bg-gradient-radial {
          background: radial-gradient(circle at center, var(--tw-gradient-stops));
        }
      `}</style>
    </main>
  )
}
