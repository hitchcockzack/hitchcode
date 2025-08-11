'use client'

import { useState, FormEvent, useEffect } from 'react'
import Link from 'next/link'
import { Inter } from 'next/font/google'
import { BlurFade } from '../../components/magicui/blur-fade'
import { ShineBorder } from '../../components/magicui/shine-border'
import { MagicCard } from '../../components/magicui/magic-card'
import { BorderBeam } from '../../components/magicui/border-beam'
import { Send, ArrowRight, Mail, Linkedin, Phone, CheckCircle, Clock, Users, Zap, Check } from 'lucide-react'

const inter = Inter({ subsets: ['latin'] })

// Scroll reveal hook for smooth animations (matches other pages)
const useScrollReveal = () => {
  useEffect(() => {
    const observerOptions = { root: null, rootMargin: '0px 0px -80px 0px', threshold: 0.1 }
    const handleIntersect = (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in')
          observer.unobserve(entry.target)
        }
      })
    }
    const observer = new IntersectionObserver(handleIntersect, observerOptions)
    document.querySelectorAll('.reveal-on-scroll').forEach(item => observer.observe(item))
    return () => observer.disconnect()
  }, [])
}

export default function ContactPage() {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [wantsCall, setWantsCall] = useState(false)
  const [formState, setFormState] = useState({ name: '', email: '', phone: '', message: '' })
  const [formErrors, setFormErrors] = useState<Record<string, string>>({})

  useScrollReveal()

  const validateForm = () => {
    const errors: Record<string, string> = {}
    if (!formState.name.trim()) errors.name = 'Name is required'
    if (!formState.email.trim()) {
      errors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formState.email)) {
      errors.email = 'Please enter a valid email'
    }
    if (!formState.message.trim()) errors.message = 'Message is required'
    if (wantsCall) {
      const phone = formState.phone.trim()
      if (!phone) {
        errors.phone = 'Phone is required'
      } else if (!/^[+()\-\.\s\d]{7,}$/.test(phone)) {
        errors.phone = 'Please enter a valid phone number'
      }
    }
    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!validateForm()) return
    setIsSubmitting(true)
    const form = event.target as HTMLFormElement
    const formData = new FormData(form)
    try {
      const response = await fetch('https://formspree.io/f/xeojpvbo', {
        method: 'POST',
        body: formData,
        headers: { Accept: 'application/json' },
      })
      if (response.ok) {
        // Fire Pushover notification
        try {
          const notifyMessage = `New contact from ${formState.name} (${formState.email})${wantsCall && formState.phone ? `\nPrefers a call: ${formState.phone}` : ''}\n\nMessage:\n${formState.message}`
          await fetch('/api/notify', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: notifyMessage }),
          })
        } catch (e) {
          console.warn('Notification failed', e)
        }
        setIsSubmitted(true)
        setFormState({ name: '', email: '', phone: '', message: '' })
        setWantsCall(false)
      } else {
        console.error('Form submission failed')
      }
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormState(prev => ({ ...prev, [name]: value }))
    if (formErrors[name]) {
      setFormErrors(prev => {
        const next = { ...prev }
        delete next[name]
        return next
      })
    }
  }

  return (
    <main className={`min-h-screen bg-black text-zinc-300 ${inter.className}`}>
      {/* Hero – understated, premium, no background distractions */}
      <section className="relative py-16 md:py-24">
        <div className="container mx-auto px-6 md:px-10">
          <div className="max-w-4xl mx-auto text-center">
            <BlurFade inView>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-sm mb-4">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Available for new projects
              </div>
            </BlurFade>
            <BlurFade delay={0.08} inView>
              <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter leading-[1.07] bg-clip-text text-transparent bg-gradient-to-b from-zinc-100 to-zinc-500 drop-shadow-[0_0_18px_rgba(0,0,0,0.6)] mb-3">
                Start the Conversation
              </h1>
            </BlurFade>
            <BlurFade delay={0.14} inView>
              <p className="text-lg md:text-2xl text-zinc-300 leading-relaxed max-w-3xl mx-auto">
                Share your goals and friction points. I’ll reply within 24 hours with next steps.
              </p>
            </BlurFade>
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
              {[{ Icon: Clock, label: '24h Response' }, { Icon: Users, label: 'CTO‑level Guidance' }, { Icon: Zap, label: 'Outcome‑Focused' }].map(({ Icon, label }, i) => (
                <BlurFade key={label} delay={0.18 + i * 0.06} inView>
                  <div className="rounded-2xl bg-zinc-900/60 border border-zinc-800 px-4 py-3 flex items-center justify-center gap-2">
                    <Icon className="h-5 w-5 text-blue-400" />
                    <span className="text-sm text-zinc-200">{label}</span>
                  </div>
                </BlurFade>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section – dark cards */}
      <section className="relative py-16 md:py-24 border-t border-zinc-800">
        <div className="container mx-auto px-6 md:px-10">
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-10">
            {/* Form */}
            <div className="lg:col-span-2">
              <div className="reveal-on-scroll opacity-0 translate-y-8 transition-all duration-700">
                <div className="relative overflow-hidden rounded-2xl bg-zinc-950/60 border border-zinc-800 p-0">
                  <ShineBorder borderWidth={1} duration={16} shineColor={["#2563eb", "#a21caf", "#60a5fa"]} className="opacity-[0.28]" />
                  <MagicCard className="rounded-2xl p-6 md:p-8">
                  <div className="mb-6">
                    <h2 className="text-2xl md:text-3xl font-bold text-zinc-100 tracking-tight">Send a Message</h2>
                    <p className="text-zinc-400 mt-2">Tell me about your project, challenges, or questions.</p>
                  </div>

                  {!isSubmitted ? (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div>
                          <label htmlFor="name" className="block text-sm font-medium text-zinc-300 mb-2">Name *</label>
                          <input
                            type="text"
                            id="name"
                            name="name"
                            value={formState.name}
                            onChange={handleInputChange}
                            className={`w-full px-4 py-3 rounded-lg bg-zinc-950/80 border text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${formErrors.name ? 'border-red-500/60 bg-red-950/20' : 'border-zinc-800 hover:border-zinc-700'}`}
                            placeholder="Your name"
                          />
                          {formErrors.name && <p className="mt-1 text-sm text-red-400">{formErrors.name}</p>}
                        </div>
                        <div>
                          <label htmlFor="email" className="block text-sm font-medium text-zinc-300 mb-2">Email *</label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            value={formState.email}
                            onChange={handleInputChange}
                            className={`w-full px-4 py-3 rounded-lg bg-zinc-950/80 border text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${formErrors.email ? 'border-red-500/60 bg-red-950/20' : 'border-zinc-800 hover:border-zinc-700'}`}
                            placeholder="your@email.com"
                          />
                          {formErrors.email && <p className="mt-1 text-sm text-red-400">{formErrors.email}</p>}
                        </div>
                      </div>

                      {/* Prefer a call toggle */}
                      <div className="space-y-3">
                        <button
                          type="button"
                          onClick={() => setWantsCall((v) => !v)}
                          className="inline-flex items-center gap-2 rounded-md border border-zinc-800 bg-zinc-950/60 px-3 py-2 text-sm text-zinc-200 hover:border-zinc-700"
                          aria-pressed={wantsCall}
                        >
                          <Phone className="h-4 w-4 text-blue-400" />
                          <span>Prefer a call?</span>
                          {wantsCall && <Check className="h-4 w-4 text-emerald-400" aria-hidden />}
                        </button>
                        {wantsCall && (
                          <BlurFade inView>
                            <div className="w-full">
                              <label htmlFor="phone" className="block text-sm font-medium text-zinc-300 mb-2">Phone *</label>
                              <input
                                type="tel"
                                id="phone"
                                name="phone"
                                value={formState.phone}
                                onChange={handleInputChange}
                                className={`w-full px-4 py-3 rounded-lg bg-zinc-950/80 border text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${formErrors.phone ? 'border-red-500/60 bg-red-950/20' : 'border-zinc-800 hover:border-zinc-700'}`}
                                placeholder="Your phone number"
                              />
                              {formErrors.phone && <p className="mt-1 text-sm text-red-400">{formErrors.phone}</p>}
                            </div>
                          </BlurFade>
                        )}
                      </div>

                      <div>
                        <label htmlFor="message" className="block text-sm font-medium text-zinc-300 mb-2">Message *</label>
                        <textarea
                          id="message"
                          name="message"
                          value={formState.message}
                          onChange={handleInputChange}
                          rows={6}
                          className={`w-full px-4 py-3 rounded-lg bg-zinc-950/80 border text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none ${formErrors.message ? 'border-red-500/60 bg-red-950/20' : 'border-zinc-800 hover:border-zinc-700'}`}
                          placeholder="Share context, goals, and any constraints."
                        />
                        {formErrors.message && <p className="mt-1 text-sm text-red-400">{formErrors.message}</p>}
                      </div>

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full md:w-auto relative inline-flex items-center justify-center rounded-lg group disabled:opacity-70 px-0"
                      >
                        <span className="relative inline-flex items-center justify-center p-[3px] rounded-lg">
                          <span className="absolute inset-0 rounded-lg bg-gradient-to-r from-[#2563eb] to-[#a21caf]" />
                          <span className="px-6 md:px-7 py-3 md:py-3.5 bg-black rounded-lg text-white text-sm md:text-base font-semibold relative transition-colors duration-200 group-hover:bg-transparent flex items-center">
                          {isSubmitting ? (
                            <>
                              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                              </svg>
                              Sending...
                            </>
                          ) : (
                            <>
                              Send Message
                              <Send className="ml-2 h-4 w-4" />
                            </>
                          )}
                          </span>
                          <BorderBeam size={140} duration={8} className="via-white/40" />
                        </span>
                      </button>
                    </form>
                  ) : (
                    <div className="text-center py-12">
                      <div className="w-16 h-16 bg-emerald-500/10 border border-emerald-500/30 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle className="h-8 w-8 text-emerald-400" />
                      </div>
                      <h3 className="text-xl font-semibold text-zinc-100 mb-2">Message Sent</h3>
                      <p className="text-zinc-400 mb-6">
                        Thanks for reaching out. I’ll respond within 24 hours with next steps.
                      </p>
                      <button
                        onClick={() => setIsSubmitted(false)}
                        className="px-6 py-2 rounded-lg bg-zinc-900/60 border border-zinc-800 text-zinc-200 hover:border-zinc-700 transition-colors"
                      >
                        Send Another Message
                      </button>
                    </div>
                  )}
                  </MagicCard>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              <div className="reveal-on-scroll opacity-0 translate-y-8 transition-all duration-700" style={{ transitionDelay: '100ms' }}>
                <div className="rounded-2xl bg-zinc-950/60 border border-zinc-800 p-6">
                  <h3 className="text-lg font-semibold text-zinc-100 mb-4">Get in Touch</h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-lg bg-blue-600/10 border border-blue-500/20 flex items-center justify-center">
                        <Mail className="h-5 w-5 text-blue-400" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-zinc-200">Email</p>
                        <a href="mailto:hitchcockzack@gmail.com" className="text-sm text-zinc-400 hover:text-blue-300 transition-colors">hitchcockzack@gmail.com</a>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-lg bg-blue-600/10 border border-blue-500/20 flex items-center justify-center">
                        <Phone className="h-5 w-5 text-blue-400" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-zinc-200">Phone</p>
                        <a href="tel:+16175865962" className="text-sm text-zinc-400 hover:text-blue-300 transition-colors">+1 (617) 586-5962</a>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-lg bg-blue-600/10 border border-blue-500/20 flex items-center justify-center">
                        <Linkedin className="h-5 w-5 text-blue-400" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-zinc-200">LinkedIn</p>
                        <a
                          href="https://www.linkedin.com/in/zack-hitchcock-17841a219/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-zinc-400 hover:text-blue-300 transition-colors"
                        >
                          Connect with me
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="reveal-on-scroll opacity-0 translate-y-8 transition-all duration-700" style={{ transitionDelay: '220ms' }}>
                <div className="rounded-2xl bg-zinc-950/60 border border-zinc-800 p-6">
                  <h4 className="text-sm font-semibold text-zinc-200 mb-3">What to Expect</h4>
                  <div className="space-y-3 text-sm text-zinc-400">
                    <div className="flex items-start gap-3"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-blue-400" /> <p>Initial response within 24 hours</p></div>
                    <div className="flex items-start gap-3"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-blue-400" /> <p>Strategic consultation call in 3–5 days</p></div>
                    <div className="flex items-start gap-3"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-blue-400" /> <p>Custom proposal within 1 week</p></div>
                  </div>
                </div>
              </div>

              <div className="reveal-on-scroll opacity-0 translate-y-8 transition-all duration-700" style={{ transitionDelay: '340ms' }}>
                <div className="rounded-2xl bg-zinc-950/60 border border-zinc-800 p-6">
                  <h4 className="text-sm font-semibold text-zinc-200 mb-3">Digital Business Card</h4>
                  <p className="text-sm text-zinc-400 mb-4">View my interactive card for easy contact sharing.</p>
                  <Link href="/greeting" className="inline-flex items-center text-sm text-blue-300 hover:text-blue-200 font-medium transition-colors group">
                    View Card
                    <ArrowRight className="h-4 w-4 ml-1 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Minimal custom CSS for reveals */}
      <style jsx>{`
        .animate-in { opacity: 1 !important; transform: translateY(0) !important; }
        @media (prefers-reduced-motion: reduce) { .transition-all, .transition-colors, .transition-transform { transition: none; } .animate-pulse { animation: none; } }
      `}</style>
    </main>
  )
}
