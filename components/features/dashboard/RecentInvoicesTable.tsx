import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from '@/app/(app)/dashboard/dashboard.module.css';
import compStyles from '@/app/(app)/dashboard/dashboard-components.module.css';
import { ArrowRight, MoreHorizontal, CalendarX, X, Eye, Pencil, Copy, FileDown, Trash2 } from 'lucide-react';
import { useDashboardStore } from '@/stores/dashboardStore';
import { useUiStore } from '@/stores/uiStore';
import { CurrencyDisplay } from '@/components/shared/CurrencyDisplay';

export function RecentInvoicesTable() {
  const router = useRouter();
  const invoices = useDashboardStore(state => state.recentInvoices);
  const selectedDateNum = useDashboardStore(state => state.selectedDateNum);
  const setSelectedDateNum = useDashboardStore(state => state.setSelectedDateNum);
  const { addToast } = useUiStore();

  const [openActionMenuId, setOpenActionMenuId] = useState<string | null>(null);
  const actionMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleActionMenuClickOutside = (event: MouseEvent) => {
      if (actionMenuRef.current && !actionMenuRef.current.contains(event.target as Node)) {
        setOpenActionMenuId(null);
      }
    };
    if (openActionMenuId) {
      document.addEventListener('mousedown', handleActionMenuClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleActionMenuClickOutside);
    };
  }, [openActionMenuId]);

  const displayInvoices = React.useMemo(() => {
    if (!selectedDateNum) return invoices;
    return invoices.filter(inv => {
      const dayMatch = inv.issued.match(/\d+/)?.[0];
      return dayMatch === selectedDateNum || dayMatch === selectedDateNum.padStart(2, '0');
    });
  }, [invoices, selectedDateNum]);

  return (
    <div className={styles.card} style={{paddingBottom: '8px'}}>
      <div className={styles.cardHeader}>
        <div>
          <h3 className={styles.cardTitle}>
            LATEST ACTIVITY {selectedDateNum && `• FILTERED BY DAY ${selectedDateNum}`}
          </h3>
          <h2 className={styles.cardValue} style={{fontSize: '20px', display: 'flex', alignItems: 'center', gap: '8px'}}>
            Recent Invoices
            {selectedDateNum && (
              <button 
                onClick={() => setSelectedDateNum('')}
                className={compStyles.clearFilterBtn}
                title="Clear date filter"
              >
                <X size={12} /> Show all
              </button>
            )}
          </h2>
        </div>
        <button className={compStyles.viewAll} onClick={() => router.push('/invoices')}>
          View all <ArrowRight size={14} />
        </button>
      </div>

      <div className={compStyles.tableContainer}>
        {displayInvoices.length > 0 ? (
          <table className={compStyles.table}>
            <thead>
              <tr>
                <th>Invoice</th>
                <th>Customer</th>
                <th>Issued</th>
                <th>Due</th>
                <th>Amount</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {displayInvoices.map((inv) => (
                <tr key={inv.id}>
                  <td style={{fontWeight: 500}}>{inv.id}</td>
                  <td>{inv.customer}</td>
                  <td>{inv.issued}</td>
                  <td>{inv.due}</td>
                  <td style={{fontWeight: 500}}>
                    <CurrencyDisplay amount={inv.numericAmount ?? inv.amount} originalCurrency={inv.currency || 'USD'} />
                  </td>
                  <td>
                    <span className={`${compStyles.statusBadge} ${compStyles[inv.statusClass]}`}>
                      <span className={compStyles.statusDot}></span>
                      {inv.status}
                    </span>
                  </td>
                  <td style={{textAlign: 'right', position: 'relative', color: 'var(--invox-color-text-tertiary)'}} onClick={(e) => e.stopPropagation()}>
                    <button 
                      style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer', padding: '4px' }}
                      onClick={() => setOpenActionMenuId(openActionMenuId === inv.id ? null : inv.id)}
                      title="More actions"
                    >
                      <MoreHorizontal size={16} />
                    </button>

                    {openActionMenuId === inv.id && (
                      <div ref={actionMenuRef} className={compStyles.menuPopover}>
                        <button
                          className={compStyles.menuItem}
                          onClick={() => {
                            router.push('/invoices');
                            setOpenActionMenuId(null);
                          }}
                        >
                          <Eye size={14} /> View invoice
                        </button>

                        <button
                          className={compStyles.menuItem}
                          onClick={() => {
                            addToast(`Editing invoice ${inv.id}`, 'info');
                            setOpenActionMenuId(null);
                          }}
                        >
                          <Pencil size={14} /> Edit invoice
                        </button>

                        <button
                          className={compStyles.menuItem}
                          onClick={() => {
                            addToast(`Duplicated invoice ${inv.id}`, 'success');
                            setOpenActionMenuId(null);
                          }}
                        >
                          <Copy size={14} /> Duplicate invoice
                        </button>

                        <button
                          className={compStyles.menuItem}
                          onClick={() => {
                            addToast(`Downloading PDF for ${inv.id}`, 'info');
                            setOpenActionMenuId(null);
                          }}
                        >
                          <FileDown size={14} /> Download PDF
                        </button>

                        <div className={compStyles.menuDivider} />

                        <button
                          className={`${compStyles.menuItem} ${compStyles.deleteMenuItem}`}
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
          <div className={compStyles.emptyState}>
            <CalendarX size={36} className={compStyles.emptyIcon} />
            <h4>No invoices found for this date</h4>
            <p>There are no invoices recorded for Day {selectedDateNum}.</p>
            <button 
              onClick={() => setSelectedDateNum('')}
              className={compStyles.resetBtn}
            >
              Clear date filter
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
