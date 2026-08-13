import React, { useState, useRef, useEffect } from 'react';
import compStyles from '@/app/(app)/dashboard/dashboard-components.module.css';
import { Calendar, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { useDashboardStore } from '@/stores/dashboardStore';

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
  const popoverRef = useRef<HTMLDivElement>(null);
  
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

  // Close popover when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
        setIsPopoverOpen(false);
      }
    };
    if (isPopoverOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isPopoverOpen]);

  return (
    <div className={compStyles.dateBrowser} style={{ position: 'relative', zIndex: isPopoverOpen ? 100 : 1 }}>
      <div className={compStyles.dateBrowserHeader}>
        <div className={compStyles.dateBrowserTitle}>
          PICK A DAY
          <h3>Browse by date</h3>
        </div>

        <div className={compStyles.popoverWrapper} ref={popoverRef} style={{ position: 'relative', zIndex: 100 }}>
          <button 
            className={compStyles.calendarBtn}
            onClick={() => setIsPopoverOpen(!isPopoverOpen)}
            title="Pick date from calendar"
            style={{
              backgroundColor: isPopoverOpen || selectedDateNum ? 'var(--invox-color-text-primary)' : 'transparent',
              color: isPopoverOpen || selectedDateNum ? 'var(--invox-color-background)' : 'var(--invox-color-text-secondary)',
              borderColor: isPopoverOpen || selectedDateNum ? 'var(--invox-color-text-primary)' : 'var(--invox-color-border)',
            }}
          >
            <Calendar size={16} />
          </button>

          {isPopoverOpen && (
            <div className={compStyles.calendarPopover} style={{ zIndex: 9999 }}>
              <div className={compStyles.popoverHeader}>
                <span>FILTER BY DATE</span>
                {selectedDateNum && (
                  <button className={compStyles.clearFilterBtn} onClick={handleClearFilter}>
                    <X size={12} /> Clear
                  </button>
                )}
              </div>

              <input 
                type="date"
                className={compStyles.datePickerInput}
                onChange={(e) => {
                  if (e.target.value) {
                    const dayNum = String(new Date(e.target.value).getDate());
                    setSelectedDateNum(dayNum);
                    setIsPopoverOpen(false);
                  }
                }}
              />

              <div style={{ marginTop: '12px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <div style={{ fontSize: '10px', color: 'var(--invox-color-text-secondary)', textTransform: 'uppercase', marginBottom: '2px' }}>
                  Quick Presets
                </div>
                {[
                  { label: 'All Invoices', val: '' },
                  { label: 'Today (Aug 05)', val: '5' },
                  { label: 'Yesterday (Aug 04)', val: '4' },
                  { label: 'Aug 03', val: '3' },
                  { label: 'Jul 31', val: '31' },
                ].map((preset) => (
                  <button
                    key={preset.label}
                    onClick={() => {
                      setSelectedDateNum(preset.val);
                      setIsPopoverOpen(false);
                    }}
                    style={{
                      background: selectedDateNum === preset.val ? 'rgba(255,255,255,0.1)' : 'transparent',
                      border: 'none',
                      color: selectedDateNum === preset.val ? 'var(--invox-color-text-primary)' : 'var(--invox-color-text-secondary)',
                      textAlign: 'left',
                      padding: '6px 8px',
                      borderRadius: '6px',
                      fontSize: '12px',
                      cursor: 'pointer',
                    }}
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            </div>
          )}
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
