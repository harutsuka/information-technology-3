"use client";
import style from "./QuizContainer.module.css";
import { useState, useEffect } from "react";
import { useFavorites } from "@/lib/favoriteContext";
import StarIcon from "./icons/StarIcon";

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
            <p>{question.question}</p>
          </div>

          <div className={style.choices}>
            {question.quiz_type == "multiple" ||
            question.quiz_type == "single" ? (
              <ul>
                {question.choices.map((choice: string, index: number) => (
                  <li key={index} className={style.choice}>
                    {choice}
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
                <p>解答: {formattedAnswer}</p>
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
