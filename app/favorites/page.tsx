"use client";
import { useState, useEffect } from "react";
import { useFavorites } from "@/lib/favoriteContext";
import { getQuestions } from "@/lib/questions";
import Link from "next/link";

export default function FavoritesPage() {
  const { favorites, toggleFavorite } = useFavorites();

  // 2. Supabaseから取得した全問題を置いておく「箱（State）」を作る
  const [allQuestions, setAllQuestions] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // 3. 画面が開いた瞬間に、非同期（async）でSupabaseからデータを取ってくる
  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        const data = await getQuestions(); // 💡 ここで async/await を使う！
        setAllQuestions(data || []);
      } catch (error) {
        console.error("問題の取得に失敗しました:", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);

  // 4. お気に入りに入っているIDだけの問題データをフィルタリング
  const fetchFavoriteQuestions = allQuestions.filter((q) =>
    favorites.includes(q.id),
  );

  // 5. 読み込み中の表示（データが届くまでのプレースホルダー）
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen text-gray-500">
        問題を読み込み中...
      </div>
    );
  }

  return (
    <main className="container px-6 py-8">
      <h1 className="text-xl font-bold mb-6 text-center">お気に入りの問題</h1>

      {fetchFavoriteQuestions.length === 0 ? (
        <p className="text-center text-gray-500">
          お気に入りの問題はありません。
        </p>
      ) : (
        <div className="space-y-6 max-w-2xl mx-auto">
          {fetchFavoriteQuestions.map((q) => (
            <div
              key={q.id}
              className="border border-gray-300 rounded-xl p-6 bg-white shadow-main relative"
            >
              <button
                onClick={() => toggleFavorite(q.id)}
                className="absolute top-4 right-4 text-2xl focus:outline-none"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="#facc15"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="none"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
                  />
                </svg>
              </button>

              <div className="text-sm text-gray-500 mb-2 font-semibold">
                第{q.week}回
              </div>

              <h2 className="text-lg font-bold mb-4 text-gray-800">
                {q.question}
              </h2>

              {q.choices && q.choices.length > 0 && (
                <ul className="space-y-2 mb-4">
                  {q.choices.map((choice: string, index: number) => (
                    <li
                      key={index}
                      className="p-3 bg-gray-50 rounded-lg border border-gray-200 text-sm text-gray-700"
                    >
                      {choice}
                    </li>
                  ))}
                </ul>
              )}

              <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <span className="font-bold text-blue-700 block mb-1">
                  【解答】
                </span>
                <p className="text-gray-800 font-medium">{q.answer}</p>
                {q.explanation && (
                  <p className="text-xs text-gray-500 mt-2 border-t border-blue-100 pt-2">
                    解説：{q.explanation}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
