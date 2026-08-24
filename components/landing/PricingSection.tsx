"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import styles from "./PricingSection.module.css";

export function PricingSection() {
  return (
    <section id="pricing" className={styles.section}>
      <div className={styles.card}>
        <div className={styles.kicker}>PRICING</div>
        <h2 className={styles.title}>Simple plans for growing teams.</h2>
        <p className={styles.description}>
          Pricing details are being finalized. Create an account today and start managing invoices right away.
        </p>
        <div className={styles.actions}>
          <Link href="/register" className={styles.primaryBtn}>
            Get started <ArrowRight className={styles.arrowIcon} />
          </Link>
          <Link href="/login" className={styles.secondaryBtn}>
            Sign in
          </Link>
        </div>
      </div>
    </section>
  );
}
