"use client";
// Light/dark mode — sets data-theme attribute on <html>
// Reads from uiStore and system preference
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
