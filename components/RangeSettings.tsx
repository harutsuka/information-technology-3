"use client";

// 外からデータを受け取るための型定義
interface RangeSettingsProps {
  selectedWeeks: number[];
  setSelectedWeeks: React.Dispatch<React.SetStateAction<number[]>>;
  limit: number;
  setLimit: React.Dispatch<React.SetStateAction<number>>;
  onlyFavorites: boolean;
  setOnlyFavorites: React.Dispatch<React.SetStateAction<boolean>>;
  excludeMastered: boolean;
  setExcludeMastered: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function RangeSettings({
  selectedWeeks,
  setSelectedWeeks,
  limit,
  setLimit,
  onlyFavorites,
  setOnlyFavorites,
  excludeMastered,
  setExcludeMastered,
}: RangeSettingsProps) {
  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-4">
        {[1, 2, 3, 4, 5, 6, 7, 9, 10, 11, 12].map((week) => {
          const isSelected = selectedWeeks.includes(week);

          return (
            <button
              key={week}
              type="button"
              onClick={() => {
                if (isSelected) {
                  setSelectedWeeks(selectedWeeks.filter((w) => w !== week));
                } else {
                  setSelectedWeeks([...selectedWeeks, week]);
                }
              }}
              className={`w-18 py-2 rounded-full border text-sm font-medium transition-colors md:w-20 md:text-base ${
                isSelected
                  ? "bg-main-color text-white border-none" // 選択中
                  : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50" // 未選択
              }`}
            >
              第{week}回
            </button>
          );
        })}
      </div>
      <div className="flex items-center gap-2 mb-4 md:text-lg">
        問題数:
        <input
          type="number"
          className="ml-2 w-20 px-2 py-1 border rounded"
          value={limit} // ここを value に変更
          onChange={(e) => {
            const val = e.target.value;
            if (val === "") {
              setLimit("" as any);
              return;
            }
            // 数字が入力されたら、0以下のときは1に、それ以外は入力された数字にする
            const num = parseInt(val, 10);
            setLimit(isNaN(num) || num < 1 ? 1 : num);
          }}
        />
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2 text-lg">
          <input
            type="checkbox"
            checked={onlyFavorites}
            onChange={() => setOnlyFavorites(!onlyFavorites)}
          />
          お気に入りの問題からのみ出題する
        </div>
        <div className="flex items-center gap-2 text-lg">
          <input
            type="checkbox"
            checked={excludeMastered}
            onChange={() => setExcludeMastered(!excludeMastered)}
          />
          覚えた問題を出題しない
        </div>
      </div>
    </div>
  );
}
