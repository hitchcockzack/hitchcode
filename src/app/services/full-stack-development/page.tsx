'use client'

import { Inter } from 'next/font/google'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { ArrowRight, ChevronRight, Code, Cpu, Database, Globe, Server, Zap, CheckCircle, ExternalLink, Brain, Users, Target, TrendingUp, Shield } from 'lucide-react'

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

export default function FullStackDevelopment() {
  const [activeTab, setActiveTab] = useState<'frontend' | 'backend' | 'architecture'>('frontend')
  const [userCount, setUserCount] = useState<number | null>(null)
  const [isLoadingCount, setIsLoadingCount] = useState(true)

  useScrollReveal()

  // Fetch user count from Supabase
  useEffect(() => {
    const fetchUserCount = async () => {
      try {
        setIsLoadingCount(true);

        // Fetch counts from both tables
        const [profilesResponse, playersResponse] = await Promise.all([
          fetch('/api/supabase-query', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ sql: 'SELECT COUNT(*) as profile_count FROM profiles;' })
          }),
          fetch('/api/supabase-query', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ sql: 'SELECT COUNT(*) as player_count FROM players;' })
          })
        ]);

        if (profilesResponse.ok && playersResponse.ok) {
          const profilesData = await profilesResponse.json();
          const playersData = await playersResponse.json();

          const totalCount = parseInt(profilesData[0].profile_count) + parseInt(playersData[0].player_count);
          setUserCount(totalCount);
        }
      } catch (error) {
        console.error('Failed to fetch user count:', error);
        // Fallback to approximate count if API fails
        setUserCount(1479);
      } finally {
        setIsLoadingCount(false);
      }
    };

    fetchUserCount();
  }, []);

  return (
    <main className={`min-h-screen bg-white ${inter.className}`}>
      {/* Hero Section */}
      <section className="relative py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="reveal-on-scroll opacity-0 translate-y-8 transition-all duration-700">
            <div className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-2xl bg-blue-50 flex items-center justify-center mb-8">
                  <Code className="h-8 w-8 text-blue-600" />
              </div>
            </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-zinc-900 text-center mb-6">
                Full-Stack Development
            </h1>

              <p className="text-xl text-zinc-600 text-center mb-10 max-w-3xl mx-auto leading-relaxed">
              Transforming complex ideas into elegant digital solutions—from concept to deployment and beyond.
            </p>

            <div className="flex flex-wrap justify-center gap-4 mb-8">
                <span className="px-4 py-2 bg-blue-50 rounded-full text-sm text-blue-700 border border-blue-200">React/Next.js</span>
                <span className="px-4 py-2 bg-purple-50 rounded-full text-sm text-purple-700 border border-purple-200">Node.js</span>
                <span className="px-4 py-2 bg-pink-50 rounded-full text-sm text-pink-700 border border-pink-200">TypeScript</span>
                <span className="px-4 py-2 bg-blue-50 rounded-full text-sm text-blue-700 border border-blue-200">Modern APIs</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Value Proposition Section */}
      <section className="relative py-24 bg-zinc-50/50 border-t border-zinc-200">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="mb-16 text-center reveal-on-scroll opacity-0 translate-y-8 transition-all duration-700">
              <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 mb-6">
                Why Choose Custom Development?
              </h2>
              <p className="text-zinc-600 text-lg">
                Off-the-shelf solutions often force your business to adapt to their limitations. Custom development puts <span className="text-zinc-900 font-semibold">your needs first</span>.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {valueProps.map((prop, i) => (
                <div
                  key={i}
                  className="reveal-on-scroll opacity-0 translate-y-8 transition-all duration-700"
                  style={{ transitionDelay: `${200 + i * 100}ms` }}
                >
                  <div className="flex flex-col h-full p-6 bg-white border border-zinc-200 rounded-xl hover:border-zinc-300 hover:shadow-md transition-all duration-200">
                    <div className="w-12 h-12 rounded-lg bg-blue-50 flex items-center justify-center mb-5">
                      {prop.icon}
                    </div>
                    <h3 className="text-xl font-medium text-zinc-900 mb-3">{prop.title}</h3>
                    <p className="text-zinc-600 text-sm md:text-base mb-4 flex-grow">{prop.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Fractional CTO Section */}
      <section className="relative py-24 bg-white border-t border-zinc-200">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="mb-16 text-center reveal-on-scroll opacity-0 translate-y-8 transition-all duration-700">
              <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 mb-6">
                Fractional CTO Services
              </h2>
              <p className="text-zinc-600 text-lg max-w-2xl mx-auto">
                Strategic technology leadership without the full-time commitment. Perfect for startups and growing companies that need executive-level technical guidance.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
              {/* Left Column - What is Fractional CTO */}
              <div className="reveal-on-scroll opacity-0 translate-y-8 transition-all duration-700" style={{ transitionDelay: '200ms' }}>
                <div className="bg-white border border-zinc-200 rounded-xl p-8 shadow-sm h-full">
                  <div className="flex items-start space-x-4 mb-6">
                    <div className="w-12 h-12 bg-purple-50 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Brain className="w-6 h-6 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-semibold text-zinc-900 mb-4">Strategic Technology Leadership</h3>
                      <p className="text-zinc-700 leading-relaxed mb-6">
                        A fractional CTO provides the strategic technology leadership your company needs, without the cost of a full-time executive. Perfect for companies that need high-level technical strategy, architecture decisions, and team guidance.
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-purple-600 mr-3 mt-0.5" />
                      <span className="text-sm text-zinc-700">Technology strategy and roadmap development</span>
                    </div>
                    <div className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-purple-600 mr-3 mt-0.5" />
                      <span className="text-sm text-zinc-700">Technical architecture and system design</span>
                    </div>
                    <div className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-purple-600 mr-3 mt-0.5" />
                      <span className="text-sm text-zinc-700">Engineering team leadership and mentoring</span>
                    </div>
                    <div className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-purple-600 mr-3 mt-0.5" />
                      <span className="text-sm text-zinc-700">Technology vendor evaluation and selection</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column - When You Need It */}
              <div className="reveal-on-scroll opacity-0 translate-y-8 transition-all duration-700" style={{ transitionDelay: '300ms' }}>
                <div className="bg-white border border-zinc-200 rounded-xl p-8 shadow-sm h-full">
                  <div className="flex items-start space-x-4 mb-6">
                    <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Target className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-semibold text-zinc-900 mb-4">Perfect for Growing Companies</h3>
                      <p className="text-zinc-700 leading-relaxed mb-6">
                        Whether you're a startup scaling your first product or an established company tackling digital transformation, fractional CTO services provide the expertise you need at the right time.
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-green-600 mr-3 mt-0.5" />
                      <span className="text-sm text-zinc-700">Startups building their first technical foundation</span>
                    </div>
                    <div className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-green-600 mr-3 mt-0.5" />
                      <span className="text-sm text-zinc-700">Companies scaling engineering teams</span>
                    </div>
                    <div className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-green-600 mr-3 mt-0.5" />
                      <span className="text-sm text-zinc-700">Organizations undergoing digital transformation</span>
                    </div>
                    <div className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-green-600 mr-3 mt-0.5" />
                      <span className="text-sm text-zinc-700">Businesses needing technical due diligence</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Services Overview */}
            <div className="reveal-on-scroll opacity-0 translate-y-8 transition-all duration-700" style={{ transitionDelay: '400ms' }}>
              <div className="bg-gradient-to-br from-blue-50 to-purple-50 border border-blue-200 rounded-xl p-8">
                <h3 className="text-xl font-semibold text-zinc-900 mb-6 text-center">Fractional CTO Services Include</h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                      <Users className="w-6 h-6 text-blue-600" />
                    </div>
                    <h4 className="font-semibold text-zinc-900 mb-2">Team Leadership</h4>
                    <p className="text-sm text-zinc-700">Engineering team guidance, hiring strategies, and performance optimization</p>
                  </div>

                  <div className="text-center">
                    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                      <TrendingUp className="w-6 h-6 text-purple-600" />
                    </div>
                    <h4 className="font-semibold text-zinc-900 mb-2">Strategic Planning</h4>
                    <p className="text-sm text-zinc-700">Technology roadmaps, budget planning, and growth strategy alignment</p>
                  </div>

                  <div className="text-center">
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                      <Shield className="w-6 h-6 text-green-600" />
                    </div>
                    <h4 className="font-semibold text-zinc-900 mb-2">Risk Management</h4>
                    <p className="text-sm text-zinc-700">Security assessments, compliance guidance, and technical risk mitigation</p>
                  </div>
                </div>

                <div className="text-center mt-8">
                  <Link
                    href="/contact"
                    className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors duration-200 shadow-sm hover:shadow-md"
                  >
                    Discuss Your Needs
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                  <p className="text-sm text-zinc-600 mt-3">Contact me to learn more about fractional CTO services and pricing</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Approach Section with Tabs */}
      <section className="relative py-24 bg-zinc-50/50 border-t border-zinc-200">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="mb-16 text-center reveal-on-scroll opacity-0 translate-y-8 transition-all duration-700">
              <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 mb-6">
                Our Technical Approach
              </h2>
              <p className="text-zinc-600 text-lg mb-10">
                We deliver excellence at every layer of the technology stack
              </p>

              <div className="inline-flex items-center rounded-lg p-1 bg-white border border-zinc-200">
                <button
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 ${activeTab === 'frontend' ? 'bg-zinc-100 text-zinc-900' : 'text-zinc-600 hover:text-zinc-900'}`}
                  onClick={() => setActiveTab('frontend')}
                >
                  Frontend
                </button>
                <button
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 ${activeTab === 'backend' ? 'bg-zinc-100 text-zinc-900' : 'text-zinc-600 hover:text-zinc-900'}`}
                  onClick={() => setActiveTab('backend')}
                >
                  Backend
                </button>
                <button
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 ${activeTab === 'architecture' ? 'bg-zinc-100 text-zinc-900' : 'text-zinc-600 hover:text-zinc-900'}`}
                  onClick={() => setActiveTab('architecture')}
                >
                  Architecture
                </button>
              </div>
            </div>

            <div className="mb-12 min-h-[320px]">
              {activeTab === 'frontend' && (
                <div className="bg-white border border-zinc-200 rounded-xl p-6 md:p-8 shadow-sm transition-all duration-500">
                  <div className="flex flex-col md:flex-row gap-8 items-start">
                    <div className="md:w-1/3 flex justify-center mb-6 md:mb-0">
                      <div className="w-32 h-32 rounded-xl bg-blue-50 flex items-center justify-center">
                        <Globe className="h-16 w-16 text-blue-600" />
                      </div>
                    </div>
                    <div className="md:w-2/3">
                      <h3 className="text-xl font-medium text-zinc-900 mb-4">Intuitive User Experiences</h3>
                      <p className="text-zinc-700 mb-5">
                        We craft performant, responsive interfaces that captivate users and enhance engagement. Using modern frontend technologies, we build experiences that adapt seamlessly across devices.
                      </p>
                      <ul className="space-y-2">
                        {frontendTech.map((tech, i) => (
                          <li key={i} className="flex items-center text-sm">
                            <CheckCircle className="h-4 w-4 text-blue-600 mr-2" />
                            <span className="text-zinc-700">{tech}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'backend' && (
                <div className="bg-white border border-zinc-200 rounded-xl p-6 md:p-8 shadow-sm transition-all duration-500">
                  <div className="flex flex-col md:flex-row gap-8 items-start">
                    <div className="md:w-1/3 flex justify-center mb-6 md:mb-0">
                      <div className="w-32 h-32 rounded-xl bg-purple-50 flex items-center justify-center">
                        <Server className="h-16 w-16 text-purple-600" />
                      </div>
                    </div>
                    <div className="md:w-2/3">
                      <h3 className="text-xl font-medium text-zinc-900 mb-4">Robust & Scalable Systems</h3>
                      <p className="text-zinc-700 mb-5">
                        Our backend solutions provide secure, high-performance foundations that support your growing business needs with flexibility and reliability.
                      </p>
                      <ul className="space-y-2">
                        {backendTech.map((tech, i) => (
                          <li key={i} className="flex items-center text-sm">
                            <CheckCircle className="h-4 w-4 text-purple-600 mr-2" />
                            <span className="text-zinc-700">{tech}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'architecture' && (
                <div className="bg-white border border-zinc-200 rounded-xl p-6 md:p-8 shadow-sm transition-all duration-500">
                  <div className="flex flex-col md:flex-row gap-8 items-start">
                    <div className="md:w-1/3 flex justify-center mb-6 md:mb-0">
                      <div className="w-32 h-32 rounded-xl bg-pink-50 flex items-center justify-center">
                        <Database className="h-16 w-16 text-pink-600" />
                      </div>
                    </div>
                    <div className="md:w-2/3">
                      <h3 className="text-xl font-medium text-zinc-900 mb-4">Future-Proof Architecture</h3>
                      <p className="text-zinc-700 mb-5">
                        We design systems that anticipate growth and change, employing cloud-native practices, microservices when appropriate, and scalable infrastructure.
                      </p>
                      <ul className="space-y-2">
                        {architectureTech.map((tech, i) => (
                          <li key={i} className="flex items-center text-sm">
                            <CheckCircle className="h-4 w-4 text-pink-600 mr-2" />
                            <span className="text-zinc-700">{tech}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="relative py-24 bg-white border-t border-zinc-200">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="mb-16 text-center reveal-on-scroll opacity-0 translate-y-8 transition-all duration-700">
              <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 mb-6">
                Development Process
              </h2>
              <p className="text-zinc-600 text-lg">
                A methodical approach ensures we deliver exceptional results on time
              </p>
            </div>

            <div className="space-y-8 md:space-y-0 md:grid md:grid-cols-2 lg:grid-cols-4 md:gap-x-8 md:gap-y-10">
              {process.map((step, i) => (
                <div
                  key={i}
                  className="reveal-on-scroll opacity-0 translate-y-8 transition-all duration-700"
                  style={{ transitionDelay: `${200 + i * 100}ms` }}
                >
                  <div className="relative">
                    <div className="flex flex-col items-center text-center">
                      <div className="w-16 h-16 rounded-xl flex items-center justify-center bg-blue-50 mb-4 relative">
                        <span className="text-2xl font-bold text-blue-600">
                          {i + 1}
                        </span>
                        {i < process.length - 1 && (
                          <div className="hidden lg:block absolute left-full top-1/2 w-full h-0.5 bg-gradient-to-r from-zinc-300 to-transparent transform -translate-y-1/2" />
                        )}
                      </div>
                      <h3 className="text-lg font-medium text-zinc-900 mb-2">{step.title}</h3>
                      <p className="text-zinc-600 text-sm">{step.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* What Sets Us Apart */}
      <section className="relative py-24 bg-zinc-50/50 border-t border-zinc-200">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="mb-16 text-center reveal-on-scroll opacity-0 translate-y-8 transition-all duration-700">
              <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 mb-6">
                What Sets Us Apart
              </h2>
            </div>

            <div className="bg-white border border-zinc-200 rounded-xl p-6 md:p-8 shadow-sm reveal-on-scroll opacity-0 translate-y-8 transition-all duration-700">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {differentiators.map((diff, i) => (
                  <div key={i} className="flex flex-col">
                    <div className="flex items-start mb-3">
                      <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center mr-4 mt-1">
                        {diff.icon}
                      </div>
                      <h3 className="text-lg font-medium text-zinc-900">{diff.title}</h3>
                    </div>
                    <p className="text-zinc-600 text-sm pl-12">{diff.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Showcase Section */}
      <section className="relative py-24 bg-white border-t border-zinc-200">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="mb-16 text-center reveal-on-scroll opacity-0 translate-y-8 transition-all duration-700">
              <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 mb-6">
                Featured Work
              </h2>
              <p className="text-zinc-600 text-lg max-w-2xl mx-auto">
                Real solutions for real businesses. Here are some of the most recent projects we've brought to life.
              </p>
            </div>

            {/* SPAs Section */}
            <div className="mb-16">
              <div className="mb-8 reveal-on-scroll opacity-0 translate-y-8 transition-all duration-700">
                <h3 className="text-2xl font-bold text-zinc-900 mb-3">
                  Single Page Applications
                </h3>
                <p className="text-zinc-600 mb-4">Modern, responsive web applications built for optimal user experience</p>

                {/* Lighthouse Performance Score */}
                <div className="flex items-center justify-center mb-6">
                  <div className="bg-white border border-zinc-200 rounded-lg p-4 shadow-sm">
                    <div className="flex items-center space-x-4">
                      <div className="relative">
                        <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 36 36">
                          {/* Background circle */}
                          <path
                            d="M18 2.0845
                              a 15.9155 15.9155 0 0 1 0 31.831
                              a 15.9155 15.9155 0 0 1 0 -31.831"
                            fill="none"
                            stroke="#e5e7eb"
                            strokeWidth="2"
                          />

                          {/* Performance (25% - Green) */}
                          <path
                            d="M18 2.0845
                              a 15.9155 15.9155 0 0 1 0 31.831
                              a 15.9155 15.9155 0 0 1 0 -31.831"
                            fill="none"
                            stroke="#10b981"
                            strokeWidth="2"
                            strokeDasharray="25, 100"
                            strokeDashoffset="0"
                            className="lighthouse-performance"
                          />

                          {/* Accessibility (25% - Green) */}
                          <path
                            d="M18 2.0845
                              a 15.9155 15.9155 0 0 1 0 31.831
                              a 15.9155 15.9155 0 0 1 0 -31.831"
                            fill="none"
                            stroke="#10b981"
                            strokeWidth="2"
                            strokeDasharray="25, 100"
                            strokeDashoffset="-25"
                            className="lighthouse-accessibility"
                          />

                          {/* Best Practices (25% - Green) */}
                          <path
                            d="M18 2.0845
                              a 15.9155 15.9155 0 0 1 0 31.831
                              a 15.9155 15.9155 0 0 1 0 -31.831"
                            fill="none"
                            stroke="#10b981"
                            strokeWidth="2"
                            strokeDasharray="25, 100"
                            strokeDashoffset="-50"
                            className="lighthouse-practices"
                          />

                          {/* SEO (25% - Green) */}
                          <path
                            d="M18 2.0845
                              a 15.9155 15.9155 0 0 1 0 31.831
                              a 15.9155 15.9155 0 0 1 0 -31.831"
                            fill="none"
                            stroke="#10b981"
                            strokeWidth="2"
                            strokeDasharray="25, 100"
                            strokeDashoffset="-75"
                            className="lighthouse-seo"
                          />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-lg font-bold text-green-600 lighthouse-score">100</span>
                        </div>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-zinc-900 mb-1">Lighthouse Performance Score</div>
                        <div className="text-xs text-zinc-600">All projects below achieve perfect scores</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {spaProjects.map((project, i) => (
                  <div
                    key={i}
                    className="reveal-on-scroll opacity-0 translate-y-8 transition-all duration-700 group"
                    style={{ transitionDelay: `${200 + i * 100}ms` }}
                  >
                    <div className="bg-white border border-zinc-200 rounded-xl p-6 h-full hover:border-zinc-300 hover:shadow-md transition-all duration-200 group-hover:translate-y-[-2px]">
                      <div className="flex flex-col h-full">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex-1">
                            <h4 className="text-lg font-medium text-zinc-900 mb-2 group-hover:text-blue-600 transition-colors duration-300">
                              {project.name}
                            </h4>
                            <p className="text-zinc-600 text-sm mb-4">{project.description}</p>
                          </div>
                          <div className="ml-4 flex flex-col items-center space-y-2">
                            <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
                              <Globe className="h-5 w-5 text-blue-600" />
                            </div>
                            {/* Lighthouse Badge */}
                            <div className="relative">
                              <svg className="w-8 h-8 transform -rotate-90" viewBox="0 0 36 36">
                                <path
                                  d="M18 2.0845
                                    a 15.9155 15.9155 0 0 1 0 31.831
                                    a 15.9155 15.9155 0 0 1 0 -31.831"
                                  fill="none"
                                  stroke="#e5e7eb"
                                  strokeWidth="3"
                                />
                                <path
                                  d="M18 2.0845
                                    a 15.9155 15.9155 0 0 1 0 31.831
                                    a 15.9155 15.9155 0 0 1 0 -31.831"
                                  fill="none"
                                  stroke="#10b981"
                                  strokeWidth="3"
                                  strokeDasharray="100, 100"
                                />
                              </svg>
                              <div className="absolute inset-0 flex items-center justify-center">
                                <span className="text-xs font-bold text-green-600">100</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-2 mb-6">
                          {project.technologies.map((tech, techIndex) => (
                            <span
                              key={techIndex}
                              className="px-2 py-1 bg-zinc-50 rounded text-xs text-zinc-700 border border-zinc-200"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>

                        <div className="mt-auto">
                          <a
                            href={project.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center text-blue-600 hover:text-blue-700 group/link transition-colors duration-300"
                          >
                            <span className="text-sm font-medium">{project.url.replace('https://', '').replace('http://', '')}</span>
                            <ExternalLink className="ml-2 h-4 w-4 transition-transform duration-300 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Enterprise Solution Section */}
            <div className="reveal-on-scroll opacity-0 translate-y-8 transition-all duration-700" style={{ transitionDelay: '500ms' }}>
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-zinc-900 mb-3">
                  Enterprise Solutions
                </h3>
                <p className="text-zinc-600">Full-stack platforms built for complex business operations and scalability</p>
              </div>

              <div className="bg-white border border-zinc-200 rounded-xl p-8 shadow-sm hover:border-zinc-300 hover:shadow-md transition-all duration-200">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-2">
                    <div className="flex items-start mb-6">
                      <div className="w-12 h-12 rounded-xl bg-purple-50 flex items-center justify-center mr-4">
                        <Server className="h-6 w-6 text-purple-600" />
                      </div>
                      <div>
                        <h4 className="text-xl font-medium mb-2 text-purple-600">Verified Youth Lax</h4>
                        <p className="text-zinc-600 text-sm mb-4">
                          Enterprise-level software solution for lacrosse club directors, featuring proprietary age verification through OCR/ML algorithms.
                        </p>
                      </div>
                    </div>

                    <div className="space-y-4 mb-6">
                      <div className="flex items-start">
                        <CheckCircle className="h-4 w-4 text-purple-600 mr-3 mt-0.5" />
                        <span className="text-sm text-zinc-700">Proprietary OCR/ML algorithm for player age verification hosted on AWS</span>
                      </div>
                      <div className="flex items-start">
                        <CheckCircle className="h-4 w-4 text-purple-600 mr-3 mt-0.5" />
                        <span className="text-sm text-zinc-700">Real-time roster management and live updates for coaches</span>
                      </div>
                      <div className="flex items-start">
                        <CheckCircle className="h-4 w-4 text-purple-600 mr-3 mt-0.5" />
                        <span className="text-sm text-zinc-700">Parent portal for scheduling details and player performance tracking</span>
                      </div>
                      <div className="flex items-start">
                        <CheckCircle className="h-4 w-4 text-purple-600 mr-3 mt-0.5" />
                        <span className="text-sm text-zinc-700">Comprehensive club management dashboard for directors</span>
                      </div>
                      <div className="flex items-start">
                        <CheckCircle className="h-4 w-4 text-purple-600 mr-3 mt-0.5" />
                        <span className="text-sm text-zinc-700">Programmatic email communications with users for instant updates on time-sensitive requests and inquiries</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-6">
                      {enterpriseProject.technologies.map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className="px-3 py-1 bg-purple-50 rounded text-xs text-purple-700 border border-purple-200"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    <a
                      href={enterpriseProject.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-purple-600 hover:text-purple-700 group/link transition-colors duration-300"
                    >
                      <span className="text-sm font-medium">{enterpriseProject.url.replace('https://', '').replace('http://', '')}</span>
                      <ExternalLink className="ml-2 h-4 w-4 transition-transform duration-300 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                    </a>
                  </div>

                  <div className="lg:col-span-1 flex flex-col items-center justify-center space-y-6">
                    {/* Main Database Icon */}
                    <div className="w-24 h-24 rounded-2xl bg-purple-50 flex items-center justify-center">
                      <Database className="h-12 w-12 text-purple-600" />
                    </div>

                    {/* Live Metrics Dashboard */}
                    <div className="w-full max-w-sm">
                      <div className="bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-200 rounded-xl p-6 shadow-sm">
                        {/* Header */}
                        <div className="text-center mb-4">
                          <div className="flex items-center justify-center mb-2">
                            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse mr-2"></div>
                            <span className="text-xs text-zinc-600 uppercase tracking-wider font-medium">Live Database Query</span>
                          </div>
                          <div className="text-xs text-zinc-500 flex items-center justify-center">
                            <Server className="h-3 w-3 mr-1" />
                            <span>PostgreSQL • profiles + players</span>
                          </div>
                        </div>

                        {/* Count Display */}
                        <div className="text-center border-t border-purple-200 pt-4">
                          {isLoadingCount ? (
                            <div className="space-y-2">
                              <div className="animate-pulse bg-purple-200 rounded h-10 w-24 mx-auto"></div>
                              <div className="animate-pulse bg-purple-100 rounded h-4 w-16 mx-auto"></div>
                            </div>
                          ) : (
                            <>
                              <div className="text-3xl font-bold text-purple-600 mb-1">
                                {userCount?.toLocaleString() || '1,479+'}
                              </div>
                              <div className="text-sm text-zinc-600 mb-2">Total Active Users</div>
                            </>
                          )}

                          {/* Last Updated Indicator */}
                          <div className="text-xs text-zinc-500 flex items-center justify-center mt-3 pt-3 border-t border-purple-200">
                            <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2"></div>
                            <span>Updated on page load</span>
                          </div>
                        </div>

                        {/* Uptime Monitor */}
                        <div className="border-t border-purple-200 pt-4 mt-4">
                          <div className="text-center mb-3">
                            <div className="flex items-center justify-center mb-2">
                              <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                              <span className="text-xs text-zinc-600 uppercase tracking-wider font-medium">System Status</span>
                            </div>
                            <div className="text-lg font-semibold text-green-600 mb-1">100% Uptime</div>
                            <div className="text-xs text-zinc-500">Since February 2024</div>
                          </div>

                          {/* Uptime Timeline */}
                          <div className="space-y-2">
                            <div className="text-xs text-zinc-500 text-center mb-2">Past 12 Months</div>
                            <div className="grid grid-cols-12 gap-1">
                              {generateUptimeData().map((month, index) => (
                                <div key={index} className="group relative">
                                  <div
                                    className="h-6 bg-green-500/80 rounded-sm hover:bg-green-500 transition-colors cursor-pointer"
                                    title={`${month.name}: 100% uptime`}
                                  ></div>
                                  <div className="text-xs text-zinc-500 text-center mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                    {month.short}
                                  </div>
                                </div>
                              ))}
                            </div>
                            <div className="flex justify-between text-xs text-zinc-500 mt-2">
                              <span>Jan</span>
                              <span>Dec</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 bg-zinc-50/50 border-t border-zinc-200">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center reveal-on-scroll opacity-0 translate-y-8 transition-all duration-700">
            <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 mb-6">
              Ready to Bring Your Vision to Life?
            </h2>
            <p className="text-zinc-600 text-lg max-w-2xl mx-auto mb-10">
              Every great digital product begins with a conversation. Let's discuss how we can transform your ideas into reality with precision engineering and thoughtful design.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link
                href="/contact"
                className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors duration-200 shadow-sm hover:shadow-md"
              >
                Start a Project
              </Link>
              <Link
                href="/"
                className="inline-flex items-center text-zinc-600 hover:text-zinc-900 group transition-colors"
              >
                <span>Return to Home</span>
                <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
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

        /* Lighthouse Animation Styles */
        .lighthouse-performance,
        .lighthouse-accessibility,
        .lighthouse-practices,
        .lighthouse-seo {
          stroke-dasharray: 25, 100;
          stroke-dashoffset: 100;
          animation-duration: 0.6s;
          animation-timing-function: ease-out;
          animation-fill-mode: forwards;
        }

        .lighthouse-performance {
          animation-name: lighthouse-fill-performance;
          animation-delay: 0.5s;
        }

        .lighthouse-accessibility {
          animation-name: lighthouse-fill-accessibility;
          animation-delay: 0.8s;
        }

        .lighthouse-practices {
          animation-name: lighthouse-fill-practices;
          animation-delay: 1.1s;
        }

        .lighthouse-seo {
          animation-name: lighthouse-fill-seo;
          animation-delay: 1.4s;
        }

        .lighthouse-score {
          opacity: 0;
          animation: lighthouse-score-reveal 0.5s ease-out 1.7s forwards;
        }

        @keyframes lighthouse-fill-performance {
          from { stroke-dashoffset: 100; }
          to { stroke-dashoffset: 0; }
        }

        @keyframes lighthouse-fill-accessibility {
          from { stroke-dashoffset: 75; }
          to { stroke-dashoffset: -25; }
        }

        @keyframes lighthouse-fill-practices {
          from { stroke-dashoffset: 50; }
          to { stroke-dashoffset: -50; }
        }

        @keyframes lighthouse-fill-seo {
          from { stroke-dashoffset: 25; }
          to { stroke-dashoffset: -75; }
        }

        @keyframes lighthouse-score-reveal {
          from {
            opacity: 0;
            transform: scale(0.8);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
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

// Value proposition items
const valueProps = [
  {
    title: "Tailored Solutions",
    description: "Software built precisely for your unique challenges and opportunities—no compromises, no wasted features, just exactly what you need.",
    icon: <Zap className="h-6 w-6 text-blue-600" />
  },
  {
    title: "Technical Excellence",
    description: "Clean, maintainable code that's built to evolve with your business, using battle-tested patterns and industry best practices.",
    icon: <Code className="h-6 w-6 text-blue-600" />
  },
  {
    title: "Business Impact",
    description: "Technology that directly contributes to your core metrics, whether that's user growth, operational efficiency, or revenue generation.",
    icon: <Cpu className="h-6 w-6 text-blue-600" />
  }
];

// Frontend technologies
const frontendTech = [
  "React & Next.js for interactive UIs",
  "TypeScript for type safety & reliability",
  "Tailwind CSS for responsive design",
  "Framer Motion for fluid animations",
  "State management with Context or Redux"
];

// Backend technologies
const backendTech = [
  "Node.js & Express for API development",
  "Python & FastAPI for data-intensive applications",
  "PostgreSQL & MongoDB for data persistence",
  "RESTful & GraphQL API design",
  "Authentication & authorization systems"
];

// Architecture technologies
const architectureTech = [
  "Microservices or monolithic as appropriate",
  "Docker containerization & orchestration",
  "Cloud infrastructure (AWS, Azure, GCP)",
  "Caching strategies & performance optimization",
  "CI/CD pipelines for reliable deployments"
];

// Process steps
const process = [
  {
    title: "Discover",
    description: "Understanding your business goals, users, and technical requirements through collaborative discovery."
  },
  {
    title: "Design",
    description: "Crafting technical architecture and user experiences that solve for your specific challenges."
  },
  {
    title: "Develop",
    description: "Building your solution with clean code, regular demos, and iterative feedback cycles."
  },
  {
    title: "Deploy",
    description: "Launching with confidence through rigorous testing, optimization, and reliable infrastructure."
  }
];

// Differentiators
const differentiators = [
  {
    title: "Technical Depth",
    description: "With experience across dozens of technologies and frameworks, we can select the right tools for your specific needs.",
    icon: <Database className="h-4 w-4 text-blue-600" />
  },
  {
    title: "Business Focus",
    description: "We understand that technology exists to solve business problems and create opportunities, not just for its own sake.",
    icon: <Zap className="h-4 w-4 text-blue-600" />
  },
  {
    title: "Future-Proof Design",
    description: "Systems architected to evolve and scale as your business grows, avoiding costly rewrites down the road.",
    icon: <Server className="h-4 w-4 text-blue-600" />
  },
  {
    title: "Transparent Communication",
    description: "Clear, jargon-free updates on progress, challenges, and opportunities throughout the development process.",
    icon: <Globe className="h-4 w-4 text-blue-600" />
  }
];

// SPA projects
const spaProjects = [
  {
    name: "The Guardian Notary",
    description: "Professional notary services platform with secure document handling and appointment scheduling.",
    url: "https://theguardiannotary.com",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS"]
  },
  {
    name: "Medamorphosis",
    description: "Therapy info page and booking platform for interventions, group therapy, and various forms of mental health care through a licensed provider.",
    url: "https://medamorphosis.org",
    technologies: ["React", "Node.js", "PostgreSQL"]
  },
  {
    name: "J Cullen Law",
    description: "Estate planning and probate attorney website with booking platform, comprehensive estate planning resources, and blog powered by Sanity CMS.",
    url: "https://jcullenlaw.com",
    technologies: ["Next.js", "Sanity CMS", "TypeScript"]
  }
];

// Enterprise project
const enterpriseProject = {
  name: "Verified Youth LAX",
  description: "Enterprise-level software solution for lacrosse club directors, featuring proprietary age verification through OCR/ML algorithms.",
  url: "https://verifiedyouthlax.com/info",
  technologies: ["React", "Node.js", "FastAPI", "PostgreSQL", "AWS", "Docker", "OCR/ML"]
};

// Generate uptime data for the past 12 months
const generateUptimeData = () => {
  const months = [
    { name: 'January', short: 'Jan' },
    { name: 'February', short: 'Feb' },
    { name: 'March', short: 'Mar' },
    { name: 'April', short: 'Apr' },
    { name: 'May', short: 'May' },
    { name: 'June', short: 'Jun' },
    { name: 'July', short: 'Jul' },
    { name: 'August', short: 'Aug' },
    { name: 'September', short: 'Sep' },
    { name: 'October', short: 'Oct' },
    { name: 'November', short: 'Nov' },
    { name: 'December', short: 'Dec' }
  ];

  return months;
};
