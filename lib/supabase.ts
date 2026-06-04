import { createClient } from "@supabase/supabase-js";

// 💡 呼び出された瞬間に初めて本物の環境変数でクライアントを作る関数
function getClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  // ビルド時（環境変数がない時）はダミーを返してエラーを回避
  if (!url || !anon) {
    return createClient(
      "https://dummy-url-for-build.supabase.co",
      "dummy-anon-key-for-build",
    );
  }

  // 友達がアクセスした時は、100%本物のURLとキーで接続される
  return createClient(url, anon);
}

// 💡 他のファイルの「supabase.from」という書き方を1文字も変えずに、
// 実行時（ブラウザ）に本物を引っ張ってくる一番確実なエクスポート
export const supabase = {
  get from() {
    return getClient().from;
  },
  get auth() {
    return getClient().auth;
  },
  get storage() {
    return getClient().storage;
  },
};
