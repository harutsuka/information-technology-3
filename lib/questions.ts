import { getSupabase } from "./supabase";

export async function getQuestions(): Promise<any[]> {
  const supabase = getSupabase();

  // console.log("supabase:", supabase);

  if (!supabase) {
    console.log("supabase is null");
    return [];
  }

  const { data, error } = await supabase.from("questions").select("*");

  // console.log("data:", data);
  // console.log("error:", error);

  if (error) {
    console.error(error);
    return [];
  }

  return data || [];
}
