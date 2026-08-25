"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function CtaBanner() {
  return (
    <section className="landing-pricing-section" id="pricing">
      <div className="landing-container">
        <div className="landing-pricing-card">
          <div className="landing-eyebrow">PRICING</div>
          <h2 className="landing-pricing-title">
            Simple plans for growing teams.
          </h2>
          <p className="landing-pricing-subtitle">
            Pricing details are being finalized. Create an account today <br className="hidden-mobile" />
            and start managing invoices right away.
          </p>

          <div className="landing-pricing-actions">
            <Link href="/register" className="landing-pricing-btn-primary">
              <span>Get started</span>
              <ArrowRight size={16} />
            </Link>
            <Link href="/login" className="landing-pricing-btn-secondary">
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

