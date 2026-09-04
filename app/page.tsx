"use client";
import { useState, useEffect } from "react";
import RangeSettings from "@/components/RangeSettings";
import Link from "next/link";

export default function Home() {
  const [selectedWeeks, setSelectedWeeks] = useState<number[]>([1]);
  const [limit, setLimit] = useState(10);
  const [onlyFavorites, setOnlyFavorites] = useState(false);
  const [excludeMastered, setExcludeMastered] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // 画面が開いた時に読み込み
  useEffect(() => {
    const savedFavorites = localStorage.getItem("quiz_onlyFavorites");
    const savedMastered = localStorage.getItem("quiz_excludeMastered");
    const savedWeeks = localStorage.getItem("quiz_selectedWeeks");

    if (savedFavorites !== null) setOnlyFavorites(savedFavorites === "true");
    if (savedMastered !== null) setExcludeMastered(savedMastered === "true");
    if (savedWeeks !== null) {
      try {
        const parsedWeeks = JSON.parse(savedWeeks);
        if (Array.isArray(parsedWeeks)) {
          setSelectedWeeks(parsedWeeks);
        }
      } catch (error) {
        console.error("Error parsing saved weeks:", error);
      }
    }

    setIsLoaded(true);
  }, []);

  // isLoaded が true になるまでは保存処理をスキップする
  useEffect(() => {
    if (!isLoaded) return;

    localStorage.setItem("quiz_onlyFavorites", onlyFavorites.toString());
    localStorage.setItem("quiz_excludeMastered", excludeMastered.toString());
    localStorage.setItem("quiz_selectedWeeks", JSON.stringify(selectedWeeks));
  }, [onlyFavorites, excludeMastered, isLoaded, selectedWeeks]);

  const quizUrl = `/quiz?weeks=${selectedWeeks.join(",")}&limit=${limit}${onlyFavorites ? `&onlyFavorites=${onlyFavorites}` : ""}${excludeMastered ? `&excludeMastered=${excludeMastered}` : ""}`;

  return (
    <main className="container px-2 py-4 mx-auto md:pt-24 md:flex md:flex-col md:px-16">
      <div className="flex flex-col items-center gap-4 max-w-md mx-auto p-4 md:max-w-6xl md:flex-row md:items-center md:gap-16">
        <div className="flex flex-col gap-4 w-full">
          <div className="w-full text-center border border-dashed border-gray-300 p-6 rounded-lg mb-2 md:mb-0">
            <RangeSettings
              selectedWeeks={selectedWeeks}
              setSelectedWeeks={setSelectedWeeks}
              limit={limit}
              setLimit={setLimit}
              onlyFavorites={onlyFavorites}
              setOnlyFavorites={setOnlyFavorites}
              excludeMastered={excludeMastered}
              setExcludeMastered={setExcludeMastered}
            />
          </div>
          {/* 動的に作ったURL（quizUrl）を使ってクイズページに飛ぶ */}
          <Link href={quizUrl} className="w-full inline-block">
            <div
              className="bg-main-color hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-lg text-center shadow-main"
              onClick={() => {
                // クイズを開始する前に、設定をlocalStorageに保存
                localStorage.setItem(
                  "quiz_onlyFavorites",
                  onlyFavorites.toString(),
                );
                localStorage.setItem(
                  "quiz_excludeMastered",
                  excludeMastered.toString(),
                );
                localStorage.setItem(
                  "quiz_selectedWeeks",
                  JSON.stringify(selectedWeeks),
                );
              }}
            >
              🚀 クイズをはじめる
            </div>
          </Link>
        </div>
        <div className="flex flex-col gap-4 w-full">
          <Link href="/questions" className="w-full inline-block">
            <div className="bg-slate-500 hover:bg-slate-600 text-white font-bold py-4 px-6 rounded-lg text-center shadow-main transition-colors">
              📕 問題一覧を見る
            </div>
          </Link>

          <Link href="/favorites" className="w-full inline-block">
            <div className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-4 px-6 rounded-lg text-center shadow-main transition-colors">
              🌟 お気に入りの問題を見る
            </div>
          </Link>
          <Link href="/mastered" className="w-full inline-block">
            <div className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-4 px-6 rounded-lg text-center shadow-main transition-colors">
              ☑️ 覚えた問題を見る
            </div>
          </Link>
          <div className="w-full inline-block bg-gray-100 border border-gray-300 text-gray-700 font-medium py-3 px-6 rounded-lg text-center">
            <p>プロジェクト停止してます🙇</p>
          </div>
        </div>
      </div>
    </main>
  );
}
