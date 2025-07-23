'use client'
import { Inter, JetBrains_Mono } from 'next/font/google'
import Link from 'next/link'
import { useEffect, useState, useRef } from 'react'
import {
  ArrowRight,
  ChevronRight,
  Code,
  Cpu,
  Layers,
  Command,
  ExternalLink,
  Play,
  Zap,
  Clock,
  Target,
  CheckCircle,
  Calculator,
  TrendingUp,
  Brain,
  Shield,
  Rocket,
  Star,
  Award,
  Users,
  BarChart3,
  Sparkles,
  Timer,
  DollarSign,
  Activity
} from 'lucide-react'
import { sendNotification } from '../lib/notifications'

const inter = Inter({ subsets: ['latin'] })
const jetbrains = JetBrains_Mono({ subsets: ['latin'] })

// Luxury animated background component
const LuxuryBackground = () => (
  <div className="absolute inset-0 overflow-hidden">
    {/* Animated gradient orbs */}
    <div className="absolute -top-40 -left-40 w-96 h-96 bg-blue-600/20 rounded-full filter blur-[120px] animate-pulse" style={{ animationDuration: '8s' }} />
    <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-purple-600/20 rounded-full filter blur-[120px] animate-pulse" style={{ animationDelay: '4s', animationDuration: '8s' }} />
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-cyan-600/10 rounded-full filter blur-[100px] animate-pulse" style={{ animationDelay: '2s', animationDuration: '10s' }} />

    {/* Floating particles */}
    <div className="absolute inset-0">
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 bg-blue-400/30 rounded-full animate-float"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 10}s`,
            animationDuration: `${10 + Math.random() * 20}s`
          }}
        />
      ))}
    </div>

    {/* Geometric grid overlay */}
    <div className="absolute inset-0 opacity-[0.02]">
      <div className="h-full w-full bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:100px_100px]" />
    </div>
  </div>
)

// Cinematic text animation component
const CinematicText = ({ children, delay = 0, className = "" }: { children: React.ReactNode, delay?: number, className?: string }) => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay)
    return () => clearTimeout(timer)
  }, [delay])

  return (
    <div className={`transform transition-all duration-1000 ease-out ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'} ${className}`}>
      {children}
    </div>
  )
}

// Scroll-triggered reveal hook
const useScrollReveal = () => {
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-50px',
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
}

export default function Home() {
  const [scrollY, setScrollY] = useState(0)
  useScrollReveal()

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <main className={`min-h-screen bg-black text-white overflow-x-hidden ${inter.className}`}>
      {/* HERO SECTION - Cinematic Entrance */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <LuxuryBackground />

        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 text-center">
          <CinematicText delay={500} className="mb-8">
            <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-400/30 rounded-full text-blue-300 text-sm font-semibold backdrop-blur-sm">
              <Sparkles className="h-4 w-4 mr-2" />
              LUXURY AUTOMATION CONSULTANCY
            </div>
          </CinematicText>

          <CinematicText delay={800}>
            <h1 className={`text-5xl sm:text-7xl md:text-8xl font-bold ${jetbrains.className} mb-8 tracking-tight`}>
              <span className="block bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent">
                Your Personal
              </span>
              <span className="block bg-gradient-to-r from-purple-400 via-pink-500 to-blue-400 bg-clip-text text-transparent">
                Operating System
              </span>
              <span className="block text-white/90 text-3xl md:text-4xl font-medium mt-4">
                for Business Growth
              </span>
            </h1>
          </CinematicText>

          <CinematicText delay={1200}>
            <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto mb-8 leading-relaxed">
              Stop managing workflows. <span className="text-white font-semibold">Start owning them.</span>
              <br className="hidden md:block" />
              I build custom automation systems that make your business run like a well-oiled machine—while you sleep.
            </p>
          </CinematicText>

          <CinematicText delay={1600}>
            <p className="text-lg text-gray-400 max-w-3xl mx-auto mb-12">
              Most entrepreneurs waste 20+ hours weekly on tasks a computer should handle.
              I create luxury-grade automation that transforms busy founders into efficiency machines.
            </p>
          </CinematicText>

          <CinematicText delay={2000}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-16">
              <Link
                href="/contact"
                className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white rounded-xl font-semibold transition-all duration-300 min-w-[240px] text-center shadow-2xl shadow-blue-600/25 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
                <span className="relative flex items-center justify-center">
                  Claim Your Consultation
                  <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                </span>

              </Link>

              <Link
                href="#demos"
                className="group px-8 py-4 bg-white/5 border border-white/20 hover:bg-white/10 hover:border-white/30 rounded-xl font-semibold transition-all duration-300 min-w-[240px] text-center backdrop-blur-sm"
              >
                <span className="flex items-center justify-center">
                  See Systems in Action
                  <Play className="h-5 w-5 ml-2 group-hover:scale-110 transition-transform duration-300" />
                </span>
              </Link>
            </div>
          </CinematicText>

          {/* Floating indicators */}
          <CinematicText delay={2400}>
            <div className="flex justify-center items-center gap-8 text-sm text-gray-400">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse" />
                No Long-Term Contracts
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-blue-400 rounded-full mr-2 animate-pulse" />
                90-Day Guarantee
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-purple-400 rounded-full mr-2 animate-pulse" />
                CTO-Level Expertise
              </div>
            </div>
          </CinematicText>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronRight className="h-6 w-6 text-gray-400 transform rotate-90" />
        </div>
      </section>

      {/* PROBLEM MIRROR SECTION */}
      <section className="relative py-32 border-t border-white/10">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-red-950/5 to-black" />

        <div className="relative z-10 container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-20 reveal-item opacity-0 transition-all duration-1000 translate-y-8">
              <h2 className={`text-4xl md:text-6xl font-bold ${jetbrains.className} mb-8`}>
                <span className="bg-gradient-to-r from-red-400 via-orange-500 to-yellow-500 bg-clip-text text-transparent">
                  The Hidden Tax
                </span>
                <br />
                <span className="text-white">on Your Time</span>
              </h2>

              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Every hour you spend on admin work is an hour stolen from strategy, relationships, and the vision that drives you.
              </p>
            </div>

            {/* Pain Point Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
              {[
                {
                  icon: Timer,
                  title: "You're spending $2,000+ weekly on manual tasks",
                  description: "20+ hours at your hourly rate, burned on work a computer should handle",
                  color: "from-red-500 to-orange-500"
                },
                {
                  icon: Users,
                  title: "Your team is drowning in repetitive work",
                  description: "Talented people reduced to human copy-paste machines",
                  color: "from-orange-500 to-yellow-500"
                },
                {
                  icon: Activity,
                  title: "Growth is limited by operational friction",
                  description: "Every new client creates exponentially more admin overhead",
                  color: "from-yellow-500 to-red-500"
                },
                {
                  icon: Brain,
                  title: "You know there's a better way, but don't have time to build it",
                  description: "Caught in the trap: too busy to automate the things making you busy",
                  color: "from-red-500 to-pink-500"
                }
              ].map((pain, index) => (
                <div key={index} className={`reveal-item opacity-0 transition-all duration-700 translate-y-8`} style={{ transitionDelay: `${index * 200}ms` }}>
                  <div className="relative group h-full">
                    <div className={`absolute inset-0 bg-gradient-to-br ${pain.color} opacity-5 rounded-2xl blur-xl group-hover:opacity-10 transition-opacity duration-300`} />
                    <div className="relative bg-gradient-to-br from-gray-900/80 to-gray-800/60 border border-red-500/20 rounded-2xl p-8 h-full backdrop-blur-sm hover:border-red-400/30 transition-all duration-300">
                      <div className="flex items-start mb-6">
                        <div className={`w-12 h-12 bg-gradient-to-br ${pain.color} rounded-xl flex items-center justify-center mr-4 opacity-80`}>
                          <pain.icon className="h-6 w-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-white mb-3 leading-tight">{pain.title}</h3>
                          <p className="text-gray-400">{pain.description}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* ROI Counter */}
            <div className="text-center reveal-item opacity-0 transition-all duration-1000 translate-y-8">
              <div className="bg-gradient-to-br from-red-900/20 to-orange-900/20 border border-red-500/30 rounded-2xl p-8 max-w-2xl mx-auto backdrop-blur-sm">
                <h3 className="text-2xl font-bold text-white mb-4">The Real Cost of Manual Work</h3>
                <div className="grid grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-red-400">$104K</div>
                    <div className="text-gray-400 text-sm">Annual waste</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-orange-400">1,040</div>
                    <div className="text-gray-400 text-sm">Hours lost</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-yellow-400">65%</div>
                    <div className="text-gray-400 text-sm">Efficiency gap</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TRANSFORMATION SECTION */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-blue-950/10 to-black" />

        {/* Parallax background elements */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            transform: `translateY(${scrollY * 0.3}px)`,
            transition: 'transform 0.1s ease-out'
          }}
        >
          <div className="absolute top-1/4 left-10 w-64 h-64 bg-blue-600/10 rounded-full filter blur-[80px]" />
          <div className="absolute bottom-1/4 right-10 w-64 h-64 bg-purple-600/10 rounded-full filter blur-[80px]" />
        </div>

        <div className="relative z-10 container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-20 reveal-item opacity-0 transition-all duration-1000 translate-y-8">
              <h2 className={`text-4xl md:text-6xl font-bold ${jetbrains.className} mb-8`}>
                <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent">
                  From Chaos
                </span>
                <br />
                <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-blue-400 bg-clip-text text-transparent">
                  to Clarity
                </span>
              </h2>

              <p className="text-xl text-gray-300 max-w-4xl mx-auto mb-12">
                Think of me as your <span className="text-white font-semibold">CTO-for-hire</span>. I don't just build software—
                I architect operational leverage that compounds your effectiveness.
              </p>
            </div>

            {/* Before/After Split Screen */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
              {/* BEFORE */}
              <div className="reveal-item opacity-0 transition-all duration-1000 translate-x-8" style={{ transitionDelay: '200ms' }}>
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-red-900/20 to-orange-900/20 rounded-3xl blur-xl" />
                  <div className="relative bg-gradient-to-br from-gray-900/90 to-gray-800/80 border border-red-500/30 rounded-3xl p-8 backdrop-blur-sm">
                    <div className="flex items-center mb-8">
                      <div className="w-16 h-16 bg-red-500/20 rounded-2xl flex items-center justify-center mr-4">
                        <Clock className="h-8 w-8 text-red-400" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-white mb-2">BEFORE</h3>
                        <p className="text-red-400 font-medium">Operational Chaos</p>
                      </div>
                    </div>

                    <div className="space-y-6">
                      {[
                        "Manual data entry consuming entire afternoons",
                        "Missing opportunities while buried in admin work",
                        "Systems that break when you're not watching",
                        "Growth constrained by operational bottlenecks"
                      ].map((item, index) => (
                        <div key={index} className="flex items-start">
                          <div className="w-2 h-2 bg-red-500 rounded-full mt-3 mr-4 flex-shrink-0" />
                          <p className="text-gray-300 leading-relaxed">{item}</p>
                        </div>
                      ))}
                    </div>

                    {/* Chaos visualization */}
                    <div className="mt-8 p-6 bg-red-950/20 rounded-2xl border border-red-500/20">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-red-400 mb-2">20+ hrs/week</div>
                        <div className="text-red-300 text-sm">Lost to manual work</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* AFTER */}
              <div className="reveal-item opacity-0 transition-all duration-1000 translate-x-8" style={{ transitionDelay: '400ms' }}>
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-purple-600/20 rounded-3xl blur-xl" />
                  <div className="relative bg-gradient-to-br from-gray-900/90 to-gray-800/80 border border-blue-500/30 rounded-3xl p-8 backdrop-blur-sm">
                    <div className="flex items-center mb-8">
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl flex items-center justify-center mr-4">
                        <Rocket className="h-8 w-8 text-blue-400" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-white mb-2">AFTER</h3>
                        <p className="text-blue-400 font-medium">Effortless Excellence</p>
                      </div>
                    </div>

                    <div className="space-y-6">
                      {[
                        "Workflows that run themselves flawlessly",
                        "Instant access to actionable business intelligence",
                        "Systems that scale with your ambition",
                        "Time freedom to focus on what only you can do"
                      ].map((item, index) => (
                        <div key={index} className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-green-400 mt-1 mr-4 flex-shrink-0" />
                          <p className="text-gray-300 leading-relaxed">{item}</p>
                        </div>
                      ))}
                    </div>

                    {/* Success visualization */}
                    <div className="mt-8 p-6 bg-gradient-to-br from-blue-950/20 to-purple-950/20 rounded-2xl border border-blue-500/20">
                      <div className="grid grid-cols-2 gap-4 text-center">
                        <div>
                          <div className="text-2xl font-bold text-blue-400 mb-1">95%</div>
                          <div className="text-blue-300 text-xs">Time Saved</div>
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-purple-400 mb-1">24/7</div>
                          <div className="text-purple-300 text-xs">Always Working</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Transformation Arrow */}
            <div className="text-center mb-12 reveal-item opacity-0 transition-all duration-1000 translate-y-8" style={{ transitionDelay: '600ms' }}>
              <div className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-400/30 rounded-full backdrop-blur-sm">
                <span className="text-blue-300 font-semibold mr-3">Your Personal Operating System</span>
                <ArrowRight className="h-5 w-5 text-blue-400" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SOCIAL PROOF SECTION - Featured Projects */}
      <section id="demos" className="relative py-32 border-t border-white/10">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-purple-950/5 to-black" />

        <div className="relative z-10 container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-20 reveal-item opacity-0 transition-all duration-1000 translate-y-8">
              <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-400/30 rounded-full text-purple-300 text-sm font-semibold mb-8 backdrop-blur-sm">
                <Award className="h-4 w-4 mr-2" />
                SYSTEMS THAT DELIVER RESULTS
              </div>

              <h2 className={`text-4xl md:text-6xl font-bold ${jetbrains.className} mb-8`}>
                <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-blue-400 bg-clip-text text-transparent">
                  Proven Excellence
                </span>
              </h2>

              <p className="text-xl text-gray-300 max-w-4xl mx-auto">
                Don't just imagine the possibilities. <span className="text-white font-semibold">See real business transformations</span> through sophisticated automation systems.
              </p>
            </div>

            {/* Featured Projects Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
              {/* TrackTap */}
              <div className="reveal-item opacity-0 transition-all duration-700 translate-y-8" style={{ transitionDelay: '200ms' }}>
                <div className="relative group h-full">
                  <div className="absolute inset-0 bg-gradient-to-br from-green-600/20 to-emerald-600/20 rounded-3xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-500" />
                  <div className="relative bg-gradient-to-br from-gray-900/95 to-gray-800/95 border border-green-500/30 rounded-3xl p-8 h-full backdrop-blur-sm group-hover:border-green-400/50 transition-all duration-500">
                    <div className="flex items-center mb-6">
                      <div className="w-14 h-14 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-xl flex items-center justify-center mr-4">
                        <Activity className="h-7 w-7 text-green-400" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-white">TrackTap</h3>
                        <p className="text-green-400 text-sm font-medium">AI-Powered Fitness Intelligence</p>
                      </div>
                    </div>

                    <p className="text-gray-300 mb-6 leading-relaxed">
                      Transformed gym workflows with smart scheduling and hypertrophy tracking.
                      Members get personalized automation that adapts to their progress.
                    </p>

                    <div className="bg-green-950/20 rounded-xl p-4 mb-6 border border-green-500/20">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-400 mb-1">40%</div>
                        <div className="text-green-300 text-sm">Increase in member retention</div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-sm text-gray-400">
                      <span>PWA • AI/ML • Real-time</span>
                      <Link href="/demos" className="text-green-400 hover:text-green-300 transition-colors group-hover:translate-x-1 transform duration-300">
                        View Demo →
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              {/* FD Shirts */}
              <div className="reveal-item opacity-0 transition-all duration-700 translate-y-8" style={{ transitionDelay: '400ms' }}>
                <div className="relative group h-full">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-indigo-600/20 rounded-3xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-500" />
                  <div className="relative bg-gradient-to-br from-gray-900/95 to-gray-800/95 border border-blue-500/30 rounded-3xl p-8 h-full backdrop-blur-sm group-hover:border-blue-400/50 transition-all duration-500">
                    <div className="flex items-center mb-6">
                      <div className="w-14 h-14 bg-gradient-to-br from-blue-500/20 to-indigo-500/20 rounded-xl flex items-center justify-center mr-4">
                        <Zap className="h-7 w-7 text-blue-400" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-white">FD Shirts</h3>
                        <p className="text-blue-400 text-sm font-medium">Automated E-commerce Excellence</p>
                      </div>
                    </div>

                    <p className="text-gray-300 mb-6 leading-relaxed">
                      Built fully automated fulfillment with mobile-first admin experience.
                      Zero manual intervention from order to delivery.
                    </p>

                    <div className="bg-blue-950/20 rounded-xl p-4 mb-6 border border-blue-500/20">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-400 mb-1">300%</div>
                        <div className="text-blue-300 text-sm">Order processing speed increase</div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-sm text-gray-400">
                      <span>PWA • Automation • Mobile</span>
                      <Link href="/demos" className="text-blue-400 hover:text-blue-300 transition-colors group-hover:translate-x-1 transform duration-300">
                        View Demo →
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              {/* Youth Lax */}
              <div className="reveal-item opacity-0 transition-all duration-700 translate-y-8" style={{ transitionDelay: '600ms' }}>
                <div className="relative group h-full">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-pink-600/20 rounded-3xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-500" />
                  <div className="relative bg-gradient-to-br from-gray-900/95 to-gray-800/95 border border-purple-500/30 rounded-3xl p-8 h-full backdrop-blur-sm group-hover:border-purple-400/50 transition-all duration-500">
                    <div className="flex items-center mb-6">
                      <div className="w-14 h-14 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-xl flex items-center justify-center mr-4">
                        <Shield className="h-7 w-7 text-purple-400" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-white">Youth Lax</h3>
                        <p className="text-purple-400 text-sm font-medium">Compliance Made Effortless</p>
                      </div>
                    </div>

                    <p className="text-gray-300 mb-6 leading-relaxed">
                      OCR + ML system for instant age verification and roster management.
                      Complex compliance simplified into seamless workflows.
                    </p>

                    <div className="bg-purple-950/20 rounded-xl p-4 mb-6 border border-purple-500/20">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-purple-400 mb-1">95%</div>
                        <div className="text-purple-300 text-sm">Reduction in admin overhead</div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-sm text-gray-400">
                      <span>OCR • ML • Compliance</span>
                      <Link href="/demos" className="text-purple-400 hover:text-purple-300 transition-colors group-hover:translate-x-1 transform duration-300">
                        View Demo →
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA for demos */}
            <div className="text-center reveal-item opacity-0 transition-all duration-1000 translate-y-8" style={{ transitionDelay: '800ms' }}>
              <Link
                href="/demos"
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white rounded-xl font-semibold transition-all duration-300 shadow-2xl shadow-purple-600/25 group"
              >
                <Play className="h-5 w-5 mr-3 group-hover:scale-110 transition-transform duration-300" />
                Experience Interactive Demos
                <ArrowRight className="h-5 w-5 ml-3 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
              <p className="text-gray-400 mt-4">
                See exactly how these solutions work • No commitment required
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* OFFERING ARCHITECTURE SECTION */}
      <section className="relative py-32 border-t border-white/10">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-yellow-950/5 to-black" />

        <div className="relative z-10 container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-20 reveal-item opacity-0 transition-all duration-1000 translate-y-8">
              <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-400/30 rounded-full text-yellow-300 text-sm font-semibold mb-8 backdrop-blur-sm">
                <DollarSign className="h-4 w-4 mr-2" />
                INVESTMENT OPTIONS FOR EVERY GROWTH STAGE
              </div>

              <h2 className={`text-4xl md:text-6xl font-bold ${jetbrains.className} mb-8`}>
                <span className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent">
                  Choose Your
                </span>
                <br />
                <span className="text-white">Operating System</span>
              </h2>

              <p className="text-xl text-gray-300 max-w-4xl mx-auto">
                Replace a $120K+ ops hire with strategic automation expertise that works 24/7 and never takes vacation.
              </p>
            </div>

            {/* Investment Options Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
              {/* One-Time Systems Optimization */}
              <div className="reveal-item opacity-0 transition-all duration-1000 translate-y-8" style={{ transitionDelay: '200ms' }}>
                <div className="relative group h-full">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-600/15 to-cyan-600/15 rounded-3xl blur-xl opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
                  <div className="relative bg-gradient-to-br from-gray-900/95 to-gray-800/95 border border-blue-500/30 rounded-3xl p-10 h-full backdrop-blur-sm group-hover:border-blue-400/50 transition-all duration-500">
                    <div className="flex items-center mb-8">
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-2xl flex items-center justify-center mr-4">
                        <Target className="h-8 w-8 text-blue-400" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-white mb-2">Systems Optimization</h3>
                        <p className="text-blue-400 font-medium">ONE-TIME TRANSFORMATION</p>
                      </div>
                    </div>

                    <div className="mb-8">
                      <div className="flex items-baseline mb-4">
                        <span className="text-4xl font-bold text-white">Starting at</span>
                        <span className="text-5xl font-bold text-blue-400 ml-2">$5,000</span>
                      </div>
                      <p className="text-gray-400">Perfect for obvious problems with clear automation opportunities</p>
                    </div>

                    <div className="space-y-4 mb-8">
                      {[
                        "Deep workflow audit and pain point analysis",
                        "Custom automation solution for your biggest bottleneck",
                        "Full implementation with comprehensive training",
                        "90-day optimization support and refinements"
                      ].map((feature, index) => (
                        <div key={index} className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-blue-400 mt-1 mr-4 flex-shrink-0" />
                          <p className="text-gray-300">{feature}</p>
                        </div>
                      ))}
                    </div>

                    <div className="bg-blue-950/20 rounded-2xl p-6 border border-blue-500/20 mb-8">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-400 mb-2">ROI: 300-500%</div>
                        <div className="text-blue-300 text-sm">Typical payback period: 2-3 months</div>
                      </div>
                    </div>

                    <Link
                      href="/contact"
                      className="w-full inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white rounded-xl font-semibold transition-all duration-300 shadow-2xl shadow-blue-600/25 group"
                    >
                      Start Your Transformation
                      <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                    </Link>
                  </div>
                </div>
              </div>

              {/* Monthly Partnership - RECOMMENDED */}
              <div className="reveal-item opacity-0 transition-all duration-1000 translate-y-8" style={{ transitionDelay: '400ms' }}>
                <div className="relative group h-full">
                  {/* Recommended badge */}
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-20">
                    <div className="px-6 py-2 bg-gradient-to-r from-yellow-500 to-orange-500 text-black text-sm font-bold rounded-full shadow-lg">
                      RECOMMENDED
                    </div>
                  </div>

                  <div className="absolute inset-0 bg-gradient-to-br from-yellow-600/20 to-orange-600/20 rounded-3xl blur-xl opacity-70 group-hover:opacity-90 transition-opacity duration-500" />
                  <div className="relative bg-gradient-to-br from-gray-900/95 to-gray-800/95 border-2 border-yellow-500/40 rounded-3xl p-10 h-full backdrop-blur-sm group-hover:border-yellow-400/60 transition-all duration-500">
                    <div className="flex items-center mb-8">
                      <div className="w-16 h-16 bg-gradient-to-br from-yellow-500/20 to-orange-500/20 rounded-2xl flex items-center justify-center mr-4">
                        <Star className="h-8 w-8 text-yellow-400" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-white mb-2">Monthly Partnership</h3>
                        <p className="text-yellow-400 font-medium">ONGOING AUTOMATION STRATEGY</p>
                      </div>
                    </div>

                    <div className="mb-8">
                      <div className="flex items-baseline mb-4">
                        <span className="text-5xl font-bold text-yellow-400">$3,500</span>
                        <span className="text-2xl text-gray-400 ml-2">/month</span>
                      </div>
                      <p className="text-gray-400">Perfect for ambitious founders who want continuous operational leverage</p>
                    </div>

                    <div className="space-y-4 mb-8">
                      {[
                        "Your dedicated automation strategist",
                        "Continuous system improvements and integrations",
                        "Custom dashboards and business intelligence",
                        "Priority support and rapid iterations",
                        "Strategic technology guidance and roadmapping"
                      ].map((feature, index) => (
                        <div key={index} className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-yellow-400 mt-1 mr-4 flex-shrink-0" />
                          <p className="text-gray-300">{feature}</p>
                        </div>
                      ))}
                    </div>

                    <div className="bg-gradient-to-br from-yellow-950/20 to-orange-950/20 rounded-2xl p-6 border border-yellow-500/20 mb-8">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-yellow-400 mb-2">Like Having a CTO</div>
                        <div className="text-yellow-300 text-sm">At 1/3 the cost of a full-time hire</div>
                      </div>
                    </div>

                    <Link
                      href="/contact"
                      className="w-full inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-500 hover:to-orange-500 text-black rounded-xl font-bold transition-all duration-300 shadow-2xl shadow-yellow-600/25 group"
                    >
                      Claim Your Partnership
                      <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Comparison Chart */}
            <div className="reveal-item opacity-0 transition-all duration-1000 translate-y-8" style={{ transitionDelay: '600ms' }}>
              <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 border border-white/10 rounded-3xl p-8 backdrop-blur-sm">
                <h3 className="text-2xl font-bold text-white text-center mb-8">Investment Comparison</h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                  <div>
                    <h4 className="text-lg font-semibold text-red-400 mb-4">Full-Time Ops Hire</h4>
                    <div className="space-y-2 text-gray-400">
                      <div className="text-2xl font-bold text-red-400">$120K+</div>
                      <div className="text-sm">+ Benefits + Equity</div>
                      <div className="text-sm">Limited expertise</div>
                      <div className="text-sm">Vacation time</div>
                      <div className="text-sm">Single point of failure</div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold text-blue-400 mb-4">One-Time Project</h4>
                    <div className="space-y-2 text-gray-400">
                      <div className="text-2xl font-bold text-blue-400">$5K+</div>
                      <div className="text-sm">Fixed scope</div>
                      <div className="text-sm">90-day support</div>
                      <div className="text-sm">Specific problem solving</div>
                      <div className="text-sm">Quick ROI</div>
                    </div>
                  </div>

                  <div className="relative">
                    <div className="absolute -inset-2 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-2xl blur"></div>
                    <div className="relative bg-gray-900 rounded-2xl p-6">
                      <h4 className="text-lg font-semibold text-yellow-400 mb-4">Monthly Partnership</h4>
                      <div className="space-y-2 text-gray-400">
                        <div className="text-2xl font-bold text-yellow-400">$42K/year</div>
                        <div className="text-sm">Continuous optimization</div>
                        <div className="text-sm">Strategic guidance</div>
                        <div className="text-sm">Evolving expertise</div>
                        <div className="text-sm">Always available</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PERSONAL BRAND SECTION */}
      <section className="relative py-32 border-t border-white/10">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-950/5 to-black" />

        <div className="relative z-10 container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-20 reveal-item opacity-0 transition-all duration-1000 translate-y-8">
              <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-gray-500/20 to-blue-500/20 border border-gray-400/30 rounded-full text-gray-300 text-sm font-semibold mb-8 backdrop-blur-sm">
                <Brain className="h-4 w-4 mr-2" />
                THE AUTOMATION PHILOSOPHY
              </div>

              <h2 className={`text-4xl md:text-6xl font-bold ${jetbrains.className} mb-8`}>
                <span className="bg-gradient-to-r from-gray-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
                  Behind the Systems
                </span>
              </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              {/* Philosophy Content */}
              <div className="reveal-item opacity-0 transition-all duration-1000 translate-x-8" style={{ transitionDelay: '200ms' }}>
                <div className="space-y-8">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-4">Technology Should Be Invisible</h3>
                    <p className="text-lg text-gray-300 leading-relaxed">
                      I believe technology should work seamlessly in the background while you focus on building the future.
                      The best automation feels like magic: effortless for you, sophisticated under the hood.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-2xl font-bold text-white mb-4">The CTO Mindset</h3>
                    <p className="text-lg text-gray-300 leading-relaxed">
                      With 10+ years architecting systems for ambitious businesses, I've learned that successful automation
                      isn't just about efficiency—it's about unlocking the mental space for breakthrough thinking.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-2xl font-bold text-white mb-4">Strategic Leverage</h3>
                    <p className="text-lg text-gray-300 leading-relaxed">
                      My approach focuses on creating compound advantages. Every system I build doesn't just solve today's
                      problem—it creates a foundation for tomorrow's opportunities.
                    </p>
                  </div>
                </div>
              </div>

              {/* Visual Stats & Credibility */}
              <div className="reveal-item opacity-0 transition-all duration-1000 translate-x-8" style={{ transitionDelay: '400ms' }}>
                <div className="grid grid-cols-2 gap-6">
                  <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 border border-white/10 rounded-2xl p-6 text-center backdrop-blur-sm">
                    <div className="text-3xl font-bold text-blue-400 mb-2">10+</div>
                    <div className="text-gray-400 text-sm">Years Building Systems</div>
                  </div>
                  <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 border border-white/10 rounded-2xl p-6 text-center backdrop-blur-sm">
                    <div className="text-3xl font-bold text-purple-400 mb-2">50+</div>
                    <div className="text-gray-400 text-sm">Businesses Transformed</div>
                  </div>
                  <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 border border-white/10 rounded-2xl p-6 text-center backdrop-blur-sm">
                    <div className="text-3xl font-bold text-green-400 mb-2">$2M+</div>
                    <div className="text-gray-400 text-sm">In Operational Savings</div>
                  </div>
                  <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 border border-white/10 rounded-2xl p-6 text-center backdrop-blur-sm">
                    <div className="text-3xl font-bold text-yellow-400 mb-2">24/7</div>
                    <div className="text-gray-400 text-sm">Systems Running</div>
                  </div>
                </div>

                <div className="mt-8 bg-gradient-to-br from-gray-900/80 to-gray-800/80 border border-white/10 rounded-2xl p-8 backdrop-blur-sm">
                  <blockquote className="text-lg text-gray-300 italic leading-relaxed">
                    "The future belongs to businesses that can operate at the speed of thought.
                    I'm here to help you get there while everyone else is still figuring it out."
                  </blockquote>
                  <div className="mt-4 flex items-center">
                    <div className="w-2 h-2 bg-blue-400 rounded-full mr-3"></div>
                    <span className="text-blue-400 font-medium">Zack Hitchcock, Digital Architect</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CONVERSION SECTION */}
      <section className="relative py-32 border-t border-white/10">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-blue-950/10 to-black" />

        {/* Luxury background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -left-40 w-96 h-96 bg-blue-600/10 rounded-full filter blur-[120px] animate-pulse" style={{ animationDuration: '8s' }} />
          <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-purple-600/10 rounded-full filter blur-[120px] animate-pulse" style={{ animationDelay: '4s', animationDuration: '8s' }} />
        </div>

        <div className="relative z-10 container mx-auto px-4">
          <div className="max-w-5xl mx-auto text-center">
            <div className="reveal-item opacity-0 transition-all duration-1000 translate-y-8">
              <h2 className={`text-4xl md:text-6xl font-bold ${jetbrains.className} mb-8`}>
                <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent">
                  Ready to Reclaim
                </span>
                <br />
                <span className="text-white">Your Time?</span>
              </h2>

              <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-12 leading-relaxed">
                Stop accepting operational friction as "just part of business."
                <span className="text-white font-semibold">Let's architect a system that makes your workflows disappear.</span>
              </p>
            </div>

            {/* Multi-path conversion options */}
            <div className="reveal-item opacity-0 transition-all duration-1000 translate-y-8" style={{ transitionDelay: '200ms' }}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                {/* Primary CTA */}
                <div className="md:col-span-1">
                  <Link
                    href="/contact"
                    className="group relative block w-full p-8 bg-gradient-to-br from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 rounded-2xl font-bold text-lg transition-all duration-300 shadow-2xl shadow-blue-600/25 overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
                    <div className="relative text-white">
                      <div className="text-2xl mb-2">Book Strategic Consultation</div>
                      <div className="text-blue-200 text-sm mb-4">$500 • Applied to project</div>
                      <ArrowRight className="h-6 w-6 mx-auto group-hover:translate-x-1 transition-transform duration-300" />
                    </div>
                  </Link>
                </div>

                {/* Secondary CTA */}
                <div className="md:col-span-1">
                  <Link
                    href="/contact"
                    className="group relative block w-full p-8 bg-gradient-to-br from-yellow-600 to-orange-600 hover:from-yellow-500 hover:to-orange-500 rounded-2xl font-bold text-lg transition-all duration-300 shadow-2xl shadow-yellow-600/25 overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
                    <div className="relative text-black">
                      <div className="text-2xl mb-2">Start Monthly Partnership</div>
                      <div className="text-orange-900 text-sm mb-4">$3,500/month • CTO-level expertise</div>
                      <Star className="h-6 w-6 mx-auto group-hover:scale-110 transition-transform duration-300" />
                    </div>
                  </Link>
                </div>

                {/* Lead magnet */}
                <div className="md:col-span-1">
                  <Link
                    href="/contact"
                    className="group relative block w-full p-8 bg-gradient-to-br from-gray-800 to-gray-700 hover:from-gray-700 hover:to-gray-600 border border-white/20 hover:border-white/30 rounded-2xl font-semibold text-lg transition-all duration-300 backdrop-blur-sm"
                  >
                    <div className="text-white">
                      <div className="text-2xl mb-2">Get Free Automation Audit</div>
                      <div className="text-gray-400 text-sm mb-4">Discover your biggest opportunities</div>
                      <Brain className="h-6 w-6 mx-auto text-gray-400 group-hover:text-white transition-colors duration-300" />
                    </div>
                  </Link>
                </div>
              </div>
            </div>

            {/* Trust indicators */}
            <div className="reveal-item opacity-0 transition-all duration-1000 translate-y-8" style={{ transitionDelay: '400ms' }}>
              <div className="flex justify-center items-center gap-12 text-sm text-gray-400">
                <div className="flex items-center">
                  <Shield className="h-4 w-4 mr-2 text-green-400" />
                  90-Day Guarantee
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 mr-2 text-blue-400" />
                  No Long-Term Contracts
                </div>
                <div className="flex items-center">
                  <Star className="h-4 w-4 mr-2 text-yellow-400" />
                  Satisfaction Guaranteed
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Add custom CSS for animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-10px) rotate(120deg); }
          66% { transform: translateY(5px) rotate(240deg); }
        }

        .animate-float {
          animation: float 15s ease-in-out infinite;
        }

        .revealed {
          opacity: 1 !important;
          transform: translateY(0) !important;
        }

        /* Mobile-specific optimizations */
        @media (max-width: 768px) {
          .animate-float {
            animation-duration: 20s; /* Slower on mobile for better performance */
          }

          /* Reduce blur effects on mobile for better performance */
          .blur-\\[120px\\] {
            filter: blur(60px);
          }

          .blur-\\[100px\\] {
            filter: blur(50px);
          }

          .blur-\\[80px\\] {
            filter: blur(40px);
          }
        }

        /* Touch targets for mobile */
        @media (max-width: 768px) {
          .group {
            min-height: 48px; /* Ensure touch targets are at least 48px */
          }

          /* Larger tap areas for CTA buttons */
          a[class*="px-8 py-4"] {
            padding: 1rem 1.5rem;
          }
        }

        /* Smooth scrolling for better mobile experience */
        html {
          scroll-behavior: smooth;
        }

        /* Reduce motion for users who prefer it */
        @media (prefers-reduced-motion: reduce) {
          .animate-float,
          .animate-pulse,
          .animate-bounce {
            animation: none;
          }

          .transition-all,
          .transition-opacity,
          .transition-transform,
          .transition-colors {
            transition: none;
          }
        }

        /* Better typography scaling on mobile */
        @media (max-width: 640px) {
          .text-5xl { font-size: 2.5rem; }
          .text-6xl { font-size: 3rem; }
          .text-7xl { font-size: 3.5rem; }
          .text-8xl { font-size: 4rem; }
        }

        /* Optimized spacing for mobile */
        @media (max-width: 768px) {
          .py-32 { padding-top: 4rem; padding-bottom: 4rem; }
          .py-20 { padding-top: 3rem; padding-bottom: 3rem; }
          .mb-20 { margin-bottom: 3rem; }
          .mb-16 { margin-bottom: 2.5rem; }
          .mb-12 { margin-bottom: 2rem; }
        }

        /* Better contrast for mobile screens */
        @media (max-width: 768px) {
          .text-gray-400 {
            color: rgb(156 163 175 / 0.9);
          }

          .text-gray-300 {
            color: rgb(209 213 219 / 0.95);
          }
        }
      `}</style>
    </main>
  )
}
