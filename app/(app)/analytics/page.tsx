'use client';

import React, { useState } from 'react';
import { useUiStore } from '@/stores/uiStore';
import { CurrencyDisplay } from '@/components/shared/CurrencyDisplay';
import { formatCompactCurrency } from '@/utils/currency';
import styles from './analytics.module.css';

const ANALYTICS_MONTHS = [
  { month: 'Jan 2026', x: 45, ySent: 170, yColl: 185, sent: 45000, coll: 42000 },
  { month: 'Feb 2026', x: 110, ySent: 155, yColl: 170, sent: 52000, coll: 51000 },
  { month: 'Mar 2026', x: 175, ySent: 160, yColl: 175, sent: 49000, coll: 48000 },
  { month: 'Apr 2026', x: 240, ySent: 135, yColl: 150, sent: 64000, coll: 61000 },
  { month: 'May 2026', x: 305, ySent: 135, yColl: 150, sent: 62000, coll: 59000 },
  { month: 'Jun 2026', x: 370, ySent: 115, yColl: 130, sent: 76000, coll: 72000 },
  { month: 'Jul 2026', x: 435, ySent: 115, yColl: 130, sent: 72000, coll: 68000 },
  { month: 'Aug 2026', x: 500, ySent: 95, yColl: 110, sent: 88500, coll: 81200 },
  { month: 'Sep 2026', x: 565, ySent: 95, yColl: 110, sent: 81000, coll: 76000 },
  { month: 'Oct 2026', x: 630, ySent: 75, yColl: 90, sent: 96000, coll: 92000 },
  { month: 'Nov 2026', x: 695, ySent: 75, yColl: 90, sent: 91000, coll: 88000 },
  { month: 'Dec 2026', x: 760, ySent: 35, yColl: 50, sent: 112000, coll: 104000 },
];

const SEGMENTS = [
  { name: 'Hospitality', pct: '38%', amount: 320872, color: '#384c66' },
  { name: 'Studios', pct: '30%', amount: 253320, color: '#6b7e9c' },
  { name: 'Labs', pct: '20%', amount: 168880, color: '#9db0cc' },
  { name: 'Retail', pct: '12%', amount: 101328, color: '#d8e2f0' },
];

export default function AnalyticsPage() {
  const targetCurrency = useUiStore((state) => state.userProfile?.currency || 'USD');

  const [activeMonthIdx, setActiveMonthIdx] = useState<number | null>(null);
  const [lineTooltipPos, setLineTooltipPos] = useState<{ x: number; y: number } | null>(null);
  const [activeSegmentIdx, setActiveSegmentIdx] = useState<number | null>(null);

  const handleLineMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const svgX = ((e.clientX - rect.left) / rect.width) * 800;

    let closestIdx = 0;
    let minDistance = Math.abs(svgX - ANALYTICS_MONTHS[0].x);

    for (let i = 1; i < ANALYTICS_MONTHS.length; i++) {
      const dist = Math.abs(svgX - ANALYTICS_MONTHS[i].x);
      if (dist < minDistance) {
        minDistance = dist;
        closestIdx = i;
      }
    }

    setActiveMonthIdx(closestIdx);
    setLineTooltipPos({
      x: (ANALYTICS_MONTHS[closestIdx].x / 800) * rect.width,
      y: (ANALYTICS_MONTHS[closestIdx].ySent / 220) * rect.height,
    });
  };

  const activeAnalyticsPt = activeMonthIdx !== null ? ANALYTICS_MONTHS[activeMonthIdx] : null;
  const activeSegment = activeSegmentIdx !== null ? SEGMENTS[activeSegmentIdx] : null;

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
            <div className={styles.card} style={{ position: 'relative' }}>
              <div className={styles.cardHeader}>
                <span className={styles.kicker}>ROLLING 12 MONTHS</span>
                <h2 className={styles.cardTitle}>Collected vs. sent</h2>
              </div>

              <div className={styles.lineChartArea} style={{ position: 'relative' }}>
                {/* Floating Tooltip Card */}
                {activeAnalyticsPt && lineTooltipPos && (
                  <div 
                    className="chart-tooltip-pop"
                    style={{
                      position: 'absolute',
                      left: `${lineTooltipPos.x}px`,
                      top: `${lineTooltipPos.y - 12}px`,
                      transform: 'translate(-50%, -100%)',
                      backgroundColor: 'rgba(22, 26, 34, 0.94)',
                      backdropFilter: 'blur(12px)',
                      border: '1px solid rgba(255, 255, 255, 0.15)',
                      borderRadius: '10px',
                      padding: '8px 14px',
                      pointerEvents: 'none',
                      zIndex: 30,
                      boxShadow: '0 8px 24px rgba(0, 0, 0, 0.4)',
                      whiteSpace: 'nowrap',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '4px',
                    }}
                  >
                    <span style={{ fontSize: '11px', color: '#8b9bb4', fontWeight: 500, textAlign: 'center' }}>{activeAnalyticsPt.month}</span>
                    <div style={{ display: 'flex', gap: '12px', fontSize: '12px', fontWeight: 600 }}>
                      <span style={{ color: '#8fa0c0' }}>
                        Sent: <CurrencyDisplay amount={activeAnalyticsPt.sent} originalCurrency="USD" />
                      </span>
                      <span style={{ color: '#6b7e9c' }}>
                        Collected: <CurrencyDisplay amount={activeAnalyticsPt.coll} originalCurrency="USD" />
                      </span>
                    </div>
                  </div>
                )}

                <svg 
                  width="100%" 
                  height="100%" 
                  viewBox="0 0 800 220" 
                  preserveAspectRatio="none"
                  onMouseMove={handleLineMouseMove}
                  onMouseLeave={() => { setActiveMonthIdx(null); setLineTooltipPos(null); }}
                  style={{ cursor: 'crosshair' }}
                >
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

                  {/* Curve 1: Sent (Upper curve) - Smooth 2.4s path draw */}
                  <path 
                    d="M 45,170 C 80,150 110,155 150,160 C 190,165 220,130 260,135 C 300,140 330,110 370,115 C 410,120 440,95 480,100 C 520,105 550,115 590,95 C 630,75 660,80 700,75 C 740,70 760,50 780,35" 
                    fill="none" 
                    stroke="#4f5f7e" 
                    strokeWidth="3" 
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{
                      strokeDasharray: 1200,
                      strokeDashoffset: 0,
                      animation: 'linePathDraw 2.4s cubic-bezier(0.16, 1, 0.3, 1) both',
                    }}
                  />

                  {/* Curve 2: Collected (Lower curve) - Smooth 2.4s path draw */}
                  <path 
                    d="M 45,185 C 80,165 110,170 150,175 C 190,180 220,145 260,150 C 300,155 330,125 370,130 C 410,135 440,110 480,115 C 520,120 550,130 590,110 C 630,90 660,95 700,90 C 740,85 760,65 780,50" 
                    fill="none" 
                    stroke="#6b7e9c" 
                    strokeWidth="3" 
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{
                      strokeDasharray: 1200,
                      strokeDashoffset: 0,
                      animation: 'linePathDraw 2.4s cubic-bezier(0.16, 1, 0.3, 1) 0.3s both',
                    }}
                  />

                  {/* Interactive Hover Indicator Line and Pulsing Dots */}
                  {activeAnalyticsPt && (
                    <g>
                      <line 
                        x1={activeAnalyticsPt.x} 
                        y1="20" 
                        x2={activeAnalyticsPt.x} 
                        y2="200" 
                        stroke="rgba(255, 255, 255, 0.35)" 
                        strokeDasharray="4 4" 
                        strokeWidth="1.5"
                      />
                      <circle 
                        cx={activeAnalyticsPt.x} 
                        cy={activeAnalyticsPt.ySent} 
                        r="6" 
                        fill="#4f5f7e" 
                        stroke="#ffffff" 
                        strokeWidth="2.5"
                        style={{ filter: 'drop-shadow(0 0 6px rgba(79, 95, 126, 0.8))' }}
                      />
                      <circle 
                        cx={activeAnalyticsPt.x} 
                        cy={activeAnalyticsPt.yColl} 
                        r="6" 
                        fill="#6b7e9c" 
                        stroke="#ffffff" 
                        strokeWidth="2.5"
                        style={{ filter: 'drop-shadow(0 0 6px rgba(107, 126, 156, 0.8))' }}
                      />
                    </g>
                  )}
                </svg>
              </div>

              <div className={styles.monthLabels}>
                <span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span><span>Jul</span><span>Aug</span><span>Sep</span><span>Oct</span><span>Nov</span><span>Dec</span>
              </div>
            </div>
          </div>

          {/* Right Column (4 cols): Revenue by segment donut */}
          <div className={styles.col4}>
            <div className={styles.card} style={{ position: 'relative' }}>
              <div className={styles.cardHeader}>
                <span className={styles.kicker}>SHARE OF TOTAL</span>
                <h2 className={styles.cardTitle}>Revenue by segment</h2>
              </div>

              <div className={styles.donutArea} style={{ position: 'relative' }}>
                {/* Floating Segment Tooltip */}
                {activeSegment && (
                  <div 
                    className="chart-tooltip-pop"
                    style={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      backgroundColor: 'rgba(22, 26, 34, 0.94)',
                      backdropFilter: 'blur(12px)',
                      border: '1px solid rgba(255, 255, 255, 0.15)',
                      borderRadius: '10px',
                      padding: '8px 14px',
                      pointerEvents: 'none',
                      zIndex: 30,
                      boxShadow: '0 8px 24px rgba(0, 0, 0, 0.5)',
                      whiteSpace: 'nowrap',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '2px',
                    }}
                  >
                    <span style={{ fontSize: '11px', color: activeSegment.color, fontWeight: 600 }}>{activeSegment.name} • {activeSegment.pct}</span>
                    <span style={{ fontSize: '14px', fontWeight: 700, color: '#ffffff' }}>
                      <CurrencyDisplay amount={activeSegment.amount} originalCurrency="USD" />
                    </span>
                  </div>
                )}

                <svg className={styles.donutSvg} viewBox="0 0 160 160" style={{ animation: 'donutScaleEntrance 2.0s cubic-bezier(0.16, 1, 0.3, 1) both', transformOrigin: 'center' }}>
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
                    strokeWidth={activeSegmentIdx === 0 ? "34" : "28"}
                    strokeDasharray="143 234"
                    strokeDashoffset="0"
                    onMouseEnter={() => setActiveSegmentIdx(0)}
                    onMouseLeave={() => setActiveSegmentIdx(null)}
                    style={{ cursor: 'pointer', transition: 'stroke-width 180ms ease, filter 180ms ease', filter: activeSegmentIdx === 0 ? 'drop-shadow(0 0 12px rgba(56, 76, 102, 0.8))' : 'none' }}
                  />

                  {/* Segment 2: Studios (30%) */}
                  <circle
                    cx="80"
                    cy="80"
                    r="60"
                    fill="none"
                    stroke="#6b7e9c"
                    strokeWidth={activeSegmentIdx === 1 ? "34" : "28"}
                    strokeDasharray="113 264"
                    strokeDashoffset="-146"
                    onMouseEnter={() => setActiveSegmentIdx(1)}
                    onMouseLeave={() => setActiveSegmentIdx(null)}
                    style={{ cursor: 'pointer', transition: 'stroke-width 180ms ease, filter 180ms ease', filter: activeSegmentIdx === 1 ? 'drop-shadow(0 0 12px rgba(107, 126, 156, 0.8))' : 'none' }}
                  />

                  {/* Segment 3: Labs (20%) */}
                  <circle
                    cx="80"
                    cy="80"
                    r="60"
                    fill="none"
                    stroke="#9db0cc"
                    strokeWidth={activeSegmentIdx === 2 ? "34" : "28"}
                    strokeDasharray="75 302"
                    strokeDashoffset="-262"
                    onMouseEnter={() => setActiveSegmentIdx(2)}
                    onMouseLeave={() => setActiveSegmentIdx(null)}
                    style={{ cursor: 'pointer', transition: 'stroke-width 180ms ease, filter 180ms ease', filter: activeSegmentIdx === 2 ? 'drop-shadow(0 0 12px rgba(157, 176, 204, 0.8))' : 'none' }}
                  />

                  {/* Segment 4: Retail (12%) */}
                  <circle
                    cx="80"
                    cy="80"
                    r="60"
                    fill="none"
                    stroke="#d8e2f0"
                    strokeWidth={activeSegmentIdx === 3 ? "34" : "28"}
                    strokeDasharray="45 332"
                    strokeDashoffset="-340"
                    onMouseEnter={() => setActiveSegmentIdx(3)}
                    onMouseLeave={() => setActiveSegmentIdx(null)}
                    style={{ cursor: 'pointer', transition: 'stroke-width 180ms ease, filter 180ms ease', filter: activeSegmentIdx === 3 ? 'drop-shadow(0 0 12px rgba(216, 226, 240, 0.8))' : 'none' }}
                  />
                </svg>
              </div>

              <div className={styles.legendRow}>
                {SEGMENTS.map((seg, idx) => (
                  <div 
                    key={seg.name}
                    className={styles.legendItem}
                    onMouseEnter={() => setActiveSegmentIdx(idx)}
                    onMouseLeave={() => setActiveSegmentIdx(null)}
                    style={{ cursor: 'pointer', opacity: activeSegmentIdx !== null && activeSegmentIdx !== idx ? 0.5 : 1, transition: 'opacity 180ms ease' }}
                  >
                    <span className={styles.legendDot} style={{ backgroundColor: seg.color }}></span>
                    <span>{seg.name}</span>
                  </div>
                ))}
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
