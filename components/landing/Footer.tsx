"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export function Footer() {
  return (
    <footer className="landing-footer">
      <div className="landing-container">
        <div className="landing-footer-grid">
          {/* Column 1: Brand & Tagline */}
          <div className="landing-footer-col-brand">
            <Link href="/" className="landing-logo-link">
              <div className="landing-logo-icon">iv</div>
              <span className="landing-logo-text">Invox</span>
            </Link>
            <p className="landing-footer-tagline">
              Modern invoice management for <br className="hidden-mobile" />
              modern businesses.
            </p>
          </div>

          {/* Column 2: Product Links */}
          <div className="landing-footer-col">
            <h4 className="landing-footer-heading">Product</h4>
            <ul className="landing-footer-links">
              <li><a href="#features">Features</a></li>
              <li><a href="#how-it-works">How it works</a></li>
              <li><a href="#pricing">Pricing</a></li>
              <li><a href="#security">Security</a></li>
              <li><a href="#faq">FAQ</a></li>
            </ul>
          </div>

          {/* Column 3: Account Links */}
          <div className="landing-footer-col">
            <h4 className="landing-footer-heading">Account</h4>
            <ul className="landing-footer-links">
              <li>
                <Link href="/login" className="landing-footer-ext-link">
                  <span>Sign in</span>
                  <ArrowUpRight size={13} />
                </Link>
              </li>
              <li>
                <Link href="/register" className="landing-footer-ext-link">
                  <span>Create account</span>
                  <ArrowUpRight size={13} />
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar / Copyright */}
        <div className="landing-footer-bottom">
          <p>© 2026 Invox. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

