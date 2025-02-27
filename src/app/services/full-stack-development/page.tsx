'use client'

import { Inter, JetBrains_Mono } from 'next/font/google'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { ArrowRight, ChevronRight, Code, Cpu, Database, Globe, Server, Zap, CheckCircle, ExternalLink } from 'lucide-react'

const inter = Inter({ subsets: ['latin'] })
const jetbrains = JetBrains_Mono({ subsets: ['latin'] })

// Reused pattern from main page
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

export default function FullStackDevelopment() {
  const [playedHero, setPlayedHero] = useState(false)
  const [activeTab, setActiveTab] = useState<'frontend' | 'backend' | 'architecture'>('frontend')

  // Animation and reveal effects
  useEffect(() => {
    const timer = setTimeout(() => {
      setPlayedHero(true);
    }, 500);

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

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, []);

  return (
    <main className={`min-h-screen bg-black text-white flex flex-col ${inter.className}`}>
      {/* Global accent lines */}
      <div className="fixed top-0 left-0 w-4 h-screen bg-gradient-to-b from-blue-600/30 via-purple-600/30 to-transparent z-0" />
      <div className="fixed top-0 right-0 w-4 h-screen bg-gradient-to-b from-transparent via-purple-600/30 to-blue-600/30 z-0" />

      {/* Header/Navigation */}
      <header className="relative z-10 py-6 px-8 md:px-12 border-b border-white/10">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-3">
            <div className="h-8 w-8 rounded-md bg-gradient-to-br from-blue-600 to-purple-600"></div>
            <span className={`${jetbrains.className} text-lg font-medium tracking-tight hidden sm:block`}>HITCHCODE</span>
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-sm text-gray-400 hover:text-white transition-colors">Home</Link>
            <Link href="/services/full-stack-development" className="text-sm text-white font-medium">Services</Link>
            <Link href="/about" className="text-sm text-gray-400 hover:text-white transition-colors">About</Link>
            <Link href="/contact" className="text-sm text-gray-400 hover:text-white transition-colors">Contact</Link>
          </nav>

          <Link
            href="/contact"
            className="px-4 py-2 bg-white/10 hover:bg-white/15 text-white text-sm rounded-md backdrop-blur-sm transition-colors border border-white/10"
          >
            Get Started
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(30,41,59,0.4)_0,rgba(0,0,0,0)_65%)] z-0" />
        <div className="absolute inset-0 z-0 opacity-5 pointer-events-none">
          <div className="h-full w-full bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:80px_80px]" />
        </div>
        <HexPattern className="absolute inset-0 text-white opacity-5" />

        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-600/20 rounded-full filter blur-[100px]" />
        <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-purple-600/20 rounded-full filter blur-[100px]" />

        <div className="relative z-10 container mx-auto px-4 md:px-8">
          <div className={`max-w-4xl mx-auto transition-all duration-1000 ease-out ${playedHero ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 backdrop-blur-sm flex items-center justify-center mb-8">
                <Code className="h-8 w-8 text-blue-400" />
              </div>
            </div>

            <h1 className={`${jetbrains.className} text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-6`}>
              <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">Full-Stack Development</span>
            </h1>

            <p className="text-xl text-gray-300 text-center mb-10 max-w-3xl mx-auto leading-relaxed">
              Transforming complex ideas into elegant digital solutions—from concept to deployment and beyond.
            </p>

            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <span className="px-4 py-2 bg-blue-500/10 rounded-full text-sm text-blue-300 border border-blue-500/20">React/Next.js</span>
              <span className="px-4 py-2 bg-purple-500/10 rounded-full text-sm text-purple-300 border border-purple-500/20">Node.js</span>
              <span className="px-4 py-2 bg-pink-500/10 rounded-full text-sm text-pink-300 border border-pink-500/20">TypeScript</span>
              <span className="px-4 py-2 bg-blue-500/10 rounded-full text-sm text-blue-300 border border-blue-500/20">Modern APIs</span>
            </div>
          </div>
        </div>
      </section>

      {/* Value Proposition Section */}
      <section className="relative py-16 md:py-24 border-t border-white/5">
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="mb-16 text-center reveal-item opacity-0 transition-all duration-1000 translate-y-8">
              <h2 className={`${jetbrains.className} text-3xl md:text-4xl font-bold mb-6`}>
                <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">Why Choose Custom Development?</span>
              </h2>
              <p className="text-gray-400 text-lg">
                Off-the-shelf solutions often force your business to adapt to their limitations. Custom development puts <span className="text-white">your needs first</span>.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
              {valueProps.map((prop, i) => (
                <div
                  key={i}
                  className="reveal-item opacity-0 transition-all duration-700 translate-y-8"
                  style={{ transitionDelay: `${200 + i * 100}ms` }}
                >
                  <div className="flex flex-col h-full">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center mb-5">
                      {prop.icon}
                    </div>
                    <h3 className="text-xl font-medium mb-3">{prop.title}</h3>
                    <p className="text-gray-400 text-sm md:text-base mb-4 flex-grow">{prop.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Approach Section with Tabs */}
      <section className="relative py-16 md:py-24 border-t border-white/5 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(30,64,175,0.15),transparent_50%)] z-0" />

        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="mb-16 text-center reveal-item opacity-0 transition-all duration-1000 translate-y-8">
              <h2 className={`${jetbrains.className} text-3xl md:text-4xl font-bold mb-6`}>
                <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">Our Technical Approach</span>
              </h2>
              <p className="text-gray-400 text-lg mb-10">
                We deliver excellence at every layer of the technology stack
              </p>

              <div className="inline-flex items-center rounded-lg p-1 bg-white/5 backdrop-blur-sm border border-white/10">
                <button
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 ${activeTab === 'frontend' ? 'bg-white/10 text-white' : 'text-gray-400 hover:text-white'}`}
                  onClick={() => setActiveTab('frontend')}
                >
                  Frontend
                </button>
                <button
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 ${activeTab === 'backend' ? 'bg-white/10 text-white' : 'text-gray-400 hover:text-white'}`}
                  onClick={() => setActiveTab('backend')}
                >
                  Backend
                </button>
                <button
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 ${activeTab === 'architecture' ? 'bg-white/10 text-white' : 'text-gray-400 hover:text-white'}`}
                  onClick={() => setActiveTab('architecture')}
                >
                  Architecture
                </button>
              </div>
            </div>

            <div className="mb-12 min-h-[320px]">
              {activeTab === 'frontend' && (
                <div className="bg-gradient-to-br from-gray-900/50 to-gray-800/30 backdrop-blur-sm rounded-xl border border-white/10 p-6 md:p-8 transition-all duration-500">
                  <div className="flex flex-col md:flex-row gap-8 items-start">
                    <div className="md:w-1/3 flex justify-center mb-6 md:mb-0">
                      <div className="w-32 h-32 rounded-xl bg-blue-500/10 flex items-center justify-center">
                        <Globe className="h-16 w-16 text-blue-400" />
                      </div>
                    </div>
                    <div className="md:w-2/3">
                      <h3 className="text-xl font-medium mb-4">Intuitive User Experiences</h3>
                      <p className="text-gray-400 mb-5">
                        We craft performant, responsive interfaces that captivate users and enhance engagement. Using modern frontend technologies, we build experiences that adapt seamlessly across devices.
                      </p>
                      <ul className="space-y-2">
                        {frontendTech.map((tech, i) => (
                          <li key={i} className="flex items-center text-sm">
                            <CheckCircle className="h-4 w-4 text-blue-400 mr-2" />
                            <span>{tech}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'backend' && (
                <div className="bg-gradient-to-br from-gray-900/50 to-gray-800/30 backdrop-blur-sm rounded-xl border border-white/10 p-6 md:p-8 transition-all duration-500">
                  <div className="flex flex-col md:flex-row gap-8 items-start">
                    <div className="md:w-1/3 flex justify-center mb-6 md:mb-0">
                      <div className="w-32 h-32 rounded-xl bg-purple-500/10 flex items-center justify-center">
                        <Server className="h-16 w-16 text-purple-400" />
                      </div>
                    </div>
                    <div className="md:w-2/3">
                      <h3 className="text-xl font-medium mb-4">Robust & Scalable Systems</h3>
                      <p className="text-gray-400 mb-5">
                        Our backend solutions provide secure, high-performance foundations that support your growing business needs with flexibility and reliability.
                      </p>
                      <ul className="space-y-2">
                        {backendTech.map((tech, i) => (
                          <li key={i} className="flex items-center text-sm">
                            <CheckCircle className="h-4 w-4 text-purple-400 mr-2" />
                            <span>{tech}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'architecture' && (
                <div className="bg-gradient-to-br from-gray-900/50 to-gray-800/30 backdrop-blur-sm rounded-xl border border-white/10 p-6 md:p-8 transition-all duration-500">
                  <div className="flex flex-col md:flex-row gap-8 items-start">
                    <div className="md:w-1/3 flex justify-center mb-6 md:mb-0">
                      <div className="w-32 h-32 rounded-xl bg-pink-500/10 flex items-center justify-center">
                        <Database className="h-16 w-16 text-pink-400" />
                      </div>
                    </div>
                    <div className="md:w-2/3">
                      <h3 className="text-xl font-medium mb-4">Future-Proof Architecture</h3>
                      <p className="text-gray-400 mb-5">
                        We design systems that anticipate growth and change, employing cloud-native practices, microservices when appropriate, and scalable infrastructure.
                      </p>
                      <ul className="space-y-2">
                        {architectureTech.map((tech, i) => (
                          <li key={i} className="flex items-center text-sm">
                            <CheckCircle className="h-4 w-4 text-pink-400 mr-2" />
                            <span>{tech}</span>
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
      <section className="relative py-16 md:py-24 border-t border-white/5">
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="mb-16 text-center reveal-item opacity-0 transition-all duration-1000 translate-y-8">
              <h2 className={`${jetbrains.className} text-3xl md:text-4xl font-bold mb-6`}>
                <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">Development Process</span>
              </h2>
              <p className="text-gray-400 text-lg">
                A methodical approach ensures we deliver exceptional results on time
              </p>
            </div>

            <div className="space-y-8 md:space-y-0 md:grid md:grid-cols-2 lg:grid-cols-4 md:gap-x-8 md:gap-y-10">
              {process.map((step, i) => (
                <div
                  key={i}
                  className="reveal-item opacity-0 transition-all duration-700 translate-y-8"
                  style={{ transitionDelay: `${200 + i * 100}ms` }}
                >
                  <div className="relative">
                    <div className="flex flex-col items-center text-center">
                      <div className="w-16 h-16 rounded-xl flex items-center justify-center bg-blue-500/10 mb-4 relative">
                        <span className={`${jetbrains.className} text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent`}>
                          {i + 1}
                        </span>
                        {i < process.length - 1 && (
                          <div className="hidden lg:block absolute left-full top-1/2 w-full h-0.5 bg-gradient-to-r from-blue-500/50 to-transparent transform -translate-y-1/2" />
                        )}
                      </div>
                      <h3 className="text-lg font-medium mb-2">{step.title}</h3>
                      <p className="text-gray-400 text-sm">{step.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Project Spotlight */}
      <section className="relative py-16 md:py-24 border-t border-white/5">
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="mb-16 text-center reveal-item opacity-0 transition-all duration-1000 translate-y-8">
              <h2 className={`${jetbrains.className} text-3xl md:text-4xl font-bold mb-6`}>
                <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">What Sets Us Apart</span>
              </h2>
            </div>

            <div className="bg-gradient-to-br from-gray-900/50 to-gray-800/30 backdrop-blur-sm rounded-xl border border-white/10 p-6 md:p-8 reveal-item opacity-0 transition-all duration-700 translate-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {differentiators.map((diff, i) => (
                  <div key={i} className="flex flex-col">
                    <div className="flex items-start mb-3">
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center mr-4 mt-1">
                        {diff.icon}
                      </div>
                      <h3 className="text-lg font-medium">{diff.title}</h3>
                    </div>
                    <p className="text-gray-400 text-sm pl-12">{diff.description}</p>
                  </div>
                ))}
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

        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center reveal-item opacity-0 transition-all duration-1000 translate-y-8">
            <h2 className={`${jetbrains.className} text-3xl md:text-4xl font-bold mb-6`}>
              Ready to Bring Your Vision to Life?
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-10">
              Every great digital product begins with a conversation. Let's discuss how we can transform your ideas into reality with precision engineering and thoughtful design.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link
                href="/contact"
                className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white rounded-md font-medium transition-all duration-300 min-w-[180px]"
              >
                Start a Project
              </Link>
              <Link
                href="/"
                className="inline-flex items-center text-gray-300 hover:text-white group transition-colors"
              >
                <span>Return to Home</span>
                <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-8 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center">
          <Link href="/" className="flex items-center space-x-3 mb-4 md:mb-0">
            <div className="h-6 w-6 rounded-md bg-gradient-to-br from-blue-600 to-purple-600"></div>
            <span className={`${jetbrains.className} text-sm font-medium tracking-wide`}>HITCHCODE</span>
          </Link>

          <nav className="flex items-center space-x-8 mb-4 md:mb-0">
            <Link href="/" className="text-xs text-gray-400 hover:text-white transition-colors">Home</Link>
            <Link href="/services/full-stack-development" className="text-xs text-gray-400 hover:text-white transition-colors">Services</Link>
            <Link href="/about" className="text-xs text-gray-400 hover:text-white transition-colors">About</Link>
            <Link href="/contact" className="text-xs text-gray-400 hover:text-white transition-colors">Contact</Link>
          </nav>

          <div className="text-xs text-gray-500">
            &copy; {new Date().getFullYear()} HitchCode. All rights reserved.
          </div>
        </div>
      </footer>

      {/* CSS animations */}
      <style jsx global>{`
        .revealed {
          opacity: 1 !important;
          transform: translateY(0) !important;
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
    icon: <Zap className="h-6 w-6 text-blue-400" />
  },
  {
    title: "Technical Excellence",
    description: "Clean, maintainable code that's built to evolve with your business, using battle-tested patterns and industry best practices.",
    icon: <Code className="h-6 w-6 text-purple-400" />
  },
  {
    title: "Business Impact",
    description: "Technology that directly contributes to your core metrics, whether that's user growth, operational efficiency, or revenue generation.",
    icon: <Cpu className="h-6 w-6 text-pink-400" />
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
    icon: <Database className="h-4 w-4 text-blue-400" />
  },
  {
    title: "Business Focus",
    description: "We understand that technology exists to solve business problems and create opportunities, not just for its own sake.",
    icon: <Zap className="h-4 w-4 text-purple-400" />
  },
  {
    title: "Future-Proof Design",
    description: "Systems architected to evolve and scale as your business grows, avoiding costly rewrites down the road.",
    icon: <Server className="h-4 w-4 text-blue-400" />
  },
  {
    title: "Transparent Communication",
    description: "Clear, jargon-free updates on progress, challenges, and opportunities throughout the development process.",
    icon: <Globe className="h-4 w-4 text-purple-400" />
  }
];
