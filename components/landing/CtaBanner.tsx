"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function CtaBanner() {
  return (
    <section style={{ padding: "100px 24px", backgroundColor: "#FAFAFC" }} id="pricing">
      <div className="landing-container">
        <div className="landing-cta-banner-card">
          <div style={{
            position: "absolute",
            top: "-50%",
            left: "50%",
            transform: "translateX(-50%)",
            width: 500,
            height: 300,
            background: "radial-gradient(circle, rgba(92, 107, 147, 0.3) 0%, rgba(11, 13, 23, 0) 70%)",
            pointerEvents: "none"
          }}></div>

          <div style={{ position: "relative", zIndex: 2 }}>
            <div style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              padding: "6px 16px",
              borderRadius: 9999,
              backgroundColor: "rgba(255, 255, 255, 0.1)",
              border: "1px solid rgba(255, 255, 255, 0.2)",
              color: "#94A3B8",
              fontSize: 12,
              fontWeight: 600,
              letterSpacing: "0.05em",
              textTransform: "uppercase",
              marginBottom: 20
            }}>
              GET STARTED IN MINUTES
            </div>

            <h2 style={{ fontSize: "clamp(32px, 5vw, 48px)", fontWeight: 800, lineHeight: 1.15, letterSpacing: "-0.03em", margin: "0 0 16px 0" }}>
              Ready to take control of your cash flow?
            </h2>

            <p style={{ fontSize: "clamp(16px, 2vw, 19px)", color: "#94A3B8", maxWidth: 600, margin: "0 auto 36px auto", lineHeight: 1.6 }}>
              Join thousands of businesses managing cash flow, automated reminders, and client invoicing with Invox.
            </p>

            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 16, flexWrap: "wrap" }}>
              <Link href="/register" className="landing-btn-primary-lg">
                <span>Get Started Free</span>
                <ArrowRight size={18} />
              </Link>
              <Link href="/login" className="landing-btn-secondary-lg" style={{ color: "#FFFFFF", backgroundColor: "rgba(255, 255, 255, 0.1)", borderColor: "rgba(255, 255, 255, 0.2)" }}>
                Sign In to Dashboard
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
