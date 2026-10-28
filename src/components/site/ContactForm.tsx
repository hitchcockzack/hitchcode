'use client'

import { useState, type FormEvent } from 'react'

import { SITE } from '@/content/site'
import styles from './ContactForm.module.css'

// Same delivery path as the previous contact page: Formspree for the message, then a
// best-effort phone notification through /api/notify.
const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xeojpvbo'

type Fields = { name: string; email: string; company: string; phone: string; message: string }
const empty: Fields = { name: '', email: '', company: '', phone: '', message: '' }

export default function ContactForm() {
  const [fields, setFields] = useState<Fields>(empty)
  const [errors, setErrors] = useState<Partial<Record<keyof Fields, string>>>({})
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'failed'>('idle')

  const set = (key: keyof Fields, value: string) => {
    setFields((prev) => ({ ...prev, [key]: value }))
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }))
  }

  const validate = () => {
    const next: Partial<Record<keyof Fields, string>> = {}
    if (!fields.name.trim()) next.name = 'Please add your name'
    if (!fields.email.trim()) next.email = 'An email is needed to reply'
    else if (!/^\S+@\S+\.\S+$/.test(fields.email.trim())) next.email = 'Enter a valid email'
    if (fields.phone.trim() && !/^[+()\-.\s\d]{7,}$/.test(fields.phone.trim())) next.phone = 'Enter a valid phone number'
    if (!fields.message.trim()) next.message = 'Tell us a little about where the work gets stuck'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (status === 'sending' || !validate()) return
    setStatus('sending')
    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...fields, _subject: `Hitchcode inquiry from ${fields.name}` }),
      })
      if (!response.ok) throw new Error(`Formspree ${response.status}`)
      fetch('/api/notify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: `New inquiry from ${fields.name} (${fields.email})${fields.company ? `, ${fields.company}` : ''}${
            fields.phone ? `\nPhone: ${fields.phone}` : ''
          }\n\n${fields.message}`,
        }),
      }).catch(() => undefined)
      setStatus('sent')
      setFields(empty)
    } catch {
      setStatus('failed')
    }
  }

  if (status === 'sent') {
    return (
      <div className={styles.sent} role="status">
        <p className={styles.sentTitle}>Received. Thank you.</p>
        <p>Zack reads every message himself and replies personally, usually within one business day.</p>
        <button type="button" className={styles.again} onClick={() => setStatus('idle')}>
          Send another message
        </button>
      </div>
    )
  }

  const describedBy = (key: keyof Fields) => (errors[key] ? `cf-${key}-error` : undefined)

  return (
    <form className={styles.form} onSubmit={onSubmit} noValidate aria-label="Discuss your operation">
      <div className={styles.row}>
        <label className={styles.field}>
          <span className={styles.label}>Name *</span>
          <input
            name="name"
            autoComplete="name"
            value={fields.name}
            onChange={(e) => set('name', e.target.value)}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={describedBy('name')}
          />
          {errors.name && (
            <span id="cf-name-error" className={styles.error}>
              {errors.name}
            </span>
          )}
        </label>
        <label className={styles.field}>
          <span className={styles.label}>Email *</span>
          <input
            name="email"
            type="email"
            autoComplete="email"
            inputMode="email"
            value={fields.email}
            onChange={(e) => set('email', e.target.value)}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={describedBy('email')}
          />
          {errors.email && (
            <span id="cf-email-error" className={styles.error}>
              {errors.email}
            </span>
          )}
        </label>
      </div>
      <div className={styles.row}>
        <label className={styles.field}>
          <span className={styles.label}>Company</span>
          <input
            name="company"
            autoComplete="organization"
            value={fields.company}
            onChange={(e) => set('company', e.target.value)}
          />
        </label>
        <label className={styles.field}>
          <span className={styles.label}>Phone, if you prefer a call</span>
          <input
            name="phone"
            type="tel"
            autoComplete="tel"
            inputMode="tel"
            value={fields.phone}
            onChange={(e) => set('phone', e.target.value)}
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={describedBy('phone')}
          />
          {errors.phone && (
            <span id="cf-phone-error" className={styles.error}>
              {errors.phone}
            </span>
          )}
        </label>
      </div>
      <label className={styles.field}>
        <span className={styles.label}>Where is the work getting stuck? *</span>
        <textarea
          name="message"
          rows={5}
          value={fields.message}
          onChange={(e) => set('message', e.target.value)}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={describedBy('message')}
          placeholder="The handoff, the department, the tool, or just what keeps landing on your desk."
        />
        {errors.message && (
          <span id="cf-message-error" className={styles.error}>
            {errors.message}
          </span>
        )}
      </label>

      {status === 'failed' && (
        <p className={styles.failed} role="alert">
          The message did not send. Please try again, or email{' '}
          <a href={`mailto:${SITE.email}`}>{SITE.email}</a> directly.
        </p>
      )}

      <button type="submit" className={styles.submit} disabled={status === 'sending'}>
        {status === 'sending' ? 'Sending…' : 'Discuss your operation'}
        <span aria-hidden="true">→</span>
      </button>
    </form>
  )
}
