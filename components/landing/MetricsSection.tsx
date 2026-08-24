"use client";

import * as React from "react";
import { FileText, Wallet, BarChart2 } from "lucide-react";

export function MetricsSection() {
  return (
    <section className="landing-metrics-section" id="how-it-works">
      <div className="landing-container">
        <div className="landing-section-header">
          <div className="landing-eyebrow">POSITIONING</div>
          <h2 className="landing-section-title">
            One workspace. Every invoice. Complete <br className="hidden-mobile" />
            visibility.
          </h2>
          <p className="landing-section-subtitle">
            Built to simplify the journey from creating an invoice to getting paid.
          </p>
        </div>

        <div className="landing-metrics-grid">
          <div className="landing-metric-card">
            <div className="landing-card-icon-wrap">
              <FileText size={20} style={{ color: "#475569" }} />
            </div>
            <h3 className="landing-card-title">Invoices</h3>
            <p className="landing-card-description">
              Draft, send, and track every invoice in one list.
            </p>
          </div>

          <div className="landing-metric-card">
            <div className="landing-card-icon-wrap">
              <Wallet size={20} style={{ color: "#475569" }} />
            </div>
            <h3 className="landing-card-title">Payments</h3>
            <p className="landing-card-description">
              Record payments and watch outstanding balances fall.
            </p>
          </div>

          <div className="landing-metric-card">
            <div className="landing-card-icon-wrap">
              <BarChart2 size={20} style={{ color: "#475569" }} />
            </div>
            <h3 className="landing-card-title">Analytics</h3>
            <p className="landing-card-description">
              Revenue, volume, and payment performance at a glance.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

