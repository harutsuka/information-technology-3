"use client";
import { useEffect, useState } from "react";
import { getQuestions } from "@/lib/questions";
import { filterQuestionsByWeek } from "@/lib/quiz";
import { shuffleQuestions } from "@/lib/quiz";
import Link from "next/link";
import QuizContainer from "@/components/quizContainer";

export default function QuizPage() {
  const [questions, setQuestions] = useState<any[] | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentQuestion = questions?.[currentIndex];
  const [selectedWeeks, setSelectedWeeks] = useState([4]);

  const handleNextQuestion = () => {
    if (questions && currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  useEffect(() => {
    const initializeQuestions = async () => {
      try {
        const allQuestions = await getQuestions();
        const filteredQuestions = filterQuestionsByWeek(allQuestions, [
          ...selectedWeeks,
        ]);
        const shuffledQuestions = shuffleQuestions([...filteredQuestions]);

        setQuestions(shuffledQuestions);
      } catch (err) {
        console.error(err);
      }
    };
    initializeQuestions();
  }, [selectedWeeks]);
  if (!questions) {
    return <p>読み込み中...</p>;
  }

  return (
    <>
      {currentQuestion && (
        <p>
          {currentIndex + 1}問目 / {questions.length}問
        </p>
      )}

      <QuizContainer question={currentQuestion} key={currentQuestion?.id} />
      {currentIndex < questions.length - 1 ? (
        <div className="fixed bottom-[10%] left-1/2 -translate-x-1/2">
          <button
            onClick={handleNextQuestion}
            className="bg-main-color hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-lg text-center shadow-main transition-colors"
          >
            次の問題へ
          </button>
        </div>
      ) : (
        <Link
          href="/"
          className="inline-block fixed bottom-[10%] left-1/2 -translate-x-1/2"
        >
          <div className="bg-main-color hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-lg text-center shadow-main transition-colors">
            トップへ戻る
          </div>
        </Link>
      )}
    </>
  );
}
