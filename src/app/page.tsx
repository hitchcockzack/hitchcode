'use client'
import { Inter, JetBrains_Mono } from 'next/font/google'
import Link from 'next/link'
import { useEffect, useState, useRef } from 'react'

const inter = Inter({ subsets: ['latin'] })
const jetbrains = JetBrains_Mono({ subsets: ['latin'] })

export default function Home() {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)

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

  if (!isMounted) return null

  return (
    <main className="flex min-h-screen flex-col bg-white">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center bg-white">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#000000_1px,transparent_1px),linear-gradient(to_bottom,#000000_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
        <div className="relative z-10 container mx-auto px-4">
          <h1 className={`${jetbrains.className} text-6xl md:text-8xl font-bold text-black mb-6 hero-reveal`} style={{"--reveal-index": 0} as any}>
            HITCHCODE
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 max-w-2xl mx-auto text-center mb-8 hero-reveal" style={{"--reveal-index": 1} as any}>
            Crafting cutting-edge software solutions with precision and elegance.
          </p>
          <div className="flex justify-center gap-4 hero-reveal" style={{"--reveal-index": 2} as any}>
            <Link
              href="/contact"
              className="bg-black text-white px-8 py-3 rounded-md hover:bg-gray-800 transition-colors"
            >
              Get Started
            </Link>
            <Link
              href="/services"
              className="border border-black px-8 py-3 rounded-md hover:bg-gray-50 text-black transition-colors"
            >
              Our Services
            </Link>
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
                className={`group p-8 bg-white rounded-lg border border-black/10 shadow-lg transition-all duration-300 text-black reveal-on-scroll stagger-reveal hover:shadow-xl ${index === 0 ? 'hover:scale-[1.02] hover:border-black' : ''}`}
                style={{"--stagger-index": index} as any}
              >
                {service.icon}
                <h3 className="text-xl font-semibold mb-4">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
                {index === 0 && (
                  <div className="mt-6 flex items-center text-sm font-medium text-black/70">
                    <span>Learn more</span>
                    <svg className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1 8H15M15 8L8 1M15 8L8 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                )}
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
    title: "Full Lifecycle App Development",
    description: "From concept to deployment, we architect and build complete digital solutions that scale. Our expertise spans the entire development lifecycle, ensuring your vision becomes reality.",
    icon: (
      <div className="mb-6 relative">
        <div className="absolute inset-0 bg-black/5 blur-2xl rounded-full"></div>
        <svg
          className="w-16 h-16 relative"
          viewBox="0 0 64 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Background circle */}
          <circle
            cx="32"
            cy="32"
            r="30"
            className="stroke-black/10"
            strokeWidth="0.5"
          />

          {/* Rotating container */}
          <g className="origin-center animate-[rotate_12s_linear_infinite]">
            {/* Wave patterns */}
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <path
                key={i}
                className={`animate-[wave_2s_ease-in-out_infinite] animate-[fade-wave_4s_ease-in-out_infinite]`}
                style={{
                  animationDelay: `${i * -0.3}s`,
                  transform: `rotate(${i * 30}deg)`,
                  transformOrigin: 'center'
                }}
                stroke="black"
                strokeWidth="1"
                fill="none"
                d="M0,32 C8,24 24,40 32,32 C40,24 56,40 64,32"
              />
            ))}
          </g>
        </svg>
      </div>
    )
  },
  {
    title: "Backend Architecture",
    description: "Building robust, scalable server-side solutions and APIs that power your applications."
  },
  {
    title: "Full-Stack Solutions",
    description: "End-to-end development services, from database design to deployment and maintenance."
  }
]
