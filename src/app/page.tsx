'use client'
import { Inter, JetBrains_Mono } from 'next/font/google'
import Link from 'next/link'
import { useEffect, useState, useRef } from 'react'

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

export default function Home() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)

  useEffect(() => {
    document.querySelectorAll('.reveal-on-scroll').forEach(el => {
      el.classList.add('will-animate')
    })

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
          }
        })
      },
      {
        threshold: 0.1,
        rootMargin: '50px'
      }
    )

    document.querySelectorAll('.reveal-on-scroll').forEach(el => {
      observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <main className="flex min-h-screen flex-col bg-white">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center bg-white">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#000000_1px,transparent_1px),linear-gradient(to_bottom,#000000_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
        <div className="relative z-10 container mx-auto px-4">
          <h1 className={`${jetbrains.className} text-6xl md:text-8xl font-bold text-black mb-6 hero-reveal`} style={{"--reveal-index": 0} as any}>
            HITCHCODE
          </h1>
          <p className="text-xl md:text-2xl text-black max-w-2xl mx-auto text-center mb-8 hero-reveal" style={{"--reveal-index": 1} as any}>
            Cutting-edge software solutions with precision and elegance.
          </p>
        </div>
      </section>

      {/* Vision Section */}
      <section className="relative py-32 bg-white overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#000000_1px,transparent_1px),linear-gradient(to_bottom,#000000_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-[0.015]" />
        <div className="absolute -inset-x-40 inset-y-0">
          <div className="absolute left-1/2 top-0 h-[800px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-tr from-black/[0.07] to-black/[0.01] blur-3xl" />
        </div>
        <div className="relative container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              <div className="absolute -inset-x-1 -inset-y-2">
                <div className="w-full h-full mx-auto rotate-180 opacity-30 blur-2xl">
                  <div className="aspect-w-16 aspect-h-7 bg-gradient-to-tr from-black/[0.07] to-black/[0.01]" />
                </div>
              </div>
              <p className="relative text-2xl md:text-3xl text-black font-light text-center leading-relaxed reveal-on-scroll">
                In a world of constantly evolving tech, there's an opportunity to put your business at the{' '}
                <span className="font-semibold">head of the pack</span>.{' '}
                <span className="font-semibold">Don't leave anything on the table.</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="relative py-24 bg-gray-50">
        <div className="relative z-10 container mx-auto px-4">
          <h2 className={`${jetbrains.className} text-4xl font-bold text-center text-black mb-16 reveal-on-scroll`}>
            Full-Stack Excellence
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className={`group p-10 bg-white rounded-xl border border-black/5 shadow-[0_8px_30px_rgb(0,0,0,0.04)] text-black reveal-on-scroll stagger-reveal will-change-transform`}
                style={{"--stagger-index": index} as any}
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div
                  className="relative transition-[transform,box-shadow] duration-200 ease-out group-hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] group-hover:scale-[1.01] group-hover:border-black/10"
                >
                  <div className="mb-8 relative w-20 h-20">
                    <div className="absolute inset-0 bg-gradient-to-tr from-black/[0.08] to-black/[0.01] blur-2xl rounded-full"></div>
                    {hoveredCard === index ? <AnimatedIcon /> : <StillIcon />}
                  </div>
                  <h3 className="text-xl font-semibold mb-4 tracking-tight">{service.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{service.description}</p>
                  <div className="mt-8 flex items-center text-sm font-medium text-black/80 tracking-wide">
                    <Link href={service.href} className="group/button flex items-center hover:text-black transition-colors">
                      <span>Learn more</span>
                      <svg className="w-4 h-4 ml-2 transition-transform duration-500 group-hover/button:translate-x-1.5" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 8H15M15 8L8 1M15 8L8 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="relative py-24 bg-black text-white">
        <div className="relative z-10 container mx-auto px-4 text-center">
          <h2 className={`${jetbrains.className} text-4xl font-bold mb-8 reveal-on-scroll`}>
            Ready to Transform Your Ideas?
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto mb-8 reveal-on-scroll stagger-reveal" style={{"--stagger-index": 1} as any}>
            Let's collaborate to build something extraordinary. From concept to deployment,
            we're here to bring your vision to life.
          </p>
          <Link
            href="/contact"
            className="inline-block bg-white text-black px-8 py-3 rounded-md hover:bg-gray-100 transition-colors reveal-on-scroll stagger-reveal"
            style={{"--stagger-index": 2} as any}
          >
            Contact Us
          </Link>
        </div>
      </section>
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
