"use client";
import React, { createContext, useContext, useState, useEffect } from "react";

type FavoriteContextType = {
  favorites: number[];
  toggleFavorite: (id: number) => void;
};

const FavoriteContext = createContext<FavoriteContextType | undefined>(
  undefined,
);

export function FavoriteProvider({ children }: { children: React.ReactNode }) {
  const [favorites, setFavorites] = useState<number[]>(() => {
    if (typeof window === "undefined") return [];
    try {
      const saved = localStorage.getItem("quiz_favorites");
      if (!saved) return [];
      const parsed = JSON.parse(saved);
      return Array.isArray(parsed) ? parsed : [];
    } catch (error) {
      console.error(
        "Failed to parse favorite questions from localStorage",
        error,
      );
      return [];
    }
  });

  // 画面起動時にブラウザから読み込み
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("quiz_favorite", JSON.stringify(favorites));
    }
  }, []);

  // お気に入りの切り替え関数
  const toggleFavorite = (id: number) => {
    setFavorites((prev) => {
      let updated: number[];
      if (prev.includes(id)) {
        updated = prev.filter((favId) => favId !== id);
      } else {
        updated = [...prev, id];
      }
      return updated;
    });
  };

  return (
    <FavoriteContext.Provider value={{ favorites, toggleFavorite }}>
      {children}
    </FavoriteContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoriteContext);
  if (!context)
    throw new Error("useFavorites must be used within a FavoriteProvider");
  return context;
}
