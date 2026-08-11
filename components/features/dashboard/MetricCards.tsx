import React from 'react';
import styles from '@/app/(app)/dashboard/dashboard.module.css';
import { ArrowUp, ArrowDown } from 'lucide-react';
import { useDashboardStore } from '@/stores/dashboardStore';
import { CurrencyDisplay } from '@/components/shared/CurrencyDisplay';

export function MetricCards() {
  const metrics = useDashboardStore(state => state.metrics);

  return (
    <div className={styles.metricCardsGrid}>
      {metrics.map((metric, idx) => (
        <div key={idx} className={styles.metricCard}>
          <span className={styles.metricTitle}>{metric.title}</span>
          <span className={styles.metricValue}>
            {metric.numericValue !== undefined ? (
              <CurrencyDisplay amount={metric.numericValue} originalCurrency={metric.currency || 'USD'} />
            ) : (
              metric.value
            )}
          </span>
          <div className={styles.metricTrend}>
            <span className={`${styles.trendValue} ${metric.trendType === 'positive' ? styles.trendPositive : styles.trendNegative}`}>
              {metric.trendType === 'positive' ? <ArrowUp size={10} style={{marginRight: 2}} /> : <ArrowDown size={10} style={{marginRight: 2}} />}
              {metric.trend}
            </span>
            <span>{metric.comparison}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
