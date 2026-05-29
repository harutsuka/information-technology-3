"use client";
import { useState } from "react";

export default function RangeSettings() {
  const [selectedWeeks, setSelectedWeeks] = useState<number[]>([1]);
  const [limit, setLimit] = useState(10);

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-4">
        {[1, 2, 3, 4, 5, 6].map((week) => {
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
              className={`px-4 py-2 rounded-full border text-sm font-medium transition-colors ${
                isSelected
                  ? "bg-main-color text-white" // 選択中
                  : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50" // 未選択
              }`}
            >
              第{week}週
            </button>
          );
        })}
      </div>
      <div className="flex items-center gap-2 mb-4">
        問題数（任意）:
        <input
          type="number"
          className="ml-2 w-20 px-2 py-1 border rounded"
          defaultValue={10}
          onChange={(e) => setLimit(parseInt(e.target.value) || 10)}
        />
      </div>
    </div>
  );
}
