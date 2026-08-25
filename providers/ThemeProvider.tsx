"use client";

import * as React from "react";
import { useUiStore } from "@/stores/uiStore";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const theme = useUiStore((state) => state.theme);

  React.useEffect(() => {
    const savedTheme = localStorage.getItem("invox-theme") as "light" | "dark" | null;
    if (savedTheme && (savedTheme === "light" || savedTheme === "dark")) {
      document.documentElement.setAttribute("data-theme", savedTheme);
      if (savedTheme !== theme) {
        useUiStore.getState().setTheme(savedTheme);
      }
    } else {
      document.documentElement.setAttribute("data-theme", theme);
    }
  }, []);

  React.useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return <>{children}</>;
}

