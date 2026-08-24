import React, { useState } from 'react';
import styles from '@/app/(app)/dashboard/dashboard.module.css';
import compStyles from '@/app/(app)/dashboard/dashboard-components.module.css';
import { useDashboardStore } from '@/stores/dashboardStore';

const MONTH_SHORT_NAMES = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const MONTH_FULL_NAMES = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

export interface InvoiceVolumeChartProps {
  title?: string;
  subtitle?: string;
}

export function InvoiceVolumeChart({
  title = 'Invoice volume',
  subtitle = 'LAST 12 MONTHS'
}: InvoiceVolumeChartProps) {
  const bars = useDashboardStore(state => state.invoiceVolumes);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [tooltipPos, setTooltipPos] = useState<{ x: number; y: number } | null>(null);

  const Y_TICKS = [80, 60, 40, 20, 0];
  const SVG_HEIGHT = 260;
  const SVG_WIDTH = 800;
  const TOP_Y = 40;
  const BOTTOM_Y = 220;
  const CHART_HEIGHT = BOTTOM_Y - TOP_Y; // 180px
  const MAX_VAL = 80;

  const handleMouseEnter = (i: number, barVal: number, e: React.MouseEvent<SVGRectElement>) => {
    const rect = e.currentTarget.parentElement?.getBoundingClientRect();
    if (!rect) return;
    const barX = 55 + i * 60 + 19;
    const barHeight = (barVal / MAX_VAL) * CHART_HEIGHT;
    const barY = BOTTOM_Y - barHeight;
    
    setHoveredIndex(i);
    setTooltipPos({
      x: (barX / SVG_WIDTH) * rect.width,
      y: (barY / SVG_HEIGHT) * rect.height,
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
      {/* Header matching Image 2 */}
      <div style={{ marginBottom: '20px' }}>
        <div 
          style={{ 
            fontSize: '11px', 
            fontWeight: 500, 
            color: '#8a94a6', 
            textTransform: 'uppercase', 
            letterSpacing: '1px',
            marginBottom: '4px'
          }}
        >
          {subtitle}
        </div>
        <h2 style={{ fontSize: '22px', fontWeight: 700, color: '#ffffff', margin: 0 }}>
          {title}
        </h2>
      </div>
      
      <div className={compStyles.chartArea} style={{ height: 260, position: 'relative' }}>
        {/* Floating Tooltip Card */}
        {hoveredIndex !== null && tooltipPos && (
          <div 
            className="chart-tooltip-pop"
            style={{
              position: 'absolute',
              left: `${tooltipPos.x}px`,
              top: `${tooltipPos.y - 12}px`,
              transform: 'translate(-50%, -100%)',
              backgroundColor: 'rgba(22, 26, 34, 0.94)',
              backdropFilter: 'blur(12px)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              borderRadius: '8px',
              padding: '6px 14px',
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
            <span style={{ fontSize: '11px', color: '#8b9bb4', fontWeight: 500 }}>{MONTH_FULL_NAMES[hoveredIndex]}</span>
            <span style={{ fontSize: '13px', fontWeight: 700, color: '#ffffff' }}>
              {bars[hoveredIndex]} {bars[hoveredIndex] === 1 ? 'invoice' : 'invoices'}
            </span>
          </div>
        )}

        <svg 
          width="100%" 
          height="100%" 
          viewBox={`0 0 ${SVG_WIDTH} ${SVG_HEIGHT}`} 
          preserveAspectRatio="none"
          onMouseLeave={() => setHoveredIndex(null)}
        >
          {/* Y-Axis Numerical Labels & Grid Lines */}
          {Y_TICKS.map((tick, idx) => {
            const yPos = TOP_Y + idx * (CHART_HEIGHT / 4);
            return (
              <g key={tick}>
                <text 
                  x="28" 
                  y={yPos + 4} 
                  fill="#8a94a6" 
                  fontSize="12" 
                  textAnchor="end"
                  fontFamily="system-ui, -apple-system, sans-serif"
                >
                  {tick}
                </text>
                <line 
                  x1="50" 
                  y1={yPos} 
                  x2="770" 
                  y2={yPos} 
                  stroke="rgba(255, 255, 255, 0.08)" 
                  strokeWidth="1"
                />
              </g>
            );
          })}

          {/* Bars and X-Axis Month Labels */}
          {bars.map((bar, i) => {
            const isHovered = hoveredIndex === i;
            const barHeight = (bar / MAX_VAL) * CHART_HEIGHT;
            const x = 55 + i * 60;
            const y = BOTTOM_Y - barHeight;
            const centerX = x + 19;

            return (
              <g key={i}>
                <rect 
                  x={x}
                  y={y}
                  width={38}
                  height={barHeight}
                  fill="#ffffff"
                  opacity={isHovered ? 1 : 0.95}
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
                    filter: isHovered ? 'drop-shadow(0 0 14px rgba(255, 255, 255, 0.8))' : 'none',
                  }}
                />
                <text 
                  x={centerX} 
                  y="248" 
                  fill="#8a94a6" 
                  fontSize="12" 
                  textAnchor="middle"
                  fontFamily="system-ui, -apple-system, sans-serif"
                >
                  {MONTH_SHORT_NAMES[i]}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
}


