"use client";
import { useState, useEffect } from "react";
import StarIcon from "@/components/icons/StarIcon";
import FormatText from "@/components/FormatText";

export default function QuizListAll({ allQuestions }: { allQuestions: any[] }) {
  const [currentPage, setCurrentPage] = useState(1);
  const sortedQuestions = [...allQuestions].sort((a, b) => a.id - b.id);
  const sliceSize = 30;
  const currentSlice = sortedQuestions.slice(
    (currentPage - 1) * sliceSize,
    currentPage * sliceSize,
  );

  if (sortedQuestions.length === 0) {
    return <p className="text-center my-8">問題が見つかりませんでした。</p>;
  }

  return (
    <div className="p-4 max-w-4xl mx-auto flex flex-col gap-8">
      {currentSlice.map((question: any) => (
        <div key={question.id} className="w-full">
          <div className="inline-block bg-white border-t border-x border-gray-400 px-4 py-1 font-bold text-sm">
            第{question.week}回
          </div>

          <div className="grid grid-cols-3 border border-gray-400 bg-white">
            <div className="col-span-2 border-b border-r border-gray-400 p-4 min-h-[80px]">
              <p className="font-bold text-gray-500 text-xs mb-1">【問題文】</p>
              <p className="text-gray-800 font-medium leading-relaxed">
                <FormatText text={question.question} />
              </p>
            </div>

            <div className="col-span-1 border-b border-gray-400 p-4 bg-gray-50/50">
              <p className="font-bold text-gray-500 text-xs mb-1">【解答】</p>
              <p className="text-blue-600 font-bold">
                <FormatText text={JSON.parse(question.answers).join(" / ")} />
              </p>
            </div>

            <div className="col-span-2 border-r border-gray-400 p-4 bg-white">
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
                  disabled
                  className="text-xl active:scale-95 transition-transform focus:outline-none cursor-pointer"
                >
                  {question.isFavorite ? (
                    <StarIcon fill="#facc15" />
                  ) : (
                    <StarIcon fill="none" stroke="currentColor" />
                  )}
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
