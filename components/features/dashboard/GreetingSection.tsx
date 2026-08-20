import React, { useState, useRef } from 'react';
import styles from '@/app/(app)/dashboard/dashboard.module.css';
import { Calendar } from 'lucide-react';
import { useDashboardStore } from '@/stores/dashboardStore';
import { CalendarPopover } from '@/components/shared/CalendarPopover';

const PERIODS: ('7d' | '30d' | '90d' | '12m')[] = ['7d', '30d', '90d', '12m'];

export function GreetingSection() {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const calendarBtnRef = useRef<HTMLButtonElement>(null);

  const selectedPeriod = useDashboardStore(state => state.selectedPeriod);
  const setSelectedPeriod = useDashboardStore(state => state.setSelectedPeriod);
  const selectedDateNum = useDashboardStore(state => state.selectedDateNum);
  const setSelectedDateNum = useDashboardStore(state => state.setSelectedDateNum);

  const handleSelectDateNum = (num: string) => {
    setSelectedDateNum(num);
    if (num) {
      setSelectedPeriod('30d');
    }
  };

  return (
    <div className={styles.greetingSection}>
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
            data-active={selectedPeriod === period && !selectedDateNum}
            onClick={() => {
              setSelectedPeriod(period);
              setSelectedDateNum('');
            }}
          >
            {period}
          </button>
        ))}
        <button 
          ref={calendarBtnRef}
          className={styles.timeFilterBtn}
          data-active={!!selectedDateNum || isPopoverOpen}
          onClick={() => setIsPopoverOpen(!isPopoverOpen)}
          title="Filter Revenue Overview by custom date"
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 10px', gap: '4px' }}
        >
          <Calendar size={14} />
          {selectedDateNum && (
            <span style={{ fontSize: '11px', fontWeight: 600 }}>
              Aug {selectedDateNum.padStart(2, '0')}
            </span>
          )}
        </button>

        <CalendarPopover
          isOpen={isPopoverOpen}
          onClose={() => setIsPopoverOpen(false)}
          anchorRef={calendarBtnRef}
          selectedDateNum={selectedDateNum}
          onSelectDateNum={handleSelectDateNum}
          preferredPlacement="bottom"
        />
      </div>
    </div>
  );
}
