import { createClient } from "@supabase/supabase-js";

// 💡 ファイルが読み込まれた時点では、createClientを「実行しない」
export function getSupabaseClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anon) {
    // ビルド時に環境変数がない場合は、エラーを出さずにnullを返す（即死を防ぐ）
    return null;
  }

  // 本番アクセス時は、ここを通って100%本物のクライアントが作られる！
  return createClient(url, anon);
}
