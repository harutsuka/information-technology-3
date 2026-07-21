"use client";
import { useEffect, useState, Suspense } from "react"; // 💡 Suspense をインポート
import { useSearchParams } from "next/navigation";
import { getQuestions } from "@/lib/questions";
import { filterQuestionsByWeek } from "@/lib/quiz";
import { shuffleQuestions } from "@/lib/quiz";
import Link from "next/link";
import QuizContainer from "@/components/QuizContainer";
import { useFavorites } from "@/lib/favoriteContext";
import { useMastered } from "@/lib/masteredContext";

export default function QuizPage() {
  return (
    // 💡 ページ全体を <Suspense> で囲む
    <Suspense fallback={<p className="text-center my-8">読み込み中...</p>}>
      <QuizPageContent />
    </Suspense>
  );
}

function QuizPageContent() {
  const [questions, setQuestions] = useState<any[] | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const { favorites } = useFavorites();
  const { masteredQuestions } = useMastered();
  const currentQuestion = questions?.[currentIndex];

  const searchParams = useSearchParams();
  const weeksParam = searchParams.get("weeks");
  const limitParam = searchParams.get("limit");

  const selectedWeeks = weeksParam ? weeksParam.split(",").map(Number) : [1];
  const limit = limitParam ? parseInt(limitParam) : 10;
  const favoriteParam = searchParams.get("onlyFavorites");
  const masteredParam = searchParams.get("excludeMastered");

  const handleNextQuestion = () => {
    if (questions && currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  useEffect(() => {
    const initializeQuestions = async () => {
      try {
        const allQuestions = await getQuestions();
        const filteredQuestions = filterQuestionsByWeek(
          allQuestions,
          selectedWeeks,
        );

        let currentQuestions = filteredQuestions;
        if (favoriteParam === "true") {
          currentQuestions = currentQuestions.filter((question) =>
            favorites.includes(question.id),
          );
        }
        if (masteredParam === "true") {
          currentQuestions = currentQuestions.filter(
            (question) => !masteredQuestions.includes(question.id),
          );
        }
        const shuffledQuestions = shuffleQuestions([...currentQuestions]);
        const limitedQuestions = shuffledQuestions.slice(0, limit);
        setQuestions(limitedQuestions);
        setCurrentIndex((prev) =>
          Math.min(prev, Math.max(limitedQuestions.length - 1, 0)),
        );
      } catch (err) {
        console.error(err);
      }
    };
    initializeQuestions();
  }, [
    weeksParam,
    limitParam,
    favoriteParam,
    masteredParam,
    favorites,
    masteredQuestions,
  ]);

  if (!questions) {
    return <p className="text-center my-8">読み込み中...</p>;
  }

  if (questions.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="mb-4">選択された週の問題が見つかりませんでした。</p>
        <Link href="/" className="text-blue-500 underline">
          トップへ戻る
        </Link>
      </div>
    );
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
        <div className="fixed bottom-[8%] left-1/2 -translate-x-1/2 z-50">
          <button
            onClick={handleNextQuestion}
            className="bg-main-color hover:bg-blue-700 text-white font-bold py-4 px-10 rounded-lg text-center shadow-main transition-colors whitespace-nowrap"
          >
            次の問題へ
          </button>
        </div>
      ) : (
        <div className="fixed bottom-[8%] left-1/2 -translate-x-1/2 z-50">
          <Link href="/" className="inline-block">
            <div className="bg-main-color hover:bg-blue-700 text-white font-bold py-4 px-10 rounded-lg text-center shadow-main transition-colors whitespace-nowrap">
              トップへ戻る
            </div>
          </Link>
        </div>
      )}

      <div className="h-48 w-full pointer-events-none" />
    </>
  );
}
