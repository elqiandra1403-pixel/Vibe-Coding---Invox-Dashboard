'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useUiStore } from '@/stores/uiStore';
import { Search, FileText, Users, CreditCard, Settings, Sun, Moon, Plus, X, ArrowRight } from 'lucide-react';
import styles from './CommandPalette.module.css';

const COMMAND_ITEMS = [
  { id: 'new-inv', title: 'Create new invoice', category: 'Actions', icon: Plus, action: 'new-invoice' },
  { id: 'toggle-theme', title: 'Toggle Light/Dark Theme', category: 'Actions', icon: Sun, action: 'toggle-theme' },
  { id: 'nav-dashboard', title: 'Dashboard', category: 'Pages', icon: FileText, href: '/dashboard' },
  { id: 'nav-invoices', title: 'Invoices', category: 'Pages', icon: FileText, href: '/invoices' },
  { id: 'nav-customers', title: 'Customers', category: 'Pages', icon: Users, href: '/customers' },
  { id: 'nav-payments', title: 'Payments', category: 'Pages', icon: CreditCard, href: '/payments' },
  { id: 'nav-settings', title: 'Settings', category: 'Pages', icon: Settings, href: '/settings' },
  { id: 'inv-1', title: 'INV-2026-0200 — Sable & Co.', category: 'Invoices', icon: FileText, href: '/invoices' },
  { id: 'inv-2', title: 'INV-2026-0199 — Northwind Studio', category: 'Invoices', icon: FileText, href: '/invoices' },
  { id: 'inv-3', title: 'INV-2026-0198 — Halcyon Labs', category: 'Invoices', icon: FileText, href: '/invoices' },
  { id: 'cust-1', title: 'Aperture Films', category: 'Customers', icon: Users, href: '/customers' },
  { id: 'cust-2', title: 'Meridian Group', category: 'Customers', icon: Users, href: '/customers' },
];

export function CommandPalette() {
  const router = useRouter();
  const { searchModalOpen, setSearchModalOpen, toggleTheme, setNewInvoiceModalOpen, addToast } = useUiStore();
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchModalOpen(!searchModalOpen);
      } else if (e.key === 'Escape' && searchModalOpen) {
        setSearchModalOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [searchModalOpen, setSearchModalOpen]);

  useEffect(() => {
    if (searchModalOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [searchModalOpen]);

  if (!searchModalOpen) return null;

  const filtered = COMMAND_ITEMS.filter((item) =>
    item.title.toLowerCase().includes(query.toLowerCase()) ||
    item.category.toLowerCase().includes(query.toLowerCase())
  );

  const handleSelect = (item: typeof COMMAND_ITEMS[0]) => {
    setSearchModalOpen(false);
    if (item.action === 'toggle-theme') {
      toggleTheme();
      addToast('Theme toggled');
    } else if (item.action === 'new-invoice') {
      setNewInvoiceModalOpen(true);
    } else if (item.href) {
      router.push(item.href);
    }
  };

  return (
    <div className={styles.overlay} onClick={() => setSearchModalOpen(false)}>
      <div className={styles.dialog} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <Search size={18} className={styles.searchIcon} />
          <input
            ref={inputRef}
            type="text"
            className={styles.input}
            placeholder="Type a command or search invoices, customers..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button className={styles.closeBtn} onClick={() => setSearchModalOpen(false)}>
            <X size={16} />
          </button>
        </div>

        <div className={styles.results}>
          {filtered.length > 0 ? (
            filtered.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.id}
                  className={styles.item}
                  onClick={() => handleSelect(item)}
                >
                  <Icon size={16} className={styles.itemIcon} />
                  <span className={styles.itemTitle}>{item.title}</span>
                  <span className={styles.itemCategory}>{item.category}</span>
                  <ArrowRight size={14} className={styles.itemArrow} />
                </div>
              );
            })
          ) : (
            <div className={styles.empty}>No matching commands or resources found</div>
          )}
        </div>

        <div className={styles.footer}>
          <span>Use <strong>ESC</strong> to exit</span>
          <span>Invox Quick Command</span>
        </div>
      </div>
    </div>
  );
}
