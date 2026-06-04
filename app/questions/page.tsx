import { getQuestions } from "@/lib/questions";
import Link from "next/link";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function QuestionsPage() {
  let allQuestions: any[] = [];

  // もしビルド中などで環境変数が存在しない場合は、Supabaseを呼び出さずに即座にスキップさせる！
  // これでビルドワーカーがクラッシュするのを100%物理的に防ぎます。
  if (
    !process.env.NEXT_PUBLIC_SUPABASE_URL ||
    !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  ) {
    console.log("ビルド中のため、Supabaseの呼び出しをスキップしました。");
  } else {
    try {
      // 本番環境（ブラウザからアクセスされた時）は、ここが動いて100%本物のデータが取れる！
      allQuestions = (await getQuestions()) || [];
    } catch (err) {
      console.error("Supabaseからのデータ取得に失敗:", err);
    }
  }

  // 💡 安全のために、データがない時は空配列にしておく
  const sortedQuestions =
    allQuestions.length > 0
      ? [...allQuestions].sort((a, b) => a.id - b.id)
      : [];

  if (sortedQuestions.length === 0) {
    return <p className="text-center my-8">問題が見つかりませんでした。</p>;
  }

  return (
    <div className="p-4 max-w-4xl mx-auto flex flex-col gap-8">
      {sortedQuestions.map((question: any) => (
        <div key={question.id} className="w-full">
          <div className="inline-block bg-white border-t border-x border-gray-400 px-4 py-1 font-bold text-sm">
            第{question.week}回
          </div>

          <div className="grid grid-cols-3 border border-gray-400 bg-white">
            <div className="col-span-2 border-b border-r border-gray-400 p-4 min-h-[80px]">
              <p className="font-bold text-gray-500 text-xs mb-1">【問題文】</p>
              <p className="text-gray-800 font-medium leading-relaxed">
                {question.question}
              </p>
            </div>

            <div className="col-span-1 border-b border-gray-400 p-4 bg-gray-50/50">
              <p className="font-bold text-gray-500 text-xs mb-1">【解答】</p>
              <p className="text-blue-600 font-bold">{question.answer}</p>
            </div>

            <div className="col-span-2 border-r border-gray-400 p-4 bg-white">
              {question.choices && question.choices.length > 0 ? (
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-gray-700">
                  {question.choices.map((choice: string, index: number) => (
                    <li
                      key={index}
                      className="bg-gray-50 px-3 py-1.5 rounded border border-gray-200"
                    >
                      {choice}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-400 text-xs italic">記述式問題</p>
              )}
            </div>

            <div className="col-span-1 grid grid-cols-2 bg-gray-50">
              <div className="border-r border-gray-400 p-3 flex items-center justify-between gap-1 bg-white">
                <span className="font-bold text-xs text-gray-700">
                  お気に入り
                </span>
                <button
                  type="button"
                  disabled
                  className="text-xl active:scale-95 transition-transform focus:outline-none cursor-pointer"
                >
                  {question.isFavorite ? "⭐️" : "☆"}
                </button>
              </div>

              <div className="p-3 flex items-center justify-between gap-1">
                <span className="font-bold text-xs text-gray-700">
                  覚えた？
                </span>
                <input type="checkbox" disabled />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
