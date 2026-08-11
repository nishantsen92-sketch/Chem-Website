import { NextResponse } from 'next/server';
import { supabaseAdmin } from '../../../lib/supabase';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Insert new draft row in chemistry_topics
    const { data, error } = await supabaseAdmin
      .from('chemistry_topics')
      .insert([
        {
          topic: body.topic,
          script: body.script,
          app_html: body.app_html,
          notes_markdown: body.notes_markdown,
          status: 'draft'
        }
      ])
      .select();

    if (error) {
      throw error;
    }

    return NextResponse.json({ success: true, data });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to save draft.' }, { status: 500 });
  }
}

export async function GET() {
  try {
    // Fetch the most recently created row where status = 'draft'
    const { data, error } = await supabaseAdmin
      .from('chemistry_topics')
      .select('*')
      .eq('status', 'draft')
      .order('created_at', { ascending: false })
      .limit(1)
      .single();

    if (error || !data) {
      return NextResponse.json(
        { error: 'No active draft preview found.' },
        { status: 404 }
      );
    }

    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Failed to fetch draft.' },
      { status: 404 }
    );
  }
}
