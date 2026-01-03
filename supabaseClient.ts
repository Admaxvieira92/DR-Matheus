
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://dondgyunveoxvnifmwdl.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_8rmM7KIKfxmhvyh_g6fu5w_Gvu8rlTD';

// Inicialização defensiva
let supabaseInstance: any;

try {
  supabaseInstance = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
} catch (e) {
  console.error("Falha ao inicializar Supabase:", e);
  // Mock para evitar crash total se a inicialização falhar
  supabaseInstance = {
    auth: {
      getSession: async () => ({ data: { session: null }, error: null }),
      onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
      signInWithPassword: async () => ({ data: {}, error: new Error("Falha no cliente") })
    },
    from: () => ({
      select: () => ({
        order: () => Promise.resolve({ data: [], error: null }),
        eq: () => ({ order: () => Promise.resolve({ data: [], error: null }) })
      }),
      insert: () => Promise.resolve({ data: null, error: null }),
      update: () => ({ eq: () => Promise.resolve({ data: null, error: null }) }),
      delete: () => ({ eq: () => Promise.resolve({ data: null, error: null }) })
    })
  };
}

export const supabase = supabaseInstance;