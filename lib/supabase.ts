import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const supabase = createClient(
  supabaseUrl || "https://dummy-url-for-nextjs-build-bug.supabase.co",
  supabaseAnonKey || "dummy-anon-key-for-nextjs-build-bug",
);
