'use client'

import { FormEvent, useState } from 'react'
import {
  ArrowRight,
  Bot,
  CheckCircle2,
  Loader2,
  PhoneCall,
  ShieldCheck,
  Sparkles,
  TriangleAlert,
} from 'lucide-react'

import { BlurFade } from '@/components/magicui/blur-fade'
import { MagicCard } from '@/components/magicui/magic-card'

const CONSENT_TEXT =
  'By submitting my phone number, I agree to receive an AI-powered demo call from Hitchcode at the number provided. This call may be recorded, transcribed, and analyzed to provide a follow-up summary and improve service quality.'

type Status = 'idle' | 'submitting' | 'success' | 'error'

type FormState = {
  name: string
  phone: string
  email: string
  company: string
  problemHint: string
  consent: boolean
}

const initialForm: FormState = {
  name: '',
  phone: '',
  email: '',
  company: '',
  problemHint: '',
  consent: false,
}

// Value props rendered beside the form — keeps the section from being a bare form.
const highlights = [
  {
    icon: PhoneCall,
    title: 'A real phone call',
    body: 'Enter your number and our AI concierge calls you within seconds to talk through your workflow.',
  },
  {
    icon: Bot,
    title: 'It actually listens',
    body: 'It asks sharp diagnostic questions, then sketches the first system Hitchcode would build for you.',
  },
  {
    icon: Sparkles,
    title: 'You get a recap',
    body: 'After the call, you receive a clean summary of what it heard and the likely first build.',
  },
]

export default function AIConciergeSection() {
  const [form, setForm] = useState<FormState>(initialForm)
  const [status, setStatus] = useState<Status>('idle')
  const [errorMessage, setErrorMessage] = useState<string>('')
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({})

  const update = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }))
    if (fieldErrors[key]) {
      setFieldErrors((prev) => {
        const next = { ...prev }
        delete next[key]
        return next
      })
    }
  }

  const validate = (): boolean => {
    const errors: Record<string, string> = {}
    if (!form.name.trim()) errors.name = 'Please add your name'
    const phone = form.phone.trim()
    if (!phone) {
      errors.phone = 'A phone number is required'
    } else if (!/^[+()\-.\s\d]{7,}$/.test(phone)) {
      errors.phone = 'Enter a valid phone number'
    }
    const email = form.email.trim()
    if (!email) {
      errors.email = 'Email is required so we can send your recap'
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      errors.email = 'Enter a valid email'
    }
    if (!form.consent) errors.consent = 'Consent is required to place the call'
    setFieldErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (status === 'submitting') return
    if (!validate()) return

    setStatus('submitting')
    setErrorMessage('')

    try {
      const res = await fetch('/api/ai-concierge/start-call', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name.trim(),
          phone: form.phone.trim(),
          email: form.email.trim(),
          company: form.company.trim() || undefined,
          problemHint: form.problemHint.trim() || undefined,
          consent: form.consent,
          sourcePath: typeof window !== 'undefined' ? window.location.pathname : undefined,
        }),
      })

      const data = (await res.json().catch(() => ({}))) as {
        ok?: boolean
        error?: string
        fields?: Record<string, string[]>
      }

      if (res.ok && data.ok) {
        setStatus('success')
        setForm(initialForm)
        return
      }

      // Surface field-level errors from the server when present.
      if (data.fields) {
        const mapped: Record<string, string> = {}
        for (const [key, messages] of Object.entries(data.fields)) {
          if (messages?.[0]) mapped[key] = messages[0]
        }
        setFieldErrors(mapped)
      }
      setStatus('error')
      setErrorMessage(data.error || 'Something went wrong. Please try again.')
    } catch {
      setStatus('error')
      setErrorMessage('We could not reach the server. Please try again shortly.')
    }
  }

  const isSubmitting = status === 'submitting'

  const inputBase =
    'w-full rounded-xl bg-stone-950/70 border px-4 py-3 text-stone-100 placeholder-stone-600 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#D4A574]/60 focus:border-transparent'
  const inputBorder = (hasError: boolean) =>
    hasError ? 'border-red-500/60 bg-red-950/20' : 'border-stone-800/60 hover:border-stone-700'

  return (
    <section
      id="ai-concierge"
      className="relative px-4 sm:px-6 md:px-10 py-24 md:py-32 border-t border-stone-800/25 bg-stone-950"
    >
      {/* Ambient warm glow consistent with the homepage accent */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-0 h-[26rem] w-[42rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(212,165,116,0.08),transparent_70%)] blur-2xl" />
      </div>

      <div className="relative max-w-6xl mx-auto">
        <BlurFade inView>
          <div className="text-center max-w-3xl mx-auto">
            <p className="inline-flex items-center gap-2 rounded-full border border-stone-700/50 bg-stone-900/50 px-4 py-2 text-[10px] tracking-[0.2em] uppercase font-medium text-stone-400">
              <Bot className="h-3.5 w-3.5 text-[#D4A574]" />
              AI Concierge · Live demo
            </p>
            <h2 className="mt-6 text-[clamp(1.9rem,6vw,3.4rem)] font-semibold text-stone-50 leading-[1.06] tracking-[-0.02em]">
              Get a live AI concierge call
            </h2>
            <p className="mt-5 text-stone-400 leading-relaxed text-[clamp(1rem,2.6vw,1.15rem)]">
              Curious what an AI agent built by Hitchcode actually feels like? Enter your phone number
              and our AI concierge will call you for a short, live demo — it learns about your
              business and shows you the first system worth building.
            </p>
          </div>
        </BlurFade>

        <div className="mt-12 md:mt-16 grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-8 items-start">
          {/* Value props */}
          <div className="lg:col-span-2 space-y-4">
            {highlights.map((item, index) => {
              const Icon = item.icon
              return (
                <BlurFade key={item.title} inView delay={0.06 * index}>
                  <div className="p-1.5 rounded-[1.5rem] bg-stone-900/20 border border-stone-800/25 h-full">
                    <div className="rounded-[calc(1.5rem-0.375rem)] bg-stone-950/50 p-5 md:p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.03)] h-full">
                      <div className="inline-flex items-center justify-center h-10 w-10 rounded-xl border border-stone-800/40 bg-stone-900/40">
                        <Icon className="h-5 w-5 text-[#D4A574]" />
                      </div>
                      <h3 className="mt-4 text-stone-100 font-semibold leading-tight">{item.title}</h3>
                      <p className="mt-2 text-sm text-stone-500 leading-relaxed">{item.body}</p>
                    </div>
                  </div>
                </BlurFade>
              )
            })}
          </div>

          {/* Form / states */}
          <div className="lg:col-span-3">
            <BlurFade inView delay={0.1}>
              <div className="p-1.5 rounded-[1.75rem] bg-stone-900/20 border border-stone-800/25">
                <MagicCard
                  className="rounded-[calc(1.75rem-0.375rem)] border border-stone-800/30 bg-stone-950/50"
                  gradientOpacity={0.18}
                  gradientFrom="#D4A574"
                  gradientTo="#5C4432"
                >
                  <div className="relative p-5 sm:p-7 md:p-8">
                    {status === 'success' ? (
                      <SuccessState onReset={() => setStatus('idle')} />
                    ) : (
                      <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label htmlFor="ac-name" className="block text-sm font-medium text-stone-300 mb-2">
                              Name <span className="text-[#D4A574]">*</span>
                            </label>
                            <input
                              id="ac-name"
                              name="name"
                              type="text"
                              autoComplete="name"
                              value={form.name}
                              onChange={(e) => update('name', e.target.value)}
                              className={`${inputBase} ${inputBorder(!!fieldErrors.name)}`}
                              placeholder="Your name"
                            />
                            {fieldErrors.name && (
                              <p className="mt-1.5 text-sm text-red-400">{fieldErrors.name}</p>
                            )}
                          </div>
                          <div>
                            <label htmlFor="ac-phone" className="block text-sm font-medium text-stone-300 mb-2">
                              Phone number <span className="text-[#D4A574]">*</span>
                            </label>
                            <input
                              id="ac-phone"
                              name="phone"
                              type="tel"
                              autoComplete="tel"
                              inputMode="tel"
                              value={form.phone}
                              onChange={(e) => update('phone', e.target.value)}
                              className={`${inputBase} ${inputBorder(!!fieldErrors.phone)}`}
                              placeholder="+1 (555) 123-4567"
                            />
                            {fieldErrors.phone ? (
                              <p className="mt-1.5 text-sm text-red-400">{fieldErrors.phone}</p>
                            ) : (
                              <p className="mt-1.5 text-xs text-stone-500">US numbers only.</p>
                            )}
                          </div>
                        </div>

                        <div>
                          <label htmlFor="ac-email" className="block text-sm font-medium text-stone-300 mb-2">
                            Email <span className="text-[#D4A574]">*</span>
                          </label>
                          <input
                            id="ac-email"
                            name="email"
                            type="email"
                            autoComplete="email"
                            inputMode="email"
                            value={form.email}
                            onChange={(e) => update('email', e.target.value)}
                            className={`${inputBase} ${inputBorder(!!fieldErrors.email)}`}
                            placeholder="you@company.com"
                          />
                          {fieldErrors.email ? (
                            <p className="mt-1.5 text-sm text-red-400">{fieldErrors.email}</p>
                          ) : (
                            <p className="mt-1.5 text-xs text-stone-500">
                              We&apos;ll send your call recap and any follow-up here.
                            </p>
                          )}
                        </div>

                        <div>
                          <label htmlFor="ac-company" className="block text-sm font-medium text-stone-300 mb-2">
                            Company <span className="text-stone-600 font-normal">(optional)</span>
                          </label>
                          <input
                            id="ac-company"
                            name="company"
                            type="text"
                            autoComplete="organization"
                            value={form.company}
                            onChange={(e) => update('company', e.target.value)}
                            className={`${inputBase} ${inputBorder(false)}`}
                            placeholder="Where you work"
                          />
                        </div>

                        <div>
                          <label htmlFor="ac-problem" className="block text-sm font-medium text-stone-300 mb-2">
                            What would you want to automate?{' '}
                            <span className="text-stone-600 font-normal">(optional)</span>
                          </label>
                          <textarea
                            id="ac-problem"
                            name="problemHint"
                            rows={3}
                            value={form.problemHint}
                            onChange={(e) => update('problemHint', e.target.value)}
                            className={`${inputBase} ${inputBorder(false)} resize-none`}
                            placeholder="A workflow, a manual task, an idea — anything."
                          />
                        </div>

                        {/* Consent — never pre-checked */}
                        <div>
                          <label
                            htmlFor="ac-consent"
                            className={`flex items-start gap-3 rounded-xl border p-4 cursor-pointer transition-colors duration-300 ${
                              fieldErrors.consent
                                ? 'border-red-500/60 bg-red-950/20'
                                : 'border-stone-800/60 bg-stone-950/40 hover:border-stone-700'
                            }`}
                          >
                            <input
                              id="ac-consent"
                              name="consent"
                              type="checkbox"
                              checked={form.consent}
                              onChange={(e) => update('consent', e.target.checked)}
                              className="mt-0.5 h-4 w-4 shrink-0 rounded border-stone-600 bg-stone-900 text-[#D4A574] accent-[#D4A574] focus:ring-2 focus:ring-[#D4A574]/60"
                            />
                            <span className="text-xs leading-relaxed text-stone-400">{CONSENT_TEXT}</span>
                          </label>
                          {fieldErrors.consent && (
                            <p className="mt-1.5 text-sm text-red-400">{fieldErrors.consent}</p>
                          )}
                        </div>

                        {status === 'error' && errorMessage && (
                          <div className="flex items-start gap-3 rounded-xl border border-red-500/40 bg-red-950/20 p-4 text-sm text-red-300">
                            <TriangleAlert className="h-4 w-4 mt-0.5 shrink-0" />
                            <span>{errorMessage}</span>
                          </div>
                        )}

                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="group inline-flex w-full sm:w-auto items-center justify-center gap-3 px-7 py-3.5 rounded-full bg-[#D4A574] text-stone-950 text-sm md:text-base font-semibold transition-all duration-500 ease-out hover:bg-[#E0B68A] active:scale-[0.97] disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                          {isSubmitting ? (
                            <>
                              <Loader2 className="h-4 w-4 animate-spin" />
                              Connecting your call…
                            </>
                          ) : (
                            <>
                              Call me with the AI concierge
                              <span className="flex items-center justify-center w-7 h-7 rounded-full bg-stone-950/15 transition-all duration-500 ease-out group-hover:translate-x-0.5 group-hover:scale-105">
                                <ArrowRight className="h-3.5 w-3.5" />
                              </span>
                            </>
                          )}
                        </button>

                        <p className="flex items-center gap-2 text-xs text-stone-600">
                          <ShieldCheck className="h-3.5 w-3.5 text-stone-500" />
                          Your number is only used for this demo and follow-up. No spam.
                        </p>
                      </form>
                    )}
                  </div>
                </MagicCard>
              </div>
            </BlurFade>
          </div>
        </div>
      </div>
    </section>
  )
}

function SuccessState({ onReset }: { onReset: () => void }) {
  return (
    <div className="text-center py-8 md:py-12">
      <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full border border-[#D4A574]/40 bg-[#D4A574]/10">
        <CheckCircle2 className="h-8 w-8 text-[#D4A574]" />
      </div>
      <h3 className="text-xl md:text-2xl font-semibold text-stone-100">Your phone is about to ring</h3>
      <p className="mt-3 text-stone-400 leading-relaxed max-w-md mx-auto">
        The AI concierge is dialing you now. Pick up when it calls — it only takes a few minutes, and
        you&apos;ll get a written recap afterward.
      </p>
      <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-stone-800/60 bg-stone-900/40 px-4 py-2 text-sm text-stone-400">
        <PhoneCall className="h-4 w-4 text-[#D4A574] animate-pulse" />
        Calling…
      </div>
      <div className="mt-8">
        <button
          type="button"
          onClick={onReset}
          className="text-sm text-stone-500 hover:text-stone-300 transition-colors duration-300"
        >
          Request another call
        </button>
      </div>
    </div>
  )
}
