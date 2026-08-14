'use client';

import React, { useState, useRef, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { Calendar, ChevronLeft, ChevronRight, CheckCircle2, Clock, AlertCircle, CalendarX, X } from 'lucide-react';
import { CurrencyDisplay } from '@/components/shared/CurrencyDisplay';
import { useUiStore } from '@/stores/uiStore';
import styles from './payments.module.css';

export interface PaymentItem {
  id: string;
  invoiceId: string;
  customer: string;
  date: string;
  dayNum: string;
  amount: string;
  numericAmount: number;
  currency: string;
  status: 'Received' | 'Awaiting';
}

const DATES = [
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

const RECENT_PAYMENTS: PaymentItem[] = [
  { id: 'pay-1', invoiceId: 'INV-2026-0200', customer: 'Sable & Co.', date: 'Aug 05', dayNum: '5', amount: '$1,200.00', numericAmount: 1200, currency: 'USD', status: 'Received' },
  { id: 'pay-2', invoiceId: 'INV-2026-0199', customer: 'Northwind Studio', date: 'Aug 04', dayNum: '4', amount: '$2,171.00', numericAmount: 2171, currency: 'USD', status: 'Awaiting' },
  { id: 'pay-3', invoiceId: 'INV-2026-0196', customer: 'Meridian Group', date: 'Aug 01', dayNum: '1', amount: '$5,084.00', numericAmount: 5084, currency: 'USD', status: 'Received' },
  { id: 'pay-4', invoiceId: 'INV-2026-0195', customer: 'Cove Hospitality', date: 'Jul 31', dayNum: '31', amount: '$6,055.00', numericAmount: 6055, currency: 'USD', status: 'Received' },
  { id: 'pay-5', invoiceId: 'INV-2026-0194', customer: 'Palette Studio', date: 'Jul 30', dayNum: '30', amount: '$7,026.00', numericAmount: 7026, currency: 'USD', status: 'Received' },
  { id: 'pay-6', invoiceId: 'INV-2026-0193', customer: 'Lantern Works', date: 'Jul 29', dayNum: '29', amount: '$7,997.00', numericAmount: 7997, currency: 'USD', status: 'Awaiting' },
  { id: 'pay-7', invoiceId: 'INV-2026-0190', customer: 'Sable & Co.', date: 'Jul 26', dayNum: '26', amount: '$10,910.00', numericAmount: 10910, currency: 'USD', status: 'Received' },
  { id: 'pay-8', invoiceId: 'INV-2026-0189', customer: 'Northwind Studio', date: 'Jul 25', dayNum: '25', amount: '$11,881.00', numericAmount: 11881, currency: 'USD', status: 'Received' },
  { id: 'pay-9', invoiceId: 'INV-2026-0188', customer: 'Halcyon Labs', date: 'Jul 24', dayNum: '24', amount: '$12,852.00', numericAmount: 12852, currency: 'USD', status: 'Received' },
  { id: 'pay-10', invoiceId: 'INV-2026-0187', customer: 'Aperture Films', date: 'Jul 23', dayNum: '23', amount: '$13,823.00', numericAmount: 13823, currency: 'USD', status: 'Awaiting' },
  { id: 'pay-11', invoiceId: 'INV-2026-0184', customer: 'Palette Studio', date: 'Jul 20', dayNum: '20', amount: '$16,736.00', numericAmount: 16736, currency: 'USD', status: 'Received' },
  { id: 'pay-12', invoiceId: 'INV-2026-0183', customer: 'Lantern Works', date: 'Jul 19', dayNum: '19', amount: '$17,707.00', numericAmount: 17707, currency: 'USD', status: 'Received' },
];

export default function PaymentsPage() {
  const router = useRouter();
  const popoverRef = useRef<HTMLDivElement>(null);
  const { userProfile } = useUiStore();

  const [selectedDateNum, setSelectedDateNum] = useState<string>('5');
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const currentIndex = DATES.findIndex(d => d.num === selectedDateNum);

  const handlePrevDate = () => {
    if (currentIndex > 0) {
      setSelectedDateNum(DATES[currentIndex - 1].num);
    }
  };

  const handleNextDate = () => {
    if (currentIndex >= 0 && currentIndex < DATES.length - 1) {
      setSelectedDateNum(DATES[currentIndex + 1].num);
    }
  };

  const handleClearFilter = () => {
    setSelectedDateNum('');
    setIsPopoverOpen(false);
  };

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

  const filteredPayments = useMemo(() => {
    if (!selectedDateNum) return RECENT_PAYMENTS;
    return RECENT_PAYMENTS.filter(p => p.dayNum === selectedDateNum);
  }, [selectedDateNum]);

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className="apple-pop-up" style={{ position: 'relative', zIndex: 1000 }}>
        <div className={styles.headerSection}>
          <div>
            <span className={styles.kicker}>PAYMENTS</span>
            <h1 className={styles.title}>Money in, at a glance</h1>
            <p className={styles.subtitle}>
              Pick a day to inspect every payment received or expected.
            </p>
          </div>

          <div style={{ position: 'relative', zIndex: 1001 }} ref={popoverRef}>
            <button 
              className={styles.calendarBtn}
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

            {isPopoverOpen && (
              <div className={styles.calendarPopover}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px', fontSize: '11px', fontWeight: 600, color: 'var(--invox-color-text-primary)' }}>
                  <span>FILTER BY DATE</span>
                  {selectedDateNum && (
                    <button className={styles.resetBtn} style={{ padding: '2px 8px', fontSize: '10px' }} onClick={handleClearFilter}>
                      <X size={10} /> Clear
                    </button>
                  )}
                </div>

                <input 
                  type="date"
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    backgroundColor: 'var(--invox-color-background)',
                    border: '1px solid var(--invox-color-border)',
                    borderRadius: '8px',
                    color: 'var(--invox-color-text-primary)',
                    fontSize: '13px',
                    outline: 'none',
                  }}
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
                    { label: 'All Payments', val: '' },
                    { label: 'Today (Aug 05)', val: '5' },
                    { label: 'Yesterday (Aug 04)', val: '4' },
                    { label: 'Aug 01', val: '1' },
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
      </div>

      {/* Top 3 Metric Cards */}
      <div className="apple-pop-up stagger-1">
        <div className={styles.metricsGrid}>
          <div className={styles.metricCard}>
            <div className={styles.metricHeader}>
              <CheckCircle2 size={16} color="#22c55e" />
              <span className={styles.metricLabel}>Collected</span>
            </div>
            <h2 className={styles.metricValue}>
              <CurrencyDisplay amount={89451} originalCurrency="USD" />
            </h2>
          </div>

          <div className={styles.metricCard}>
            <div className={styles.metricHeader}>
              <Clock size={16} color="#3b82f6" />
              <span className={styles.metricLabel}>Pending</span>
            </div>
            <h2 className={styles.metricValue}>
              <CurrencyDisplay amount={23991} originalCurrency="USD" />
            </h2>
          </div>

          <div className={styles.metricCard}>
            <div className={styles.metricHeader}>
              <AlertCircle size={16} color="#ef4444" />
              <span className={styles.metricLabel}>At risk</span>
            </div>
            <h2 className={styles.metricValue}>
              <CurrencyDisplay amount={78340} originalCurrency="USD" />
            </h2>
          </div>
        </div>
      </div>

      {/* Payments Timeline Date Picker Card */}
      <div className="apple-pop-up stagger-2">
        <div className={styles.timelineCard}>
          <div>
            <span className={styles.kicker}>PAYMENTS TIMELINE</span>
            <h3 className={styles.title} style={{ fontSize: '18px', marginTop: '2px' }}>Pick a day</h3>
          </div>

          <div className={styles.dateStrip}>
            <button 
              className={styles.calendarBtn} 
              style={{border: 'none', padding: '4px', cursor: 'pointer'}}
              onClick={handlePrevDate}
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
                  className={styles.dateItem} 
                  data-active={isActive}
                  onClick={() => setSelectedDateNum(selectedDateNum === date.num ? '' : date.num)}
                >
                  <span className={styles.dateDay}>{date.day}</span>
                  <span className={styles.dateNum}>{date.num}</span>
                </button>
              );
            })}

            <button 
              className={styles.calendarBtn} 
              style={{border: 'none', padding: '4px', cursor: 'pointer'}}
              onClick={handleNextDate}
              disabled={currentIndex < 0 || currentIndex >= DATES.length - 1}
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Recent Payments List Card */}
      <div className="apple-pop-up stagger-3">
        <div className={styles.paymentsCard}>
          <div>
            <span className={styles.kicker}>
              LAST ACTIVITY {selectedDateNum && `• DAY ${selectedDateNum}`}
            </span>
            <h2 className={styles.title} style={{ fontSize: '20px', marginTop: '2px' }}>
              Recent payments
            </h2>
          </div>

          {filteredPayments.length > 0 ? (
            <div className={styles.paymentsList}>
              {filteredPayments.map((item) => (
                <div key={item.id} className={styles.paymentRow}>
                  <div className={styles.paymentLeft}>
                    <div className={`${styles.iconCircle} ${item.status === 'Received' ? styles.iconReceived : styles.iconAwaiting}`}>
                      {item.status === 'Received' ? (
                        <CheckCircle2 size={16} />
                      ) : (
                        <Clock size={16} />
                      )}
                    </div>
                    <div>
                      <div className={styles.customerName}>{item.customer}</div>
                      <div className={styles.invoiceMeta}>{item.invoiceId} · {item.date}</div>
                    </div>
                  </div>

                  <div className={styles.paymentRight}>
                    <div className={styles.amount}>
                      <CurrencyDisplay amount={item.numericAmount} originalCurrency={item.currency} />
                    </div>
                    <div className={`${styles.statusLabel} ${item.status === 'Received' ? styles.statusReceived : styles.statusAwaiting}`}>
                      {item.status}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className={styles.emptyState}>
              <CalendarX size={40} className={styles.emptyIcon} />
              <h4 className={styles.emptyTitle}>No payments recorded for Day {selectedDateNum}</h4>
              <p className={styles.emptySubtitle}>There are no payments received or expected on this date.</p>
              <button className={styles.resetBtn} onClick={handleClearFilter}>
                Show all payments
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className={styles.footer}>
        <span>© Invox 2026</span>
        <span>All amounts in {userProfile.currency || 'USD'} · Updated just now</span>
      </div>
    </div>
  );
}
