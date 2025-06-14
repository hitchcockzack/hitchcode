import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json();

    // Pushover API configuration
    const PUSHOVER_TOKEN = process.env.PUSHOVER_TOKEN;
    const PUSHOVER_USER = process.env.PUSHOVER_USER;

    if (!PUSHOVER_TOKEN || !PUSHOVER_USER) {
      console.warn('Pushover credentials not configured');
      return NextResponse.json({ success: false, error: 'Pushover not configured' }, { status: 500 });
    }

    const response = await fetch('https://api.pushover.net/1/messages.json', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token: PUSHOVER_TOKEN,
        user: PUSHOVER_USER,
        message: message,
        title: 'hitchcode',
      }),
    });

    if (response.ok) {
      return NextResponse.json({ success: true });
    } else {
      const error = await response.text();
      console.error('Pushover API error:', error);
      return NextResponse.json({ success: false, error }, { status: 500 });
    }
  } catch (error) {
    console.error('Notification error:', error);
    return NextResponse.json({ success: false, error: 'Failed to send notification' }, { status: 500 });
  }
}
