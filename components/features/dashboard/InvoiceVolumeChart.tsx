import React, { useState } from 'react';
import styles from '@/app/(app)/dashboard/dashboard.module.css';
import compStyles from '@/app/(app)/dashboard/dashboard-components.module.css';
import { useDashboardStore } from '@/stores/dashboardStore';

const MONTH_NAMES = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

export interface InvoiceVolumeChartProps {
  title?: string;
  subtitle?: string;
}

export function InvoiceVolumeChart({
  title = 'Revenue overview',
  subtitle = 'Last 12 months'
}: InvoiceVolumeChartProps) {
  const bars = useDashboardStore(state => state.invoiceVolumes);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [tooltipPos, setTooltipPos] = useState<{ x: number; y: number } | null>(null);

  const maxVal = Math.max(...bars, 1);
  const maxBarHeight = 140;

  const handleMouseEnter = (i: number, barVal: number, e: React.MouseEvent<SVGRectElement>) => {
    const rect = e.currentTarget.parentElement?.getBoundingClientRect();
    if (!rect) return;
    const barX = 26 + i * 62 + 22;
    const barHeight = Math.max(16, (barVal / maxVal) * maxBarHeight);
    const barY = 168 - barHeight;
    
    setHoveredIndex(i);
    setTooltipPos({
      x: (barX / 800) * rect.width,
      y: (barY / 180) * rect.height,
    });
  };

  return (
    <div 
      className={styles.card} 
      style={{ 
        position: 'relative',
        backgroundColor: '#16181d',
        borderRadius: '20px',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        padding: '24px 28px',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
      }}
    >
      <div 
        style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          marginBottom: '20px' 
        }}
      >
        <h2 style={{ fontSize: '16px', fontWeight: 500, color: '#f1f5f9', margin: 0, letterSpacing: '-0.2px' }}>
          {title}
        </h2>
        <span style={{ fontSize: '13px', color: '#8a94a6', fontWeight: 400 }}>
          {subtitle}
        </span>
      </div>
      
      <div className={compStyles.chartArea} style={{ height: 180, position: 'relative' }}>
        {/* Floating Tooltip Card */}
        {hoveredIndex !== null && tooltipPos && (
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
              borderRadius: '8px',
              padding: '6px 12px',
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
            <span style={{ fontSize: '11px', color: '#8b9bb4', fontWeight: 500 }}>{MONTH_NAMES[hoveredIndex]}</span>
            <span style={{ fontSize: '13px', fontWeight: 700, color: '#ffffff' }}>
              {bars[hoveredIndex]} {bars[hoveredIndex] === 1 ? 'invoice' : 'invoices'}
            </span>
          </div>
        )}

        <svg 
          width="100%" 
          height="100%" 
          viewBox="0 0 800 180" 
          preserveAspectRatio="none"
          onMouseLeave={() => setHoveredIndex(null)}
        >
          {bars.map((bar, i) => {
            const isHovered = hoveredIndex === i;
            const barHeight = Math.max(16, (bar / maxVal) * maxBarHeight);
            const x = 26 + i * 62;
            const y = 168 - barHeight;

            return (
              <rect 
                key={i}
                x={x}
                y={y}
                width={44}
                height={barHeight}
                fill={isHovered ? '#7286a6' : '#586985'}
                rx="8"
                ry="8"
                onMouseEnter={(e) => handleMouseEnter(i, bar, e)}
                style={{
                  transformOrigin: 'bottom',
                  transformBox: 'fill-box',
                  animation: 'barGrow 1.2s cubic-bezier(0.32, 0.72, 0, 1) both',
                  animationDelay: `${i * 40}ms`,
                  cursor: 'pointer',
                  transition: 'fill 150ms ease, filter 150ms ease, opacity 150ms ease',
                  filter: isHovered ? 'drop-shadow(0 0 12px rgba(114, 134, 166, 0.6))' : 'none',
                }}
              />
            );
          })}
        </svg>
      </div>
    </div>
  );
}

