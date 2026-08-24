import React, { useState } from 'react';
import styles from '@/app/(app)/dashboard/dashboard.module.css';
import compStyles from '@/app/(app)/dashboard/dashboard-components.module.css';
import { useDashboardStore } from '@/stores/dashboardStore';
import { useUiStore } from '@/stores/uiStore';

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
  const theme = useUiStore(state => state.theme);
  const isDark = theme === 'dark';

  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [tooltipPos, setTooltipPos] = useState<{ x: number; y: number } | null>(null);

  const Y_TICKS = [80, 60, 40, 20, 0];
  const SVG_HEIGHT = 260;
  const SVG_WIDTH = 800;
  const TOP_Y = 40;
  const BOTTOM_Y = 220;
  const CHART_HEIGHT = BOTTOM_Y - TOP_Y; // 180px
  const MAX_VAL = 80;

  // Dynamic theme-aware color mapping matching Image 1 (Dark) & Image 2 (Light)
  const themeColors = {
    cardBg: isDark ? '#16181d' : '#ffffff',
    cardBorder: isDark ? '1px solid rgba(255, 255, 255, 0.08)' : '1px solid #e2e8f0',
    cardShadow: isDark ? '0 4px 20px rgba(0, 0, 0, 0.2)' : '0 2px 12px rgba(0, 0, 0, 0.04)',
    subtitle: isDark ? '#8a94a6' : '#8a94a6',
    title: isDark ? '#ffffff' : '#181d27',
    axisText: isDark ? '#8a94a6' : '#8a94a6',
    gridLine: isDark ? 'rgba(255, 255, 255, 0.08)' : '#232630',
    barFill: isDark ? '#ffffff' : '#f1f5f9',
    barHoverFill: isDark ? '#ffffff' : '#e2e8f0',
    barHoverFilter: isDark 
      ? 'drop-shadow(0 0 14px rgba(255, 255, 255, 0.8))' 
      : 'drop-shadow(0 0 10px rgba(0, 0, 0, 0.12))',
    tooltipBg: isDark ? 'rgba(22, 26, 34, 0.94)' : 'rgba(255, 255, 255, 0.96)',
    tooltipBorder: isDark ? '1px solid rgba(255, 255, 255, 0.15)' : '1px solid #cbd5e1',
    tooltipTitle: isDark ? '#ffffff' : '#0f172a',
    tooltipSubtitle: isDark ? '#8b9bb4' : '#64748b',
    tooltipShadow: isDark ? '0 8px 24px rgba(0, 0, 0, 0.5)' : '0 8px 24px rgba(0, 0, 0, 0.12)',
  };

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
        backgroundColor: themeColors.cardBg,
        borderRadius: '20px',
        border: themeColors.cardBorder,
        padding: '24px 28px',
        boxShadow: themeColors.cardShadow,
        transition: 'background-color 200ms ease, border-color 200ms ease, box-shadow 200ms ease',
      }}
    >
      {/* Header */}
      <div style={{ marginBottom: '20px' }}>
        <div 
          style={{ 
            fontSize: '11px', 
            fontWeight: 500, 
            color: themeColors.subtitle, 
            textTransform: 'uppercase', 
            letterSpacing: '1px',
            marginBottom: '4px'
          }}
        >
          {subtitle}
        </div>
        <h2 style={{ fontSize: '22px', fontWeight: 700, color: themeColors.title, margin: 0, transition: 'color 200ms ease' }}>
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
              backgroundColor: themeColors.tooltipBg,
              backdropFilter: 'blur(12px)',
              border: themeColors.tooltipBorder,
              borderRadius: '8px',
              padding: '6px 14px',
              pointerEvents: 'none',
              zIndex: 30,
              boxShadow: themeColors.tooltipShadow,
              whiteSpace: 'nowrap',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '2px',
              transition: 'all 150ms ease-out',
            }}
          >
            <span style={{ fontSize: '11px', color: themeColors.tooltipSubtitle, fontWeight: 500 }}>{MONTH_FULL_NAMES[hoveredIndex]}</span>
            <span style={{ fontSize: '13px', fontWeight: 700, color: themeColors.tooltipTitle }}>
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
                  fill={themeColors.axisText} 
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
                  stroke={themeColors.gridLine} 
                  strokeWidth="1"
                  style={{ transition: 'stroke 200ms ease' }}
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
                  fill={isHovered ? themeColors.barHoverFill : themeColors.barFill}
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
                    filter: isHovered ? themeColors.barHoverFilter : 'none',
                  }}
                />
                <text 
                  x={centerX} 
                  y="248" 
                  fill={themeColors.axisText} 
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


