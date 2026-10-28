import { NextRequest, NextResponse } from 'next/server'

const MAX_MESSAGE_LENGTH = 2000

// Only this site's own pages may send owner notifications. Browsers always send Origin on
// cross-site POSTs, so a missing or foreign origin is refused.
function isSameSite(request: NextRequest) {
  const origin = request.headers.get('origin')
  if (!origin) return false
  try {
    return new URL(origin).host === request.headers.get('host')
  } catch {
    return false
  }
}

export async function POST(request: NextRequest) {
  if (!isSameSite(request)) {
    return NextResponse.json({ success: false, error: 'Forbidden' }, { status: 403 })
  }

  try {
    const { message } = await request.json()
    if (typeof message !== 'string' || !message.trim()) {
      return NextResponse.json({ success: false, error: 'Message required' }, { status: 400 })
    }

    const PUSHOVER_TOKEN = process.env.PUSHOVER_TOKEN
    const PUSHOVER_USER = process.env.PUSHOVER_USER

    if (!PUSHOVER_TOKEN || !PUSHOVER_USER) {
      console.warn('Pushover credentials not configured')
      return NextResponse.json({ success: false, error: 'Pushover not configured' }, { status: 500 })
    }

    const response = await fetch('https://api.pushover.net/1/messages.json', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        token: PUSHOVER_TOKEN,
        user: PUSHOVER_USER,
        message: message.slice(0, MAX_MESSAGE_LENGTH),
        title: 'hitchcode',
      }),
    })

    if (response.ok) {
      return NextResponse.json({ success: true })
    }
    const error = await response.text()
    console.error('Pushover API error:', error)
    return NextResponse.json({ success: false, error }, { status: 500 })
  } catch (error) {
    console.error('Notification error:', error)
    return NextResponse.json({ success: false, error: 'Failed to send notification' }, { status: 500 })
  }
}
