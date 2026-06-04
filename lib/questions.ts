import { getSupabaseClient } from "./supabase";

export async function getQuestions() {
  // 💡 実行されたまさに「この瞬間」に、環境変数があるかチェックしてクライアントを生成
  const supabase = getSupabaseClient();

  // ビルド中など、環境変数がない時は何もせず空配列を返す（ビルドエラーを100%回避）
  if (!supabase) {
    console.log("Supabase client is not initialized (Build time fallback)");
    return [];
  }

  // 本番環境では、本物のクライアントでSupabaseからデータを引っこ抜く！
  const { data, error } = await supabase.from("questions").select("*");

  if (error) {
    throw error;
  }

  return data;
}
