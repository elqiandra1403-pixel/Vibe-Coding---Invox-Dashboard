'use client';

import React, { useState, useRef, useEffect, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { useRouter } from 'next/navigation';
import { Calendar, ChevronLeft, ChevronRight, Download, MoreHorizontal, CalendarX, X, FileText, CheckCircle2, Clock, AlertCircle, Eye, Pencil, Copy, FileDown, Trash2 } from 'lucide-react';
import { CurrencyDisplay } from '@/components/shared/CurrencyDisplay';
import { useUiStore } from '@/stores/uiStore';
import styles from './invoices.module.css';

export interface InvoiceItem {
  id: string;
  customer: string;
  issued: string;
  due: string;
  amount: string;
  numericAmount: number;
  currency: string;
  status: 'Paid' | 'Pending' | 'Overdue' | 'Draft';
  statusClass: string;
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

const ALL_INVOICES: InvoiceItem[] = [
  { id: 'INV-2026-0200', customer: 'Sable & Co.', issued: 'Aug 05', due: 'Aug 19', amount: '$1,200.00', numericAmount: 1200, currency: 'USD', status: 'Paid', statusClass: 'statusPaid' },
  { id: 'INV-2026-0199', customer: 'Northwind Studio', issued: 'Aug 04', due: 'Aug 18', amount: '$2,171.00', numericAmount: 2171, currency: 'USD', status: 'Pending', statusClass: 'statusPending' },
  { id: 'INV-2026-0198', customer: 'Halcyon Labs', issued: 'Aug 03', due: 'Aug 17', amount: '$3,142.00', numericAmount: 3142, currency: 'USD', status: 'Overdue', statusClass: 'statusOverdue' },
  { id: 'INV-2026-0197', customer: 'Aperture Films', issued: 'Aug 02', due: 'Aug 16', amount: '$4,113.00', numericAmount: 4113, currency: 'USD', status: 'Draft', statusClass: 'statusDraft' },
  { id: 'INV-2026-0196', customer: 'Meridian Group', issued: 'Aug 01', due: 'Aug 15', amount: '$5,084.00', numericAmount: 5084, currency: 'USD', status: 'Paid', statusClass: 'statusPaid' },
  { id: 'INV-2026-0195', customer: 'Cove Hospitality', issued: 'Jul 31', due: 'Aug 14', amount: '€5,500.00', numericAmount: 5500, currency: 'EUR', status: 'Paid', statusClass: 'statusPaid' },
  { id: 'INV-2026-0194', customer: 'Palette Studio', issued: 'Jul 30', due: 'Aug 13', amount: '£6,200.00', numericAmount: 6200, currency: 'GBP', status: 'Paid', statusClass: 'statusPaid' },
  { id: 'INV-2026-0193', customer: 'Loom Works', issued: 'Jul 29', due: 'Aug 12', amount: 'Rp128.000.000', numericAmount: 128000000, currency: 'IDR', status: 'Pending', statusClass: 'statusPending' },
  { id: 'INV-2026-0192', customer: 'Fleet & Oak', issued: 'Jul 28', due: 'Aug 11', amount: '$8,969.00', numericAmount: 8969, currency: 'USD', status: 'Overdue', statusClass: 'statusOverdue' },
  { id: 'INV-2026-0191', customer: 'Vera Dynamics', issued: 'Jul 27', due: 'Aug 10', amount: '$9,940.00', numericAmount: 9940, currency: 'USD', status: 'Draft', statusClass: 'statusDraft' },
  { id: 'INV-2026-0190', customer: 'Sable & Co.', issued: 'Jul 26', due: 'Aug 09', amount: '$10,911.00', numericAmount: 10911, currency: 'USD', status: 'Paid', statusClass: 'statusPaid' },
  { id: 'INV-2026-0189', customer: 'Northwind Studio', issued: 'Jul 25', due: 'Aug 08', amount: '$11,882.00', numericAmount: 11882, currency: 'USD', status: 'Paid', statusClass: 'statusPaid' },
  { id: 'INV-2026-0188', customer: 'Halcyon Labs', issued: 'Jul 24', due: 'Aug 07', amount: '$12,853.00', numericAmount: 12853, currency: 'USD', status: 'Paid', statusClass: 'statusPaid' },
  { id: 'INV-2026-0187', customer: 'Aperture Films', issued: 'Jul 23', due: 'Aug 06', amount: '$13,824.00', numericAmount: 13824, currency: 'USD', status: 'Pending', statusClass: 'statusPending' },
  { id: 'INV-2026-0186', customer: 'Meridian Group', issued: 'Jul 22', due: 'Aug 05', amount: '$14,795.00', numericAmount: 14795, currency: 'USD', status: 'Overdue', statusClass: 'statusOverdue' },
  { id: 'INV-2026-0185', customer: 'Cove Hospitality', issued: 'Jul 21', due: 'Aug 04', amount: '$15,766.00', numericAmount: 15766, currency: 'USD', status: 'Draft', statusClass: 'statusDraft' },
  { id: 'INV-2026-0184', customer: 'Palette Studio', issued: 'Jul 20', due: 'Aug 03', amount: '$16,737.00', numericAmount: 16737, currency: 'USD', status: 'Paid', statusClass: 'statusPaid' },
];

export default function InvoicesPage() {
  const router = useRouter();
  const popoverRef = useRef<HTMLDivElement>(null);
  const actionMenuRef = useRef<HTMLDivElement>(null);
  const { userProfile, addToast } = useUiStore();
  
  const [mounted, setMounted] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<string>('All');
  const [selectedDateNum, setSelectedDateNum] = useState<string>('5');
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [openActionMenuId, setOpenActionMenuId] = useState<string | null>(null);
  const [selectedInvoiceModal, setSelectedInvoiceModal] = useState<InvoiceItem | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

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
    setSelectedStatus('All');
    setIsPopoverOpen(false);
  };

  useEffect(() => {
    const handleActionMenuClickOutside = (event: MouseEvent) => {
      if (actionMenuRef.current && !actionMenuRef.current.contains(event.target as Node)) {
        setOpenActionMenuId(null);
      }
    };
    const handleCalendarClickOutside = (event: MouseEvent) => {
      if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
        setIsPopoverOpen(false);
      }
    };

    document.addEventListener('mousedown', handleActionMenuClickOutside);
    document.addEventListener('mousedown', handleCalendarClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleActionMenuClickOutside);
      document.removeEventListener('mousedown', handleCalendarClickOutside);
    };
  }, [openActionMenuId, isPopoverOpen]);

  useEffect(() => {
    if (selectedInvoiceModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedInvoiceModal]);

  const filteredInvoices = useMemo(() => {
    return ALL_INVOICES.filter(inv => {
      if (selectedStatus !== 'All' && inv.status !== selectedStatus) {
        return false;
      }
      if (selectedDateNum) {
        const dayMatch = inv.issued.match(/\d+/)?.[0];
        if (dayMatch !== selectedDateNum && dayMatch !== selectedDateNum.padStart(2, '0')) {
          return false;
        }
      }
      return true;
    });
  }, [selectedStatus, selectedDateNum]);

  const handleExportCSV = () => {
    const headers = ['Invoice,Customer,Issued,Due,Amount,Status'];
    const rows = filteredInvoices.map(i => `${i.id},"${i.customer}",${i.issued},${i.due},"${i.numericAmount} ${i.currency}",${i.status}`);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers, ...rows].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `invox_invoices_${selectedStatus.toLowerCase()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    addToast('Exported CSV file successfully!', 'success');
  };

  return (
    <div className={styles.container}>
      {/* Header Section */}
      <div className="apple-pop-up">
        <div className={styles.headerSection}>
          <div>
            <span className={styles.kicker}>INVOICE MANAGEMENT</span>
            <h1 className={styles.title}>All invoices</h1>
            <p className={styles.subtitle}>
              A complete log of issued, pending, and overdue invoices across all client accounts.
            </p>
          </div>

          <div style={{ position: 'relative' }} ref={popoverRef}>
            <button 
              className={styles.calendarBtn}
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
              <div 
                style={{
                  position: 'absolute',
                  top: 'calc(100% + 8px)',
                  right: 0,
                  width: 280,
                  backgroundColor: 'var(--invox-color-surface)',
                  border: '1px solid var(--invox-color-border)',
                  borderRadius: '12px',
                  padding: '16px',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.35)',
                  zIndex: 9999,
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px', fontSize: '11px', fontWeight: 600, color: 'var(--invox-color-text-primary)' }}>
                  <span>FILTER BY DATE</span>
                  {(selectedDateNum || selectedStatus !== 'All') && (
                    <button className={styles.statusPill} style={{ padding: '2px 8px', fontSize: '10px' }} onClick={handleClearFilter}>
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
      </div>

      {/* Top 3 Metric Cards */}
      <div className="apple-pop-up stagger-1">
        <div className={styles.metricsGrid}>
          <div className={styles.metricCard}>
            <div className={styles.metricHeader}>
              <CheckCircle2 size={16} color="#22c55e" />
              <span className={styles.metricLabel}>Paid</span>
            </div>
            <h2 className={styles.metricValue}>
              <CurrencyDisplay amount={42168} originalCurrency="USD" />
            </h2>
          </div>

          <div className={styles.metricCard}>
            <div className={styles.metricHeader}>
              <Clock size={16} color="#3b82f6" />
              <span className={styles.metricLabel}>Pending</span>
            </div>
            <h2 className={styles.metricValue}>
              <CurrencyDisplay amount={18495} originalCurrency="USD" />
            </h2>
          </div>

          <div className={styles.metricCard}>
            <div className={styles.metricHeader}>
              <AlertCircle size={16} color="#ef4444" />
              <span className={styles.metricLabel}>Overdue</span>
            </div>
            <h2 className={styles.metricValue}>
              <CurrencyDisplay amount={24195} originalCurrency="USD" />
            </h2>
          </div>
        </div>
      </div>

      {/* Invoices Timeline Date Picker Card */}
      <div className="apple-pop-up stagger-2">
        <div className={styles.timelineCard}>
          <div>
            <span className={styles.kicker}>INVOICES TIMELINE</span>
            <h3 className={styles.title} style={{ fontSize: '18px', marginTop: '2px' }}>Pick a day</h3>
          </div>

          <div className={styles.dateStrip}>
            <button 
              className={styles.calendarBtn} 
              style={{ border: 'none', padding: '4px', cursor: 'pointer' }}
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
                  {isActive && <span className={styles.activeDot} />}
                </button>
              );
            })}

            <button 
              className={styles.calendarBtn} 
              style={{ border: 'none', padding: '4px', cursor: 'pointer' }}
              onClick={handleNextDate}
              disabled={currentIndex < 0 || currentIndex >= DATES.length - 1}
            >
              <ChevronRight size={20} />
            </button>
          </div>

          <div className={styles.statusPillsRow}>
            {['All', 'Paid', 'Pending', 'Overdue', 'Draft'].map((status) => (
              <button
                key={status}
                className={styles.statusPill}
                data-active={selectedStatus === status}
                onClick={() => setSelectedStatus(status)}
              >
                {status}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Invoices List Table Card */}
      <div className="apple-pop-up stagger-3">
        <div className={styles.tableCard}>
          <div className={styles.tableHeaderBar}>
            <div>
              <span className={styles.kicker}>
                {selectedStatus.toUpperCase()} {selectedDateNum ? `• DAY ${selectedDateNum}` : '• ALL TIME'}
              </span>
              <h2 className={styles.title} style={{ fontSize: '20px', marginTop: '2px' }}>
                {filteredInvoices.length} invoices
              </h2>
            </div>

            <button className={styles.exportBtn} onClick={handleExportCSV}>
              <Download size={14} />
              Export CSV
            </button>
          </div>

          <div className={styles.tableContainer}>
            {filteredInvoices.length > 0 ? (
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>INVOICE</th>
                    <th>CUSTOMER</th>
                    <th>ISSUED</th>
                    <th>DUE</th>
                    <th>AMOUNT</th>
                    <th>STATUS</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {filteredInvoices.map((inv) => (
                    <tr 
                      key={inv.id} 
                      onClick={() => setSelectedInvoiceModal(inv)}
                      style={{ cursor: 'pointer' }}
                    >
                      <td style={{ fontWeight: 500 }}>{inv.id}</td>
                      <td>{inv.customer}</td>
                      <td>{inv.issued}</td>
                      <td>{inv.due}</td>
                      <td style={{ fontWeight: 500 }}>
                        <CurrencyDisplay 
                          amount={inv.numericAmount} 
                          originalCurrency={inv.currency} 
                        />
                      </td>
                      <td>
                        <span className={`${styles.statusBadge} ${styles[inv.statusClass]}`}>
                          <span className={styles.statusDot}></span>
                          {inv.status}
                        </span>
                      </td>
                      <td style={{ textAlign: 'right', position: 'relative' }} onClick={(e) => e.stopPropagation()}>
                        <button 
                          className={styles.actionBtn}
                          onClick={() => setOpenActionMenuId(openActionMenuId === inv.id ? null : inv.id)}
                          title="More actions"
                        >
                          <MoreHorizontal size={16} />
                        </button>

                        {openActionMenuId === inv.id && (
                          <div ref={actionMenuRef} className={styles.menuPopover}>
                            <button
                              className={styles.menuItem}
                              onClick={() => {
                                setSelectedInvoiceModal(inv);
                                setOpenActionMenuId(null);
                              }}
                            >
                              <Eye size={14} /> View invoice
                            </button>

                            <button
                              className={styles.menuItem}
                              onClick={() => {
                                addToast(`Editing invoice ${inv.id}`, 'info');
                                setOpenActionMenuId(null);
                              }}
                            >
                              <Pencil size={14} /> Edit invoice
                            </button>

                            <button
                              className={styles.menuItem}
                              onClick={() => {
                                addToast(`Duplicated invoice ${inv.id}`, 'success');
                                setOpenActionMenuId(null);
                              }}
                            >
                              <Copy size={14} /> Duplicate invoice
                            </button>

                            <button
                              className={styles.menuItem}
                              onClick={() => {
                                addToast(`Downloading PDF for ${inv.id}`, 'info');
                                setOpenActionMenuId(null);
                              }}
                            >
                              <FileDown size={14} /> Download PDF
                            </button>

                            <div className={styles.menuDivider} />

                            <button
                              className={`${styles.menuItem} ${styles.deleteMenuItem}`}
                              onClick={() => {
                                addToast(`Invoice ${inv.id} deleted`, 'error');
                                setOpenActionMenuId(null);
                              }}
                            >
                              <Trash2 size={14} /> Delete invoice
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className={styles.emptyState}>
                <CalendarX size={40} className={styles.emptyIcon} />
                <h4 className={styles.emptyTitle}>
                  No invoices found for this selection
                </h4>
                <p className={styles.emptySubtitle}>
                  There are no {selectedStatus !== 'All' ? selectedStatus.toLowerCase() : ''} invoices recorded {selectedDateNum ? `for Day ${selectedDateNum}` : ''}.
                </p>
                <button 
                  className={styles.resetBtn} 
                  onClick={handleClearFilter}
                >
                  Clear filter & show all
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Invoice Detail Modal — Dual Currency View (Portal to document.body for fixed positioning & scroll isolation) */}
      {mounted && selectedInvoiceModal && createPortal(
        <div 
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.65)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 99999,
            padding: '16px',
            overscrollBehavior: 'contain',
          }}
          onClick={() => setSelectedInvoiceModal(null)}
        >
          <div 
            style={{
              backgroundColor: 'var(--invox-color-surface)',
              border: '1px solid var(--invox-color-border)',
              borderRadius: '20px',
              maxWidth: '520px',
              width: '100%',
              maxHeight: '90vh',
              overflowY: 'auto',
              padding: '24px',
              boxShadow: '0 20px 40px rgba(0,0,0,0.5)',
              display: 'flex',
              flexDirection: 'column',
              gap: '20px',
              animation: 'popoverEntrance 200ms ease-out both',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <span className={styles.kicker}>INVOICE DETAILS</span>
                <h2 style={{ margin: '4px 0 0 0', fontSize: '22px', fontWeight: 700, color: 'var(--invox-color-text-primary)' }}>
                  {selectedInvoiceModal.id}
                </h2>
                <div style={{ fontSize: '14px', color: 'var(--invox-color-text-secondary)', marginTop: '2px' }}>
                  Customer: <strong style={{ color: 'var(--invox-color-text-primary)' }}>{selectedInvoiceModal.customer}</strong>
                </div>
              </div>
              <button 
                onClick={() => setSelectedInvoiceModal(null)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--invox-color-text-secondary)',
                  cursor: 'pointer',
                  padding: '4px',
                  borderRadius: '50%',
                }}
              >
                <X size={20} />
              </button>
            </div>

            {/* Display Amount Card */}
            <div 
              style={{
                backgroundColor: 'var(--invox-color-background)',
                border: '1px solid var(--invox-color-border)',
                borderRadius: '14px',
                padding: '16px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <div>
                <span style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--invox-color-text-secondary)' }}>
                  TOTAL AMOUNT ({userProfile.currency})
                </span>
                <div style={{ fontSize: '26px', fontWeight: 700, marginTop: '2px', color: 'var(--invox-color-text-primary)' }}>
                  <CurrencyDisplay 
                    amount={selectedInvoiceModal.numericAmount} 
                    originalCurrency={selectedInvoiceModal.currency} 
                    showOriginalHint={true} 
                  />
                </div>
              </div>

              <span className={`${styles.statusBadge} ${styles[selectedInvoiceModal.statusClass]}`}>
                <span className={styles.statusDot}></span>
                {selectedInvoiceModal.status}
              </span>
            </div>

            {/* Invoice Meta Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', fontSize: '13px' }}>
              <div style={{ backgroundColor: 'rgba(255,255,255,0.03)', padding: '12px', borderRadius: '10px', border: '1px solid var(--invox-color-border)' }}>
                <span style={{ fontSize: '11px', color: 'var(--invox-color-text-secondary)', display: 'block', marginBottom: '2px' }}>ISSUE DATE</span>
                <strong>{selectedInvoiceModal.issued}, 2026</strong>
              </div>
              <div style={{ backgroundColor: 'rgba(255,255,255,0.03)', padding: '12px', borderRadius: '10px', border: '1px solid var(--invox-color-border)' }}>
                <span style={{ fontSize: '11px', color: 'var(--invox-color-text-secondary)', display: 'block', marginBottom: '2px' }}>DUE DATE</span>
                <strong>{selectedInvoiceModal.due}, 2026</strong>
              </div>
            </div>

            {/* Breakdown table */}
            <div style={{ borderTop: '1px solid var(--invox-color-border)', paddingTop: '16px' }}>
              <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--invox-color-text-secondary)', marginBottom: '8px' }}>
                PAYMENT SUMMARY
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '6px' }}>
                <span style={{ color: 'var(--invox-color-text-secondary)' }}>Original Invoice Base</span>
                <strong>{selectedInvoiceModal.amount} {selectedInvoiceModal.currency}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '6px' }}>
                <span style={{ color: 'var(--invox-color-text-secondary)' }}>Selected Display Currency</span>
                <strong>{userProfile.currency}</strong>
              </div>
            </div>

            <button 
              onClick={() => setSelectedInvoiceModal(null)}
              style={{
                width: '100%',
                padding: '12px',
                backgroundColor: 'var(--invox-color-text-primary)',
                color: 'var(--invox-color-background)',
                border: 'none',
                borderRadius: '9999px',
                fontWeight: 600,
                fontSize: '14px',
                cursor: 'pointer',
              }}
            >
              Close
            </button>
          </div>
        </div>,
        document.body
      )}

      {/* Footer */}
      <div className={styles.footer}>
        <span>© Invox 2026</span>
        <span>All amounts in {userProfile.currency || 'USD'} · Updated just now</span>
      </div>
    </div>
  );
}
