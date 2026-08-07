'use client';
// AppLayout - HMR Sync

import React, { useEffect } from 'react';
import { Sidebar } from '@/components/layout/Sidebar';
import { Header } from '@/components/layout/Header';
import { CommandPalette } from '@/components/layout/CommandPalette';
import { CreateInvoiceModal } from '@/components/features/invoices/CreateInvoiceModal';
import { ToastContainer } from '@/components/ui/Toast/Toast';
import { useUiStore } from '@/stores/uiStore';
import styles from './layout.module.css';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const { theme, setTheme, setUserProfile } = useUiStore();

  useEffect(() => {
    const savedTheme = (localStorage.getItem('invox-theme') as 'light' | 'dark') || 'dark';
    setTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);

    const savedProfileStr = localStorage.getItem('invox-user-profile');
    if (savedProfileStr) {
      try {
        const parsed = JSON.parse(savedProfileStr);
        setUserProfile(parsed);
      } catch (err) {
        // ignore JSON parse error
      }
    }
  }, [setTheme, setUserProfile]);

  return (
    <div className={styles.appLayout} data-theme={theme}>
      <Sidebar />
      <div className={styles.mainContent}>
        <Header />
        <main className={styles.pageContent}>
          {children}
        </main>
      </div>
      <CommandPalette />
      <CreateInvoiceModal />
      <ToastContainer />
    </div>
  );
}

