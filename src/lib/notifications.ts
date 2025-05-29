export async function sendNotification(message: string) {
  try {
    const response = await fetch('/api/notify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message }),
    });

    if (!response.ok) {
      console.error('Failed to send notification');
    }
  } catch (error) {
    console.error('Notification error:', error);
  }
}
