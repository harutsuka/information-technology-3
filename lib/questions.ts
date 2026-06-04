import { getSupabaseClient } from "./supabase";

export async function getQuestions() {
  // 💡 1. 実行された瞬間に、ブラウザ環境かサーバー環境かを問わず、まずは環境変数をチェック
  const supabase = getSupabaseClient();

  // 💡 2. ビルド中（環境変数がない時）は、即座に空の配列を返してビルドを100%安全に通過させる
  if (!supabase) {
    console.log("Supabase client is not initialized (Build time fallback)");
    return [];
  }

  // 💡 3. 本番環境（ローカル開発やVercelに公開された後）は、ここを通ってSupabaseからデータを確実に取得する
  const { data, error } = await supabase.from("questions").select("*");

  if (error) {
    throw error;
  }

  return data;
}
