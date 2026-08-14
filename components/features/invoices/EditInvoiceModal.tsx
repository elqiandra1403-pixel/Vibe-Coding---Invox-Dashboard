'use client';

import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, Pencil, DollarSign, User } from 'lucide-react';
import styles from './EditInvoiceModal.module.css';

export interface EditableInvoice {
  id: string;
  customer: string;
  amount: number;
  currency: string;
  due: string;
  status: 'Paid' | 'Pending' | 'Overdue' | 'Draft';
}

export interface EditInvoiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  invoice: EditableInvoice | null;
  onSave: (updatedInvoice: EditableInvoice) => void;
}

export function EditInvoiceModal({ isOpen, onClose, invoice, onSave }: EditInvoiceModalProps) {
  const [mounted, setMounted] = useState(false);
  const [customer, setCustomer] = useState('');
  const [amount, setAmount] = useState('');
  const [currency, setCurrency] = useState('USD');
  const [due, setDue] = useState('');
  const [status, setStatus] = useState<'Paid' | 'Pending' | 'Overdue' | 'Draft'>('Pending');

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (invoice) {
      setCustomer(invoice.customer);
      setAmount(invoice.amount.toString());
      setCurrency(invoice.currency || 'USD');
      setDue(invoice.due);
      setStatus(invoice.status);
    }
  }, [invoice]);

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

  if (!isOpen || !mounted || !invoice) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const numAmount = parseFloat(amount) || invoice.amount;
    
    onSave({
      id: invoice.id,
      customer: customer.trim() || invoice.customer,
      amount: numAmount,
      currency,
      due: due.trim() || invoice.due,
      status,
    });
  };

  return createPortal(
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.dialog} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <div className={styles.titleGroup}>
            <div className={styles.iconBox}>
              <Pencil size={20} />
            </div>
            <div>
              <span className={styles.kicker}>EDIT INVOICE</span>
              <h2 className={styles.title}>{invoice.id}</h2>
            </div>
          </div>
          <button className={styles.closeBtn} onClick={onClose} title="Close modal">
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

          <div className={styles.row}>
            <div className={styles.inputGroup}>
              <label className={styles.label}>STATUS</label>
              <select
                className={styles.select}
                value={status}
                onChange={(e) => setStatus(e.target.value as any)}
              >
                <option value="Paid">Paid</option>
                <option value="Pending">Pending</option>
                <option value="Overdue">Overdue</option>
                <option value="Draft">Draft</option>
              </select>
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.label}>DUE DATE</label>
              <input
                type="text"
                className={styles.select}
                placeholder="e.g. Aug 28"
                value={due}
                onChange={(e) => setDue(e.target.value)}
              />
            </div>
          </div>

          <div className={styles.actions}>
            <button type="button" className={styles.cancelBtn} onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className={styles.submitBtn}>
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>,
    document.body
  );
}
