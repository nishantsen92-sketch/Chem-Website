import { NextResponse } from 'next/server';
import { supabaseAdmin } from '../../../lib/supabase';

export async function GET() {
  try {
    // Fetch all rows where status = 'published', sorted by newest first
    const { data, error } = await supabaseAdmin
      .from('chemistry_topics')
      .select('*')
      .eq('status', 'published')
      .order('created_at', { ascending: false });

    if (error) {
      throw error;
    }

    return NextResponse.json(data || []);
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to fetch archive.' }, { status: 500 });
  }
}
