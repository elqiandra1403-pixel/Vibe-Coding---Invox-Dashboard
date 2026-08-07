"use client";
import { useState, useEffect } from "react";

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(initialValue);
  // Phase 2: Implement with SSR safety guard
  const setValue = (value: T) => {
    setStoredValue(value);
    if (typeof window !== "undefined") {
      localStorage.setItem(key, JSON.stringify(value));
    }
  };
  return [storedValue, setValue] as const;
}
