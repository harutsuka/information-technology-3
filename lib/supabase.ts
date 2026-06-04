import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// 💡 修正ポイント：
// ビルド時に環境変数が「一時的に空っぽ」の時は、仮のダミー文字列を入れてクライアントのエラー（即死）を防ぎます。
// 実際にアプリがブラウザで動く（動的実行される）時は、登録した本物の環境変数がしっかり読み込まれます。
export const supabase = createClient(
  supabaseUrl || "https://dummy-url-for-build.supabase.co",
  supabaseAnonKey || "dummy-anon-key-for-build",
);
