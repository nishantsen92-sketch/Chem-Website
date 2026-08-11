import { createClient } from '@supabase/supabase-js';

// Fallback values for static build analysis compilation checks
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-anon-key';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 'placeholder-service-key';

// Client-side instance using Anon Key
export const supabaseClient = createClient(supabaseUrl, supabaseAnonKey);

// Server-side admin instance using Service Role Key (bypasses Row-Level Security)
export const supabaseAdmin = createClient(
  supabaseUrl,
  supabaseServiceKey || supabaseAnonKey // Fallback to anon key in dev/fallback scenarios
);
