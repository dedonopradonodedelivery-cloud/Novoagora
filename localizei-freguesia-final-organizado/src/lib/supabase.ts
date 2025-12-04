import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Garantir que import.meta exista sem quebrar o Preview do AI Studio
const env = (import.meta && (import.meta as any).env) ? (import.meta as any).env : null;

const SUPABASE_URL = env?.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = env?.VITE_SUPABASE_ANON_KEY;

// Cliente pode ser null no AI Studio
let supabase: SupabaseClient | null = null;

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  console.warn(
    'Supabase env vars not available. Running with supabase = null (AI Studio Preview).'
  );
} else {
  supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
}

export { supabase };
