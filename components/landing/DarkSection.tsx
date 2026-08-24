"use client";

import * as React from "react";

export function DarkSection() {
  return (
    <section className="landing-dark-section" id="analytics">
      <div className="landing-container">
        <div className="landing-section-header-left">
          <h2 className="landing-dark-title">
            See the money behind your invoices.
          </h2>
          <p className="landing-dark-subtitle">
            Get a clear view of outstanding revenue, invoice activity, payment performance, and recent <br className="hidden-mobile" />
            financial actions.
          </p>
        </div>

        {/* Top Metric Cards Row (4 Columns) */}
        <div className="landing-dark-metrics-grid">
          <div className="landing-dark-metric-card">
            <div className="landing-dark-metric-label">OUTSTANDING REVENUE</div>
            <div className="landing-dark-metric-value">$84,230</div>
          </div>

          <div className="landing-dark-metric-card">
            <div className="landing-dark-metric-label">PAID INVOICES</div>
            <div className="landing-dark-metric-value">128</div>
          </div>

          <div className="landing-dark-metric-card">
            <div className="landing-dark-metric-label">AVG. PAYMENT TIME</div>
            <div className="landing-dark-metric-value">6.2 days</div>
          </div>

          <div className="landing-dark-metric-card">
            <div className="landing-dark-metric-label">PAYMENT SUCCESS</div>
            <div className="landing-dark-metric-value">94%</div>
          </div>
        </div>

        {/* Bottom Dashboard Cards Row (2 Columns: Chart & Activity) */}
        <div className="landing-dark-dashboard-grid">
          {/* Revenue Overview Chart Card */}
          <div className="landing-dark-card landing-dark-chart-card">
            <div className="landing-dark-card-header">
              <span className="landing-dark-card-title">Revenue overview</span>
              <span className="landing-dark-card-sub">Last 12 months</span>
            </div>

            <div className="landing-dark-bars">
              <div className="landing-dark-bar" style={{ height: "35%" }} />
              <div className="landing-dark-bar" style={{ height: "48%" }} />
              <div className="landing-dark-bar" style={{ height: "38%" }} />
              <div className="landing-dark-bar" style={{ height: "60%" }} />
              <div className="landing-dark-bar" style={{ height: "42%" }} />
              <div className="landing-dark-bar" style={{ height: "55%" }} />
              <div className="landing-dark-bar" style={{ height: "48%" }} />
              <div className="landing-dark-bar" style={{ height: "62%" }} />
              <div className="landing-dark-bar" style={{ height: "52%" }} />
              <div className="landing-dark-bar" style={{ height: "70%" }} />
              <div className="landing-dark-bar" style={{ height: "65%" }} />
              <div className="landing-dark-bar" style={{ height: "85%" }} />
            </div>
          </div>

          {/* Recent Activity Card */}
          <div className="landing-dark-card landing-dark-activity-card">
            <div className="landing-dark-card-header">
              <span className="landing-dark-card-title">Recent activity</span>
            </div>

            <div className="landing-dark-activity-list">
              <div className="landing-dark-activity-item">
                <span className="landing-dark-act-dot" />
                <div className="landing-dark-act-content">
                  <div className="landing-dark-act-title">Payment received</div>
                  <div className="landing-dark-act-sub">Atlas Freight · $21,600</div>
                </div>
              </div>

              <div className="landing-dark-activity-item">
                <span className="landing-dark-act-dot" />
                <div className="landing-dark-act-content">
                  <div className="landing-dark-act-title">Invoice sent</div>
                  <div className="landing-dark-act-sub">Meridian Co. · $5,240</div>
                </div>
              </div>

              <div className="landing-dark-activity-item">
                <span className="landing-dark-act-dot" />
                <div className="landing-dark-act-content">
                  <div className="landing-dark-act-title">Invoice overdue</div>
                  <div className="landing-dark-act-sub">Lumen Labs · $3,980</div>
                </div>
              </div>

              <div className="landing-dark-activity-item">
                <span className="landing-dark-act-dot" />
                <div className="landing-dark-act-content">
                  <div className="landing-dark-act-title">Reminder sent</div>
                  <div className="landing-dark-act-sub">Harbor Hospitality</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

