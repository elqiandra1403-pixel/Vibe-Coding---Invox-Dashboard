import React from 'react';
import styles from '@/app/(app)/dashboard/dashboard.module.css';
import compStyles from '@/app/(app)/dashboard/dashboard-components.module.css';
import { useDashboardStore } from '@/stores/dashboardStore';

export function InvoiceVolumeChart() {
  const bars = useDashboardStore(state => state.invoiceVolumes);

  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <div>
          <h3 className={styles.cardTitle}>LAST 12 MONTHS</h3>
          <h2 className={styles.cardValue} style={{fontSize: '20px'}}>Invoice volume</h2>
        </div>
      </div>
      
      <div className={compStyles.chartArea} style={{height: 180}}>
        <svg width="100%" height="100%" viewBox="0 0 800 180" preserveAspectRatio="none">
          <line x1="0" y1="30" x2="800" y2="30" stroke="var(--invox-color-border)" strokeDasharray="4 4" />
          <line x1="0" y1="90" x2="800" y2="90" stroke="var(--invox-color-border)" strokeDasharray="4 4" />
          <line x1="0" y1="150" x2="800" y2="150" stroke="var(--invox-color-border)" strokeDasharray="4 4" />
          
          {bars.map((bar, i) => (
            <rect 
              key={i}
              x={30 + i * (800 / 12)}
              y={150 - bar * 1.5}
              width={24}
              height={bar * 1.5}
              fill="var(--invox-color-border-border-gray-border-secondary, #2A303C)"
              rx="4"
            />
          ))}
        </svg>
      </div>
      <div style={{display: 'flex', justifyContent: 'space-between', marginTop: '12px', color: 'var(--invox-color-text-tertiary)', fontSize: '10px', textTransform: 'uppercase'}}>
        <span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span><span>Jul</span><span>Aug</span><span>Sep</span><span>Oct</span><span>Nov</span><span>Dec</span>
      </div>
    </div>
  );
}
