'use client'
import { Inter, JetBrains_Mono } from 'next/font/google'
import Link from 'next/link'
import { useEffect, useState, useRef } from 'react'
import { ArrowRight, ChevronRight, Code, Cpu, Layers, Command, ExternalLink, Play, Zap, Clock, Target, CheckCircle, Calculator, TrendingUp } from 'lucide-react'
import { sendNotification } from '../lib/notifications'

const inter = Inter({ subsets: ['latin'] })
const jetbrains = JetBrains_Mono({ subsets: ['latin'] })

const StillIcon = () => (
  <svg
    className="w-20 h-20 relative"
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Base circle */}
    <circle
      cx="32"
      cy="32"
      r="28"
      stroke="black"
      strokeWidth="1"
      className="opacity-90"
    />

    {/* Static triangles */}
    {[...Array(3)].map((_, i) => (
      <g key={i} style={{ transform: `rotate(${i * 120}deg)`, transformOrigin: 'center' }}>
        <path
          d="M32 8L36 16H28L32 8Z"
          fill="black"
          className="opacity-90"
        />
      </g>
    ))}

    {/* Static connecting lines */}
    {[...Array(3)].map((_, i) => (
      <path
        key={i}
        d={`M32 32L${32 + 14 * Math.cos((i * 2 * Math.PI / 3) + Math.PI + Math.PI/6)} ${32 + 14 * Math.sin((i * 2 * Math.PI / 3) + Math.PI + Math.PI/6)}`}
        stroke="black"
        strokeWidth="1"
        className="opacity-90"
      />
    ))}

    {/* Center dot */}
    <circle
      cx="32"
      cy="32"
      r="3"
      fill="black"
      className="opacity-90"
    />
  </svg>
)

const AnimatedIcon = () => (
  <svg
    className="w-20 h-20 relative"
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Base circle that traces itself */}
    <circle
      cx="32"
      cy="32"
      r="28"
      stroke="black"
      strokeWidth="1"
      strokeDasharray="360"
      style={{
        animation: 'trace-circle 2s cubic-bezier(0.4, 0, 0.2, 1) forwards'
      }}
    />

    {/* Rotating triangles */}
    <g className="origin-center animate-[gentle-rotate_12s_linear_infinite]">
      {[...Array(3)].map((_, i) => (
        <g
          key={i}
          style={{
            transform: `rotate(${i * 120}deg)`,
            transformOrigin: 'center',
            animation: `fade-transform 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards ${i * 0.2}s`
          }}
        >
          <path
            d="M32 8L36 16H28L32 8Z"
            fill="black"
            className="origin-bottom animate-[subtle-pulse_3s_ease-in-out_infinite]"
            style={{ animationDelay: `${i * 1}s` }}
          />
        </g>
      ))}
    </g>

    {/* Inner connecting lines */}
    <g className="origin-center animate-[gentle-rotate_30s_linear_infinite]">
      {[...Array(3)].map((_, i) => (
        <path
          key={i}
          d={`M32 32L${32 + 14 * Math.cos(i * 2 * Math.PI / 3)} ${32 + 14 * Math.sin(i * 2 * Math.PI / 3)}`}
          stroke="black"
          strokeWidth="1"
          strokeDasharray="100"
          style={{
            animation: `trace-line 1.5s cubic-bezier(0.4, 0, 0.2, 1) forwards ${1 + i * 0.2}s`
          }}
        />
      ))}

      {/* Center dot */}
      <circle
        cx="32"
        cy="32"
        r="3"
        fill="black"
        style={{
          animation: 'fade-transform 0.5s cubic-bezier(0.4, 0, 0.2, 1) forwards'
        }}
      />
    </g>
  </svg>
)

// Advanced SVG pattern that scales well on mobile
const HexPattern = ({ className }: { className?: string }) => (
  <svg className={className} width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <pattern id="hexPattern" width="40" height="69.28" patternUnits="userSpaceOnUse" patternTransform="scale(0.5)">
        <path
          d="M20 17.32l17.32 10v20l-17.32 10L2.68 47.32v-20z"
          fill="none"
          stroke="currentColor"
          strokeOpacity="0.075"
        />
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#hexPattern)" />
  </svg>
)

// Hitchcode Logo component based on favicon
const HitchcodeLogo = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <rect x="0" y="0" width="32" height="32" rx="6" fill="url(#hitchcode-gradient-logo)" />
    <defs>
      <linearGradient id="hitchcode-gradient-logo" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
        <stop stopColor="#2563eb" />
        <stop offset="1" stopColor="#a21caf" />
      </linearGradient>
    </defs>
    <text
      x="16"
      y="16.5"
      textAnchor="middle"
      fontFamily="JetBrains Mono, Inter, sans-serif"
      fontWeight="bold"
      fontSize="20"
      fill="white"
      letterSpacing="1"
      alignmentBaseline="middle"
      dominantBaseline="middle"
    >
      H
    </text>
  </svg>
)

export default function Home() {
  const [activeService, setActiveService] = useState<number | null>(0)
  const [playedHero, setPlayedHero] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setPlayedHero(true);
    }, 500);

    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      document.documentElement.style.setProperty('--scroll-y', `${scrollPosition}px`);
    };

    // Check for Instagram referral parameter
    const urlParams = new URLSearchParams(window.location.search);
    const fromParam = urlParams.get('from');

    if (fromParam === 'instagram') {
      // Send notification for Instagram visitor
      sendNotification('📸 New visitor from Instagram! 🎉');

      // Clean up the URL without refreshing the page
      const cleanUrl = window.location.pathname;
      window.history.replaceState({}, document.title, cleanUrl);
    }

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timer);
    };
  }, []);

  // Intersectional reveal animation handling
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };

    const handleIntersect = (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);

    document.querySelectorAll('.reveal-item').forEach(item => {
      observer.observe(item);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <main className={`min-h-screen bg-black text-white flex flex-col ${inter.className}`}>
      {/* Global accent lines */}
      <div className="fixed top-0 left-0 w-4 h-screen bg-gradient-to-b from-blue-600/30 via-purple-600/30 to-transparent z-0" />
      <div className="fixed top-0 right-0 w-4 h-screen bg-gradient-to-b from-transparent via-purple-600/30 to-blue-600/30 z-0" />

      {/* Hero Section */}
      <section className="relative min-h-[calc(100vh-74px)] flex items-center justify-center py-20 md:py-32 overflow-hidden">
        {/* Background pattern with improved mobile performance */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(30,41,59,0.4)_0,rgba(0,0,0,0)_65%)] z-0" />
        <div className="absolute inset-0 z-0 opacity-10 pointer-events-none">
          <div className="h-full w-full bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:80px_80px]" />
        </div>
        <HexPattern className="absolute inset-0 text-white opacity-5" />

        <div className="absolute -top-40 -left-40 w-80 h-80 bg-blue-600/20 rounded-full filter blur-[100px]" />
        <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-purple-600/20 rounded-full filter blur-[100px]" />

        <div className="relative z-10 container mx-auto px-4">
          <div className={`transform transition-all duration-1000 ease-out ${playedHero ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>

            {/* Problem identifier badge */}
            <div className="flex justify-center mb-8">
              <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-red-500/20 to-orange-500/20 border border-red-400/30 rounded-full text-red-300 text-sm font-semibold backdrop-blur-sm">
                <Clock className="h-4 w-4 mr-2" />
                <span className="text-xs tracking-wide">TIRED OF WASTING TIME ON REPETITIVE WORK?</span>
              </div>
            </div>

            <h1 className={`text-4xl sm:text-6xl md:text-7xl font-bold ${jetbrains.className} mb-6 tracking-tight text-center`}>
              <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent inline-block">HITCHCODE</span>
            </h1>

            {/* Business-focused value proposition */}
            <div className="max-w-4xl mx-auto text-center mb-8">
              <p className="text-xl md:text-2xl text-gray-200 font-medium mb-4 leading-relaxed">
                Builds <span className="text-white font-bold">custom software that does the boring work for you</span>
              </p>
              <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
                Stop spending hours on tasks that could happen automatically. Get back to growing your business.
              </p>
            </div>

            {/* Business problem solutions */}
            <div className="flex flex-wrap justify-center gap-4 mb-12 max-w-4xl mx-auto">
              <div className="flex items-center px-4 py-2 bg-white/5 border border-white/10 rounded-lg backdrop-blur-sm">
                <div className="w-3 h-3 bg-blue-400 rounded-full mr-2 animate-pulse"></div>
                <span className="text-sm text-gray-300">Eliminate Manual Data Entry</span>
              </div>
              <div className="flex items-center px-4 py-2 bg-white/5 border border-white/10 rounded-lg backdrop-blur-sm">
                <div className="w-3 h-3 bg-purple-400 rounded-full mr-2 animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                <span className="text-sm text-gray-300">Automate Customer Communications</span>
              </div>
              <div className="flex items-center px-4 py-2 bg-white/5 border border-white/10 rounded-lg backdrop-blur-sm">
                <div className="w-3 h-3 bg-green-400 rounded-full mr-2 animate-pulse" style={{ animationDelay: '1s' }}></div>
                <span className="text-sm text-gray-300">Generate Reports Instantly</span>
              </div>
              <div className="flex items-center px-4 py-2 bg-white/5 border border-white/10 rounded-lg backdrop-blur-sm">
                <div className="w-3 h-3 bg-pink-400 rounded-full mr-2 animate-pulse" style={{ animationDelay: '1.5s' }}></div>
                <span className="text-sm text-gray-300">Connect Your Systems</span>
              </div>
            </div>

            {/* Problem -> Solution showcase */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-12">
              <div className="bg-gradient-to-br from-red-900/20 to-red-800/10 border border-red-500/20 rounded-xl p-6 text-center backdrop-blur-sm">
                <div className="w-8 h-8 bg-red-500/20 rounded-lg mx-auto mb-3 flex items-center justify-center">
                  <Clock className="h-4 w-4 text-red-400" />
                </div>
                <h3 className="text-sm font-semibold text-red-300 mb-2">YOUR PROBLEM</h3>
                <p className="text-xs text-gray-400">Hours every week spent on tasks a computer should handle</p>
              </div>

              <div className="bg-gradient-to-br from-blue-900/20 to-purple-900/20 border border-blue-500/20 rounded-xl p-6 text-center backdrop-blur-sm">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-lg mx-auto mb-3 flex items-center justify-center">
                  <HitchcodeLogo className="h-4 w-4 text-blue-400" />
                </div>
                <h3 className="text-sm font-semibold text-blue-300 mb-2">SOLUTION</h3>
                <p className="text-xs text-gray-400">Custom software that does your work for you</p>
              </div>

              <div className="bg-gradient-to-br from-green-900/20 to-green-800/10 border border-green-500/20 rounded-xl p-6 text-center backdrop-blur-sm">
                <div className="w-8 h-8 bg-green-500/20 rounded-lg mx-auto mb-3 flex items-center justify-center">
                  <Target className="h-4 w-4 text-green-400" />
                </div>
                <h3 className="text-sm font-semibold text-green-300 mb-2">YOUR RESULT</h3>
                <p className="text-xs text-gray-400">More time for what matters, fewer mistakes, happier customers</p>
              </div>
            </div>

            {/* Business impact metrics */}
            <div className="flex justify-center mb-10">
              <div className="bg-gradient-to-r from-gray-900/80 to-gray-800/80 border border-white/10 rounded-xl p-6 backdrop-blur-sm max-w-2xl w-full">
                <div className="grid grid-cols-3 gap-6 text-center">
                  <div>
                    <div className="text-2xl font-bold text-white mb-1">40+</div>
                    <div className="text-xs text-gray-400 uppercase tracking-wide">Hours Saved Per Week</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-white mb-1">$60k+</div>
                    <div className="text-xs text-gray-400 uppercase tracking-wide">saved in paid salaries</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-white mb-1">24/7</div>
                    <div className="text-xs text-gray-400 uppercase tracking-wide">Working For You</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Data organization and future-ready messaging */}
            <div className="max-w-4xl mx-auto text-center mb-12">
              <div className="bg-gradient-to-br from-blue-900/10 to-purple-900/10 border border-blue-500/20 rounded-2xl p-8 backdrop-blur-sm">
                <p className="text-lg md:text-xl text-gray-300 mb-4 leading-relaxed">
                  <span className="text-white font-semibold">Get the data you care about, nothing else. </span>
                  Hitchcode systems organize all information that comes in or goes out,
                  and make it available for easy access whenever you need it.
                </p>
                <div className="w-16 h-px bg-gradient-to-r from-transparent via-blue-400 to-transparent mx-auto my-6"></div>
                <p className="text-base text-gray-400 leading-relaxed">
                  Technology is advancing incredibly fast, and it's quickly becoming the future.
                  <span className="text-white font-medium"> Don't be scared, This is a good thing.</span> I'm here to help put you and your business
                  at the head of the pack while everyone else is still figuring it out.
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
              <Link
                href="/contact"
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white rounded-xl font-semibold transition-all duration-300 min-w-[200px] text-center shadow-2xl shadow-blue-600/25"
              >
                Fix My Workflow
              </Link>
              <Link
                href="/demos"
                className="px-8 py-4 bg-white/5 border border-white/10 hover:bg-white/10 rounded-xl font-semibold transition-colors min-w-[200px] text-center group backdrop-blur-sm"
              >
                <span className="inline-flex items-center">
                  See Real Examples
                  <Play className="h-4 w-4 ml-2 transition-transform duration-300 group-hover:scale-110" />
                </span>
              </Link>
            </div>

            {/* Simple visual indicators of business benefits */}
            <div className="absolute top-20 left-10 hidden lg:block animate-bounce" style={{ animationDelay: '2s', animationDuration: '3s' }}>
              <div className="bg-green-500/10 border border-green-400/30 rounded-lg p-3 backdrop-blur-sm">
                <CheckCircle className="h-5 w-5 text-green-400" />
              </div>
            </div>

            <div className="absolute top-32 right-16 hidden lg:block animate-bounce" style={{ animationDelay: '2.5s', animationDuration: '3s' }}>
              <div className="bg-blue-500/10 border border-blue-400/30 rounded-lg p-3 backdrop-blur-sm">
                <Zap className="h-5 w-5 text-blue-400" />
              </div>
            </div>

            <div className="absolute bottom-20 left-20 hidden lg:block animate-bounce" style={{ animationDelay: '3s', animationDuration: '3s' }}>
              <div className="bg-purple-500/10 border border-purple-400/30 rounded-lg p-3 backdrop-blur-sm">
                <TrendingUp className="h-5 w-5 text-purple-400" />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Live Demos Call-Out Section */}
      <section className="relative py-24 bg-gradient-to-br from-gray-900/50 to-black border-t border-white/10">
        <div className="absolute inset-0 overflow-hidden z-0">
          <div className="absolute -top-40 -left-40 w-96 h-96 bg-blue-600/15 rounded-full filter blur-[120px]" />
          <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-purple-600/15 rounded-full filter blur-[120px]" />
          <HexPattern className="absolute inset-0 text-white opacity-3" />
        </div>

        <div className="relative z-10 container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {/* Main CTA */}
            <div className="text-center mb-16 reveal-item opacity-0 transition-all duration-1000 translate-y-8" style={{ transitionDelay: '100ms' }}>
              <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-400/30 rounded-full text-blue-300 text-sm font-semibold mb-8 backdrop-blur-sm">
                <Play className="h-4 w-4 mr-2" />
                LIVE DEMONSTRATIONS
              </div>

              <h2 className={`text-4xl md:text-6xl font-bold ${jetbrains.className} mb-6 tracking-tight`}>
                <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                  See It In Action
                </span>
              </h2>

              <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-12 leading-relaxed">
                Don't just imagine the possibilities. <span className="text-white font-semibold">Watch real business problems get solved</span> in real-time with interactive demonstrations.
              </p>
            </div>

            {/* Demo Preview Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 mb-16">
              {/* Automated Invoicing Demo Preview */}
              <div className="reveal-item opacity-0 transition-all duration-700 translate-y-8" style={{ transitionDelay: '200ms' }}>
                <div className="relative group h-full">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-purple-600/20 rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-300" />
                  <div className="relative bg-gradient-to-br from-gray-900/80 to-gray-800/80 border border-white/10 rounded-2xl p-8 h-full backdrop-blur-sm group-hover:border-white/20 transition-all duration-300">
                    <div className="flex items-center mb-6">
                      <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center mr-4">
                        <Zap className="h-6 w-6 text-blue-400" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-white">Automated Invoicing</h3>
                        <p className="text-blue-400 text-sm">Problem to Solution in 30 seconds</p>
                      </div>
                    </div>

                    <div className="space-y-4 mb-8">
                      <div className="flex items-start">
                        <div className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <p className="text-gray-300 text-sm">
                          <span className="text-red-400 font-medium">Problem:</span> "I spend hours every week creating invoices manually"
                        </p>
                      </div>
                      <div className="flex items-start">
                        <CheckCircle className="h-4 w-4 text-green-400 mt-1 mr-3 flex-shrink-0" />
                        <p className="text-gray-300 text-sm">
                          <span className="text-green-400 font-medium">Solution:</span> Watch invoices generate and send themselves in seconds
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4 mb-6">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-white">95%</div>
                        <div className="text-gray-400 text-xs">Time Saved</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-white">0%</div>
                        <div className="text-gray-400 text-xs">Error Rate</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-white">3x</div>
                        <div className="text-gray-400 text-xs">Faster Payment</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Media Automation Demo Preview */}
              <div className="reveal-item opacity-0 transition-all duration-700 translate-y-8" style={{ transitionDelay: '300ms' }}>
                <div className="relative group h-full">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-pink-600/20 rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-300" />
                  <div className="relative bg-gradient-to-br from-gray-900/80 to-gray-800/80 border border-white/10 rounded-2xl p-8 h-full backdrop-blur-sm group-hover:border-white/20 transition-all duration-300">
                    <div className="flex items-center mb-6">
                      <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center mr-4">
                        <Target className="h-6 w-6 text-purple-400" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-white">Social Media Automation</h3>
                        <p className="text-purple-400 text-sm">From overwhelmed to organized</p>
                      </div>
                    </div>

                    <div className="space-y-4 mb-8">
                      <div className="flex items-start">
                        <div className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <p className="text-gray-300 text-sm">
                          <span className="text-red-400 font-medium">Problem:</span> "Creating consistent content is overwhelming and time-consuming"
                        </p>
                      </div>
                      <div className="flex items-start">
                        <CheckCircle className="h-4 w-4 text-green-400 mt-1 mr-3 flex-shrink-0" />
                        <p className="text-gray-300 text-sm">
                          <span className="text-green-400 font-medium">Solution:</span> Generate weeks of content in minutes with AI planning
                        </p>
                      </div>
                      <div className="flex items-start">
                        <CheckCircle className="h-4 w-4 text-green-400 mt-1 mr-3 flex-shrink-0" />
                        <p className="text-gray-300 text-sm">
                          <span className="text-green-400 font-medium">Bonus:</span> Consistent posting schedule adherence boosts reach and engagement even more
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4 mb-6">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-white">30+</div>
                        <div className="text-gray-400 text-xs">Posts Created</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-white">5min</div>
                        <div className="text-gray-400 text-xs">Time Investment</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-white">250%</div>
                        <div className="text-gray-400 text-xs">Engagement Boost</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Customer Lifetime Value Calculator Demo Preview */}
              <div className="reveal-item opacity-0 transition-all duration-700 translate-y-8" style={{ transitionDelay: '400ms' }}>
                <div className="relative group h-full lg:col-span-2 xl:col-span-1">
                  <div className="absolute inset-0 bg-gradient-to-br from-green-600/20 to-blue-600/20 rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-300" />
                  <div className="relative bg-gradient-to-br from-gray-900/80 to-gray-800/80 border border-white/10 rounded-2xl p-8 h-full backdrop-blur-sm group-hover:border-white/20 transition-all duration-300">
                    <div className="flex items-center mb-6">
                      <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center mr-4">
                        <Calculator className="h-6 w-6 text-green-400" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-white">CLV Calculator</h3>
                        <p className="text-green-400 text-sm">Smart business intelligence</p>
                      </div>
                    </div>

                    <div className="space-y-4 mb-8">
                      <div className="flex items-start">
                        <div className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <p className="text-gray-300 text-sm">
                          <span className="text-red-400 font-medium">Problem:</span> "I don't know which customers are actually profitable"
                        </p>
                      </div>
                      <div className="flex items-start">
                        <CheckCircle className="h-4 w-4 text-green-400 mt-1 mr-3 flex-shrink-0" />
                        <p className="text-gray-300 text-sm">
                          <span className="text-green-400 font-medium">Solution:</span> Calculate lifetime value with real industry benchmarks
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4 mb-6">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-white">15+</div>
                        <div className="text-gray-400 text-xs">Industries</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-white">Real</div>
                        <div className="text-gray-400 text-xs">Data Sources</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-white">AI</div>
                        <div className="text-gray-400 text-xs">Insights</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Call to Action */}
            <div className="text-center reveal-item opacity-0 transition-all duration-1000 translate-y-8" style={{ transitionDelay: '500ms' }}>
              <div className="relative inline-block">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-2xl blur-xl opacity-30"></div>
                <Link
                  href="/demos"
                  className="relative inline-flex items-center px-12 py-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white rounded-2xl font-bold text-xl transition-all duration-300 shadow-2xl group"
                >
                  <Play className="h-6 w-6 mr-3 group-hover:scale-110 transition-transform duration-300" />
                  Watch Live Demos
                  <ArrowRight className="h-6 w-6 ml-3 group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
              </div>
              <p className="text-gray-400 mt-4 text-lg">
                See exactly how these solutions work • No commitment required
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What We Do - Brief Synopsis Section */}
      <section className="relative py-20 border-t border-white/10 bg-gradient-to-br from-black to-gray-900/50">
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center mb-16 reveal-item opacity-0 transition-all duration-1000 translate-y-8" style={{ transitionDelay: '100ms' }}>
            <h2 className={`${jetbrains.className} text-4xl md:text-5xl font-bold mb-6`}>
              <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">What We Build</span>
            </h2>
            <p className="text-xl text-gray-300 leading-relaxed mb-8">
              We create custom software solutions that solve real business problems. From automating repetitive tasks to building
              complex applications, our goal is simple: <span className="text-white font-semibold">make your business run better</span>.
            </p>
            <p className="text-lg text-gray-400">
              Whether you're looking to streamline operations, reach more customers, or gain insights from your data,
              we have the expertise to bring your vision to life.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {/* Automation & Efficiency */}
            <div className="reveal-item opacity-0 transition-all duration-700 translate-y-8" style={{ transitionDelay: '200ms' }}>
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-500/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Zap className="h-8 w-8 text-blue-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-4">Automation & Efficiency</h3>
                <p className="text-gray-400 leading-relaxed">
                  Stop doing repetitive work. We build systems that handle the boring stuff so you can focus on what matters most.
                </p>
              </div>
            </div>

            {/* Custom Applications */}
            <div className="reveal-item opacity-0 transition-all duration-700 translate-y-8" style={{ transitionDelay: '300ms' }}>
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-500/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Layers className="h-8 w-8 text-purple-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-4">Custom Applications</h3>
                <p className="text-gray-400 leading-relaxed">
                  Off-the-shelf software doesn't fit? We create applications tailored specifically to how your business works.
                </p>
              </div>
            </div>

            {/* Data & Insights */}
            <div className="reveal-item opacity-0 transition-all duration-700 translate-y-8" style={{ transitionDelay: '400ms' }}>
              <div className="text-center">
                <div className="w-16 h-16 bg-green-500/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <TrendingUp className="h-8 w-8 text-green-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-4">Data & Insights</h3>
                <p className="text-gray-400 leading-relaxed">
                  Turn your data into actionable insights. We help you understand your business and make better decisions.
                </p>
              </div>
            </div>
          </div>

          {/* For Different Business Types */}
          <div className="text-center reveal-item opacity-0 transition-all duration-1000 translate-y-8" style={{ transitionDelay: '500ms' }}>
            <h3 className="text-2xl font-bold text-white mb-8">Perfect For</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
              <div className="bg-white/5 rounded-xl p-4 border border-white/10 flex items-center justify-center h-20">
                <p className="text-gray-300 font-medium">Small Businesses</p>
              </div>
              <div className="bg-white/5 rounded-xl p-4 border border-white/10 flex items-center justify-center h-20">
                <p className="text-gray-300 font-medium">Growing Companies</p>
              </div>
              <div className="bg-white/5 rounded-xl p-4 border border-white/10 flex items-center justify-center h-20">
                <p className="text-gray-300 font-medium">Entrepreneurs</p>
              </div>
              <div className="bg-white/5 rounded-xl p-4 border border-white/10 flex items-center justify-center h-20">
                <p className="text-gray-300 font-medium">Anyone</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How We Work - Brief Process */}
      <section className="relative py-20 border-t border-white/10">
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16 reveal-item opacity-0 transition-all duration-1000 translate-y-8" style={{ transitionDelay: '100ms' }}>
            <h2 className={`${jetbrains.className} text-3xl md:text-4xl font-bold mb-6`}>
              <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">Simple Process</span>
            </h2>
            <p className="text-lg text-gray-400">
              No confusing technical jargon or complicated project management. Just a straightforward approach that gets results.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="reveal-item opacity-0 transition-all duration-700 translate-y-8" style={{ transitionDelay: '200ms' }}>
              <div className="text-center">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-blue-500/10 mb-4 mx-auto relative">
                  <span className={`${jetbrains.className} text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent`}>
                    1
                  </span>
                  <div className="hidden md:block absolute left-full top-1/2 w-full h-0.5 bg-gradient-to-r from-blue-500/50 to-purple-500/50 transform -translate-y-1/2" />
                </div>
                <h3 className="text-lg font-medium mb-2 text-white">We Listen</h3>
                <p className="text-gray-400 text-sm">Tell us about your challenges and what you want to achieve</p>
              </div>
            </div>

            <div className="reveal-item opacity-0 transition-all duration-700 translate-y-8" style={{ transitionDelay: '300ms' }}>
              <div className="text-center">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-blue-500/10 mb-4 mx-auto relative">
                  <span className={`${jetbrains.className} text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent`}>
                    2
                  </span>
                  <div className="hidden md:block absolute left-full top-1/2 w-full h-0.5 bg-gradient-to-r from-purple-500/50 to-pink-500/50 transform -translate-y-1/2" />
                </div>
                <h3 className="text-lg font-medium mb-2 text-white">We Build</h3>
                <p className="text-gray-400 text-sm">Create a solution designed specifically for your needs</p>
              </div>
            </div>

            <div className="reveal-item opacity-0 transition-all duration-700 translate-y-8" style={{ transitionDelay: '400ms' }}>
              <div className="text-center">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-blue-500/10 mb-4 mx-auto">
                  <span className={`${jetbrains.className} text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent`}>
                    3
                  </span>
                </div>
                <h3 className="text-lg font-medium mb-2 text-white">You Succeed</h3>
                <p className="text-gray-400 text-sm">Launch your solution and watch your business improve</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-16 md:py-24 bg-gradient-to-br from-gray-900 to-black border-t border-white/10">
        <div className="absolute inset-0 overflow-hidden z-0">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-600/10 rounded-full filter blur-[100px]" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-600/10 rounded-full filter blur-[100px]" />
          <HexPattern className="absolute inset-0 text-white opacity-3" />
        </div>

        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center reveal-item opacity-0 transition-all duration-1000 translate-y-8" style={{ transitionDelay: '100ms' }}>
            <h2 className={`${jetbrains.className} text-3xl md:text-4xl font-bold mb-6`}>
              Ready to Transform Your Business?
            </h2>
            <p className="text-gray-400 text-lg mb-10 max-w-2xl mx-auto">
              Let's talk about your challenges and explore how custom software can help you work smarter, not harder.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link
                href="/contact"
                className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white rounded-md font-medium transition-all duration-300 min-w-[180px]"
              >
                Start a Conversation
              </Link>
              <Link
                href="/demos"
                className="inline-flex items-center text-gray-300 hover:text-white group transition-colors"
              >
                <span>Explore More Demos</span>
                <ExternalLink className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-8 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          {/* Brand - positioned absolutely on the left */}
          <div className="absolute left-0 top-1/2 -translate-y-1/2">
            <div className="flex items-center space-x-3">
              <div className="h-6 w-6 rounded-md bg-gradient-to-br from-blue-600 to-purple-600"></div>
              <span className={`${jetbrains.className} text-sm font-medium tracking-wide`}>HITCHCODE</span>
            </div>
          </div>

          {/* Navigation - truly centered */}
          <nav className="hidden lg:flex items-center justify-center space-x-8 py-4">
            <Link href="/" className="text-xs text-gray-400 hover:text-white transition-colors whitespace-nowrap">Home</Link>
            <Link href="/demos" className="text-xs text-gray-400 hover:text-white transition-colors whitespace-nowrap">Demos</Link>
            <Link href="/services/full-stack-development" className="text-xs text-gray-400 hover:text-white transition-colors whitespace-nowrap">Services</Link>
            <Link href="/about" className="text-xs text-gray-400 hover:text-white transition-colors whitespace-nowrap">About</Link>
            <Link href="/contact" className="text-xs text-gray-400 hover:text-white transition-colors whitespace-nowrap">Contact</Link>
          </nav>

          {/* Fallback navigation for medium screens where we need to split the difference */}
          <nav className="hidden md:flex lg:hidden items-center justify-center space-x-6 py-4 mx-32">
            <Link href="/" className="text-xs text-gray-400 hover:text-white transition-colors whitespace-nowrap">Home</Link>
            <Link href="/demos" className="text-xs text-gray-400 hover:text-white transition-colors whitespace-nowrap">Demos</Link>
            <Link href="/services/full-stack-development" className="text-xs text-gray-400 hover:text-white transition-colors whitespace-nowrap">Services</Link>
            <Link href="/contact" className="text-xs text-gray-400 hover:text-white transition-colors whitespace-nowrap">Contact</Link>
          </nav>

          {/* Mobile navigation - centered */}
          <nav className="flex md:hidden items-center justify-center space-x-4 py-4">
            <Link href="/" className="text-xs text-gray-400 hover:text-white transition-colors">Home</Link>
            <Link href="/demos" className="text-xs text-gray-400 hover:text-white transition-colors">Demos</Link>
            <Link href="/contact" className="text-xs text-gray-400 hover:text-white transition-colors">Contact</Link>
          </nav>

          {/* Copyright - positioned absolutely on the right */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 hidden md:block">
            <div className="text-xs text-gray-500">
              &copy; {new Date().getFullYear()} HitchCode. All rights reserved.
            </div>
          </div>

          {/* Mobile copyright - below navigation */}
          <div className="md:hidden text-center mt-4">
            <div className="text-xs text-gray-500">
              &copy; {new Date().getFullYear()} HitchCode. All rights reserved.
            </div>
          </div>
        </div>
      </footer>

      {/* CSS animations */}
      <style jsx global>{`
        .revealed {
          opacity: 1 !important;
          transform: translateY(0) !important;
        }

        @keyframes pulse {
          0%, 100% {
            opacity: 0.5;
          }
          50% {
            opacity: 1;
          }
        }

        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.6s ease-out forwards;
          opacity: 0;
        }

        .line-clamp-2 {
          overflow: hidden;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }

        @keyframes gentle-rotate {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes trace-circle {
          from {
            stroke-dashoffset: 360;
          }
          to {
            stroke-dashoffset: 0;
          }
        }

        @keyframes trace-line {
          from {
            stroke-dashoffset: 100;
          }
          to {
            stroke-dashoffset: 0;
          }
        }

        @keyframes fade-transform {
          from {
            opacity: 0;
            transform: scale(0.8);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes subtle-pulse {
          0%, 100% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.8;
            transform: scale(1.05);
          }
        }
      `}</style>
    </main>
  )
}

const services = [
  {
    title: "Full-Stack Development",
    description: "Architecting seamless applications from front to back. Leveraging modern technologies to create robust, scalable solutions that drive business growth.",
    href: "/services/full-stack-development"
  },
  {
    title: "Technology Consulting",
    description: "Strategic guidance on emerging technologies. Helping businesses navigate digital transformation with custom roadmaps and implementation strategies.",
    href: "/services/technology-consulting"
  },
  {
    title: "System Refinement & Automation ",
    description: "Elevating existing systems to peak performance. Modernizing architecture, optimizing speed, and enhancing reliability of what exists already. Lets see what works, and do 100x more with half the effort",
    href: "/services/system-refinement"
  }
]

const workflow = [
  {
    title: "Discover",
    description: "We start by understanding your vision, goals, and requirements through in-depth discovery sessions."
  },
  {
    title: "Design",
    description: "Our team creates detailed technical designs and prototype solutions that align with your business needs."
  },
  {
    title: "Develop",
    description: "We build your solution using modern frameworks and best practices, with constant communication."
  },
  {
    title: "Deploy",
    description: "We implement, test, and launch your solution with ongoing support and optimization."
  }
]
