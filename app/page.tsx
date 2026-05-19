"use client";
import { useEffect, useState } from "react";
import { getQuestions } from "@/lib/questions";
import QuizContainer from "@/components/quizContainer";
import { filterQuestionsByWeek } from "@/lib/quiz";
import { shuffleQuestions } from "@/lib/quiz";

export default function Home() {
  const [questions, setQuestions] = useState<any[] | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentQuestion = questions?.[currentIndex];

  useEffect(() => {
    const initializeQuestions = async () => {
      try {
        const allQuestions = await getQuestions();
        const filteredQuestions = filterQuestionsByWeek(allQuestions, 1);
        const shuffledQuestions = shuffleQuestions(filteredQuestions);

        setQuestions(filteredQuestions);
      } catch (err) {
        console.error(err);
      }
    };
    initializeQuestions();
  }, []);
  if (!questions) {
    return <p>Loading...</p>;
  }

  return (
    <main>
      <h1>情報3 定着確認</h1>
      <QuizContainer question={currentQuestion} />
    </main>
  );
}
