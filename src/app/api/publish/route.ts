import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { pin } = await request.json();

    // Verify authentication PIN
    if (pin !== '312000') {
      return NextResponse.json({ error: 'Invalid PIN!' }, { status: 401 });
    }

    // Trigger n8n webhook approval call
    try {
      const response = await fetch('http://localhost:5678/webhook/approve-publish', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ approved: true }),
      });

      if (!response.ok) {
        console.warn(`Webhook responded with status: ${response.status}`);
      }
    } catch (webhookError: any) {
      // Log the warning but do not crash the request; n8n might be offline during dev
      console.warn('Could not contact n8n webhook server:', webhookError.message);
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Publish trigger failed.' }, { status: 500 });
  }
}
