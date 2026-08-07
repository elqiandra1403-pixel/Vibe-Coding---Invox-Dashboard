import * as React from "react";
import styles from "./layout.module.css";
import { Sparkles, ArrowUpRight } from "lucide-react";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.container}>
      {/* Left Panel (Marketing Hero) */}
      <div className={styles.leftPanel} data-theme="dark">
        <div className={styles.marketingTop}>
          <div className={styles.badge}>
            <Sparkles size={14} />
            <span>INVOICE TO CASH</span>
          </div>
          <h1 className={styles.heading}>Quietly powerful invoicing.</h1>
          <p className={styles.subheading}>
            Send, track, and collect from one calm workspace — with revenue clarity in real time.
          </p>
        </div>
        
        <div className={styles.metricsContainer}>
          <div className={styles.metricCard}>
            <h3 className={styles.metricTitle}>COLLECTED THIS MONTH</h3>
            <div className={styles.metricBottom}>
              <p className={styles.metricValue}>$248,910</p>
              <div className={styles.metricTrendUp}>
                <ArrowUpRight size={14} />
                <span>+12.4%</span>
              </div>
            </div>
          </div>
          <div className={styles.metricCard}>
            <h3 className={styles.metricTitle}>AVG. DAYS TO PAY</h3>
            <div className={styles.metricBottom}>
              <p className={styles.metricValue}>6.2</p>
              <div className={styles.metricTrendDown}>
                <ArrowUpRight size={14} />
                <span>-1.8d</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel (Form Container) */}
      <div className={styles.rightPanel} data-theme="light">
        {children}
      </div>
    </div>
  );
}
