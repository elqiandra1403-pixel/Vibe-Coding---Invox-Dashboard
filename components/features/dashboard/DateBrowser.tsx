'use client';

import React, { useState, useRef } from 'react';
import compStyles from '@/app/(app)/dashboard/dashboard-components.module.css';
import { Calendar, ChevronLeft, ChevronRight } from 'lucide-react';
import { useDashboardStore } from '@/stores/dashboardStore';
import { CalendarPopover } from '@/components/shared/CalendarPopover';

const DATES = [
  { day: 'Wed', num: '22' },
  { day: 'Thu', num: '23' },
  { day: 'Fri', num: '24' },
  { day: 'Sat', num: '25' },
  { day: 'Sun', num: '26' },
  { day: 'Mon', num: '27' },
  { day: 'Tue', num: '28' },
  { day: 'Wed', num: '29' },
  { day: 'Thu', num: '30' },
  { day: 'Fri', num: '31' },
  { day: 'Sat', num: '1' },
  { day: 'Sun', num: '2' },
  { day: 'Mon', num: '3' },
  { day: 'Tue', num: '4' },
  { day: 'Wed', num: '5' },
];

export function DateBrowser() {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const calendarBtnRef = useRef<HTMLButtonElement>(null);
  
  const selectedDateNum = useDashboardStore(state => state.selectedDateNum);
  const setSelectedDateNum = useDashboardStore(state => state.setSelectedDateNum);

  const currentIndex = DATES.findIndex(d => d.num === selectedDateNum);

  const handlePrev = () => {
    if (currentIndex > 0) {
      setSelectedDateNum(DATES[currentIndex - 1].num);
    }
  };

  const handleNext = () => {
    if (currentIndex >= 0 && currentIndex < DATES.length - 1) {
      setSelectedDateNum(DATES[currentIndex + 1].num);
    }
  };

  const handleClearFilter = () => {
    setSelectedDateNum('');
    setIsPopoverOpen(false);
  };

  return (
    <div className={compStyles.dateBrowser}>
      <div className={compStyles.dateBrowserHeader}>
        <div className={compStyles.dateBrowserTitle}>
          PICK A DAY
          <h3>Browse by date</h3>
        </div>

        <div className={compStyles.popoverWrapper}>
          <button 
            ref={calendarBtnRef}
            className={compStyles.calendarBtn}
            onClick={() => setIsPopoverOpen(!isPopoverOpen)}
            title="Pick date from calendar"
            style={{
              backgroundColor: isPopoverOpen ? 'var(--invox-color-text-primary)' : 'transparent',
              color: isPopoverOpen ? 'var(--invox-color-background)' : 'var(--invox-color-text-secondary)',
              borderColor: isPopoverOpen ? 'var(--invox-color-text-primary)' : 'var(--invox-color-border)',
            }}
          >
            <Calendar size={16} />
          </button>

          <CalendarPopover
            isOpen={isPopoverOpen}
            onClose={() => setIsPopoverOpen(false)}
            anchorRef={calendarBtnRef}
            selectedDateNum={selectedDateNum}
            onSelectDateNum={setSelectedDateNum}
          />
        </div>
      </div>

      <div className={compStyles.dateStrip}>
        <button 
          className={compStyles.calendarBtn} 
          style={{border: 'none', padding: '4px', cursor: 'pointer'}}
          onClick={handlePrev}
          disabled={currentIndex <= 0}
        >
          <ChevronLeft size={20} />
        </button>
        
        {DATES.map((date, idx) => {
          const isActive = selectedDateNum === date.num;
          return (
            <button
              type="button" 
              key={idx} 
              className={compStyles.dateItem} 
              data-active={isActive}
              onClick={() => setSelectedDateNum(selectedDateNum === date.num ? '' : date.num)}
            >
              <span className={compStyles.dateDay}>{date.day}</span>
              <span className={compStyles.dateNum}>{date.num}</span>
            </button>
          );
        })}

        <button 
          className={compStyles.calendarBtn} 
          style={{border: 'none', padding: '4px', cursor: 'pointer'}}
          onClick={handleNext}
          disabled={currentIndex < 0 || currentIndex >= DATES.length - 1}
        >
          <ChevronRight size={20} />
        </button>
      </div>
      
      <div style={{marginTop: '16px', fontSize: '12px', color: 'var(--invox-color-text-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
        <span>
          {selectedDateNum ? `Showing invoices for Day ${selectedDateNum}.` : 'Showing all invoices across all dates.'}
        </span>
        {selectedDateNum && (
          <button 
            className={compStyles.clearFilterBtn} 
            onClick={handleClearFilter}
            style={{ color: 'var(--invox-color-primary)', textDecoration: 'underline' }}
          >
            Show all dates
          </button>
        )}
      </div>
    </div>
  );
}
