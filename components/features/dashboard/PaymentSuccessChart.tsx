import React from 'react';
import styles from '@/app/(app)/dashboard/dashboard.module.css';
import compStyles from '@/app/(app)/dashboard/dashboard-components.module.css';
import { useDashboardStore } from '@/stores/dashboardStore';

export function PaymentSuccessChart() {
  const paymentStats = useDashboardStore(state => state.paymentStats);

  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  const dash1 = (paymentStats.onTimePercentage / 100) * circumference;
  const dash2 = (paymentStats.latePercentage / 100) * circumference;
  
  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <div>
          <h3 className={styles.cardTitle}>ON-TIME COLLECTION</h3>
          <h2 className={styles.cardValue} style={{fontSize: '20px'}}>Payment success</h2>
        </div>
      </div>
      
      <div className={compStyles.donutContainer}>
        <svg className={compStyles.donutSvg} viewBox="0 0 160 160">
          <circle cx="80" cy="80" r={radius} fill="none" stroke="var(--invox-color-border)" strokeWidth="12" />
          
          <circle 
            cx="80" 
            cy="80" 
            r={radius} 
            fill="none" 
            stroke="#22c55e" 
            strokeWidth="12" 
            strokeDasharray={`${dash1} ${circumference}`}
            strokeLinecap="round"
          />
          <circle 
            cx="80" 
            cy="80" 
            r={radius} 
            fill="none" 
            stroke="#eab308" 
            strokeWidth="12" 
            strokeDasharray={`${dash2} ${circumference}`}
            strokeDashoffset={-dash1}
            strokeLinecap="round"
          />
        </svg>
        <div className={compStyles.donutCenter}>
          <span className={compStyles.donutValue}>{paymentStats.onTimePercentage}%</span>
          <span className={compStyles.donutLabel}>paid on time</span>
        </div>
      </div>

      <div className={compStyles.legend}>
        <div className={compStyles.legendItem}>
          <div className={compStyles.legendLabel}>
            <div className={compStyles.legendDot} style={{backgroundColor: '#22c55e'}}></div>
            Paid on time
          </div>
          <span className={compStyles.legendValue}>{paymentStats.onTimeCount}</span>
        </div>
        <div className={compStyles.legendItem}>
          <div className={compStyles.legendLabel}>
            <div className={compStyles.legendDot} style={{backgroundColor: '#eab308'}}></div>
            Paid late
          </div>
          <span className={compStyles.legendValue}>{paymentStats.lateCount}</span>
        </div>
        <div className={compStyles.legendItem}>
          <div className={compStyles.legendLabel}>
            <div className={compStyles.legendDot} style={{backgroundColor: '#ef4444'}}></div>
            Still outstanding
          </div>
          <span className={compStyles.legendValue}>{paymentStats.outstandingCount}</span>
        </div>
      </div>
    </div>
  );
}
