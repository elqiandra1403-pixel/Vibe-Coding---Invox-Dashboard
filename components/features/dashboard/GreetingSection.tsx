import React, { useRef } from 'react';
import styles from '@/app/(app)/dashboard/dashboard.module.css';
import { Calendar } from 'lucide-react';
import { useDashboardStore } from '@/stores/dashboardStore';

const PERIODS: ('7d' | '30d' | '90d' | '12m')[] = ['7d', '30d', '90d', '12m'];

export function GreetingSection() {
  const dateInputRef = useRef<HTMLInputElement>(null);
  const selectedPeriod = useDashboardStore(state => state.selectedPeriod);
  const setSelectedPeriod = useDashboardStore(state => state.setSelectedPeriod);

  const handleCalendarClick = () => {
    dateInputRef.current?.showPicker?.();
  };

  return (
    <div className={styles.greetingSection}>
      <input 
        type="date" 
        ref={dateInputRef} 
        style={{ display: 'none' }}
        onChange={(e) => {
          if (e.target.value) {
            setSelectedPeriod('30d');
          }
        }}
      />
      <div className={styles.greetingContent}>
        <span className={styles.kicker}>OVERVIEW</span>
        <h1 className={styles.greetingTitle}>Good afternoon, Amelia.</h1>
        <p className={styles.greetingSubtitle}>
          Here's how invoicing is flowing today — a calm view of what's owed, paid, and coming due.
        </p>
      </div>
      <div className={styles.timeFilters}>
        {PERIODS.map((period) => (
          <button 
            key={period} 
            className={styles.timeFilterBtn} 
            data-active={selectedPeriod === period}
            onClick={() => setSelectedPeriod(period)}
          >
            {period}
          </button>
        ))}
        <button 
          className={styles.timeFilterBtn}
          onClick={handleCalendarClick}
          title="Filter Revenue Overview by custom date"
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 10px' }}
        >
          <Calendar size={14} />
        </button>
      </div>
    </div>
  );
}
