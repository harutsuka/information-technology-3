import { createClient } from "@supabase/supabase-js";

// 💡 実際に使う瞬間まで、createClient の実行を遅らせる関数
function getSupabaseClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  // Vercelでのビルド時（環境変数がない瞬間）は、落ちないようにダミーでクライアントを作って返す
  if (!url || !anon) {
    return createClient(
      "https://dummy-url-for-build.supabase.co",
      "dummy-anon-key-for-build",
    );
  }

  // 友達がブラウザでアクセスした時は、ここが実行されて本物のURLとキーで接続される！
  return createClient(url, anon);
}

// 💡 魔法のプロキシ（Proxy）
// questions.ts 側の `supabase.from(...)` という書き方を一切変えずに、
// 裏側で「使う瞬間に getSupabaseClient() を実行する」という動きにすり替えます
export const supabase = new Proxy({} as any, {
  get(_, prop) {
    return (getSupabaseClient() as any)[prop];
  },
});
