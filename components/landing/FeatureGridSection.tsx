"use client";

import * as React from "react";
import { Lock, Download } from "lucide-react";

export function FeatureGridSection() {
  return (
    <section className="landing-portal-section" id="portal">
      <div className="landing-container">
        <div className="landing-portal-grid">
          {/* Left Column: Client Portal Headline & Info */}
          <div className="landing-portal-left">
            <div className="landing-eyebrow-left">CLIENT PORTAL</div>
            <h2 className="landing-portal-title">
              Give your clients answers, not <br className="hidden-mobile" />
              another email thread.
            </h2>
            <p className="landing-portal-subtitle">
              Clients sign in securely and see only their own invoices — status, details, <br className="hidden-mobile" />
              and downloadable PDFs included.
            </p>

            <ul className="landing-portal-features">
              <li className="landing-portal-feature-item">
                <span className="landing-portal-bullet" />
                <span>View their invoices</span>
              </li>
              <li className="landing-portal-feature-item">
                <span className="landing-portal-bullet" />
                <span>Check invoice status</span>
              </li>
              <li className="landing-portal-feature-item">
                <span className="landing-portal-bullet" />
                <span>View invoice details</span>
              </li>
              <li className="landing-portal-feature-item">
                <span className="landing-portal-bullet" />
                <span>Download invoice PDFs</span>
              </li>
            </ul>

            <div className="landing-portal-security-badge">
              <Lock size={13} style={{ color: "#475569" }} />
              <span>Clients only see their own invoices.</span>
            </div>
          </div>

          {/* Right Column: Client Portal Window Mockup */}
          <div className="landing-portal-right">
            <div className="landing-portal-card">
              {/* Window Header */}
              <div className="landing-mockup-header">
                <div className="landing-window-dots">
                  <span className="landing-dot" />
                  <span className="landing-dot" />
                  <span className="landing-dot" />
                </div>
                <div className="landing-address-bar">
                  <span>invox.app/portal</span>
                </div>
              </div>

              {/* Portal Content */}
              <div className="landing-portal-card-body">
                <h3 className="landing-portal-heading">My invoices</h3>

                <div className="landing-portal-inv-list">
                  {/* Row 1 */}
                  <div className="landing-portal-inv-row">
                    <div className="landing-portal-inv-meta">
                      <span className="landing-portal-inv-id">INV-2041</span>
                      <span className="landing-portal-inv-issuer">Issued by Invox</span>
                    </div>
                    <div className="landing-portal-inv-amount">$12,400</div>
                    <div className="landing-portal-inv-status">
                      <span className="landing-status-badge landing-status-paid">
                        <span className="landing-status-dot" /> Paid
                      </span>
                    </div>
                    <div className="landing-portal-inv-action">
                      <Download size={16} style={{ color: "#94A3B8", cursor: "pointer" }} />
                    </div>
                  </div>

                  {/* Row 2 */}
                  <div className="landing-portal-inv-row">
                    <div className="landing-portal-inv-meta">
                      <span className="landing-portal-inv-id">INV-2040</span>
                      <span className="landing-portal-inv-issuer">Issued by Invox</span>
                    </div>
                    <div className="landing-portal-inv-amount">$8,150</div>
                    <div className="landing-portal-inv-status">
                      <span className="landing-status-badge landing-status-pending">
                        <span className="landing-status-dot" /> Pending
                      </span>
                    </div>
                    <div className="landing-portal-inv-action">
                      <Download size={16} style={{ color: "#94A3B8", cursor: "pointer" }} />
                    </div>
                  </div>

                  {/* Row 3 */}
                  <div className="landing-portal-inv-row">
                    <div className="landing-portal-inv-meta">
                      <span className="landing-portal-inv-id">INV-2036</span>
                      <span className="landing-portal-inv-issuer">Issued by Invox</span>
                    </div>
                    <div className="landing-portal-inv-amount">$4,300</div>
                    <div className="landing-portal-inv-status">
                      <span className="landing-status-badge landing-status-paid">
                        <span className="landing-status-dot" /> Paid
                      </span>
                    </div>
                    <div className="landing-portal-inv-action">
                      <Download size={16} style={{ color: "#94A3B8", cursor: "pointer" }} />
                    </div>
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

