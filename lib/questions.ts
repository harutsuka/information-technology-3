import { supabase } from "./supabase";

export async function getQuestions() {
  const { data, error } = await supabase.from("questions").select("*");

  if (error) {
    throw error;
  }

  return data;
}
