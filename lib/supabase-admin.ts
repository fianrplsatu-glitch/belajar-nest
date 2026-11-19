import 'server-only';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseSecretKey = process.env.SUPABASE_SECRET_KEY;

if (!supabaseUrl || !supabaseSecretKey) {
  throw new Error(
    'Missing Supabase environment variables: SUPABASE_URL and SUPABASE_SECRET_KEY',
  );
}

// Klien dengan kunci RAHASIA (secret key). Melewati semua aturan database,
// jadi hanya boleh dipakai di server. "server-only" membuat build gagal
// bila berkas ini tidak sengaja diimpor dari Client Component.
export const supabaseAdmin = createClient(supabaseUrl, supabaseSecretKey, {
  auth: { persistSession: false, autoRefreshToken: false },
});
