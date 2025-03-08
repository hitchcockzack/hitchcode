import { NextResponse } from 'next/server';

const PUSHOVER_TOKEN = process.env.PUSHOVER_TOKEN;
const PUSHOVER_USER = process.env.PUSHOVER_USER;
const TESTING_MODE = process.env.TESTING_MODE === 'false';

export async function POST(request: Request) {
  try {
    if (TESTING_MODE) {
      console.log('Testing mode - API notification suppressed');
      return NextResponse.json({ success: true });
    }

    const body = await request.json();
    const { action } = body;

    if (!PUSHOVER_TOKEN || !PUSHOVER_USER) {
      return NextResponse.json({ success: false });
    }

    const response = await fetch('https://api.pushover.net/1/messages.json', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token: PUSHOVER_TOKEN,
        user: PUSHOVER_USER,
        message: action,
        priority: 0
      }),
    });

    if (!response.ok) {
      return NextResponse.json({ success: false });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false });
  }
}
