import React from 'react';
import { useRouter } from 'next/navigation';
import styles from '@/app/(app)/dashboard/dashboard.module.css';
import compStyles from '@/app/(app)/dashboard/dashboard-components.module.css';
import { ArrowRight, MoreHorizontal, CalendarX, X } from 'lucide-react';
import { useDashboardStore } from '@/stores/dashboardStore';

export function RecentInvoicesTable() {
  const router = useRouter();
  const invoices = useDashboardStore(state => state.recentInvoices);
  const selectedDateNum = useDashboardStore(state => state.selectedDateNum);
  const setSelectedDateNum = useDashboardStore(state => state.setSelectedDateNum);

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
                  <td style={{fontWeight: 500}}>{inv.amount}</td>
                  <td>
                    <span className={`${compStyles.statusBadge} ${compStyles[inv.statusClass]}`}>
                      <span className={compStyles.statusDot}></span>
                      {inv.status}
                    </span>
                  </td>
                  <td style={{textAlign: 'right', color: 'var(--invox-color-text-tertiary)'}}>
                    <button 
                      style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer', padding: '4px' }}
                      onClick={() => router.push('/invoices')}
                      title="View invoice details"
                    >
                      <MoreHorizontal size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className={compStyles.emptyState}>
            <CalendarX size={36} className={compStyles.emptyIcon} />
            <h4>No invoices found for Day {selectedDateNum}</h4>
            <p>There are no invoices recorded on this date. Try choosing another day or clear the filter.</p>
            <button className={compStyles.resetBtn} onClick={() => setSelectedDateNum('')}>
              Show all invoices
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
