import React, { useState } from 'react';
import styles from '@/app/(app)/dashboard/dashboard.module.css';
import compStyles from '@/app/(app)/dashboard/dashboard-components.module.css';
import { useDashboardStore } from '@/stores/dashboardStore';

const MONTH_NAMES = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

export function InvoiceVolumeChart() {
  const bars = useDashboardStore(state => state.invoiceVolumes);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [tooltipPos, setTooltipPos] = useState<{ x: number; y: number } | null>(null);

  const handleMouseEnter = (i: number, barVal: number, e: React.MouseEvent<SVGRectElement>) => {
    const rect = e.currentTarget.parentElement?.getBoundingClientRect();
    if (!rect) return;
    const barX = 30 + i * (800 / 12) + 12;
    const barY = 150 - barVal * 1.5;
    
    setHoveredIndex(i);
    setTooltipPos({
      x: (barX / 800) * rect.width,
      y: (barY / 180) * rect.height,
    });
  };

  return (
    <div className={styles.card} style={{ position: 'relative' }}>
      <div className={styles.cardHeader}>
        <div>
          <h3 className={styles.cardTitle}>LAST 12 MONTHS</h3>
          <h2 className={styles.cardValue} style={{fontSize: '20px'}}>Invoice volume</h2>
        </div>
      </div>
      
      <div className={compStyles.chartArea} style={{height: 180, position: 'relative'}}>
        {/* Floating Tooltip Card */}
        {hoveredIndex !== null && tooltipPos && (
          <div 
            className="chart-tooltip-pop"
            style={{
              position: 'absolute',
              left: `${tooltipPos.x}px`,
              top: `${tooltipPos.y - 10}px`,
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
          <line x1="0" y1="30" x2="800" y2="30" stroke="var(--invox-color-border)" strokeDasharray="4 4" />
          <line x1="0" y1="90" x2="800" y2="90" stroke="var(--invox-color-border)" strokeDasharray="4 4" />
          <line x1="0" y1="150" x2="800" y2="150" stroke="var(--invox-color-border)" strokeDasharray="4 4" />
          
          {bars.map((bar, i) => {
            const isHovered = hoveredIndex === i;
            return (
              <rect 
                key={i}
                x={30 + i * (800 / 12)}
                y={150 - bar * 1.5}
                width={24}
                height={bar * 1.5}
                fill={isHovered ? '#ffffff' : 'var(--invox-color-border-border-gray-border-secondary, #2A303C)'}
                rx="4"
                onMouseEnter={(e) => handleMouseEnter(i, bar, e)}
                style={{
                  transformOrigin: 'bottom',
                  transformBox: 'fill-box',
                  animation: 'barGrow 1.5s cubic-bezier(0.32, 0.72, 0, 1) both',
                  animationDelay: `${i * 50}ms`,
                  cursor: 'pointer',
                  transition: 'fill 150ms ease, filter 150ms ease',
                  filter: isHovered ? 'drop-shadow(0 0 10px rgba(255, 255, 255, 0.6))' : 'none',
                }}
              />
            );
          })}
        </svg>
      </div>
      <div style={{display: 'flex', justifyContent: 'space-between', marginTop: '12px', color: 'var(--invox-color-text-tertiary)', fontSize: '10px', textTransform: 'uppercase'}}>
        <span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span><span>Jul</span><span>Aug</span><span>Sep</span><span>Oct</span><span>Nov</span><span>Dec</span>
      </div>
    </div>
  );
}
