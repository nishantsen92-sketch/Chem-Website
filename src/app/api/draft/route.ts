import { NextResponse } from 'next/server';
import { supabaseAdmin } from '../../../lib/supabase';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    let content = body;

    // Check if the actual payload is wrapped inside body.output as a string (e.g. from LLM code block outputs)
    if (body && typeof body.output === 'string') {
      try {
        let cleanedString = body.output.trim();
        
        // Strip markdown code blocks: e.g. ```json ... ```
        if (cleanedString.startsWith('```json')) {
          cleanedString = cleanedString.substring(7);
        } else if (cleanedString.startsWith('```')) {
          cleanedString = cleanedString.substring(3);
        }
        if (cleanedString.endsWith('```')) {
          cleanedString = cleanedString.substring(0, cleanedString.length - 3);
        }
        
        content = JSON.parse(cleanedString.trim());
      } catch (parseError: any) {
        console.warn('Failed to parse body.output as JSON, using raw body:', parseError.message);
      }
    }

    // Safely extract properties with fallback schema support
    const topic = content.topic || 'Untitled Topic';
    const script = content.script || '';
    const app_html = content.app_html || content.interactive_app || '';
    
    // Extract notes inputs safely
    const notesCards = content.notes_cards || content.output?.notes_cards || null;
    const notes_markdown = content.notes_markdown || content.output?.notes_markdown || (typeof notesCards === 'object' && notesCards !== null ? JSON.stringify(notesCards) : '');

    // Insert new draft row in chemistry_topics
    const insertPayload: any = {
      topic,
      script,
      app_html,
      notes_markdown,
      status: 'draft'
    };

    if (notesCards) {
      insertPayload.notes_cards = notesCards;
    }

    const { error } = await supabaseAdmin
      .from('chemistry_topics')
      .insert([insertPayload]);

    if (error) {
      throw error;
    }

    return NextResponse.json({ success: true, message: 'Draft saved successfully' });
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

export async function PUT(request: Request) {
  try {
    const { id, script, app_html, image_url, notes_cards, notes_markdown } = await request.json();

    if (!id) {
      return NextResponse.json({ error: 'Topic ID is required to update draft.' }, { status: 400 });
    }

    // Build the dynamic update payload
    const updateData: any = {};
    if (script !== undefined) updateData.script = script;
    if (app_html !== undefined) updateData.app_html = app_html;
    if (image_url !== undefined) updateData.image_url = image_url;
    if (notes_cards !== undefined) updateData.notes_cards = notes_cards;
    if (notes_markdown !== undefined) updateData.notes_markdown = notes_markdown;

    // Update the record in Supabase
    const { error } = await supabaseAdmin
      .from('chemistry_topics')
      .update(updateData)
      .eq('id', id);

    if (error) {
      throw error;
    }

    return NextResponse.json({ success: true, message: 'Draft content updated successfully.' });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Failed to update draft.' },
      { status: 500 }
    );
  }
}
