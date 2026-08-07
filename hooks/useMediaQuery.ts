"use client";
import { useState, useEffect } from "react";

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);
  useEffect(() => {
    const media = window.matchMedia(query);
    setMatches(media.matches);
    const handler = (e: MediaQueryListEvent) => setMatches(e.matches);
    media.addEventListener("change", handler);
    return () => media.removeEventListener("change", handler);
  }, [query]);
  return matches;
}

// Convenience breakpoint hooks
export const useIsDesktop = () => useMediaQuery("(min-width: 1280px)");
export const useIsTablet = () => useMediaQuery("(min-width: 768px) and (max-width: 1279px)");
export const useIsMobile = () => useMediaQuery("(max-width: 767px)");
