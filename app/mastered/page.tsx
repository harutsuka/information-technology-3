"use client";
import { useState, useEffect } from "react";
import { useMastered } from "@/lib/masteredContext";
import { getQuestions } from "@/lib/questions";
import FormatText from "@/components/FormatText";

export default function MasteredPage() {
  const { masteredQuestions, toggleMastered } = useMastered();
  const [allQuestions, setAllQuestions] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        const data = await getQuestions();
        setAllQuestions(data || []);
      } catch (error) {
        console.error("問題の取得に失敗しました:", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);

  const filteredMasteredQuestions = allQuestions.filter((q) =>
    masteredQuestions.includes(q.id),
  );

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen text-gray-500">
        問題を読み込み中...
      </div>
    );
  }

  return (
    <main className="container px-6 py-8">
      <h1 className="text-xl font-bold mb-6 text-center">覚えた問題</h1>

      {filteredMasteredQuestions.length === 0 ? (
        <p className="text-center text-gray-500">覚えた問題はありません。</p>
      ) : (
        <div className="space-y-6 max-w-2xl mx-auto">
          {filteredMasteredQuestions.map((q) => (
            <div
              key={q.id}
              className="border border-gray-300 rounded-xl p-6 bg-white shadow-main relative"
            >
              <input
                type="checkbox"
                onChange={() => toggleMastered(q.id)}
                checked={masteredQuestions.includes(q.id)}
                className="scale-150 absolute top-6 right-6"
                aria-label="覚えた問題に追加"
              />

              <div className="text-sm text-gray-500 mb-2 font-semibold">
                第{q.week}回
              </div>

              <h2 className="text-lg font-bold mb-4 text-gray-800">
                <FormatText text={q.question} />
              </h2>

              {q.choices && q.choices.length > 0 && (
                <ul className="space-y-2 mb-4">
                  {q.choices.map((choice: string, index: number) => (
                    <li
                      key={index}
                      className="p-3 bg-gray-50 rounded-lg border border-gray-200 text-sm text-gray-700"
                    >
                      <FormatText text={choice} />
                    </li>
                  ))}
                </ul>
              )}

              <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <span className="font-bold text-blue-700 block mb-1">
                  【解答】
                </span>
                <p className="text-gray-800 font-medium">
                  {q.quiz_type === "short_answer"
                    ? JSON.parse(q.answers)[0]
                    : JSON.parse(q.answers).join(", ")}
                </p>
                {q.note && (
                  <p className="text-xs text-gray-500 mt-2 border-t border-blue-100 pt-2">
                    解説：{q.note}
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
