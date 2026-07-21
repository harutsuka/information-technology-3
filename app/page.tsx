"use client";
import { useState } from "react";
import RangeSettings from "@/components/RangeSettings";
import Link from "next/link";

export default function Home() {
  // ここで選択された週番号と問題数を管理する
  const [selectedWeeks, setSelectedWeeks] = useState<number[]>([12]);
  const [limit, setLimit] = useState(10);

  // クイズページに渡すURLを自動で作る（例: /quiz?weeks=1,2&limit=10）
  const quizUrl = `/quiz?weeks=${selectedWeeks.join(",")}&limit=${limit}`;

  return (
    <main className="container px-6 py-4 mx-auto md:pt-24 md:flex md:flex-col md:px-16">
      <div className="flex flex-col items-center gap-4 max-w-md mx-auto p-4 md:max-w-6xl md:flex-row md:items-center md:gap-16">
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
        <div className="flex flex-col gap-4 w-full">
          {/* 動的に作ったURL（quizUrl）を使ってクイズページに飛ぶ */}
          <Link href={quizUrl} className="w-full inline-block">
            <div className="bg-main-color hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-lg text-center shadow-main">
              🚀 クイズをはじめる
            </div>
          </Link>

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
            <p>問題一覧で週のフィルターが使えるようになりました！</p>
          </div>
        </div>
      </div>
    </main>
  );
}
