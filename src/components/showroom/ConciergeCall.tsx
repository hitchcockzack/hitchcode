'use client'

import { useState, type FormEvent } from 'react'

import styles from './ConciergeCall.module.css'

// Contract shared with /api/ai-concierge/start-call and the original AIConciergeSection.
// The consent wording must match what the backend records.
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

/*
  The live AI concierge, drawn as a call request slip. Submitting places a real phone
  call through Twilio and the Railway voice bridge, then emails a written recap.
*/
export default function ConciergeCall() {
  const [form, setForm] = useState<FormState>(initialForm)
  const [status, setStatus] = useState<Status>('idle')
  const [errorMessage, setErrorMessage] = useState('')
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

  const validate = () => {
    const errors: Record<string, string> = {}
    if (!form.name.trim()) errors.name = 'Please add your name'
    const phone = form.phone.trim()
    if (!phone) errors.phone = 'A phone number is required'
    else if (!/^[+()\-.\s\d]{7,}$/.test(phone)) errors.phone = 'Enter a valid phone number'
    const email = form.email.trim()
    if (!email) errors.email = 'Email is required so we can send your recap'
    else if (!/^\S+@\S+\.\S+$/.test(email)) errors.email = 'Enter a valid email'
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
          sourcePath: window.location.pathname,
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

  const submitting = status === 'submitting'
  const err = (key: string) => (fieldErrors[key] ? `cc-${key}-error` : undefined)

  if (status === 'success') {
    return (
      <div className={styles.slip} role="status">
        <p className={styles.slipHead}>
          <span>Call request</span>
          <span>Dialing</span>
        </p>
        <p className={styles.successTitle}>Your phone is about to ring.</p>
        <p className={styles.successBody}>
          The AI concierge is dialing you now. Pick up when it calls. It takes a few minutes, and a written recap
          follows by email.
        </p>
        <p className={styles.dialing} aria-hidden="true">
          <span className={styles.dialLamp} />
          Calling
        </p>
        <button type="button" className={styles.again} onClick={() => setStatus('idle')}>
          Request another call
        </button>
      </div>
    )
  }

  return (
    <form className={styles.slip} onSubmit={handleSubmit} noValidate aria-label="Request a call from the AI concierge">
      <p className={styles.slipHead}>
        <span>Call request · AI concierge</span>
        <span>Live</span>
      </p>

      <div className={styles.row}>
        <label className={styles.field}>
          <span className={styles.label}>
            Name <b aria-hidden="true">*</b>
          </span>
          <input
            name="name"
            type="text"
            autoComplete="name"
            value={form.name}
            onChange={(e) => update('name', e.target.value)}
            aria-invalid={Boolean(fieldErrors.name)}
            aria-describedby={err('name')}
            placeholder="Your name"
          />
          {fieldErrors.name && (
            <span id="cc-name-error" className={styles.error}>
              {fieldErrors.name}
            </span>
          )}
        </label>
        <label className={styles.field}>
          <span className={styles.label}>
            Phone <b aria-hidden="true">*</b>
          </span>
          <input
            name="phone"
            type="tel"
            autoComplete="tel"
            inputMode="tel"
            value={form.phone}
            onChange={(e) => update('phone', e.target.value)}
            aria-invalid={Boolean(fieldErrors.phone)}
            aria-describedby={err('phone') ?? 'cc-phone-hint'}
            placeholder="+1 (555) 123-4567"
          />
          {fieldErrors.phone ? (
            <span id="cc-phone-error" className={styles.error}>
              {fieldErrors.phone}
            </span>
          ) : (
            <span id="cc-phone-hint" className={styles.hint}>
              US numbers only.
            </span>
          )}
        </label>
      </div>

      <label className={styles.field}>
        <span className={styles.label}>
          Email <b aria-hidden="true">*</b>
        </span>
        <input
          name="email"
          type="email"
          autoComplete="email"
          inputMode="email"
          value={form.email}
          onChange={(e) => update('email', e.target.value)}
          aria-invalid={Boolean(fieldErrors.email)}
          aria-describedby={err('email') ?? 'cc-email-hint'}
          placeholder="you@company.com"
        />
        {fieldErrors.email ? (
          <span id="cc-email-error" className={styles.error}>
            {fieldErrors.email}
          </span>
        ) : (
          <span id="cc-email-hint" className={styles.hint}>
            Your call recap is sent here.
          </span>
        )}
      </label>

      <div className={styles.row}>
        <label className={styles.field}>
          <span className={styles.label}>Company (optional)</span>
          <input
            name="company"
            type="text"
            autoComplete="organization"
            value={form.company}
            onChange={(e) => update('company', e.target.value)}
            placeholder="Where you work"
          />
        </label>
        <label className={styles.field}>
          <span className={styles.label}>Biggest headache (optional)</span>
          <input
            name="problemHint"
            type="text"
            value={form.problemHint}
            onChange={(e) => update('problemHint', e.target.value)}
            placeholder="A workflow, a manual task, an idea"
          />
        </label>
      </div>

      <label className={styles.consent} data-error={fieldErrors.consent ? '' : undefined}>
        <input
          name="consent"
          type="checkbox"
          checked={form.consent}
          onChange={(e) => update('consent', e.target.checked)}
          aria-invalid={Boolean(fieldErrors.consent)}
          aria-describedby={err('consent')}
        />
        <span>{CONSENT_TEXT}</span>
      </label>
      {fieldErrors.consent && (
        <p id="cc-consent-error" className={styles.error}>
          {fieldErrors.consent}
        </p>
      )}

      {status === 'error' && errorMessage && (
        <p className={styles.formError} role="alert">
          {errorMessage}
        </p>
      )}

      <div className={styles.submitRow}>
        <button type="submit" className={styles.submit} disabled={submitting}>
          {submitting ? 'Connecting your call…' : 'Call me with the AI concierge'}
          <span aria-hidden="true">→</span>
        </button>
        <p className={styles.privacy}>Your number is used for this demo and its follow-up. No marketing lists.</p>
      </div>
    </form>
  )
}
