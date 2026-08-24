"use client";

import * as React from "react";
import { ShieldCheck, Lock, History } from "lucide-react";

export function TestimonialsSection() {
  return (
    <section className="landing-audit-section" id="security">
      <div className="landing-container">
        <div className="landing-audit-grid">
          {/* Left Column: Headline & Feature Badges */}
          <div className="landing-audit-left">
            <div className="landing-eyebrow-left">SECURITY & AUDIT</div>
            <h2 className="landing-audit-title">
              Every financial action, <br className="hidden-mobile" />
              accounted for.
            </h2>
            <p className="landing-audit-subtitle">
              Invox keeps an activity and audit trail around important financial actions <br className="hidden-mobile" />
              so your team can understand what happened and when.
            </p>

            <div className="landing-audit-badges">
              <div className="landing-audit-badge-item">
                <ShieldCheck size={14} style={{ color: "#475569" }} />
                <span>Role-based access</span>
              </div>
              <div className="landing-audit-badge-item">
                <Lock size={14} style={{ color: "#475569" }} />
                <span>Scoped data access</span>
              </div>
              <div className="landing-audit-badge-item">
                <History size={14} style={{ color: "#475569" }} />
                <span>Activity trail</span>
              </div>
            </div>
          </div>

          {/* Right Column: Activity Trail Log Card Mockup */}
          <div className="landing-audit-right">
            <div className="landing-audit-card">
              <div className="landing-audit-log-list">
                {/* Item 1 */}
                <div className="landing-audit-log-item">
                  <span className="landing-audit-dot" />
                  <div className="landing-audit-log-info">
                    <div className="landing-audit-action">Invoice sent</div>
                    <div className="landing-audit-details">INV-2040 · Harbor Hospitality</div>
                  </div>
                </div>

                {/* Item 2 */}
                <div className="landing-audit-log-item">
                  <span className="landing-audit-dot" />
                  <div className="landing-audit-log-info">
                    <div className="landing-audit-action">Invoice viewed</div>
                    <div className="landing-audit-details">INV-2040 · client opened</div>
                  </div>
                </div>

                {/* Item 3 */}
                <div className="landing-audit-log-item">
                  <span className="landing-audit-dot" />
                  <div className="landing-audit-log-info">
                    <div className="landing-audit-action">Payment recorded</div>
                    <div className="landing-audit-details">INV-2038 · $21,600</div>
                  </div>
                </div>

                {/* Item 4 */}
                <div className="landing-audit-log-item">
                  <span className="landing-audit-dot" />
                  <div className="landing-audit-log-info">
                    <div className="landing-audit-action">Invoice overdue</div>
                    <div className="landing-audit-details">INV-2039 · Lumen Labs</div>
                  </div>
                </div>

                {/* Item 5 */}
                <div className="landing-audit-log-item">
                  <span className="landing-audit-dot" />
                  <div className="landing-audit-log-info">
                    <div className="landing-audit-action">Reminder sent</div>
                    <div className="landing-audit-details">INV-2039 · follow-up</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

