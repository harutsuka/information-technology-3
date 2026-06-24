"use client";
import style from "./QuizContainer.module.css";
import { useState, useEffect } from "react";
import { useFavorites } from "@/lib/favoriteContext";
import StarIcon from "./icons/StarIcon";
import FormatText from "./FormatText";

export default function QuizContainer({ question }: { question: any }) {
  const [showAnswer, setShowAnswer] = useState(false);
  const { favorites, toggleFavorite } = useFavorites();

  const handleShowAnswer = () => {
    setShowAnswer((prev) => !prev);
  };

  const rawAnswer = question.answers;
  const formattedAnswer = JSON.parse(rawAnswer).join(" / ");

  return (
    <div className={style.container}>
      {question && (
        <div key={question.id}>
          <div className={style.question}>
            <p className={style.week}>第{question.week}回</p>
            <FormatText text={question.question} />
          </div>

          <div className={style.choices}>
            {question.quiz_type == "multiple_select" ||
            question.quiz_type == "single" ? (
              <ul>
                {question.choices.map((choice: string, index: number) => (
                  <li key={index} className={style.choice}>
                    {index + 1}. <FormatText text={choice} />
                  </li>
                ))}
              </ul>
            ) : null}
          </div>

          <button className={style.showAnswerButton} onClick={handleShowAnswer}>
            解答を表示
          </button>
          {showAnswer && (
            <div className={style.answerContainer}>
              <div className={style.answer}>
                <p className="font-bold">
                  解答: <FormatText text={formattedAnswer} />
                </p>
                <p className="text-sm mt-2">
                  <FormatText text={question.notes} />
                </p>
              </div>
              <button
                onClick={() => toggleFavorite(question.id)}
                className="text-2xl focus:outline-none ml-2"
              >
                {favorites.includes(question.id) ? (
                  <StarIcon fill="#facc15" />
                ) : (
                  <StarIcon fill="none" stroke="currentColor" />
                )}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
