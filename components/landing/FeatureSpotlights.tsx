"use client";

import * as React from "react";

export function FeatureSpotlights() {
  return (
    <section className="landing-workflow-section" id="features">
      <div className="landing-container">
        <div className="landing-workflow-grid">
          {/* Left Column: Heading & Stepper */}
          <div className="landing-workflow-left">
            <div className="landing-eyebrow-left">WORKFLOW</div>
            <h2 className="landing-workflow-title">
              From creation to payment, <br className="hidden-mobile" />
              without the busywork.
            </h2>

            <div className="landing-stepper-list">
              <div className="landing-step-item">
                <span className="landing-step-num">1</span>
                <span className="landing-step-text">Create invoice</span>
              </div>
              <div className="landing-step-item">
                <span className="landing-step-num">2</span>
                <span className="landing-step-text">Review</span>
              </div>
              <div className="landing-step-item">
                <span className="landing-step-num">3</span>
                <span className="landing-step-text">Send</span>
              </div>
              <div className="landing-step-item">
                <span className="landing-step-num">4</span>
                <span className="landing-step-text">Client views</span>
              </div>
              <div className="landing-step-item">
                <span className="landing-step-num">5</span>
                <span className="landing-step-text">Payment</span>
              </div>
              <div className="landing-step-item">
                <span className="landing-step-num">6</span>
                <span className="landing-step-text">Paid</span>
                <span className="landing-done-badge">done</span>
              </div>
            </div>
          </div>

          {/* Right Column: Invoice Detail Card Mockup */}
          <div className="landing-workflow-right">
            <div className="landing-inv-card">
              <div className="landing-inv-card-header">
                <span className="landing-inv-label">INVOICE</span>
                <span className="landing-status-badge landing-status-paid">
                  <span className="landing-status-dot" /> Paid
                </span>
              </div>

              <div className="landing-inv-main-info">
                <h3 className="landing-inv-id">INV-2041</h3>
                <p className="landing-inv-meta">Northwind Studio · Due Mar 12</p>
              </div>

              <div className="landing-inv-items">
                <div className="landing-inv-item">
                  <span className="landing-item-name">Design retainer — March</span>
                  <span className="landing-item-price">$8,000.00</span>
                </div>
                <div className="landing-inv-item">
                  <span className="landing-item-name">Motion package</span>
                  <span className="landing-item-price">$3,200.00</span>
                </div>
                <div className="landing-inv-item">
                  <span className="landing-item-name">Asset licensing</span>
                  <span className="landing-item-price">$1,600.00</span>
                </div>
              </div>

              <div className="landing-inv-breakdown">
                <div className="landing-inv-sub-item">
                  <span className="landing-sub-label">Discount</span>
                  <span className="landing-sub-val">-$800.00</span>
                </div>
                <div className="landing-inv-sub-item">
                  <span className="landing-sub-label">Tax (10%)</span>
                  <span className="landing-sub-val">$1,200.00</span>
                </div>
              </div>

              <div className="landing-inv-totals">
                <div className="landing-total-row">
                  <span className="landing-total-label">Total</span>
                  <span className="landing-total-val">$13,200.00</span>
                </div>
                <div className="landing-balance-row">
                  <span className="landing-balance-label">Balance due</span>
                  <span className="landing-balance-val">$0.00</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

