'use client';

import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useUiStore } from '@/stores/uiStore';
import { X, FilePlus, DollarSign, Calendar, User } from 'lucide-react';
import { formatCurrency, parseAmount } from '@/utils/currency';
import styles from './CreateInvoiceModal.module.css';

export function CreateInvoiceModal() {
  const { newInvoiceModalOpen, setNewInvoiceModalOpen, addToast, userProfile } = useUiStore();
  const [mounted, setMounted] = useState(false);
  const [customer, setCustomer] = useState('');
  const [amount, setAmount] = useState('');
  const [currency, setCurrency] = useState(userProfile?.currency || 'USD');
  const [dueDate, setDueDate] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (userProfile?.currency) {
      setCurrency(userProfile.currency);
    }
  }, [userProfile?.currency]);

  useEffect(() => {
    if (newInvoiceModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [newInvoiceModalOpen]);

  if (!newInvoiceModalOpen || !mounted) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const numericVal = parseAmount(amount);
    if (!customer || !numericVal) {
      addToast('Please provide a valid customer name and amount.', 'error');
      return;
    }

    const invId = `INV-2026-0${Math.floor(200 + Math.random() * 800)}`;
    const formattedStr = formatCurrency(numericVal, currency);

    const newInvoice = {
      id: invId,
      customer,
      issued: 'Aug 14',
      due: dueDate ? dueDate : 'Aug 28',
      amount: formattedStr,
      numericAmount: numericVal,
      currency,
      status: 'Pending' as const,
      statusClass: 'statusPending'
    };

    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('invox-invoice-created', { detail: newInvoice }));
    }

    addToast(`Invoice ${invId} for ${customer} (${formattedStr}) created!`, 'success');
    setNewInvoiceModalOpen(false);
    setCustomer('');
    setAmount('');
    setDueDate('');
    setDescription('');
  };

  return createPortal(
    <div className={styles.overlay} onClick={() => setNewInvoiceModalOpen(false)}>
      <div className={styles.dialog} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <div className={styles.titleGroup}>
            <div className={styles.iconBox}>
              <FilePlus size={20} />
            </div>
            <div>
              <span className={styles.kicker}>NEW INVOICE</span>
              <h2 className={styles.title}>Create Invoice</h2>
            </div>
          </div>
          <button className={styles.closeBtn} onClick={() => setNewInvoiceModalOpen(false)}>
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputGroup}>
            <label className={styles.label}>CUSTOMER NAME</label>
            <div className={styles.inputWrapper}>
              <User size={16} className={styles.fieldIcon} />
              <input
                type="text"
                className={styles.input}
                placeholder="e.g. Aperture Films"
                value={customer}
                onChange={(e) => setCustomer(e.target.value)}
                required
              />
            </div>
          </div>

          <div className={styles.row}>
            <div className={styles.inputGroup}>
              <label className={styles.label}>AMOUNT</label>
              <div className={styles.inputWrapper}>
                <DollarSign size={16} className={styles.fieldIcon} />
                <input
                  type="number"
                  step="any"
                  className={styles.input}
                  placeholder="0.00"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.label}>CURRENCY</label>
              <select
                className={styles.select}
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
              >
                <option value="USD">USD ($)</option>
                <option value="EUR">EUR (€)</option>
                <option value="GBP">GBP (£)</option>
                <option value="IDR">IDR (Rp)</option>
              </select>
            </div>
          </div>

          <div className={styles.inputGroup}>
            <label className={styles.label}>DUE DATE</label>
            <div className={styles.inputWrapper}>
              <Calendar size={16} className={styles.fieldIcon} />
              <input
                type="date"
                className={styles.input}
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
              />
            </div>
          </div>

          <div className={styles.inputGroup}>
            <label className={styles.label}>DESCRIPTION / NOTES</label>
            <textarea
              className={styles.textarea}
              placeholder="Provide invoice line items or billing details..."
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className={styles.actions}>
            <button
              type="button"
              className={styles.cancelBtn}
              onClick={() => setNewInvoiceModalOpen(false)}
            >
              Cancel
            </button>
            <button type="submit" className={styles.submitBtn}>
              Issue Invoice
            </button>
          </div>
        </form>
      </div>
    </div>,
    document.body
  );
}
