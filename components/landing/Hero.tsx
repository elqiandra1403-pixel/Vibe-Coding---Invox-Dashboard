"use client";

import * as React from "react";
import Link from "next/link";
import {
  ArrowRight,
  LayoutGrid,
  FileText,
  Users,
  CreditCard,
  BarChart2,
  Bell,
  Wallet
} from "lucide-react";

export function Hero() {
  return (
    <section className="landing-hero-section">
      <div className="landing-hero-content">
        <div className="landing-badge">
          <Wallet size={16} style={{ color: "#475569" }} />
          <span>Invoice-to-cash workspace</span>
        </div>

        <h1 className="landing-hero-title">
          Take control of every <br />
          invoice.
        </h1>

        <p className="landing-hero-subtitle-bold">
          From invoice to paid, without the busywork.
        </p>

        <p className="landing-hero-description">
          Create, send, track, and manage invoices from one simple workspace — <br className="hidden-mobile" />
          while keeping your team and clients aligned.
        </p>

        <div className="landing-hero-cta-group">
          <Link href="/register" className="landing-btn-primary-lg">
            <span>Get started</span>
            <ArrowRight size={16} />
          </Link>
          <Link href="/login" className="landing-btn-secondary-lg">
            Sign in
          </Link>
        </div>
      </div>

      <div className="landing-mockup-wrapper">
        <div className="landing-mockup-card">
          <div className="landing-mockup-header">
            <div className="landing-mockup-dots">
              <span className="landing-dot"></span>
              <span className="landing-dot"></span>
              <span className="landing-dot"></span>
            </div>
            <div className="landing-mockup-url">
              invox.app/dashboard
            </div>
            <div style={{ width: 44 }}></div>
          </div>

          <div className="landing-mockup-body">
            <div className="landing-mockup-sidebar">
              <div className="landing-sidebar-item landing-sidebar-active">
                <LayoutGrid size={16} />
                <span>Dashboard</span>
              </div>
              <div className="landing-sidebar-item">
                <FileText size={16} />
                <span>Invoices</span>
              </div>
              <div className="landing-sidebar-item">
                <Users size={16} />
                <span>Customers</span>
              </div>
              <div className="landing-sidebar-item">
                <CreditCard size={16} />
                <span>Payments</span>
              </div>
              <div className="landing-sidebar-item">
                <BarChart2 size={16} />
                <span>Analytics</span>
              </div>
              <div className="landing-sidebar-item">
                <Bell size={16} />
                <span>Notifications</span>
              </div>
            </div>

            <div className="landing-mockup-main">
              <div className="landing-mockup-stats-grid">
                <div className="landing-stat-box">
                  <div className="landing-stat-label">Outstanding</div>
                  <div className="landing-stat-value">$84,230</div>
                  <div className="landing-stat-subtext">12 invoices</div>
                </div>

                <div className="landing-stat-box">
                  <div className="landing-stat-label">Collected (MTD)</div>
                  <div className="landing-stat-value">$248,910</div>
                  <div className="landing-stat-badge-green">+12.4%</div>
                </div>

                <div className="landing-stat-box">
                  <div className="landing-stat-label">Avg. days to pay</div>
                  <div className="landing-stat-value">6.2</div>
                  <div className="landing-stat-badge-green">-1.8d</div>
                </div>
              </div>

              <div className="landing-middle-grid">
                <div className="landing-chart-box">
                  <div className="landing-chart-header">
                    <span className="landing-chart-title">Revenue overview</span>
                    <span className="landing-chart-period">Last 12 months</span>
                  </div>
                  <div className="landing-bars-grid">
                    <div className="landing-bar-col"><div className="landing-bar-fill" style={{ height: "30%" }}></div></div>
                    <div className="landing-bar-col"><div className="landing-bar-fill" style={{ height: "55%" }}></div></div>
                    <div className="landing-bar-col"><div className="landing-bar-fill" style={{ height: "35%" }}></div></div>
                    <div className="landing-bar-col"><div className="landing-bar-fill" style={{ height: "65%" }}></div></div>
                    <div className="landing-bar-col"><div className="landing-bar-fill" style={{ height: "45%" }}></div></div>
                    <div className="landing-bar-col"><div className="landing-bar-fill" style={{ height: "60%" }}></div></div>
                    <div className="landing-bar-col"><div className="landing-bar-fill" style={{ height: "78%" }}></div></div>
                    <div className="landing-bar-col"><div className="landing-bar-fill" style={{ height: "62%" }}></div></div>
                    <div className="landing-bar-col"><div className="landing-bar-fill" style={{ height: "85%" }}></div></div>
                    <div className="landing-bar-col"><div className="landing-bar-fill" style={{ height: "72%" }}></div></div>
                    <div className="landing-bar-col"><div className="landing-bar-fill" style={{ height: "92%" }}></div></div>
                    <div className="landing-bar-col"><div className="landing-bar-fill" style={{ height: "100%" }}></div></div>
                  </div>
                </div>

                <div className="landing-success-box">
                  <div className="landing-chart-title">Payment success</div>
                  <div className="landing-success-value">94%</div>
                  <div className="landing-progress-track">
                    <div className="landing-progress-bar" style={{ width: "94%" }}></div>
                  </div>
                  <div className="landing-success-legend">
                    <div className="landing-legend-row">
                      <span>Paid</span>
                      <strong>128</strong>
                    </div>
                    <div className="landing-legend-row">
                      <span>Pending</span>
                      <strong>9</strong>
                    </div>
                  </div>
                </div>
              </div>

              <div className="landing-table-container">
                <div className="landing-row-item">
                  <span className="landing-col-code">INV-2041</span>
                  <span className="landing-col-name">Northwind Studio</span>
                  <span className="landing-col-amount">$12,400</span>
                  <span className="landing-badge-status landing-status-paid">
                    <span className="landing-status-dot"></span> Paid
                  </span>
                </div>
                <div className="landing-row-item">
                  <span className="landing-col-code">INV-2040</span>
                  <span className="landing-col-name">Harbor Hospitality</span>
                  <span className="landing-col-amount">$8,150</span>
                  <span className="landing-badge-status landing-status-pending">
                    <span className="landing-status-dot"></span> Pending
                  </span>
                </div>
                <div className="landing-row-item">
                  <span className="landing-col-code">INV-2039</span>
                  <span className="landing-col-name">Lumen Labs</span>
                  <span className="landing-col-amount">$3,980</span>
                  <span className="landing-badge-status landing-status-overdue">
                    <span className="landing-status-dot"></span> Overdue
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

