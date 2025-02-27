'use client'
import { Inter, JetBrains_Mono } from 'next/font/google'
import Link from 'next/link'
import { useEffect, useState, useRef } from 'react'
import { ArrowRight, ChevronRight, Code, Cpu, Layers, Command, ExternalLink } from 'lucide-react'

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

      {/* Header/Navigation */}
      <header className="relative z-10 py-6 px-8 md:px-12 border-b border-white/10">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="h-8 w-8 rounded-md bg-gradient-to-br from-blue-600 to-purple-600"></div>
            <span className={`${jetbrains.className} text-lg font-medium tracking-tight hidden sm:block`}>HITCHCODE</span>
          </div>

          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-sm text-white font-medium">Home</Link>
            <Link href="/services/full-stack-development" className="text-sm text-gray-400 hover:text-white transition-colors">Services</Link>
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
      <section className="relative min-h-[calc(100vh-74px)] flex items-center justify-center py-20 md:py-32 overflow-hidden">
        {/* Background pattern with improved mobile performance */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(30,41,59,0.4)_0,rgba(0,0,0,0)_65%)] z-0" />
        <div className="absolute inset-0 z-0 opacity-10 pointer-events-none">
          <div className="h-full w-full bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:80px_80px]" />
        </div>
        <HexPattern className="absolute inset-0 text-white opacity-5" />

        <div className="absolute -top-40 -left-40 w-80 h-80 bg-blue-600/20 rounded-full filter blur-[100px]" />
        <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-purple-600/20 rounded-full filter blur-[100px]" />

        <div className="relative z-10 container mx-auto px-4 text-center">
          <div className={`transform transition-all duration-1000 ease-out ${playedHero ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
            <h1 className={`text-4xl sm:text-6xl md:text-7xl font-bold ${jetbrains.className} mb-6 tracking-tight`}>
              <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent inline-block">HITCHCODE</span>
            </h1>

            <p className="text-lg md:text-xl text-gray-300 max-w-xl mx-auto mb-10 leading-relaxed">
              Architecting cutting-edge software solutions with precision,
              innovation, and a relentless focus on quality.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
              <Link
                href="/contact"
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white rounded-md font-medium transition-all duration-300 min-w-[160px] text-center"
              >
                Start a Project
              </Link>
              <Link
                href="/services/full-stack-development"
                className="px-6 py-3 bg-white/5 border border-white/10 hover:bg-white/10 rounded-md font-medium transition-colors min-w-[160px] text-center group"
              >
                <span className="inline-flex items-center">
                  Explore Services
                  <ChevronRight className="h-4 w-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </Link>
            </div>
          </div>

          <div className="hidden md:block pt-12">
            <div className={`relative h-20 w-full backdrop-blur-sm ${playedHero ? 'opacity-60' : 'opacity-0'} transition-opacity duration-1000 delay-500`}>
              <svg className="max-w-full h-full mx-auto" width="480" height="48" viewBox="0 0 480 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 24H479M358 1L479 24L358 47M122 1L1 24L122 47" stroke="currentColor" strokeOpacity="0.3" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
                <rect x="204" y="14" width="72" height="20" rx="4" fill="currentColor" fillOpacity="0.05" stroke="currentColor" strokeOpacity="0.25" strokeWidth="1"/>
                <text x="240" y="28" textAnchor="middle" className="text-xs fill-current" fillOpacity="0.7" fontFamily="monospace">CODE</text>
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* Vision/Core Intro Section */}
      <section className="relative py-16 md:py-24 border-t border-white/10">
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <div className="relative reveal-item opacity-0 transition-all duration-1000 translate-y-8" style={{ transitionDelay: '100ms' }}>
              <div className="absolute -top-6 left-0 w-12 h-12 rounded-full bg-blue-500/10 blur-xl" />
              <div className="absolute top-8 right-20 w-20 h-20 rounded-full bg-purple-500/10 blur-xl" />

              <h2 className={`${jetbrains.className} text-3xl md:text-4xl font-bold text-center relative z-10 mb-8`}>
                <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">Development Redefined</span>
              </h2>

              <p className="text-gray-300 text-lg md:text-xl text-center leading-relaxed mb-8">
                In a world of constantly evolving tech, there's an opportunity to put your business at the{' '}
                <span className="text-white font-medium">head of the pack</span>.{' '}
                Don't leave anything on the table.
              </p>

              <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto" />
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="relative py-16 md:py-24">
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-12 md:mb-20 reveal-item opacity-0 transition-all duration-1000 translate-y-8" style={{ transitionDelay: '200ms' }}>
            <h2 className={`${jetbrains.className} text-3xl md:text-4xl font-bold mb-6`}>
              <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">Full-Stack Excellence</span>
            </h2>
            <p className="text-gray-400 text-lg">
              Comprehensive software solutions tailored to your specific needs
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="reveal-item opacity-0 transition-all duration-700 translate-y-8 group"
                style={{ transitionDelay: `${300 + index * 100}ms` }}
                onMouseEnter={() => setActiveService(index)}
                onMouseLeave={() => setActiveService(null)}
              >
                <div className={`h-full p-6 bg-gradient-to-br from-gray-900/50 to-gray-800/30 backdrop-blur-sm rounded-xl border ${activeService === index ? 'border-white/20' : 'border-white/10'} shadow-xl transition-all duration-300 flex flex-col hover:translate-y-[-4px]`}>
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-5 ${index === 0 ? 'bg-blue-500/10' : index === 1 ? 'bg-purple-500/10' : 'bg-pink-500/10'}`}>
                    {index === 0 && <Layers className="h-6 w-6 text-blue-400" />}
                    {index === 1 && <Cpu className="h-6 w-6 text-purple-400" />}
                    {index === 2 && <Command className="h-6 w-6 text-pink-400" />}
                  </div>

                  <h3 className="text-lg md:text-xl font-medium mb-3">{service.title}</h3>
                  <p className="text-gray-400 text-sm md:text-base mb-6 flex-grow">{service.description}</p>

                  <Link
                    href={service.href}
                    className="inline-flex items-center text-sm text-gray-300 hover:text-white group/link transition-colors"
                  >
                    <span>Learn more</span>
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover/link:translate-x-1" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="relative py-16 md:py-24 border-t border-white/10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(30,41,59,0.4)_0,rgba(0,0,0,0)_50%)] z-0" />

        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16 reveal-item opacity-0 transition-all duration-1000 translate-y-8" style={{ transitionDelay: '200ms' }}>
            <h2 className={`${jetbrains.className} text-3xl md:text-4xl font-bold mb-6`}>
              <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">How We Work</span>
            </h2>
            <p className="text-gray-400 text-lg">
              A systematic approach to delivering exceptional software solutions
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {workflow.map((step, index) => (
              <div
                key={index}
                className="reveal-item opacity-0 transition-all duration-700 translate-y-8"
                style={{ transitionDelay: `${300 + index * 100}ms` }}
              >
                <div className="relative">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-16 h-16 rounded-xl flex items-center justify-center bg-blue-500/10 mb-4 relative">
                      <span className={`${jetbrains.className} text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent`}>
                        {index + 1}
                      </span>
                      {index < workflow.length - 1 && (
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
              Ready to Transform Your Ideas?
            </h2>
            <p className="text-gray-400 text-lg mb-10 max-w-2xl mx-auto">
              Let's collaborate to build something extraordinary. From concept to deployment,
              we're here to bring your vision to life with precision and innovation.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link
                href="/contact"
                className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white rounded-md font-medium transition-all duration-300 min-w-[180px]"
              >
                Contact Us
              </Link>
              <Link
                href="/greeting"
                className="inline-flex items-center text-gray-300 hover:text-white group transition-colors"
              >
                <span>View Digital Business Card</span>
                <ExternalLink className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-8 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-3 mb-4 md:mb-0">
            <div className="h-6 w-6 rounded-md bg-gradient-to-br from-blue-600 to-purple-600"></div>
            <span className={`${jetbrains.className} text-sm font-medium tracking-wide`}>HITCHCODE</span>
          </div>

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

        @keyframes pulse {
          0%, 100% {
            opacity: 0.5;
          }
          50% {
            opacity: 1;
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
    title: "System Refinement",
    description: "Elevating existing systems to peak performance. Modernizing architecture, optimizing speed, and enhancing reliability of what exists already.",
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
