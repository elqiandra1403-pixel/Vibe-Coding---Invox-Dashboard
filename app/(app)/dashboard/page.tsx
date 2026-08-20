'use client';

import React, { useEffect } from 'react';
import styles from './dashboard.module.css';
import { GreetingSection } from '@/components/features/dashboard/GreetingSection';
import { MetricCards } from '@/components/features/dashboard/MetricCards';
import { RevenueChart } from '@/components/features/dashboard/RevenueChart';
import { PaymentSuccessChart } from '@/components/features/dashboard/PaymentSuccessChart';
import { InvoiceVolumeChart } from '@/components/features/dashboard/InvoiceVolumeChart';
import { RecentActivity } from '@/components/features/dashboard/RecentActivity';
import { DateBrowser } from '@/components/features/dashboard/DateBrowser';
import { RecentInvoicesTable } from '@/components/features/dashboard/RecentInvoicesTable';
import { useDashboardStore } from '@/stores/dashboardStore';

export default function DashboardPage() {
  const refreshData = useDashboardStore((state) => state.refreshData);

  useEffect(() => {
    refreshData();
  }, [refreshData]);
  return (
    <div className={styles.container}>
      <div className="apple-pop-up" style={{ position: 'relative', zIndex: 100000 }}>
        <GreetingSection />
      </div>
      
      <div className={styles.row}>
        <div className={`${styles.col8} apple-pop-up stagger-1`}>
          <RevenueChart />
          <InvoiceVolumeChart />
        </div>
        <div className={`${styles.col4} apple-pop-up stagger-2`}>
          <PaymentSuccessChart />
          <RecentActivity />
        </div>
      </div>

      <div className="apple-pop-up stagger-3">
        <MetricCards />
      </div>
      
      <div className="apple-pop-up stagger-4" style={{ position: 'relative', zIndex: 99999 }}>
        <DateBrowser />
      </div>

      <div className="apple-pop-up stagger-5" style={{ position: 'relative', zIndex: 1 }}>
        <RecentInvoicesTable />
      </div>
      
      <div style={{marginTop: '24px', display: 'flex', justifyContent: 'space-between', color: 'var(--invox-color-text-tertiary)', fontSize: '12px'}}>
        <span>© Invox 2026</span>
        <span>All amounts in USD - Updated just now</span>
      </div>
    </div>
  );
}
