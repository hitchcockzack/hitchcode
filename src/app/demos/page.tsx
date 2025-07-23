'use client'
import { Inter } from 'next/font/google'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { ArrowLeft, Play, CheckCircle, Clock, Users, TrendingUp, Zap, Target, ChevronRight } from 'lucide-react'
import SmartSchedulerDemo from "../SmartSchedulerDemo"
import AutomatedInvoiceDemo from "../AutomatedInvoiceDemo"
import SocialMediaContentStudio from "../SocialMediaPlannerDemo"
import RevenueIntelligenceDemo from "../RevenueIntelligenceDemo"

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
    }
  ]

  return (
    <main className={`min-h-screen bg-white ${inter.className}`}>
      {/* Hero Section */}
      <section className="relative py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="reveal-on-scroll opacity-0 translate-y-8 transition-all duration-700 mb-8">
              <Link
                href="/"
                className="inline-flex items-center text-zinc-500 hover:text-zinc-900 transition-colors mb-8 group"
              >
                <ArrowLeft className="h-4 w-4 mr-2 transition-transform group-hover:-translate-x-1" />
                Back to Home
              </Link>

              <div className="w-20 h-20 mx-auto mb-8 bg-blue-50 rounded-2xl flex items-center justify-center">
                <Play className="h-10 w-10 text-blue-600 ml-1" />
              </div>
            </div>

            <div className="reveal-on-scroll opacity-0 translate-y-8 transition-all duration-700 mb-8" style={{ transitionDelay: '200ms' }}>
              <h1 className="text-5xl md:text-7xl font-bold text-zinc-900 mb-6 tracking-tight">
                LIVE DEMOS
              </h1>

              <p className="text-xl md:text-2xl text-zinc-600 max-w-3xl mx-auto mb-12 leading-relaxed">
                Experience the future of business automation.
                <span className="text-zinc-900 font-medium"> See real solutions</span> to real problems,
                demonstrated live.
              </p>
            </div>

            <div className="reveal-on-scroll opacity-0 translate-y-8 transition-all duration-700 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto mb-16" style={{ transitionDelay: '400ms' }}>
              {[
                { icon: Clock, label: 'Save Hours Daily', desc: 'Automate repetitive tasks' },
                { icon: Target, label: 'Zero Errors', desc: 'Eliminate human mistakes' },
                { icon: TrendingUp, label: 'Scale Instantly', desc: 'Grow without limits' }
              ].map((benefit, index) => (
                <div key={index} className="bg-white border border-zinc-200 rounded-xl p-6 hover:border-zinc-300 hover:shadow-md transition-all duration-200">
                  <benefit.icon className="h-8 w-8 text-blue-600 mx-auto mb-3" />
                  <h3 className="font-semibold mb-2 text-zinc-900">{benefit.label}</h3>
                  <p className="text-zinc-600 text-sm">{benefit.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Demo Sections */}
      {demos.map((demo, index) => (
        <section key={demo.id} className="relative py-24 bg-zinc-50/50 border-t border-zinc-200">
          <div className="container mx-auto px-4">
            {/* Problem Statement */}
            <div className="max-w-4xl mx-auto text-center mb-16 reveal-on-scroll opacity-0 translate-y-8 transition-all duration-700" style={{ transitionDelay: '100ms' }}>
              <div className="inline-flex items-center px-4 py-2 bg-red-50 border border-red-200 rounded-full text-red-700 text-sm font-medium mb-8">
                <span className="w-2 h-2 bg-red-500 rounded-full mr-2 animate-pulse"></span>
                REAL CLIENT CONCERN
              </div>

              <div className="bg-red-50 border border-red-200 rounded-2xl p-8 mb-12">
                <h2 className="text-2xl md:text-3xl font-bold text-red-900 mb-4">
                  "{demo.problem}"
                </h2>

              </div>

              {/* Solution Announcement */}
              <div className="bg-white border border-zinc-200 rounded-2xl p-8 shadow-sm">
                <div className="flex items-center justify-center mb-4">
                  <CheckCircle className="h-8 w-8 text-green-600 mr-3" />
                  <span className="text-green-600 font-semibold text-lg">SOLUTION</span>
                </div>
                <h3 className="text-3xl md:text-4xl font-bold text-zinc-900 mb-4">
                  {demo.title}
                </h3>
                <p className="text-xl text-zinc-700 mb-6">{demo.solution}</p>

                {/* Stats */}
                <div className={`grid grid-cols-2 gap-6 max-w-2xl mx-auto ${demo.stats.length === 4 ? 'md:grid-cols-4' : 'md:grid-cols-3'}`}>
                  {demo.stats.map((stat, statIndex) => (
                    <div key={statIndex} className="text-center">
                      <div className="text-2xl md:text-3xl font-bold text-zinc-900 mb-1">{stat.value}</div>
                      <div className="text-zinc-600 text-sm">{stat.label}</div>
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

      {/* CTA Section */}
      <section className="relative py-24 bg-white border-t border-zinc-200">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="reveal-on-scroll opacity-0 translate-y-8 transition-all duration-700" style={{ transitionDelay: '100ms' }}>
              <h2 className="text-4xl md:text-5xl font-bold text-zinc-900 mb-6">
                Ready to Automate Your Business?
              </h2>
              <p className="text-xl text-zinc-600 mb-12 max-w-2xl mx-auto">
                These demos show just a fraction of what's possible. Let's build something custom for your specific needs.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                <Link
                  href="/contact"
                  className="px-10 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors duration-200 text-lg min-w-[200px] shadow-sm hover:shadow-md inline-flex items-center justify-center group"
                >
                  Start Your Project
                  <ChevronRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
                <Link
                  href="/services/full-stack-development"
                  className="px-10 py-4 bg-white border border-zinc-200 hover:border-zinc-300 text-zinc-900 rounded-lg font-semibold transition-all duration-200 text-lg min-w-[200px]"
                >
                  Explore Services
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

        /* Focus styles for accessibility */
        .focus-visible:focus {
          outline: 2px solid #3A5AFF;
          outline-offset: 2px;
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
      `}</style>
    </main>
  )
}
