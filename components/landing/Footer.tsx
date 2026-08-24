"use client";

import * as React from "react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="landing-footer">
      <div className="landing-container">
        <div style={{ display: "grid", gridTemplateColumns: "2fr repeat(3, 1fr)", gap: 48, marginBottom: 60 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <Link href="/" className="landing-logo-link" style={{ color: "#FFFFFF" }}>
              <div className="landing-logo-icon">iv</div>
              <span className="landing-logo-text" style={{ color: "#FFFFFF" }}>Invox</span>
            </Link>
            <p style={{ fontSize: 14, color: "#94A3B8", lineHeight: 1.6, maxWidth: 300, margin: 0 }}>
              Take control of every invoice with automated workflows, real-time analytics, and client payment portals.
            </p>
          </div>

          <div>
            <div style={{ fontSize: 13, fontWeight: 700, color: "#FFFFFF", letterSpacing: "0.05em", textTransform: "uppercase", marginBottom: 16 }}>Product</div>
            <ul style={{ display: "flex", flexDirection: "column", gap: 12, listStyle: "none", margin: 0, padding: 0 }}>
              <li><a href="#features" style={{ color: "#94A3B8", textDecoration: "none", fontSize: 14 }}>Features</a></li>
              <li><a href="#solutions" style={{ color: "#94A3B8", textDecoration: "none", fontSize: 14 }}>Solutions</a></li>
              <li><a href="#roles" style={{ color: "#94A3B8", textDecoration: "none", fontSize: 14 }}>Role Access</a></li>
              <li><a href="#pricing" style={{ color: "#94A3B8", textDecoration: "none", fontSize: 14 }}>Pricing</a></li>
              <li><a href="#faq" style={{ color: "#94A3B8", textDecoration: "none", fontSize: 14 }}>FAQ</a></li>
            </ul>
          </div>

          <div>
            <div style={{ fontSize: 13, fontWeight: 700, color: "#FFFFFF", letterSpacing: "0.05em", textTransform: "uppercase", marginBottom: 16 }}>Dashboard</div>
            <ul style={{ display: "flex", flexDirection: "column", gap: 12, listStyle: "none", margin: 0, padding: 0 }}>
              <li><Link href="/login" style={{ color: "#94A3B8", textDecoration: "none", fontSize: 14 }}>Sign In</Link></li>
              <li><Link href="/register" style={{ color: "#94A3B8", textDecoration: "none", fontSize: 14 }}>Create Account</Link></li>
              <li><Link href="/dashboard" style={{ color: "#94A3B8", textDecoration: "none", fontSize: 14 }}>Dashboard</Link></li>
              <li><Link href="/invoices" style={{ color: "#94A3B8", textDecoration: "none", fontSize: 14 }}>Invoices</Link></li>
              <li><Link href="/customers" style={{ color: "#94A3B8", textDecoration: "none", fontSize: 14 }}>Customers</Link></li>
            </ul>
          </div>

          <div>
            <div style={{ fontSize: 13, fontWeight: 700, color: "#FFFFFF", letterSpacing: "0.05em", textTransform: "uppercase", marginBottom: 16 }}>Legal & Security</div>
            <ul style={{ display: "flex", flexDirection: "column", gap: 12, listStyle: "none", margin: 0, padding: 0 }}>
              <li><span style={{ color: "#94A3B8", fontSize: 14 }}>Privacy Policy</span></li>
              <li><span style={{ color: "#94A3B8", fontSize: 14 }}>Terms of Service</span></li>
              <li><span style={{ color: "#94A3B8", fontSize: 14 }}>Security Overview</span></li>
              <li><span style={{ color: "#94A3B8", fontSize: 14 }}>Audit Compliance</span></li>
            </ul>
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: 32, borderTop: "1px solid rgba(255, 255, 255, 0.08)", fontSize: 13, color: "#64748B", flexWrap: "wrap", gap: 16 }}>
          <div>&copy; 2026 Invox Inc. All rights reserved.</div>
          <div style={{ display: "flex", gap: 16 }}>
            <span>End-to-end encrypted</span>
            <span>•</span>
            <span>99.99% Uptime</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
