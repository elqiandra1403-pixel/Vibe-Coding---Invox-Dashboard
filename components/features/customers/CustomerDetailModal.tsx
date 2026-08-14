'use client';

import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import { CurrencyDisplay } from '@/components/shared/CurrencyDisplay';
import { CustomerItem } from '@/app/(app)/customers/page';
import styles from './CustomerDetailModal.module.css';

export interface CustomerInvoice {
  id: string;
  code: string;
  dueDate: string;
  amount: number;
  status: 'Paid' | 'Pending' | 'Draft' | 'Overdue';
}

const CUSTOMER_INVOICES_MAP: Record<string, CustomerInvoice[]> = {
  'cust-1': [
    { id: 'inv-1', code: 'INV-2026-0199', dueDate: 'Due Aug 27', amount: 2171, status: 'Pending' },
    { id: 'inv-2', code: 'INV-2026-0189', dueDate: 'Due Aug 17', amount: 11881, status: 'Paid' },
    { id: 'inv-3', code: 'INV-2026-0179', dueDate: 'Due Aug 07', amount: 21591, status: 'Draft' },
    { id: 'inv-4', code: 'INV-2026-0169', dueDate: 'Due Jul 28', amount: 9301, status: 'Pending' },
    { id: 'inv-5', code: 'INV-2026-0159', dueDate: 'Due Jul 18', amount: 18012, status: 'Paid' },
  ],
  'cust-2': [
    { id: 'inv-6', code: 'INV-2026-0198', dueDate: 'Due Aug 26', amount: 12500, status: 'Pending' },
    { id: 'inv-7', code: 'INV-2026-0188', dueDate: 'Due Aug 16', amount: 15400, status: 'Paid' },
    { id: 'inv-8', code: 'INV-2026-0178', dueDate: 'Due Aug 06', amount: 8120, status: 'Pending' },
    { id: 'inv-9', code: 'INV-2026-0168', dueDate: 'Due Jul 26', amount: 23080, status: 'Paid' },
  ],
  'cust-3': [
    { id: 'inv-10', code: 'INV-2026-0197', dueDate: 'Due Aug 25', amount: 14200, status: 'Pending' },
    { id: 'inv-11', code: 'INV-2026-0187', dueDate: 'Due Aug 15', amount: 18500, status: 'Paid' },
    { id: 'inv-12', code: 'INV-2026-0177', dueDate: 'Due Aug 05', amount: 5449, status: 'Pending' },
    { id: 'inv-13', code: 'INV-2026-0167', dueDate: 'Due Jul 25', amount: 15867, status: 'Paid' },
  ],
  'cust-4': [
    { id: 'inv-14', code: 'INV-2026-0196', dueDate: 'Due Aug 24', amount: 12533, status: 'Pending' },
    { id: 'inv-15', code: 'INV-2026-0186', dueDate: 'Due Aug 14', amount: 12533, status: 'Paid' },
    { id: 'inv-16', code: 'INV-2026-0176', dueDate: 'Due Aug 04', amount: 12533, status: 'Pending' },
    { id: 'inv-17', code: 'INV-2026-0166', dueDate: 'Due Jul 24', amount: 12533, status: 'Paid' },
  ],
  'cust-5': [
    { id: 'inv-18', code: 'INV-2026-0195', dueDate: 'Due Aug 23', amount: 8414, status: 'Pending' },
    { id: 'inv-19', code: 'INV-2026-0185', dueDate: 'Due Aug 13', amount: 15000, status: 'Paid' },
    { id: 'inv-20', code: 'INV-2026-0175', dueDate: 'Due Aug 03', amount: 5000, status: 'Pending' },
    { id: 'inv-21', code: 'INV-2026-0165', dueDate: 'Due Jul 23', amount: 20414, status: 'Paid' },
  ],
  'cust-6': [
    { id: 'inv-22', code: 'INV-2026-0194', dueDate: 'Due Aug 22', amount: 11562, status: 'Pending' },
    { id: 'inv-23', code: 'INV-2026-0184', dueDate: 'Due Aug 12', amount: 11562, status: 'Paid' },
    { id: 'inv-24', code: 'INV-2026-0174', dueDate: 'Due Aug 02', amount: 11562, status: 'Pending' },
    { id: 'inv-25', code: 'INV-2026-0164', dueDate: 'Due Jul 22', amount: 11562, status: 'Paid' },
  ],
  'cust-7': [
    { id: 'inv-26', code: 'INV-2026-0193', dueDate: 'Due Aug 21', amount: 4446, status: 'Pending' },
    { id: 'inv-27', code: 'INV-2026-0183', dueDate: 'Due Aug 11', amount: 12639, status: 'Paid' },
    { id: 'inv-28', code: 'INV-2026-0173', dueDate: 'Due Aug 01', amount: 12639, status: 'Paid' },
    { id: 'inv-29', code: 'INV-2026-0163', dueDate: 'Due Jul 21', amount: 12640, status: 'Paid' },
  ],
  'cust-8': [
    { id: 'inv-30', code: 'INV-2026-0192', dueDate: 'Due Aug 20', amount: 3475, status: 'Pending' },
    { id: 'inv-31', code: 'INV-2026-0182', dueDate: 'Due Aug 10', amount: 11668, status: 'Paid' },
    { id: 'inv-32', code: 'INV-2026-0172', dueDate: 'Due Jul 31', amount: 11668, status: 'Paid' },
    { id: 'inv-33', code: 'INV-2026-0162', dueDate: 'Due Jul 20', amount: 11669, status: 'Paid' },
  ],
  'cust-9': [
    { id: 'inv-34', code: 'INV-2026-0191', dueDate: 'Due Aug 19', amount: 14794, status: 'Pending' },
    { id: 'inv-35', code: 'INV-2026-0181', dueDate: 'Due Aug 09', amount: 6600, status: 'Paid' },
    { id: 'inv-36', code: 'INV-2026-0171', dueDate: 'Due Jul 30', amount: 6602, status: 'Paid' },
    { id: 'inv-37', code: 'INV-2026-0161', dueDate: 'Due Jul 19', amount: 6600, status: 'Paid' },
  ],
  'cust-10': [
    { id: 'inv-38', code: 'INV-2026-0190', dueDate: 'Due Aug 18', amount: 13823, status: 'Pending' },
    { id: 'inv-39', code: 'INV-2026-0180', dueDate: 'Due Aug 08', amount: 5630, status: 'Paid' },
    { id: 'inv-40', code: 'INV-2026-0170', dueDate: 'Due Jul 29', amount: 5630, status: 'Paid' },
    { id: 'inv-41', code: 'INV-2026-0160', dueDate: 'Due Jul 18', amount: 5629, status: 'Paid' },
  ]
};

export interface CustomerDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  customer: CustomerItem | null;
}

export function CustomerDetailModal({ isOpen, onClose, customer }: CustomerDetailModalProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen || !mounted || !customer) return null;

  const invoices = CUSTOMER_INVOICES_MAP[customer.id] || [
    { id: 'inv-fallback', code: 'INV-2026-0101', dueDate: 'Due Aug 20', amount: customer.numericOutstanding, status: 'Pending' }
  ];

  const getBadgeClass = (status: CustomerInvoice['status']) => {
    switch (status) {
      case 'Paid': return styles.badgePaid;
      case 'Pending': return styles.badgePending;
      case 'Draft': return styles.badgeDraft;
      case 'Overdue': return styles.badgeOverdue;
      default: return styles.badgePending;
    }
  };

  return createPortal(
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <div className={styles.avatar}>
              {customer.name.slice(0, 1).toUpperCase()}
            </div>
            <div className={styles.headerMeta}>
              <span className={styles.kicker}>CUSTOMER</span>
              <h2 className={styles.title}>{customer.name}</h2>
            </div>
          </div>
          <button className={styles.closeBtn} onClick={onClose} title="Close modal">
            <X size={18} />
          </button>
        </div>

        {/* Stats Grid */}
        <div className={styles.statsGrid}>
          <div className={styles.statCard}>
            <span className={styles.statLabel}>Invoices</span>
            <span className={styles.statVal}>{customer.invoicesCount}</span>
          </div>
          <div className={styles.statCard}>
            <span className={styles.statLabel}>Lifetime</span>
            <span className={styles.statVal}>
              <CurrencyDisplay amount={customer.numericLifetime} originalCurrency={customer.currency} />
            </span>
          </div>
          <div className={styles.statCard}>
            <span className={styles.statLabel}>Outstanding</span>
            <span className={styles.statVal}>
              <CurrencyDisplay amount={customer.numericOutstanding} originalCurrency={customer.currency} />
            </span>
          </div>
        </div>

        {/* Invoices List */}
        <div className={styles.invoiceList}>
          {invoices.map((inv) => (
            <div key={inv.id} className={styles.invoiceItem}>
              <div className={styles.invoiceMeta}>
                <span className={styles.invoiceCode}>{inv.code}</span>
                <span className={styles.invoiceDueDate}>{inv.dueDate}</span>
              </div>
              <div className={styles.invoiceRight}>
                <span className={styles.invoiceAmount}>
                  <CurrencyDisplay amount={inv.amount} originalCurrency={customer.currency} />
                </span>
                <span className={getBadgeClass(inv.status)}>{inv.status}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className={styles.footer}>
          <button className={styles.doneBtn} onClick={onClose}>
            Done
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}
