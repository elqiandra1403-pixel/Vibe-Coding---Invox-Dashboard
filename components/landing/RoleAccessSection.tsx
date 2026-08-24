"use client";

import * as React from "react";
import { FileText, Send, History, Wallet, Users } from "lucide-react";

export function RoleAccessSection() {
  return (
    <section className="landing-role-section" id="solutions">
      <div className="landing-container">
        <div className="landing-section-header-left">
          <h2 className="landing-section-title-left">
            One workspace for your entire invoice <br className="hidden-mobile" />
            lifecycle.
          </h2>
          <p className="landing-section-subtitle-left">
            Invox centralizes the invoice workflow into one connected workspace — no handoffs between <br className="hidden-mobile" />
            tools.
          </p>
        </div>

        <div className="landing-lifecycle-grid">
          <div className="landing-lifecycle-item">
            <div className="landing-lifecycle-icon">
              <FileText size={18} style={{ color: "#475569" }} />
            </div>
            <h3 className="landing-lifecycle-title">Create</h3>
            <p className="landing-lifecycle-desc">
              Build an invoice with customer, amount, and due date.
            </p>
          </div>

          <div className="landing-lifecycle-item">
            <div className="landing-lifecycle-icon">
              <Send size={18} style={{ color: "#475569" }} />
            </div>
            <h3 className="landing-lifecycle-title">Send</h3>
            <p className="landing-lifecycle-desc">
              Deliver it and mark it as sent in one action.
            </p>
          </div>

          <div className="landing-lifecycle-item">
            <div className="landing-lifecycle-icon">
              <History size={18} style={{ color: "#475569" }} />
            </div>
            <h3 className="landing-lifecycle-title">Track</h3>
            <p className="landing-lifecycle-desc">
              Follow status from pending to overdue to paid.
            </p>
          </div>

          <div className="landing-lifecycle-item">
            <div className="landing-lifecycle-icon">
              <Wallet size={18} style={{ color: "#475569" }} />
            </div>
            <h3 className="landing-lifecycle-title">Collect</h3>
            <p className="landing-lifecycle-desc">
              Record payments and clear outstanding balances.
            </p>
          </div>

          <div className="landing-lifecycle-item">
            <div className="landing-lifecycle-icon">
              <Users size={18} style={{ color: "#475569" }} />
            </div>
            <h3 className="landing-lifecycle-title">Manage</h3>
            <p className="landing-lifecycle-desc">
              Keep customers, history, and documents together.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
