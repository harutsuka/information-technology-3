"use client";
import style from "./QuizContainer.module.css";
import { useState, useEffect } from "react";
import { useFavorites } from "@/lib/favoriteContext";

export default function QuizContainer({ question }: { question: any }) {
  const [showAnswer, setShowAnswer] = useState(false);
  const { favorites, toggleFavorite } = useFavorites();

  const handleShowAnswer = () => {
    setShowAnswer((prev) => !prev);
  };

  return (
    <div className={style.container}>
      {question && (
        <div key={question.id}>
          <div className={style.question}>
            <p className={style.week}>第{question.week}回</p>
            <p>{question.question}</p>
          </div>

          <div className={style.choices}>
            {question.choices?.length > 0 && (
              <ul>
                {question.choices.map((choice: string, index: number) => (
                  <li key={index} className={style.choice}>
                    {choice}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <button className={style.showAnswerButton} onClick={handleShowAnswer}>
            解答を表示
          </button>
          {showAnswer && (
            <div className={style.answerContainer}>
              <div className={style.answer}>
                <p>解答: {question.answer}</p>
              </div>
              <button
                onClick={() => toggleFavorite(question.id)}
                className="text-2xl focus:outline-none ml-2"
              >
                {favorites.includes(question.id) ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="#facc15"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
                    />
                  </svg>
                )}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
