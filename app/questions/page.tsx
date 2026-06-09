import { getQuestions } from "@/lib/questions";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function QuestionsPage() {
  // 💡 1. サーバーサイドで、Supabaseからデータを直に取ってくる（ここでじっと待ちます）
  const allQuestions = (await getQuestions()) || [];

  // 💡 2. 取ってきたデータをその場でソートする（useStateやuseEffectは一切不要！）
  const sortedQuestions = [...allQuestions].sort((a, b) => a.id - b.id);

  // 💡 3. 万が一データが1件もない場合は、ここで終わり
  if (sortedQuestions.length === 0) {
    return <p className="text-center my-8">問題が見つかりませんでした。</p>;
  }

  // 💡 4. データがある場合は、最初から問題が入ったHTMLをブラウザにドカンと返します！
  return (
    <div className="p-4 max-w-4xl mx-auto flex flex-col gap-8">
      {sortedQuestions.map((question: any) => (
        <div key={question.id} className="w-full">
          <div className="inline-block bg-white border-t border-x border-gray-400 px-4 py-1 font-bold text-sm">
            第{question.week}回
          </div>

          <div className="grid grid-cols-3 border border-gray-400 bg-white">
            <div className="col-span-2 border-b border-r border-gray-400 p-4 min-h-[80px]">
              <p className="font-bold text-gray-500 text-xs mb-1">【問題文】</p>
              <p className="text-gray-800 font-medium leading-relaxed">
                {question.question}
              </p>
            </div>

            <div className="col-span-1 border-b border-gray-400 p-4 bg-gray-50/50">
              <p className="font-bold text-gray-500 text-xs mb-1">【解答】</p>
              <p className="text-blue-600 font-bold">{question.answer}</p>
            </div>

            <div className="col-span-2 border-r border-gray-400 p-4 bg-white">
              {question.choices && question.choices.length > 0 ? (
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-gray-700">
                  {question.choices.map((choice: string, index: number) => (
                    <li
                      key={index}
                      className="bg-gray-50 px-3 py-1.5 rounded border border-gray-200"
                    >
                      {choice}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-400 text-xs italic">記述式問題</p>
              )}
            </div>

            <div className="col-span-1 grid grid-cols-2 bg-gray-50">
              <div className="border-r border-gray-400 p-3 flex items-center justify-between gap-1 bg-white">
                <span className="font-bold text-xs text-gray-700">
                  お気に入り
                </span>
                <button
                  type="button"
                  disabled
                  className="text-xl active:scale-95 transition-transform focus:outline-none cursor-pointer"
                >
                  {question.isFavorite ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="#facc15"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="none"
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

              <div className="p-3 flex items-center justify-between gap-1">
                <span className="font-bold text-xs text-gray-700">
                  覚えた？
                </span>
                <input type="checkbox" disabled />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
