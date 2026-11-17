import 'server-only';
import { createClient } from '@supabase/supabase-js';

//Klien dengan kunci RAHASIA (secret key). Melewati semua aturan database,
//jadi hanya boleh dipakai di server. "server-only" membuat build gagal
//bila berkas ini tidak sengaja diimpor dari Client Component.
export const supaAdmin = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_PUBLISHAMBLE_KEY!,
  { auth: { persistSession: false, autoRefreshToken: false } },
);
