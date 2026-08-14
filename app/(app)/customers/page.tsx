'use client';

import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useRouter } from 'next/navigation';
import { ArrowUpRight, X, FileText, ArrowRight } from 'lucide-react';
import { CurrencyDisplay } from '@/components/shared/CurrencyDisplay';
import { useUiStore } from '@/stores/uiStore';
import styles from './customers.module.css';

export interface CustomerItem {
  id: string;
  name: string;
  invoicesCount: number;
  lifetimeRevenue: string;
  numericLifetime: number;
  outstandingBalance: string;
  numericOutstanding: number;
  currency: string;
}

export interface CustomerInvoice {
  id: string;
  issued: string;
  due: string;
  numericAmount: number;
  currency: string;
  status: 'Paid' | 'Pending' | 'Overdue' | 'Draft';
  statusClass: string;
}

const CUSTOMERS_DATA: CustomerItem[] = [
  { id: 'cust-1', name: 'Northwind Studio', invoicesCount: 5, lifetimeRevenue: '$63,955.00', numericLifetime: 63955, outstandingBalance: '$11,472.00', numericOutstanding: 11472, currency: 'USD' },
  { id: 'cust-2', name: 'Sable & Co.', invoicesCount: 5, lifetimeRevenue: '$59,100.00', numericLifetime: 59100, outstandingBalance: '$20,620.00', numericOutstanding: 20620, currency: 'USD' },
  { id: 'cust-3', name: 'Vireo Analytics', invoicesCount: 4, lifetimeRevenue: '$54,016.00', numericLifetime: 54016, outstandingBalance: '$19,649.00', numericOutstanding: 19649, currency: 'USD' },
  { id: 'cust-4', name: 'Rivet & Oak', invoicesCount: 4, lifetimeRevenue: '$50,132.00', numericLifetime: 50132, outstandingBalance: '$25,066.00', numericOutstanding: 25066, currency: 'USD' },
  { id: 'cust-5', name: 'Halcyon Labs', invoicesCount: 4, lifetimeRevenue: '$48,828.00', numericLifetime: 48828, outstandingBalance: '$13,414.00', numericOutstanding: 13414, currency: 'USD' },
  { id: 'cust-6', name: 'Lantern Works', invoicesCount: 4, lifetimeRevenue: '$46,248.00', numericLifetime: 46248, outstandingBalance: '$23,124.00', numericOutstanding: 23124, currency: 'USD' },
  { id: 'cust-7', name: 'Palette Studio', invoicesCount: 4, lifetimeRevenue: '$42,364.00', numericLifetime: 42364, outstandingBalance: '$4,446.00', numericOutstanding: 4446, currency: 'USD' },
  { id: 'cust-8', name: 'Cove Hospitality', invoicesCount: 4, lifetimeRevenue: '$38,480.00', numericLifetime: 38480, outstandingBalance: '$3,475.00', numericOutstanding: 3475, currency: 'USD' },
  { id: 'cust-9', name: 'Meridian Group', invoicesCount: 4, lifetimeRevenue: '$34,596.00', numericLifetime: 34596, outstandingBalance: '$14,794.00', numericOutstanding: 14794, currency: 'USD' },
  { id: 'cust-10', name: 'Aperture Films', invoicesCount: 4, lifetimeRevenue: '$30,712.00', numericLifetime: 30712, outstandingBalance: '$13,823.00', numericOutstanding: 13823, currency: 'USD' },
];

const CUSTOMER_INVOICES_MAP: Record<string, CustomerInvoice[]> = {
  'Northwind Studio': [
    { id: 'INV-2026-0199', issued: 'Aug 04, 2026', due: 'Aug 18, 2026', numericAmount: 2171, currency: 'USD', status: 'Pending', statusClass: 'statusPending' },
    { id: 'INV-2026-0189', issued: 'Jul 25, 2026', due: 'Aug 08, 2026', numericAmount: 11882, currency: 'USD', status: 'Paid', statusClass: 'statusPaid' },
    { id: 'INV-2026-0179', issued: 'Jul 15, 2026', due: 'Jul 29, 2026', numericAmount: 21592, currency: 'USD', status: 'Draft', statusClass: 'statusDraft' },
    { id: 'INV-2026-0169', issued: 'Jul 05, 2026', due: 'Jul 19, 2026', numericAmount: 9830, currency: 'USD', status: 'Pending', statusClass: 'statusPending' },
    { id: 'INV-2026-0159', issued: 'Jun 25, 2026', due: 'Jul 09, 2026', numericAmount: 19080, currency: 'USD', status: 'Paid', statusClass: 'statusPaid' },
  ],
  'Sable & Co.': [
    { id: 'INV-2026-0200', issued: 'Aug 05, 2026', due: 'Aug 19, 2026', numericAmount: 1200, currency: 'USD', status: 'Paid', statusClass: 'statusPaid' },
    { id: 'INV-2026-0190', issued: 'Jul 26, 2026', due: 'Aug 09, 2026', numericAmount: 10911, currency: 'USD', status: 'Paid', statusClass: 'statusPaid' },
    { id: 'INV-2026-0180', issued: 'Jul 16, 2026', due: 'Jul 30, 2026', numericAmount: 20621, currency: 'USD', status: 'Overdue', statusClass: 'statusOverdue' },
    { id: 'INV-2026-0170', issued: 'Jul 06, 2026', due: 'Jul 20, 2026', numericAmount: 8720, currency: 'USD', status: 'Paid', statusClass: 'statusPaid' },
    { id: 'INV-2026-0160', issued: 'Jun 26, 2026', due: 'Jul 10, 2026', numericAmount: 18970, currency: 'USD', status: 'Paid', statusClass: 'statusPaid' },
  ],
  'Vireo Analytics': [
    { id: 'INV-2026-0191', issued: 'Jul 27, 2026', due: 'Aug 10, 2026', numericAmount: 9940, currency: 'USD', status: 'Draft', statusClass: 'statusDraft' },
    { id: 'INV-2026-0181', issued: 'Jul 17, 2026', due: 'Jul 31, 2026', numericAmount: 19650, currency: 'USD', status: 'Pending', statusClass: 'statusPending' },
    { id: 'INV-2026-0171', issued: 'Jul 07, 2026', due: 'Jul 21, 2026', numericAmount: 7615, currency: 'USD', status: 'Paid', statusClass: 'statusPaid' },
    { id: 'INV-2026-0161', issued: 'Jun 27, 2026', due: 'Jul 11, 2026', numericAmount: 17860, currency: 'USD', status: 'Draft', statusClass: 'statusDraft' },
  ],
  'Rivet & Oak': [
    { id: 'INV-2026-0192', issued: 'Jul 28, 2026', due: 'Aug 11, 2026', numericAmount: 8969, currency: 'USD', status: 'Overdue', statusClass: 'statusOverdue' },
    { id: 'INV-2026-0182', issued: 'Jul 18, 2026', due: 'Aug 01, 2026', numericAmount: 18679, currency: 'USD', status: 'Paid', statusClass: 'statusPaid' },
    { id: 'INV-2026-0172', issued: 'Jul 08, 2026', due: 'Jul 22, 2026', numericAmount: 6510, currency: 'USD', status: 'Paid', statusClass: 'statusPaid' },
    { id: 'INV-2026-0162', issued: 'Jun 28, 2026', due: 'Jul 12, 2026', numericAmount: 16750, currency: 'USD', status: 'Overdue', statusClass: 'statusOverdue' },
  ],
  'Halcyon Labs': [
    { id: 'INV-2026-0198', issued: 'Aug 03, 2026', due: 'Aug 17, 2026', numericAmount: 3142, currency: 'USD', status: 'Overdue', statusClass: 'statusOverdue' },
    { id: 'INV-2026-0188', issued: 'Jul 24, 2026', due: 'Aug 07, 2026', numericAmount: 12853, currency: 'USD', status: 'Paid', statusClass: 'statusPaid' },
    { id: 'INV-2026-0178', issued: 'Jul 14, 2026', due: 'Jul 28, 2026', numericAmount: 22563, currency: 'USD', status: 'Paid', statusClass: 'statusPaid' },
    { id: 'INV-2026-0168', issued: 'Jul 04, 2026', due: 'Jul 18, 2026', numericAmount: 10970, currency: 'USD', status: 'Overdue', statusClass: 'statusOverdue' },
  ],
  'Lantern Works': [
    { id: 'INV-2026-0193', issued: 'Jul 29, 2026', due: 'Aug 12, 2026', numericAmount: 8000, currency: 'USD', status: 'Pending', statusClass: 'statusPending' },
    { id: 'INV-2026-0183', issued: 'Jul 19, 2026', due: 'Aug 02, 2026', numericAmount: 17708, currency: 'USD', status: 'Paid', statusClass: 'statusPaid' },
    { id: 'INV-2026-0173', issued: 'Jul 09, 2026', due: 'Jul 23, 2026', numericAmount: 5417, currency: 'USD', status: 'Draft', statusClass: 'statusDraft' },
    { id: 'INV-2026-0163', issued: 'Jun 29, 2026', due: 'Jul 13, 2026', numericAmount: 15640, currency: 'USD', status: 'Pending', statusClass: 'statusPending' },
  ],
  'Palette Studio': [
    { id: 'INV-2026-0194', issued: 'Jul 30, 2026', due: 'Aug 13, 2026', numericAmount: 6652, currency: 'USD', status: 'Paid', statusClass: 'statusPaid' },
    { id: 'INV-2026-0184', issued: 'Jul 20, 2026', due: 'Aug 03, 2026', numericAmount: 16737, currency: 'USD', status: 'Paid', statusClass: 'statusPaid' },
    { id: 'INV-2026-0174', issued: 'Jul 10, 2026', due: 'Jul 24, 2026', numericAmount: 4410, currency: 'USD', status: 'Overdue', statusClass: 'statusOverdue' },
    { id: 'INV-2026-0164', issued: 'Jun 30, 2026', due: 'Jul 14, 2026', numericAmount: 14535, currency: 'USD', status: 'Paid', statusClass: 'statusPaid' },
  ],
  'Cove Hospitality': [
    { id: 'INV-2026-0195', issued: 'Jul 31, 2026', due: 'Aug 14, 2026', numericAmount: 5874, currency: 'USD', status: 'Paid', statusClass: 'statusPaid' },
    { id: 'INV-2026-0185', issued: 'Jul 21, 2026', due: 'Aug 04, 2026', numericAmount: 15766, currency: 'USD', status: 'Draft', statusClass: 'statusDraft' },
    { id: 'INV-2026-0175', issued: 'Jul 11, 2026', due: 'Jul 25, 2026', numericAmount: 3415, currency: 'USD', status: 'Pending', statusClass: 'statusPending' },
    { id: 'INV-2026-0165', issued: 'Jul 01, 2026', due: 'Jul 15, 2026', numericAmount: 13425, currency: 'USD', status: 'Paid', statusClass: 'statusPaid' },
  ],
  'Meridian Group': [
    { id: 'INV-2026-0196', issued: 'Aug 01, 2026', due: 'Aug 15, 2026', numericAmount: 5084, currency: 'USD', status: 'Paid', statusClass: 'statusPaid' },
    { id: 'INV-2026-0186', issued: 'Jul 22, 2026', due: 'Aug 05, 2026', numericAmount: 14795, currency: 'USD', status: 'Overdue', statusClass: 'statusOverdue' },
    { id: 'INV-2026-0176', issued: 'Jul 12, 2026', due: 'Jul 26, 2026', numericAmount: 2464, currency: 'USD', status: 'Paid', statusClass: 'statusPaid' },
    { id: 'INV-2026-0166', issued: 'Jul 02, 2026', due: 'Jul 16, 2026', numericAmount: 12314, currency: 'USD', status: 'Paid', statusClass: 'statusPaid' },
  ],
  'Aperture Films': [
    { id: 'INV-2026-0197', issued: 'Aug 02, 2026', due: 'Aug 16, 2026', numericAmount: 4113, currency: 'USD', status: 'Draft', statusClass: 'statusDraft' },
    { id: 'INV-2026-0187', issued: 'Jul 23, 2026', due: 'Aug 06, 2026', numericAmount: 13824, currency: 'USD', status: 'Pending', statusClass: 'statusPending' },
    { id: 'INV-2026-0177', issued: 'Jul 13, 2026', due: 'Jul 27, 2026', numericAmount: 1520, currency: 'USD', status: 'Paid', statusClass: 'statusPaid' },
    { id: 'INV-2026-0167', issued: 'Jul 03, 2026', due: 'Jul 17, 2026', numericAmount: 11200, currency: 'USD', status: 'Draft', statusClass: 'statusDraft' },
  ],
};

export default function CustomersPage() {
  const router = useRouter();
  const { userProfile } = useUiStore();
  
  const [mounted, setMounted] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<CustomerItem | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (selectedCustomer) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedCustomer]);

  const customerInvoices = selectedCustomer ? (CUSTOMER_INVOICES_MAP[selectedCustomer.name] || []) : [];

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className="apple-pop-up">
        <div className={styles.headerSection}>
          <span className={styles.kicker}>CUSTOMERS</span>
          <h1 className={styles.title}>Your customer roster</h1>
          <p className={styles.subtitle}>
            A calm overview of every client — invoices sent, lifetime revenue, and open balance.
          </p>
        </div>
      </div>

      {/* Metric Cards Grid */}
      <div className="apple-pop-up stagger-1">
        <div className={styles.metricsGrid}>
          <div className={styles.metricCard}>
            <span className={styles.metricLabel}>Total customers</span>
            <h2 className={styles.metricValue}>10</h2>
          </div>
          <div className={styles.metricCard}>
            <span className={styles.metricLabel}>Lifetime revenue</span>
            <h2 className={styles.metricValue}>
              <CurrencyDisplay amount={468431} originalCurrency="USD" />
            </h2>
          </div>
          <div className={styles.metricCard}>
            <span className={styles.metricLabel}>Outstanding</span>
            <h2 className={styles.metricValue}>
              <CurrencyDisplay amount={149883} originalCurrency="USD" />
            </h2>
          </div>
        </div>
      </div>

      {/* Table Card */}
      <div className="apple-pop-up stagger-2">
        <div className={styles.tableCard}>
          <div className={styles.tableHeaderBar}>
            <span className={styles.kicker}>SORTED BY REVENUE</span>
            <h2 className={styles.tableHeaderTitle}>All customers</h2>
          </div>

          <div className={styles.tableContainer}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>CUSTOMER</th>
                  <th>INVOICES</th>
                  <th>LIFETIME</th>
                  <th>OUTSTANDING</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {CUSTOMERS_DATA.map((cust) => (
                  <tr key={cust.id}>
                    <td>
                      <div className={styles.customerCell}>
                        <div className={styles.avatarDot}>
                          {cust.name.slice(0, 1).toUpperCase()}
                        </div>
                        <span>{cust.name}</span>
                      </div>
                    </td>
                    <td style={{ color: 'var(--invox-color-text-secondary)' }}>{cust.invoicesCount}</td>
                    <td style={{ fontWeight: 600 }}>
                      <CurrencyDisplay amount={cust.numericLifetime} originalCurrency={cust.currency} />
                    </td>
                    <td style={{ color: 'var(--invox-color-text-secondary)' }}>
                      <CurrencyDisplay amount={cust.numericOutstanding} originalCurrency={cust.currency} />
                    </td>
                    <td style={{ textAlign: 'right' }}>
                      <button 
                        className={styles.actionBtn}
                        onClick={() => setSelectedCustomer(cust)}
                        title={`View details for ${cust.name}`}
                      >
                        <ArrowUpRight size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Inline Customer Detail Modal rendered via Portal */}
      {mounted && selectedCustomer && createPortal(
        <div className={styles.overlay} onClick={() => setSelectedCustomer(null)}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <div className={styles.modalTitleSection}>
                <div className={styles.modalAvatar}>
                  {selectedCustomer.name.slice(0, 1).toUpperCase()}
                </div>
                <div>
                  <span className={styles.kicker}>CUSTOMER PROFILE</span>
                  <h2 className={styles.tableHeaderTitle}>{selectedCustomer.name}</h2>
                </div>
              </div>
              <button 
                className={styles.closeBtn}
                onClick={() => setSelectedCustomer(null)}
                title="Close dialog"
              >
                <X size={18} />
              </button>
            </div>

            <div className={styles.modalBody}>
              {/* Stats Summary */}
              <div className={styles.modalStatsGrid}>
                <div className={styles.modalStatCard}>
                  <span style={{ fontSize: '11px', color: 'var(--invox-color-text-secondary)' }}>Invoices</span>
                  <span style={{ fontSize: '18px', fontWeight: 700 }}>{selectedCustomer.invoicesCount}</span>
                </div>
                <div className={styles.modalStatCard}>
                  <span style={{ fontSize: '11px', color: 'var(--invox-color-text-secondary)' }}>Lifetime</span>
                  <span style={{ fontSize: '16px', fontWeight: 700 }}>
                    <CurrencyDisplay amount={selectedCustomer.numericLifetime} originalCurrency={selectedCustomer.currency} />
                  </span>
                </div>
                <div className={styles.modalStatCard}>
                  <span style={{ fontSize: '11px', color: 'var(--invox-color-text-secondary)' }}>Outstanding</span>
                  <span style={{ fontSize: '16px', fontWeight: 700, color: selectedCustomer.numericOutstanding > 0 ? '#fbbf24' : 'inherit' }}>
                    <CurrencyDisplay amount={selectedCustomer.numericOutstanding} originalCurrency={selectedCustomer.currency} />
                  </span>
                </div>
              </div>

              {/* Invoices List */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <span className={styles.kicker}>INVOICES HISTORY ({customerInvoices.length})</span>
                  <button 
                    onClick={() => { setSelectedCustomer(null); router.push('/invoices'); }}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: 'var(--invox-color-primary, #3b82f6)',
                      fontSize: '12px',
                      fontWeight: 600,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                    }}
                  >
                    View all in All Invoices <ArrowRight size={12} />
                  </button>
                </div>

                <div className={styles.tableContainer}>
                  <table className={styles.table}>
                    <thead>
                      <tr>
                        <th>INVOICE</th>
                        <th>ISSUED</th>
                        <th>STATUS</th>
                        <th style={{ textAlign: 'right' }}>AMOUNT</th>
                      </tr>
                    </thead>
                    <tbody>
                      {customerInvoices.map((inv) => (
                        <tr key={inv.id}>
                          <td>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 600 }}>
                              <FileText size={14} color="var(--invox-color-text-tertiary)" />
                              <span>{inv.id}</span>
                            </div>
                          </td>
                          <td style={{ color: 'var(--invox-color-text-secondary)', fontSize: '12px' }}>{inv.issued}</td>
                          <td>
                            <span className={styles[inv.statusClass]}>
                              {inv.status}
                            </span>
                          </td>
                          <td style={{ textAlign: 'right', fontWeight: 600 }}>
                            <CurrencyDisplay amount={inv.numericAmount} originalCurrency={inv.currency} />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
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
