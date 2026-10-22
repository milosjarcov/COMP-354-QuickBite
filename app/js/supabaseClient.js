import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm";

const supabaseUrl = "https://ckrzeewmfwjhjtkbhpgu.supabase.co";
const supabaseKey = "sb_publishable_1FVPIhNRGdvJAGWW2KwjjQ_SgdJHf2U";

export const db = createClient(supabaseUrl, supabaseKey);
