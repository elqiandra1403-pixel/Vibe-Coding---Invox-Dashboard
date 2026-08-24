"use client";

import * as React from "react";

export function RoleViewsSection() {
  return (
    <section className="landing-role-views-section" id="roles">
      <div className="landing-container">
        <div className="landing-section-header-left">
          <h2 className="landing-section-title-left">
            Built for everyone involved in getting <br className="hidden-mobile" />
            paid.
          </h2>
          <p className="landing-section-subtitle-left">
            Each role gets the view that matches their work — nothing more.
          </p>
        </div>

        <div className="landing-role-views-grid">
          {/* Card 1: ADMIN / OWNER */}
          <div className="landing-role-view-card">
            <div className="landing-role-view-badge">ADMIN / OWNER</div>
            <h3 className="landing-role-view-title">See the bigger picture.</h3>

            <ul className="landing-role-view-list">
              <li className="landing-role-view-item">
                <span className="landing-role-bullet" />
                <span>Dashboard</span>
              </li>
              <li className="landing-role-view-item">
                <span className="landing-role-bullet" />
                <span>Analytics</span>
              </li>
              <li className="landing-role-view-item">
                <span className="landing-role-bullet" />
                <span>Settings</span>
              </li>
              <li className="landing-role-view-item">
                <span className="landing-role-bullet" />
                <span>Audit log</span>
              </li>
            </ul>
          </div>

          {/* Card 2: FINANCE */}
          <div className="landing-role-view-card">
            <div className="landing-role-view-badge">FINANCE</div>
            <h3 className="landing-role-view-title">Get invoices out the door.</h3>

            <ul className="landing-role-view-list">
              <li className="landing-role-view-item">
                <span className="landing-role-bullet" />
                <span>Invoices</span>
              </li>
              <li className="landing-role-view-item">
                <span className="landing-role-bullet" />
                <span>Customers</span>
              </li>
              <li className="landing-role-view-item">
                <span className="landing-role-bullet" />
                <span>Payments</span>
              </li>
              <li className="landing-role-view-item">
                <span className="landing-role-bullet" />
                <span>Notifications</span>
              </li>
            </ul>
          </div>

          {/* Card 3: CLIENT */}
          <div className="landing-role-view-card">
            <div className="landing-role-view-badge">CLIENT</div>
            <h3 className="landing-role-view-title">Know exactly what you owe.</h3>

            <ul className="landing-role-view-list">
              <li className="landing-role-view-item">
                <span className="landing-role-bullet" />
                <span>My invoices</span>
              </li>
              <li className="landing-role-view-item">
                <span className="landing-role-bullet" />
                <span>Invoice details</span>
              </li>
              <li className="landing-role-view-item">
                <span className="landing-role-bullet" />
                <span>PDF downloads</span>
              </li>
              <li className="landing-role-view-item">
                <span className="landing-role-bullet" />
                <span>Payment status</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
