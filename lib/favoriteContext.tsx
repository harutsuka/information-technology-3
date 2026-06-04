"use client";
import React, { createContext, useContext, useState, useEffect } from "react";

type FavoriteContextType = {
  favorites: string[];
  toggleFavorite: (id: string) => void;
};

const FavoriteContext = createContext<FavoriteContextType | undefined>(
  undefined,
);

export function FavoriteProvider({ children }: { children: React.ReactNode }) {
  const [favorites, setFavorites] = useState<string[]>([]);

  // 画面起動時にブラウザから読み込み
  useEffect(() => {
    const saved = localStorage.getItem("quiz_favorites");
    if (saved) setFavorites(JSON.parse(saved));
  }, []);

  // お気に入りの切り替え関数
  const toggleFavorite = (id: string) => {
    let updated: string[];
    if (favorites.includes(id)) {
      updated = favorites.filter((favId) => favId !== id);
    } else {
      updated = [...favorites, id];
    }
    setFavorites(updated);
    localStorage.setItem("quiz_favorites", JSON.stringify(updated));
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
