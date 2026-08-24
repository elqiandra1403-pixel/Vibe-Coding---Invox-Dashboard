"use client";

import * as React from "react";
import {
  FileText,
  Users,
  Wallet,
  BarChart2,
  Download,
  Bell,
  UserCheck,
  History,
  ShieldCheck
} from "lucide-react";

export function FaqSection() {
  return (
    <section className="landing-toolkit-section" id="faq">
      <div className="landing-container">
        <div className="landing-section-header">
          <h2 className="landing-section-title">
            Everything your invoice workflow needs.
          </h2>
          <p className="landing-section-subtitle">
            A complete toolkit for the invoice-to-cash cycle — nothing extra.
          </p>
        </div>

        <div className="landing-toolkit-grid">
          {/* Card 1 */}
          <div className="landing-toolkit-card">
            <div className="landing-toolkit-icon">
              <FileText size={20} style={{ color: "#475569" }} />
            </div>
            <h3 className="landing-toolkit-title">Invoice management</h3>
            <p className="landing-toolkit-desc">
              Create, send, track, and manage invoices.
            </p>
          </div>

          {/* Card 2 */}
          <div className="landing-toolkit-card">
            <div className="landing-toolkit-icon">
              <Users size={20} style={{ color: "#475569" }} />
            </div>
            <h3 className="landing-toolkit-title">Customer management</h3>
            <p className="landing-toolkit-desc">
              Keep customer and invoice relationships organized.
            </p>
          </div>

          {/* Card 3 */}
          <div className="landing-toolkit-card">
            <div className="landing-toolkit-icon">
              <Wallet size={20} style={{ color: "#475569" }} />
            </div>
            <h3 className="landing-toolkit-title">Payment tracking</h3>
            <p className="landing-toolkit-desc">
              Record payments and monitor outstanding balances.
            </p>
          </div>

          {/* Card 4 */}
          <div className="landing-toolkit-card">
            <div className="landing-toolkit-icon">
              <BarChart2 size={20} style={{ color: "#475569" }} />
            </div>
            <h3 className="landing-toolkit-title">Analytics</h3>
            <p className="landing-toolkit-desc">
              Understand revenue and payment performance.
            </p>
          </div>

          {/* Card 5 */}
          <div className="landing-toolkit-card">
            <div className="landing-toolkit-icon">
              <Download size={20} style={{ color: "#475569" }} />
            </div>
            <h3 className="landing-toolkit-title">Reports & export</h3>
            <p className="landing-toolkit-desc">
              Export invoice data and generate PDFs.
            </p>
          </div>

          {/* Card 6 */}
          <div className="landing-toolkit-card">
            <div className="landing-toolkit-icon">
              <Bell size={20} style={{ color: "#475569" }} />
            </div>
            <h3 className="landing-toolkit-title">Notifications</h3>
            <p className="landing-toolkit-desc">
              Stay informed about important invoice events.
            </p>
          </div>

          {/* Card 7 */}
          <div className="landing-toolkit-card">
            <div className="landing-toolkit-icon">
              <UserCheck size={20} style={{ color: "#475569" }} />
            </div>
            <h3 className="landing-toolkit-title">Client portal</h3>
            <p className="landing-toolkit-desc">
              Give clients secure access to their invoices.
            </p>
          </div>

          {/* Card 8 */}
          <div className="landing-toolkit-card">
            <div className="landing-toolkit-icon">
              <History size={20} style={{ color: "#475569" }} />
            </div>
            <h3 className="landing-toolkit-title">Audit log</h3>
            <p className="landing-toolkit-desc">
              Track important financial actions.
            </p>
          </div>

          {/* Card 9 */}
          <div className="landing-toolkit-card">
            <div className="landing-toolkit-icon">
              <ShieldCheck size={20} style={{ color: "#475569" }} />
            </div>
            <h3 className="landing-toolkit-title">Role-based access</h3>
            <p className="landing-toolkit-desc">
              Give every team member the appropriate access.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

