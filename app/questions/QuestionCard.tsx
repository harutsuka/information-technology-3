import { useState, useEffect } from "react";
import FormatText from "@/components/FormatText";
import StarIcon from "@/components/icons/StarIcon";
import { useFavorites } from "@/lib/favoriteContext";
import { useMastered } from "@/lib/masteredContext";

export default function QuestionCard({
  question,
  isTapToShowAnswersMode,
}: {
  question: any;
  isTapToShowAnswersMode: boolean;
}) {
  const [showAnswer, setShowAnswer] = useState(false);
  const { favorites, toggleFavorite } = useFavorites();
  const { masteredQuestions, toggleMastered } = useMastered();

  useEffect(() => {
    setShowAnswer(false);
  }, [isTapToShowAnswersMode]);

  return (
    <>
      <div key={question.id} className="w-full">
        <div className="inline-block bg-white border-t border-x border-gray-400 px-4 py-1 font-bold text-sm">
          第{question.week}回
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 border border-gray-400 bg-white">
          <div className="col-span-1 md:col-span-2 border-b md:border-r border-gray-400 p-4 min-h-20">
            <p className="font-bold text-gray-500 text-xs mb-1">【問題文】</p>
            <p className="text-gray-800 font-medium leading-relaxed">
              <FormatText text={question.question} />
            </p>
          </div>

          <div className="col-span-1 border-b border-gray-400 p-4 bg-gray-50/50">
            <p className="font-bold text-gray-500 text-xs mb-1">【解答】</p>
            {isTapToShowAnswersMode ? (
              showAnswer ? (
                <p className="text-blue-600 font-bold">
                  <FormatText text={JSON.parse(question.answers).join(" / ")} />
                </p>
              ) : (
                <p
                  className="text-gray-400 text-sm cursor-pointer"
                  onClick={() => setShowAnswer(!showAnswer)}
                >
                  タップして表示
                </p>
              )
            ) : (
              <p className="text-blue-600 font-bold">
                <FormatText text={JSON.parse(question.answers).join(" / ")} />
              </p>
            )}
            <p className="text-gray-500 text-sm mt-1">{question.notes}</p>
          </div>

          <div className="col-span-1 md:col-span-2 border-b md:border-r md:border-b-0 border-gray-400 p-4 bg-white">
            {question.choices && question.choices.length > 0 ? (
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-gray-700">
                {question.choices.map((choice: string, index: number) => (
                  <li
                    key={index}
                    className="bg-gray-50 px-3 py-1.5 rounded border border-gray-200"
                  >
                    <FormatText text={choice} />
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
                onClick={() => toggleFavorite(question.id)}
                aria-label="お気に入りに追加"
                aria-pressed={favorites.includes(question.id)}
                className="text-xl active:scale-95 transition-transform focus:outline-none cursor-pointer"
              >
                {favorites.includes(question.id) ? (
                  <StarIcon fill="#facc15" />
                ) : (
                  <StarIcon fill="none" stroke="currentColor" />
                )}
              </button>
            </div>

            <div className="p-3 flex items-center justify-between gap-1 bg-white">
              <label className="font-bold text-xs text-gray-700">
                覚えた？
                <input
                  type="checkbox"
                  checked={masteredQuestions.includes(question.id)}
                  onChange={() => toggleMastered(question.id)}
                  className="cursor-pointer ml-2"
                  aria-label="覚えた問題に追加"
                />
              </label>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
