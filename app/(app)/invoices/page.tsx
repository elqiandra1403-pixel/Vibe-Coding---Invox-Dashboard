'use client';

import React, { useState, useRef, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { Calendar, ChevronLeft, ChevronRight, Download, MoreHorizontal, CalendarX, X } from 'lucide-react';
import styles from './invoices.module.css';

export interface InvoiceItem {
  id: string;
  customer: string;
  issued: string;
  due: string;
  amount: string;
  status: 'Paid' | 'Pending' | 'Overdue' | 'Draft';
  statusClass: string;
}

const DATES = [
  { day: 'Wed', num: '23' },
  { day: 'Thu', num: '24' },
  { day: 'Fri', num: '25' },
  { day: 'Sat', num: '26' },
  { day: 'Sun', num: '27' },
  { day: 'Mon', num: '28' },
  { day: 'Tue', num: '29' },
  { day: 'Wed', num: '30' },
  { day: 'Thu', num: '31' },
  { day: 'Fri', num: '1' },
  { day: 'Sat', num: '2' },
  { day: 'Sun', num: '3' },
  { day: 'Mon', num: '4' },
  { day: 'Tue', num: '5' },
];

const ALL_INVOICES: InvoiceItem[] = [
  { id: 'INV-2026-0200', customer: 'Sable & Co.', issued: 'Aug 05', due: 'Aug 19', amount: '$1,200.00', status: 'Paid', statusClass: 'statusPaid' },
  { id: 'INV-2026-0199', customer: 'Northwind Studio', issued: 'Aug 04', due: 'Aug 18', amount: '$2,171.00', status: 'Pending', statusClass: 'statusPending' },
  { id: 'INV-2026-0198', customer: 'Halcyon Labs', issued: 'Aug 03', due: 'Aug 17', amount: '$3,142.00', status: 'Overdue', statusClass: 'statusOverdue' },
  { id: 'INV-2026-0197', customer: 'Aperture Films', issued: 'Aug 02', due: 'Aug 16', amount: '$4,113.00', status: 'Draft', statusClass: 'statusDraft' },
  { id: 'INV-2026-0196', customer: 'Meridian Group', issued: 'Aug 01', due: 'Aug 15', amount: '$5,084.00', status: 'Paid', statusClass: 'statusPaid' },
  { id: 'INV-2026-0195', customer: 'Cove Hospitality', issued: 'Jul 31', due: 'Aug 14', amount: '$6,055.00', status: 'Paid', statusClass: 'statusPaid' },
  { id: 'INV-2026-0194', customer: 'Palette Studio', issued: 'Jul 30', due: 'Aug 13', amount: '$7,026.00', status: 'Paid', statusClass: 'statusPaid' },
  { id: 'INV-2026-0193', customer: 'Loom Works', issued: 'Jul 29', due: 'Aug 12', amount: '$8,000.00', status: 'Pending', statusClass: 'statusPending' },
  { id: 'INV-2026-0192', customer: 'Fleet & Oak', issued: 'Jul 28', due: 'Aug 11', amount: '$8,969.00', status: 'Overdue', statusClass: 'statusOverdue' },
  { id: 'INV-2026-0191', customer: 'Vera Dynamics', issued: 'Jul 27', due: 'Aug 10', amount: '$9,940.00', status: 'Draft', statusClass: 'statusDraft' },
  { id: 'INV-2026-0190', customer: 'Sable & Co.', issued: 'Jul 26', due: 'Aug 09', amount: '$10,911.00', status: 'Paid', statusClass: 'statusPaid' },
  { id: 'INV-2026-0189', customer: 'Northwind Studio', issued: 'Jul 25', due: 'Aug 08', amount: '$11,882.00', status: 'Paid', statusClass: 'statusPaid' },
  { id: 'INV-2026-0188', customer: 'Halcyon Labs', issued: 'Jul 24', due: 'Aug 07', amount: '$12,853.00', status: 'Paid', statusClass: 'statusPaid' },
  { id: 'INV-2026-0187', customer: 'Aperture Films', issued: 'Jul 23', due: 'Aug 06', amount: '$13,824.00', status: 'Pending', statusClass: 'statusPending' },
  { id: 'INV-2026-0186', customer: 'Meridian Group', issued: 'Jul 22', due: 'Aug 05', amount: '$14,795.00', status: 'Overdue', statusClass: 'statusOverdue' },
  { id: 'INV-2026-0185', customer: 'Cove Hospitality', issued: 'Jul 21', due: 'Aug 04', amount: '$15,766.00', status: 'Draft', statusClass: 'statusDraft' },
  { id: 'INV-2026-0184', customer: 'Palette Studio', issued: 'Jul 20', due: 'Aug 03', amount: '$16,737.00', status: 'Paid', statusClass: 'statusPaid' },
  { id: 'INV-2026-0183', customer: 'Loom Works', issued: 'Jul 19', due: 'Aug 02', amount: '$17,708.00', status: 'Paid', statusClass: 'statusPaid' },
  { id: 'INV-2026-0182', customer: 'Fleet & Oak', issued: 'Jul 18', due: 'Aug 01', amount: '$18,679.00', status: 'Paid', statusClass: 'statusPaid' },
  { id: 'INV-2026-0181', customer: 'Vera Dynamics', issued: 'Jul 17', due: 'Jul 31', amount: '$19,650.00', status: 'Pending', statusClass: 'statusPending' },
  { id: 'INV-2026-0180', customer: 'Sable & Co.', issued: 'Jul 16', due: 'Jul 30', amount: '$20,621.00', status: 'Overdue', statusClass: 'statusOverdue' },
  { id: 'INV-2026-0179', customer: 'Northwind Studio', issued: 'Jul 15', due: 'Jul 29', amount: '$21,592.00', status: 'Draft', statusClass: 'statusDraft' },
  { id: 'INV-2026-0178', customer: 'Halcyon Labs', issued: 'Jul 14', due: 'Jul 28', amount: '$22,563.00', status: 'Paid', statusClass: 'statusPaid' },
  { id: 'INV-2026-0177', customer: 'Aperture Films', issued: 'Jul 13', due: 'Jul 27', amount: '$23,534.00', status: 'Paid', statusClass: 'statusPaid' },
  { id: 'INV-2026-0176', customer: 'Meridian Group', issued: 'Jul 12', due: 'Jul 26', amount: '$24,505.00', status: 'Paid', statusClass: 'statusPaid' },
  { id: 'INV-2026-0175', customer: 'Cove Hospitality', issued: 'Jul 11', due: 'Jul 25', amount: '$25,476.00', status: 'Pending', statusClass: 'statusPending' },
  { id: 'INV-2026-0174', customer: 'Palette Studio', issued: 'Jul 10', due: 'Jul 24', amount: '$26,447.00', status: 'Overdue', statusClass: 'statusOverdue' },
  { id: 'INV-2026-0173', customer: 'Loom Works', issued: 'Jul 09', due: 'Jul 23', amount: '$27,418.00', status: 'Draft', statusClass: 'statusDraft' },
  { id: 'INV-2026-0172', customer: 'Fleet & Oak', issued: 'Jul 08', due: 'Jul 22', amount: '$28,389.00', status: 'Paid', statusClass: 'statusPaid' },
  { id: 'INV-2026-0171', customer: 'Vera Dynamics', issued: 'Jul 07', due: 'Jul 21', amount: '$29,360.00', status: 'Paid', statusClass: 'statusPaid' },
  { id: 'INV-2026-0170', customer: 'Sable & Co.', issued: 'Jul 06', due: 'Jul 20', amount: '$30,331.00', status: 'Paid', statusClass: 'statusPaid' },
  { id: 'INV-2026-0169', customer: 'Northwind Studio', issued: 'Jul 05', due: 'Jul 19', amount: '$31,302.00', status: 'Pending', statusClass: 'statusPending' },
  { id: 'INV-2026-0168', customer: 'Halcyon Labs', issued: 'Jul 04', due: 'Jul 18', amount: '$32,273.00', status: 'Overdue', statusClass: 'statusOverdue' },
  { id: 'INV-2026-0167', customer: 'Aperture Films', issued: 'Jul 03', due: 'Jul 17', amount: '$33,244.00', status: 'Draft', statusClass: 'statusDraft' },
  { id: 'INV-2026-0166', customer: 'Meridian Group', issued: 'Jul 02', due: 'Jul 16', amount: '$34,215.00', status: 'Paid', statusClass: 'statusPaid' },
  { id: 'INV-2026-0165', customer: 'Cove Hospitality', issued: 'Jul 01', due: 'Jul 15', amount: '$35,186.00', status: 'Paid', statusClass: 'statusPaid' },
  { id: 'INV-2026-0164', customer: 'Palette Studio', issued: 'Jun 30', due: 'Jul 14', amount: '$36,157.00', status: 'Paid', statusClass: 'statusPaid' },
  { id: 'INV-2026-0163', customer: 'Loom Works', issued: 'Jun 29', due: 'Jul 13', amount: '$37,128.00', status: 'Pending', statusClass: 'statusPending' },
  { id: 'INV-2026-0162', customer: 'Fleet & Oak', issued: 'Jun 28', due: 'Jul 12', amount: '$38,099.00', status: 'Overdue', statusClass: 'statusOverdue' },
  { id: 'INV-2026-0161', customer: 'Vera Dynamics', issued: 'Jun 27', due: 'Jul 11', amount: '$39,070.00', status: 'Draft', statusClass: 'statusDraft' },
  { id: 'INV-2026-0160', customer: 'Sable & Co.', issued: 'Jun 26', due: 'Jul 10', amount: '$40,041.00', status: 'Paid', statusClass: 'statusPaid' },
  { id: 'INV-2026-0159', customer: 'Northwind Studio', issued: 'Jun 25', due: 'Jul 09', amount: '$41,012.00', status: 'Paid', statusClass: 'statusPaid' }
];

export default function InvoicesPage() {
  const router = useRouter();
  const popoverRef = useRef<HTMLDivElement>(null);
  
  const [selectedStatus, setSelectedStatus] = useState<string>('All');
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
    setSelectedStatus('All');
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

  const filteredInvoices = useMemo(() => {
    return ALL_INVOICES.filter(inv => {
      // Filter by status
      if (selectedStatus !== 'All' && inv.status !== selectedStatus) {
        return false;
      }
      // Filter by date number if selected
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
    const rows = filteredInvoices.map(i => `${i.id},"${i.customer}",${i.issued},${i.due},"${i.amount}",${i.status}`);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers, ...rows].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `invox_invoices_${selectedStatus.toLowerCase()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className={styles.container}>
      <div className="apple-pop-up">
        <div className={styles.headerSection}>
          <div>
            <span className={styles.kicker}>RESOURCE</span>
            <h1 className={styles.title}>All invoices</h1>
            <p className={styles.subtitle}>
              Pick a day to see what was issued, or filter by status to focus on what needs attention.
            </p>
          </div>
          <button 
            className={styles.calendarBtn}
            onClick={() => setIsPopoverOpen(!isPopoverOpen)}
            title="Toggle date filter"
          >
            <Calendar size={16} />
          </button>
        </div>
      </div>

      {/* Filter Card */}
      <div className="apple-pop-up stagger-1">
        <div className={styles.filterCard}>
          <div className={styles.filterHeader}>
            <div className={styles.filterTitleGroup}>
              <span className={styles.kicker}>PICK A DAY</span>
              <h3>Filter by date</h3>
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
                    zIndex: 50,
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
                <div 
                  key={idx} 
                  className={styles.dateItem} 
                  data-active={isActive}
                  onClick={() => setSelectedDateNum(selectedDateNum === date.num ? '' : date.num)}
                >
                  <span className={styles.dateDay}>{date.day}</span>
                  <span className={styles.dateNum}>{date.num}</span>
                </div>
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
      <div className="apple-pop-up stagger-2">
        <div className={styles.tableCard}>
          <div className={styles.tableHeaderBar}>
            <div>
              <span className={styles.kicker}>
                {selectedStatus.toUpperCase()} {selectedDateNum ? `• DAY ${selectedDateNum}` : '• ALL TIME'}
              </span>
              <h2 className={styles.title} style={{fontSize: '20px', marginTop: '2px'}}>
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
                    <tr key={inv.id}>
                      <td style={{fontWeight: 500}}>{inv.id}</td>
                      <td>{inv.customer}</td>
                      <td>{inv.issued}</td>
                      <td>{inv.due}</td>
                      <td style={{fontWeight: 500}}>{inv.amount}</td>
                      <td>
                        <span className={`${styles.statusBadge} ${styles[inv.statusClass]}`}>
                          <span className={styles.statusDot}></span>
                          {inv.status}
                        </span>
                      </td>
                      <td style={{textAlign: 'right'}}>
                        <button 
                          className={styles.actionBtn}
                          onClick={() => router.push(`/invoices`)}
                          title="Actions"
                        >
                          <MoreHorizontal size={16} />
                        </button>
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
    </div>
  );
}
