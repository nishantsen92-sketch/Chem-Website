import { NextResponse } from 'next/server';
import { supabaseAdmin } from '../../../lib/supabase';

export async function POST(request: Request) {
  try {
    const { pin, id } = await request.json();

    // Verify authentication PIN
    if (pin !== '312000') {
      return NextResponse.json({ error: 'Invalid PIN!' }, { status: 401 });
    }

    if (!id) {
      return NextResponse.json({ error: 'Topic ID is required to publish.' }, { status: 400 });
    }

    // Update row status to 'published' in database
    const { error: dbError } = await supabaseAdmin
      .from('chemistry_topics')
      .update({ status: 'published' })
      .eq('id', id);

    if (dbError) {
      throw dbError;
    }

    // Trigger n8n webhook approval call
    try {
      await fetch('http://localhost:5678/webhook/approve-publish', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ approved: true, id }),
      });
    } catch (webhookError: any) {
      // Log the warning but do not crash the request; n8n might be offline during dev
      console.warn('Could not contact n8n webhook server:', webhookError.message);
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Publish trigger failed.' }, { status: 500 });
  }
}
