'use client';

import React from 'react';
import { useUiStore } from '@/stores/uiStore';
import { CurrencyDisplay } from '@/components/shared/CurrencyDisplay';
import { formatCompactCurrency } from '@/utils/currency';
import styles from './analytics.module.css';

export default function AnalyticsPage() {
  const targetCurrency = useUiStore((state) => state.userProfile?.currency || 'USD');

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className="apple-pop-up">
        <div className={styles.headerSection}>
          <span className={styles.kicker}>ANALYTICS</span>
          <h1 className={styles.title}>Trends & insight</h1>
          <p className={styles.subtitle}>
            A quiet look at revenue rhythms and where growth is coming from.
          </p>
        </div>
      </div>

      {/* Top Grid Row */}
      <div className="apple-pop-up stagger-1">
        <div className={styles.topRow}>
          {/* Left Column (8 cols): Collected vs sent chart */}
          <div className={styles.col8}>
            <div className={styles.card}>
              <div className={styles.cardHeader}>
                <span className={styles.kicker}>ROLLING 12 MONTHS</span>
                <h2 className={styles.cardTitle}>Collected vs. sent</h2>
              </div>

              <div className={styles.lineChartArea}>
                <svg width="100%" height="100%" viewBox="0 0 800 220" preserveAspectRatio="none">
                  {/* Y-axis Labels */}
                  <text x="5" y="25" fill="var(--invox-color-text-tertiary, #888)" fontSize="11">
                    {formatCompactCurrency(120000, targetCurrency)}
                  </text>
                  <text x="5" y="70" fill="var(--invox-color-text-tertiary, #888)" fontSize="11">
                    {formatCompactCurrency(90000, targetCurrency)}
                  </text>
                  <text x="5" y="115" fill="var(--invox-color-text-tertiary, #888)" fontSize="11">
                    {formatCompactCurrency(60000, targetCurrency)}
                  </text>
                  <text x="5" y="160" fill="var(--invox-color-text-tertiary, #888)" fontSize="11">
                    {formatCompactCurrency(30000, targetCurrency)}
                  </text>
                  <text x="5" y="205" fill="var(--invox-color-text-tertiary, #888)" fontSize="11">
                    {formatCompactCurrency(0, targetCurrency)}
                  </text>

                  {/* Horizontal Gridlines */}
                  <line x1="45" y1="20" x2="800" y2="20" stroke="var(--invox-color-border)" strokeDasharray="4 4" opacity="0.6" />
                  <line x1="45" y1="65" x2="800" y2="65" stroke="var(--invox-color-border)" strokeDasharray="4 4" opacity="0.6" />
                  <line x1="45" y1="110" x2="800" y2="110" stroke="var(--invox-color-border)" strokeDasharray="4 4" opacity="0.6" />
                  <line x1="45" y1="155" x2="800" y2="155" stroke="var(--invox-color-border)" strokeDasharray="4 4" opacity="0.6" />
                  <line x1="45" y1="200" x2="800" y2="200" stroke="var(--invox-color-border)" strokeDasharray="4 4" opacity="0.6" />

                  {/* Curve 1: Sent (Upper curve) */}
                  <path 
                    d="M 45,170 C 80,150 110,155 150,160 C 190,165 220,130 260,135 C 300,140 330,110 370,115 C 410,120 440,95 480,100 C 520,105 550,115 590,95 C 630,75 660,80 700,75 C 740,70 760,50 780,35" 
                    fill="none" 
                    stroke="#4f5f7e" 
                    strokeWidth="2.5" 
                  />

                  {/* Curve 2: Collected (Lower curve) */}
                  <path 
                    d="M 45,185 C 80,165 110,170 150,175 C 190,180 220,145 260,150 C 300,155 330,125 370,130 C 410,135 440,110 480,115 C 520,120 550,130 590,110 C 630,90 660,95 700,90 C 740,85 760,65 780,50" 
                    fill="none" 
                    stroke="#6b7e9c" 
                    strokeWidth="2.5" 
                  />
                </svg>
              </div>

              <div className={styles.monthLabels}>
                <span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span><span>Jul</span><span>Aug</span><span>Sep</span><span>Oct</span><span>Nov</span><span>Dec</span>
              </div>
            </div>
          </div>

          {/* Right Column (4 cols): Revenue by segment donut */}
          <div className={styles.col4}>
            <div className={styles.card}>
              <div className={styles.cardHeader}>
                <span className={styles.kicker}>SHARE OF TOTAL</span>
                <h2 className={styles.cardTitle}>Revenue by segment</h2>
              </div>

              <div className={styles.donutArea}>
                <svg className={styles.donutSvg} viewBox="0 0 160 160">
                  <circle
                    cx="80"
                    cy="80"
                    r="60"
                    fill="none"
                    stroke="var(--invox-color-border)"
                    strokeWidth="28"
                  />

                  {/* Segment 1: Hospitality (38%) */}
                  <circle
                    cx="80"
                    cy="80"
                    r="60"
                    fill="none"
                    stroke="#384c66"
                    strokeWidth="28"
                    strokeDasharray="143 234"
                    strokeDashoffset="0"
                  />

                  {/* Segment 2: Studios (30%) */}
                  <circle
                    cx="80"
                    cy="80"
                    r="60"
                    fill="none"
                    stroke="#6b7e9c"
                    strokeWidth="28"
                    strokeDasharray="113 264"
                    strokeDashoffset="-146"
                  />

                  {/* Segment 3: Labs (20%) */}
                  <circle
                    cx="80"
                    cy="80"
                    r="60"
                    fill="none"
                    stroke="#9db0cc"
                    strokeWidth="28"
                    strokeDasharray="75 302"
                    strokeDashoffset="-262"
                  />

                  {/* Segment 4: Retail (12%) */}
                  <circle
                    cx="80"
                    cy="80"
                    r="60"
                    fill="none"
                    stroke="#d8e2f0"
                    strokeWidth="28"
                    strokeDasharray="45 332"
                    strokeDashoffset="-340"
                  />
                </svg>
              </div>

              <div className={styles.legendRow}>
                <div className={styles.legendItem}>
                  <span className={styles.legendDot} style={{ backgroundColor: '#384c66' }}></span>
                  <span>Hospitality</span>
                </div>
                <div className={styles.legendItem}>
                  <span className={styles.legendDot} style={{ backgroundColor: '#6b7e9c' }}></span>
                  <span>Studios</span>
                </div>
                <div className={styles.legendItem}>
                  <span className={styles.legendDot} style={{ backgroundColor: '#9db0cc' }}></span>
                  <span>Labs</span>
                </div>
                <div className={styles.legendItem}>
                  <span className={styles.legendDot} style={{ backgroundColor: '#d8e2f0' }}></span>
                  <span>Retail</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Grid Row (3 Metric Cards) */}
      <div className="apple-pop-up stagger-2">
        <div className={styles.bottomGrid}>
          <div className={styles.metricCard}>
            <span className={styles.metricLabel}>Best month</span>
            <h2 className={styles.metricValue}>December</h2>
            <span className={styles.metricSubtext}>
              <CurrencyDisplay amount={104000} originalCurrency="USD" /> collected
            </span>
          </div>

          <div className={styles.metricCard}>
            <span className={styles.metricLabel}>Avg. invoice size</span>
            <h2 className={styles.metricValue}>
              <CurrencyDisplay amount={8412} originalCurrency="USD" />
            </h2>
            <span className={styles.metricSubtext}>+6.2% YoY</span>
          </div>

          <div className={styles.metricCard}>
            <span className={styles.metricLabel}>Top segment</span>
            <h2 className={styles.metricValue}>Hospitality</h2>
            <span className={styles.metricSubtext}>38% of revenue</span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className={styles.footer}>
        <span>© Invox 2026</span>
        <span>All amounts in {targetCurrency} · Updated just now</span>
      </div>
    </div>
  );
}
