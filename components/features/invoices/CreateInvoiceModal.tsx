'use client';

import React, { useState } from 'react';
import { useUiStore } from '@/stores/uiStore';
import { X, FilePlus, DollarSign, Calendar, User } from 'lucide-react';
import styles from './CreateInvoiceModal.module.css';

export function CreateInvoiceModal() {
  const { newInvoiceModalOpen, setNewInvoiceModalOpen, addToast } = useUiStore();
  const [customer, setCustomer] = useState('');
  const [amount, setAmount] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [description, setDescription] = useState('');

  if (!newInvoiceModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customer || !amount) {
      addToast('Please provide a customer name and amount.', 'error');
      return;
    }

    const invId = `INV-2026-0${Math.floor(200 + Math.random() * 800)}`;
    addToast(`Invoice ${invId} for ${customer} ($${amount}) created!`, 'success');
    setNewInvoiceModalOpen(false);
    setCustomer('');
    setAmount('');
    setDueDate('');
    setDescription('');
  };

  return (
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
              <label className={styles.label}>AMOUNT ($ USD)</label>
              <div className={styles.inputWrapper}>
                <DollarSign size={16} className={styles.fieldIcon} />
                <input
                  type="number"
                  step="0.01"
                  className={styles.input}
                  placeholder="0.00"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  required
                />
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
    </div>
  );
}
