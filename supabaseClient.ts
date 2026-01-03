
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://dondgyunveoxvnifmwdl.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_8rmM7KIKfxmhvyh_g6fu5w_Gvu8rlTD';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
