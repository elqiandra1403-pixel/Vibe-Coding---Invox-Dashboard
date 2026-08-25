"use client";

import * as React from "react";
import Link from "next/link";
import { Sun, Moon } from "lucide-react";
import { useUiStore } from "@/stores/uiStore";

export function Navbar() {
  const theme = useUiStore((state) => state.theme);
  const toggleTheme = useUiStore((state) => state.toggleTheme);
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <header className="landing-header">
      <div className="landing-nav-container">
        <Link href="/" className="landing-logo-link">
          <div className="landing-logo-icon">iv</div>
          <span className="landing-logo-text">Invox</span>
        </Link>

        <nav>
          <ul className="landing-nav-menu">
            <li>
              <a href="#features" className="landing-nav-link">
                Features
              </a>
            </li>
            <li>
              <a href="#how-it-works" className="landing-nav-link">
                How it works
              </a>
            </li>
            <li>
              <a href="#solutions" className="landing-nav-link">
                Solutions
              </a>
            </li>
            <li>
              <a href="#pricing" className="landing-nav-link">
                Pricing
              </a>
            </li>
            <li>
              <a href="#faq" className="landing-nav-link">
                FAQ
              </a>
            </li>
          </ul>
        </nav>

        <div className="landing-action-group" style={{ display: "flex", alignItems: "center", gap: 12 }}>
          {/* Theme Toggle Button */}
          {mounted && (
            <button
              type="button"
              onClick={toggleTheme}
              className="landing-theme-toggle-btn"
              title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
              aria-label="Toggle theme"
            >
              {theme === "dark" ? (
                <Sun size={18} className="landing-theme-toggle-icon" />
              ) : (
                <Moon size={18} className="landing-theme-toggle-icon" />
              )}
            </button>
          )}

          <Link href="/login" className="landing-nav-link-signin">
            Sign in
          </Link>
          <Link href="/register" className="landing-btn-getstarted">
            Get started
          </Link>
        </div>
      </div>
    </header>
  );
}


