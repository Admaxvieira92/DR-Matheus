
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://dondgyunveoxvnifmwdl.supabase.co';
// Chave pública anônima - Verifique se é a mesma no seu painel
const SUPABASE_ANON_KEY = 'sb_publishable_8rmM7KIKfxmhvyh_g6fu5w_Gvu8rlTD';

let supabaseInstance: any;

try {
  supabaseInstance = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
} catch (error) {
  console.warn("Falha ao inicializar Supabase. O site funcionará em modo offline.", error);
  
  // Mock para evitar erros de undefined
  supabaseInstance = {
    from: () => ({
      select: () => ({
        order: () => Promise.resolve({ data: [], error: null }),
        eq: () => Promise.resolve({ data: [], error: null }),
      }),
      insert: () => Promise.resolve({ error: new Error("Offline") }),
      update: () => Promise.resolve({ error: new Error("Offline") }),
      delete: () => Promise.resolve({ error: new Error("Offline") }),
    }),
    auth: {
      getSession: () => Promise.resolve({ data: { session: null }, error: null }),
      onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
      signInWithPassword: () => Promise.resolve({ error: new Error("Offline") }),
      signOut: () => Promise.resolve({}),
    }
  };
}

export const supabase = supabaseInstance;
