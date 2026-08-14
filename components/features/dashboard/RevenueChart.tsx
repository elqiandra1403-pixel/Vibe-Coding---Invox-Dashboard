import React, { useState } from 'react';
import styles from '@/app/(app)/dashboard/dashboard.module.css';
import compStyles from '@/app/(app)/dashboard/dashboard-components.module.css';
import { useDashboardStore, PERIOD_DATA_MAP } from '@/stores/dashboardStore';
import { useUiStore } from '@/stores/uiStore';
import { CurrencyDisplay } from '@/components/shared/CurrencyDisplay';
import { formatCompactCurrency } from '@/utils/currency';

const MONTH_POINTS = [
  { month: 'Jan 2026', x: 50, y: 170, val: 42000 },
  { month: 'Feb 2026', x: 118, y: 155, val: 51000 },
  { month: 'Mar 2026', x: 186, y: 160, val: 48000 },
  { month: 'Apr 2026', x: 254, y: 130, val: 61000 },
  { month: 'May 2026', x: 322, y: 135, val: 59000 },
  { month: 'Jun 2026', x: 390, y: 110, val: 72000 },
  { month: 'Jul 2026', x: 458, y: 115, val: 68000 },
  { month: 'Aug 2026', x: 526, y: 95, val: 81200 },
  { month: 'Sep 2026', x: 594, y: 100, val: 76000 },
  { month: 'Oct 2026', x: 662, y: 75, val: 92000 },
  { month: 'Nov 2026', x: 730, y: 80, val: 88000 },
  { month: 'Dec 2026', x: 798, y: 40, val: 104000 },
];

export function RevenueChart() {
  const selectedPeriod = useDashboardStore(state => state.selectedPeriod);
  const numericTotalFromStore = useDashboardStore(state => state.numericRevenueTotal);
  const targetCurrency = useUiStore(state => state.userProfile?.currency || 'USD');
  
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [tooltipPos, setTooltipPos] = useState<{ x: number; y: number } | null>(null);

  const periodData = PERIOD_DATA_MAP[selectedPeriod] || PERIOD_DATA_MAP['12m'];
  const numericTotal = selectedPeriod === '12m' ? numericTotalFromStore : periodData.numericTotal;

  // Generate dynamic Y-axis tick values based on maximum period revenue
  const maxUSD = Math.max(numericTotal * 1.1, 100000);
  const tick1 = Math.round(maxUSD * 0.9);
  const tick2 = Math.round(maxUSD * 0.6);
  const tick3 = Math.round(maxUSD * 0.3);

  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const svgX = ((e.clientX - rect.left) / rect.width) * 800;

    let closestIdx = 0;
    let minDistance = Math.abs(svgX - MONTH_POINTS[0].x);

    for (let i = 1; i < MONTH_POINTS.length; i++) {
      const dist = Math.abs(svgX - MONTH_POINTS[i].x);
      if (dist < minDistance) {
        minDistance = dist;
        closestIdx = i;
      }
    }

    setHoveredIndex(closestIdx);
    setTooltipPos({
      x: (MONTH_POINTS[closestIdx].x / 800) * rect.width,
      y: (MONTH_POINTS[closestIdx].y / 240) * rect.height,
    });
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
    setTooltipPos(null);
  };

  const activePt = hoveredIndex !== null ? MONTH_POINTS[hoveredIndex] : null;

  return (
    <div className={styles.card} style={{ position: 'relative' }}>
      <div className={styles.cardHeader}>
        <div>
          <h3 className={styles.cardTitle}>{periodData.revenueKicker}</h3>
          <h2 className={styles.cardValue}>Revenue overview</h2>
        </div>
      </div>
      <div style={{fontSize: '34px', fontWeight: '600', marginBottom: '8px'}}>
        <CurrencyDisplay amount={numericTotal} originalCurrency="USD" />
      </div>
      <div style={{display: 'flex', justifyContent: 'space-between', color: 'var(--invox-color-text-secondary)', fontSize: '12px'}}>
        <span>{periodData.revenueSubtitle}</span>
        <span style={{display: 'flex', alignItems: 'center', gap: '6px'}}><div style={{width: 8, height: 8, borderRadius: '50%', backgroundColor: '#3b82f6'}}></div> Collected</span>
      </div>
      
      <div className={compStyles.chartArea} style={{ position: 'relative' }}>
        {/* Floating Tooltip Card */}
        {activePt && tooltipPos && (
          <div 
            className="chart-tooltip-pop"
            style={{
              position: 'absolute',
              left: `${tooltipPos.x}px`,
              top: `${tooltipPos.y - 12}px`,
              transform: 'translate(-50%, -100%)',
              backgroundColor: 'rgba(22, 26, 34, 0.92)',
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
              alignItems: 'center',
              gap: '2px',
            }}
          >
            <span style={{ fontSize: '11px', color: '#8b9bb4', fontWeight: 500 }}>{activePt.month}</span>
            <span style={{ fontSize: '14px', fontWeight: 700, color: '#ffffff' }}>
              <CurrencyDisplay amount={activePt.val} originalCurrency="USD" />
            </span>
          </div>
        )}

        {/* Dynamic Line Chart with converted Y-axis labels and smooth 1.8s entrance drawing animation */}
        <svg 
          key={selectedPeriod} 
          width="100%" 
          height="100%" 
          viewBox="0 0 800 240" 
          preserveAspectRatio="none"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{ cursor: 'crosshair' }}
        >
          {/* Y-axis labels */}
          <text x="5" y="44" fill="var(--invox-color-text-tertiary)" fontSize="10">{formatCompactCurrency(tick1, targetCurrency)}</text>
          <text x="5" y="104" fill="var(--invox-color-text-tertiary)" fontSize="10">{formatCompactCurrency(tick2, targetCurrency)}</text>
          <text x="5" y="164" fill="var(--invox-color-text-tertiary)" fontSize="10">{formatCompactCurrency(tick3, targetCurrency)}</text>
          <text x="5" y="224" fill="var(--invox-color-text-tertiary)" fontSize="10">{formatCompactCurrency(0, targetCurrency)}</text>

          {/* Grid lines */}
          <line x1="50" y1="40" x2="800" y2="40" stroke="var(--invox-color-border)" strokeDasharray="4 4" />
          <line x1="50" y1="100" x2="800" y2="100" stroke="var(--invox-color-border)" strokeDasharray="4 4" />
          <line x1="50" y1="160" x2="800" y2="160" stroke="var(--invox-color-border)" strokeDasharray="4 4" />
          <line x1="50" y1="220" x2="800" y2="220" stroke="var(--invox-color-border)" strokeDasharray="4 4" />
          
          {/* Line Path Draw Animation */}
          <path 
            d={periodData.pathD} 
            fill="none" 
            stroke="#3b82f6" 
            strokeWidth="3.5" 
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{
              strokeDasharray: 1200,
              strokeDashoffset: 0,
              animation: 'linePathDraw 2.4s cubic-bezier(0.16, 1, 0.3, 1) both',
            }}
          />
          
          {/* Gradient Fill Fade-In Animation */}
          <path 
            d={`${periodData.pathD} L 800 240 L 50 240 Z`} 
            fill="url(#gradient)" 
            opacity="0.25"
            style={{
              animation: 'fadeIn 2.0s cubic-bezier(0.16, 1, 0.3, 1) 0.5s both',
            }}
          />

          {/* Interactive Hover Indicator Line and Dot */}
          {activePt && (
            <g>
              <line 
                x1={activePt.x} 
                y1="30" 
                x2={activePt.x} 
                y2="230" 
                stroke="rgba(255, 255, 255, 0.35)" 
                strokeDasharray="4 4" 
                strokeWidth="1.5"
              />
              <circle 
                cx={activePt.x} 
                cy={activePt.y} 
                r="7" 
                fill="#3b82f6" 
                stroke="#ffffff" 
                strokeWidth="3"
                style={{
                  filter: 'drop-shadow(0 0 8px rgba(59, 130, 246, 0.8))',
                  transition: 'all 120ms ease-out',
                }}
              />
            </g>
          )}
          
          <defs>
            <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity="1" />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      <div style={{display: 'flex', justifyContent: 'space-between', marginTop: '12px', color: 'var(--invox-color-text-tertiary)', fontSize: '10px', textTransform: 'uppercase'}}>
        <span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span><span>Jul</span><span>Aug</span><span>Sep</span><span>Oct</span><span>Nov</span><span>Dec</span>
      </div>
    </div>
  );
}
