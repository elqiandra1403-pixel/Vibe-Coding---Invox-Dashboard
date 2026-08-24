"use client";

import * as React from "react";

export function ProblemSolutionSection() {
  return (
    <section className="landing-problem-section">
      <div className="landing-container">
        <div className="landing-section-header-left">
          <h2 className="landing-section-title-left">
            Your invoices shouldn't live in <br className="hidden-mobile" />
            spreadsheets.
          </h2>
          <p className="landing-section-subtitle-left">
            Three things that quietly slow every finance team down.
          </p>
        </div>

        <div className="landing-cards-grid-3">
          <div className="landing-feature-card">
            <div className="landing-num-badge">01</div>
            <h3 className="landing-feature-title">Manual work</h3>
            <p className="landing-feature-desc">
              Creating invoices manually takes time and increases the chance of errors.
            </p>
          </div>

          <div className="landing-feature-card">
            <div className="landing-num-badge">02</div>
            <h3 className="landing-feature-title">Limited visibility</h3>
            <p className="landing-feature-desc">
              Knowing what is outstanding, overdue, or already paid shouldn't require checking multiple tools.
            </p>
          </div>

          <div className="landing-feature-card">
            <div className="landing-num-badge">03</div>
            <h3 className="landing-feature-title">Constant follow-ups</h3>
            <p className="landing-feature-desc">
              Clients shouldn't need to email Finance just to ask about invoice status.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

