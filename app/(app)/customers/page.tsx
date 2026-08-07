'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { ArrowUpRight } from 'lucide-react';
import styles from './customers.module.css';

export interface CustomerItem {
  id: string;
  name: string;
  invoicesCount: number;
  lifetimeRevenue: string;
  outstandingBalance: string;
}

const CUSTOMERS_DATA: CustomerItem[] = [
  { id: 'cust-1', name: 'Northwind Studio', invoicesCount: 5, lifetimeRevenue: '$63,955.00', outstandingBalance: '$11,472.00' },
  { id: 'cust-2', name: 'Sable & Co.', invoicesCount: 5, lifetimeRevenue: '$59,100.00', outstandingBalance: '$20,620.00' },
  { id: 'cust-3', name: 'Vireo Analytics', invoicesCount: 4, lifetimeRevenue: '$54,016.00', outstandingBalance: '$19,649.00' },
  { id: 'cust-4', name: 'Rivet & Oak', invoicesCount: 4, lifetimeRevenue: '$50,132.00', outstandingBalance: '$25,066.00' },
  { id: 'cust-5', name: 'Halcyon Labs', invoicesCount: 4, lifetimeRevenue: '$48,828.00', outstandingBalance: '$13,414.00' },
  { id: 'cust-6', name: 'Lantern Works', invoicesCount: 4, lifetimeRevenue: '$46,248.00', outstandingBalance: '$23,124.00' },
  { id: 'cust-7', name: 'Palette Studio', invoicesCount: 4, lifetimeRevenue: '$42,364.00', outstandingBalance: '$4,446.00' },
  { id: 'cust-8', name: 'Cove Hospitality', invoicesCount: 4, lifetimeRevenue: '$38,480.00', outstandingBalance: '$3,475.00' },
  { id: 'cust-9', name: 'Meridian Group', invoicesCount: 4, lifetimeRevenue: '$34,596.00', outstandingBalance: '$14,794.00' },
  { id: 'cust-10', name: 'Aperture Films', invoicesCount: 4, lifetimeRevenue: '$30,712.00', outstandingBalance: '$13,823.00' },
];

export default function CustomersPage() {
  const router = useRouter();

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
            <h2 className={styles.metricValue}>$468,431.00</h2>
          </div>
          <div className={styles.metricCard}>
            <span className={styles.metricLabel}>Outstanding</span>
            <h2 className={styles.metricValue}>$149,883.00</h2>
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
                    <td style={{ fontWeight: 600 }}>{cust.lifetimeRevenue}</td>
                    <td style={{ color: 'var(--invox-color-text-secondary)' }}>{cust.outstandingBalance}</td>
                    <td style={{ textAlign: 'right' }}>
                      <button 
                        className={styles.actionBtn}
                        onClick={() => router.push('/invoices')}
                        title={`View invoices for ${cust.name}`}
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

      {/* Footer */}
      <div className={styles.footer}>
        <span>© Invox 2026</span>
        <span>All amounts in USD · Updated just now</span>
      </div>
    </div>
  );
}
