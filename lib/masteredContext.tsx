"use client";
import React, { createContext, useContext, useEffect, useState } from "react";

type MasteredContextType = {
  masteredQuestions: number[];
  toggleMastered: (id: number) => void;
};

const MasteredContext = createContext<MasteredContextType | undefined>(
  undefined,
);

export function MasteredProvider({ children }: { children: React.ReactNode }) {
  const [mastered, setMastered] = useState<number[]>(() => {
    if (typeof window === "undefined") return [];
    const saved = localStorage.getItem("quiz_mastered");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("quiz_mastered", JSON.stringify(mastered));
    }
  }, [mastered]);

  const toggleMastered = (id: number) => {
    let updated: number[];
    if (mastered.includes(id)) {
      updated = mastered.filter((masteredId) => masteredId !== id);
    } else {
      updated = [...mastered, id];
    }
    setMastered(updated);
  };

  return (
    <MasteredContext.Provider
      value={{ masteredQuestions: mastered, toggleMastered }}
    >
      {children}
    </MasteredContext.Provider>
  );
}

export function useMastered() {
  const context = useContext(MasteredContext);
  if (!context)
    throw new Error("useMastered must be used within a MasteredProvider");
  return context;
}
