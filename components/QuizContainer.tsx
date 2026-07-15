"use client";
import { useState, useEffect } from "react";
import { useFavorites } from "@/lib/favoriteContext";
import StarIcon from "./icons/StarIcon";
import FormatText from "./FormatText";
import { useMastered } from "@/lib/masteredContext";

export default function QuizContainer({ question }: { question: any }) {
  const [showAnswer, setShowAnswer] = useState(false);
  const { favorites, toggleFavorite } = useFavorites();
  const { masteredQuestions, toggleMastered } = useMastered();

  const handleShowAnswer = () => {
    setShowAnswer((prev) => !prev);
  };

  const rawAnswer = question.answers;
  const formattedAnswer = JSON.parse(rawAnswer).join(" / ");
  const singleChoiceAnswer = JSON.parse(rawAnswer)[0];

  return (
    <div className="flex flex-col items-stretch gap-4 w-[90%] md:w-4xl">
      {question && (
        <div key={question.id}>
          <div className="p-5 border border-button-color rounded-lg h-60 w-full bg-white">
            <p className="text-[14px] text-gray-600">第{question.week}回</p>
            <FormatText text={question.question} />
          </div>

          <div className="mt-3">
            {question.quiz_type == "multiple_select" ||
            question.quiz_type == "single" ? (
              <ul>
                {question.choices.map((choice: string, index: number) => (
                  <li
                    key={index}
                    className="border border-button-color rounded-lg p-3 mt-2 bg-white"
                  >
                    {index + 1}. <FormatText text={choice} />
                  </li>
                ))}
              </ul>
            ) : null}
          </div>

          <button
            className="bg-main-color text-white border-none rounded-lg px-4 py-3 cursor-pointer mt-3 shadow-main font-bold"
            onClick={handleShowAnswer}
          >
            解答を表示
          </button>
          {showAnswer && (
            <div className="flex items-center">
              <div className="border border-button-color rounded-lg p-3 mt-3 bg-white w-[93%]">
                <p className="font-bold">
                  解答:{" "}
                  {question.quiz_type === "short_answer"
                    ? singleChoiceAnswer
                    : formattedAnswer}
                </p>
                <p className="text-sm mt-2">
                  <FormatText text={question.notes} />
                </p>
              </div>
              <div className="translate-y-1 flex items-center justify-center gap-3">
                <button
                  onClick={() => toggleFavorite(question.id)}
                  aria-label="Toggle Favorite"
                  aria-pressed={favorites.includes(question.id)}
                  className="text-2xl cursor-pointer focus:outline-none ml-2"
                >
                  {favorites.includes(question.id) ? (
                    <StarIcon fill="#facc15" />
                  ) : (
                    <StarIcon fill="none" stroke="currentColor" />
                  )}
                </button>
                <div>
                  <input
                    type="checkbox"
                    checked={masteredQuestions.includes(question.id)}
                    onChange={() => toggleMastered(question.id)}
                    className="scale-160 cursor-pointer"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
