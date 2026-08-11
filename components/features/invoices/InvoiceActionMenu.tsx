'use client';

import React, { useState, useRef, useEffect } from 'react';
import { 
  MoreHorizontal, 
  Eye, 
  Edit, 
  Copy, 
  Download, 
  Trash2, 
  X, 
  CheckCircle2, 
  FileText,
  Save,
  AlertTriangle
} from 'lucide-react';
import { Invoice, useDashboardStore } from '@/stores/dashboardStore';
import { useUiStore } from '@/stores/uiStore';
import styles from './InvoiceActionMenu.module.css';

interface InvoiceActionMenuProps {
  invoice: Invoice;
}

export function InvoiceActionMenu({ invoice }: InvoiceActionMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  // Edit form states
  const [editCustomer, setEditCustomer] = useState(invoice.customer);
  const [editAmount, setEditAmount] = useState(invoice.amount.replace('$', '').replace(',', ''));
  const [editStatus, setEditStatus] = useState(invoice.status);
  const [editDue, setEditDue] = useState(invoice.due);

  const menuRef = useRef<HTMLDivElement>(null);
  const { addToast } = useUiStore();
  const { deleteInvoice, duplicateInvoice, updateInvoice } = useDashboardStore();

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // 1. View Invoice
  const handleView = () => {
    setIsOpen(false);
    setViewModalOpen(true);
    addToast(`Viewing invoice ${invoice.id}`);
  };

  // 2. Edit Invoice
  const handleEdit = () => {
    setIsOpen(false);
    setEditCustomer(invoice.customer);
    setEditAmount(invoice.amount.replace('$', '').replace(',', ''));
    setEditStatus(invoice.status);
    setEditDue(invoice.due);
    setEditModalOpen(true);
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    const formattedAmount = `$${Number(editAmount || 0).toLocaleString('en-US', { minimumFractionDigits: 2 })}`;
    updateInvoice(invoice.id, {
      customer: editCustomer,
      amount: formattedAmount,
      status: editStatus,
      statusClass: `status${editStatus}`,
      due: editDue,
    });
    addToast(`Invoice ${invoice.id} updated successfully!`, 'success');
    setEditModalOpen(false);
  };

  // 3. Duplicate Invoice
  const handleDuplicate = () => {
    setIsOpen(false);
    duplicateInvoice(invoice.id);
    addToast(`Invoice ${invoice.id} duplicated!`, 'success');
  };

  // 4. Download PDF
  const handleDownloadPDF = () => {
    setIsOpen(false);
    const content = `
===============================================
INVOICE DETAILED SUMMARY - ${invoice.id}
===============================================
Invoice Number: ${invoice.id}
Customer Name: ${invoice.customer}
Issue Date:     ${invoice.issued}
Due Date:       ${invoice.due}
Amount Due:     ${invoice.amount}
Status:         ${invoice.status}

Items & Services:
- Professional Services / Consulting
- Retainer & Software Deliverables

Payment Terms: Net 14 Days
Thank you for your business!
===============================================
    `.trim();

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${invoice.id}_Summary.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    addToast(`Downloaded PDF/Summary for ${invoice.id}`, 'info');
  };

  // 5. Delete Invoice
  const handleDelete = () => {
    setIsOpen(false);
    setDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    deleteInvoice(invoice.id);
    addToast(`Invoice ${invoice.id} deleted`, 'info');
    setDeleteModalOpen(false);
  };

  return (
    <>
      <div className={styles.menuWrapper} ref={menuRef}>
        <button 
          className={styles.triggerBtn} 
          onClick={() => setIsOpen(!isOpen)}
          title="Contextual menu options"
        >
          <MoreHorizontal size={16} />
        </button>

        {isOpen && (
          <div className={styles.dropdown}>
            <button className={styles.menuItem} onClick={handleView}>
              <Eye size={14} className={styles.itemIcon} />
              View invoice
            </button>
            <button className={styles.menuItem} onClick={handleEdit}>
              <Edit size={14} className={styles.itemIcon} />
              Edit invoice
            </button>
            <button className={styles.menuItem} onClick={handleDuplicate}>
              <Copy size={14} className={styles.itemIcon} />
              Duplicate invoice
            </button>
            <button className={styles.menuItem} onClick={handleDownloadPDF}>
              <Download size={14} className={styles.itemIcon} />
              Download PDF
            </button>
            <div className={styles.divider} />
            <button className={`${styles.menuItem} ${styles.dangerItem}`} onClick={handleDelete}>
              <Trash2 size={14} className={styles.itemIcon} />
              Delete invoice
            </button>
          </div>
        )}
      </div>

      {/* Modal 1: View Invoice */}
      {viewModalOpen && (
        <div className={styles.overlay} onClick={() => setViewModalOpen(false)}>
          <div className={styles.dialog} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <div className={styles.titleGroup}>
                <div className={styles.iconBoxInfo}>
                  <FileText size={20} />
                </div>
                <div>
                  <span className={styles.kicker}>INVOICE DETAILS</span>
                  <h2 className={styles.modalTitle}>{invoice.id}</h2>
                </div>
              </div>
              <button className={styles.closeBtn} onClick={() => setViewModalOpen(false)}>
                <X size={18} />
              </button>
            </div>

            <div className={styles.modalBody}>
              <div className={styles.detailGrid}>
                <div className={styles.detailCard}>
                  <span className={styles.detailLabel}>CUSTOMER</span>
                  <span className={styles.detailValue}>{invoice.customer}</span>
                </div>
                <div className={styles.detailCard}>
                  <span className={styles.detailLabel}>TOTAL AMOUNT</span>
                  <span className={styles.detailValue}>{invoice.amount}</span>
                </div>
                <div className={styles.detailCard}>
                  <span className={styles.detailLabel}>ISSUED DATE</span>
                  <span className={styles.detailValue}>{invoice.issued}</span>
                </div>
                <div className={styles.detailCard}>
                  <span className={styles.detailLabel}>DUE DATE</span>
                  <span className={styles.detailValue}>{invoice.due}</span>
                </div>
              </div>

              <div className={styles.statusRow}>
                <span className={styles.detailLabel}>STATUS</span>
                <span className={styles.statusPillBadge} data-status={invoice.status}>
                  <CheckCircle2 size={12} /> {invoice.status}
                </span>
              </div>
            </div>

            <div className={styles.modalFooter}>
              <button className={styles.secondaryBtn} onClick={handleDownloadPDF}>
                <Download size={14} /> Download PDF
              </button>
              <button className={styles.primaryBtn} onClick={() => setViewModalOpen(false)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal 2: Edit Invoice */}
      {editModalOpen && (
        <div className={styles.overlay} onClick={() => setEditModalOpen(false)}>
          <div className={styles.dialog} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <div className={styles.titleGroup}>
                <div className={styles.iconBoxEdit}>
                  <Edit size={20} />
                </div>
                <div>
                  <span className={styles.kicker}>EDIT INVOICE</span>
                  <h2 className={styles.modalTitle}>{invoice.id}</h2>
                </div>
              </div>
              <button className={styles.closeBtn} onClick={() => setEditModalOpen(false)}>
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSaveEdit}>
              <div className={styles.modalBody}>
                <div className={styles.inputGroup}>
                  <label className={styles.inputLabel}>CUSTOMER NAME</label>
                  <input 
                    type="text" 
                    className={styles.inputField} 
                    value={editCustomer}
                    onChange={(e) => setEditCustomer(e.target.value)}
                    required
                  />
                </div>

                <div className={styles.inputGroup}>
                  <label className={styles.inputLabel}>AMOUNT ($)</label>
                  <input 
                    type="number" 
                    step="0.01"
                    className={styles.inputField} 
                    value={editAmount}
                    onChange={(e) => setEditAmount(e.target.value)}
                    required
                  />
                </div>

                <div className={styles.formRow}>
                  <div className={styles.inputGroup} style={{ flex: 1 }}>
                    <label className={styles.inputLabel}>DUE DATE</label>
                    <input 
                      type="text" 
                      className={styles.inputField} 
                      value={editDue}
                      onChange={(e) => setEditDue(e.target.value)}
                      required
                    />
                  </div>

                  <div className={styles.inputGroup} style={{ flex: 1 }}>
                    <label className={styles.inputLabel}>STATUS</label>
                    <select 
                      className={styles.selectField}
                      value={editStatus}
                      onChange={(e) => setEditStatus(e.target.value)}
                    >
                      <option value="Paid">Paid</option>
                      <option value="Pending">Pending</option>
                      <option value="Overdue">Overdue</option>
                      <option value="Draft">Draft</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className={styles.modalFooter}>
                <button type="button" className={styles.secondaryBtn} onClick={() => setEditModalOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className={styles.primaryBtn}>
                  <Save size={14} /> Save changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal 3: Delete Confirmation */}
      {deleteModalOpen && (
        <div className={styles.overlay} onClick={() => setDeleteModalOpen(false)}>
          <div className={styles.dialog} onClick={(e) => e.stopPropagation()} style={{ maxWidth: '420px' }}>
            <div className={styles.modalHeader}>
              <div className={styles.titleGroup}>
                <div className={styles.iconBoxDanger}>
                  <AlertTriangle size={20} />
                </div>
                <div>
                  <span className={styles.kicker}>DELETE INVOICE</span>
                  <h2 className={styles.modalTitle}>Confirm Deletion</h2>
                </div>
              </div>
              <button className={styles.closeBtn} onClick={() => setDeleteModalOpen(false)}>
                <X size={18} />
              </button>
            </div>

            <div className={styles.modalBody}>
              <p className={styles.modalDescription}>
                Are you sure you want to delete <strong>{invoice.id}</strong> ({invoice.customer} - {invoice.amount})? This action cannot be undone.
              </p>
            </div>

            <div className={styles.modalFooter}>
              <button className={styles.secondaryBtn} onClick={() => setDeleteModalOpen(false)}>
                Cancel
              </button>
              <button className={styles.dangerBtn} onClick={handleConfirmDelete}>
                <Trash2 size={14} /> Delete invoice
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
