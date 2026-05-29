import RangeSettings from "@/components/rangeSettings";
import Link from "next/link";

export default function Home() {
  return (
    <main className="container px-6 py-8">
      <div className="flex flex-col items-center gap-4 max-w-md mx-auto p-4">
        <div className="w-full text-center border border-dashed border-gray-300 p-6 rounded-lg mb-2">
          <RangeSettings />
        </div>

        <Link href="/quiz" className="w-full inline-block">
          <div className="bg-main-color hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-lg text-center shadow-main">
            🚀 クイズをはじめる
          </div>
        </Link>

        <Link href="/questions" className="w-full inline-block">
          <div className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-3 px-6 rounded-lg text-center shadow-main transition-colors">
            📕 問題一覧を見る
          </div>
        </Link>
      </div>
    </main>
  );
}
