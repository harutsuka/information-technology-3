import { createClient } from "@supabase/supabase-js";

export function getSupabase() {
  console.log("URL:", process.env.NEXT_PUBLIC_SUPABASE_URL);

  console.log("KEY:", process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) {
    return null;
  }

  return createClient(url, key);
}
