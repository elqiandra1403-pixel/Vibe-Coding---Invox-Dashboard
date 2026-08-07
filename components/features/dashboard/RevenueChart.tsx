import React from 'react';
import styles from '@/app/(app)/dashboard/dashboard.module.css';
import compStyles from '@/app/(app)/dashboard/dashboard-components.module.css';
import { useDashboardStore, PERIOD_DATA_MAP } from '@/stores/dashboardStore';

export function RevenueChart() {
  const selectedPeriod = useDashboardStore(state => state.selectedPeriod);
  const revenueTotalFromStore = useDashboardStore(state => state.revenueTotal);
  
  const periodData = PERIOD_DATA_MAP[selectedPeriod] || PERIOD_DATA_MAP['12m'];
  const displayTotal = selectedPeriod === '12m' ? revenueTotalFromStore : periodData.revenueTotal;

  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <div>
          <h3 className={styles.cardTitle}>{periodData.revenueKicker}</h3>
          <h2 className={styles.cardValue}>Revenue overview</h2>
        </div>
      </div>
      <div style={{fontSize: '34px', fontWeight: '600', marginBottom: '8px'}}>{displayTotal}</div>
      <div style={{display: 'flex', justifyContent: 'space-between', color: 'var(--invox-color-text-secondary)', fontSize: '12px'}}>
        <span>{periodData.revenueSubtitle}</span>
        <span style={{display: 'flex', alignItems: 'center', gap: '6px'}}><div style={{width: 8, height: 8, borderRadius: '50%', backgroundColor: '#3b82f6'}}></div> Collected</span>
      </div>
      
      <div className={compStyles.chartArea}>
        {/* Mock Line Chart with Y-axis labels */}
        <svg width="100%" height="100%" viewBox="0 0 800 240" preserveAspectRatio="none">
          {/* Y-axis labels */}
          <text x="10" y="44" fill="var(--invox-color-text-tertiary)" fontSize="10">$750k</text>
          <text x="10" y="104" fill="var(--invox-color-text-tertiary)" fontSize="10">$500k</text>
          <text x="10" y="164" fill="var(--invox-color-text-tertiary)" fontSize="10">$250k</text>
          <text x="10" y="224" fill="var(--invox-color-text-tertiary)" fontSize="10">$0k</text>

          {/* Grid lines */}
          <line x1="50" y1="40" x2="800" y2="40" stroke="var(--invox-color-border)" strokeDasharray="4 4" />
          <line x1="50" y1="100" x2="800" y2="100" stroke="var(--invox-color-border)" strokeDasharray="4 4" />
          <line x1="50" y1="160" x2="800" y2="160" stroke="var(--invox-color-border)" strokeDasharray="4 4" />
          <line x1="50" y1="220" x2="800" y2="220" stroke="var(--invox-color-border)" strokeDasharray="4 4" />
          
          {/* Line */}
          <path 
            d={periodData.pathD} 
            fill="none" 
            stroke="#3b82f6" 
            strokeWidth="3" 
          />
          
          {/* Gradient Fill under line */}
          <path 
            d={`${periodData.pathD} L 800 240 L 50 240 Z`} 
            fill="url(#gradient)" 
            opacity="0.2"
          />
          
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
