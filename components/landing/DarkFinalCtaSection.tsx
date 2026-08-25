"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function DarkFinalCtaSection() {
  return (
    <section className="landing-dark-cta-section">
      <div className="landing-container">
        <div className="landing-dark-cta-content">
          <h2 className="landing-dark-cta-title">
            Ready to simplify your invoice <br className="hidden-mobile" />
            workflow?
          </h2>
          <p className="landing-dark-cta-subtitle">
            Create less paperwork. Spend less time chasing payments. Get more visibility into your <br className="hidden-mobile" />
            business.
          </p>

          <div className="landing-dark-cta-actions">
            <Link href="/register" className="landing-dark-cta-btn-primary">
              <span>Get started</span>
              <ArrowRight size={16} />
            </Link>
            <Link href="/login" className="landing-dark-cta-btn-secondary">
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
