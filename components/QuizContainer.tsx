"use client";
import style from "./QuizContainer.module.css";
import { useState } from "react";

export default function QuizContainer({ question }: { question: any }) {
  const [showAnswer, setShowAnswer] = useState(false);

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
            <div className={style.answer}>
              <p>解答: {question.answer}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
