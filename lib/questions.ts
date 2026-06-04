import { getSupabaseClient } from "./supabase";
// 💡 Next.js純正の動的強制関数をインポート
import { connection } from "next/server";

export async function getQuestions() {
  // 💡 【超重要】Next.jsにビルド時のプリレンダリング（静的ロック）を完全に諦めさせます
  await connection();

  const supabase = getSupabaseClient();

  // 万が一環境変数がない場合は、ここでエラーを出す（ビルド時はconnection()のおかげでここを通らない）
  if (!supabase) {
    throw new Error("Supabase client is not initialized");
  }

  const { data, error } = await supabase.from("questions").select("*");

  if (error) {
    throw error;
  }

  return data;
}
