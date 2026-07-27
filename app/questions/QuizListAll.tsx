"use client";
import { useState, useEffect } from "react";
import StarIcon from "@/components/icons/StarIcon";
import FormatText from "@/components/FormatText";
import { useFavorites } from "@/lib/favoriteContext";
import { useMastered } from "@/lib/masteredContext";
import QuestionCard from "./QuestionCard";

export default function QuizListAll({ allQuestions }: { allQuestions: any[] }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedWeek, setSelectedWeek] = useState<string>("");
  const { favorites, toggleFavorite } = useFavorites();
  const { masteredQuestions, toggleMastered } = useMastered();
  const [onlyFavorites, setOnlyFavorites] = useState(false);
  const [excludeMastered, setExcludeMastered] = useState(false);
  const [isTapToShowAnswersMode, setIsTapToShowAnswersMode] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [currentPage, selectedWeek]);

  const weeks = Array.from(new Set(allQuestions.map((q) => q.week))).sort(
    (a, b) => a - b,
  );
  const sortedQuestions = [...allQuestions].sort((a, b) => a.id - b.id);

  let filteredQuestions = sortedQuestions;
  if (selectedWeek) {
    filteredQuestions = filteredQuestions.filter(
      (q) => q.week === Number(selectedWeek),
    );
  }
  if (onlyFavorites) {
    filteredQuestions = filteredQuestions.filter((q) =>
      favorites.includes(q.id),
    );
  }
  if (excludeMastered) {
    filteredQuestions = filteredQuestions.filter(
      (q) => !masteredQuestions.includes(q.id),
    );
  }

  const sliceSize = 30;
  const currentSlice = filteredQuestions.slice(
    (currentPage - 1) * sliceSize,
    currentPage * sliceSize,
  );
  const totalPages = Math.ceil(filteredQuestions.length / sliceSize);
  const pageNumbers = Array(totalPages)
    .fill(0)
    .map((_, i) => i + 1);

  if (sortedQuestions.length === 0) {
    return <p className="text-center my-8">問題が見つかりませんでした。</p>;
  }

  return (
    <div>
      <div className="p-4 flex flex-col gap-4 flex-wrap md:flex-row md:items-center">
        <select
          onChange={(e) => {
            (setSelectedWeek(e.target.value), setCurrentPage(1));
          }}
          value={selectedWeek}
          className="border bg-white border-gray-400 rounded px-2 py-1"
        >
          <option value="">すべての週</option>
          {weeks.map((week) => (
            <option key={week} value={week}>
              第{week}回
            </option>
          ))}
        </select>

        <div className="flex items-center justify-between gap-2">
          <span className="font-medium text-gray-700">
            解答をタップして表示
          </span>
          <button
            type="button"
            role="switch"
            aria-checked={isTapToShowAnswersMode}
            onClick={() => setIsTapToShowAnswersMode((prev) => !prev)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors
          ${isTapToShowAnswersMode ? "bg-blue-600" : "bg-gray-300"}`}
          >
            <span
              className={`inline-block h-5 w-5 transform rounded-full bg-white shadow transition-transform
            ${isTapToShowAnswersMode ? "translate-x-5" : "translate-x-0.5"}`}
            />
          </button>
        </div>

        <div className="flex items-center justify-between gap-2">
          <span className="font-medium text-gray-700">
            お気に入りのみ表示する
          </span>
          <button
            type="button"
            role="switch"
            aria-checked={excludeMastered}
            onClick={() => {
              setOnlyFavorites(!onlyFavorites);
            }}
          />
          お気に入りのみ表示する
        </div>
        <div className="flex gap-2">
          <input
            type="checkbox"
            id="excludeMastered"
            checked={excludeMastered}
            className="ml-4"
            onChange={() => {
              setExcludeMastered(!excludeMastered);
            }}
          />
          覚えた問題を表示しない
        </div>
      </div>

      <div className="p-4 max-w-4xl mx-auto flex flex-col gap-8">
        {currentSlice.length === 0 ? (
          <p className="text-center my-8">
            選択された条件に一致する問題が見つかりませんでした。
          </p>
        ) : (
          currentSlice.map((question: any) => (
            <QuestionCard
              question={question}
              isTapToShowAnswersMode={isTapToShowAnswersMode}
              key={question.id}
            />
          ))
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
        ))}
      </div>
      <div className="flex gap-2 justify-center my-2">
        {pageNumbers.map((pageNumber) => (
          <button
            key={pageNumber}
            onClick={() => setCurrentPage(pageNumber)}
            className={`px-1 py-1  ${
              currentPage === pageNumber ? "text-blue-500" : "text-gray-500"
            }`}
          >
            {pageNumber}
          </button>
        ))}
      </div>
    </div>
  );
}
