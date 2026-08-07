'use client';
import React from 'react';
import { useUiStore } from '@/stores/uiStore';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';
import styles from './Toast.module.css';

export function ToastContainer() {
  const { toasts, removeToast } = useUiStore();

  if (toasts.length === 0) return null;

  return (
    <div className={styles.container}>
      {toasts.map((toast) => (
        <div key={toast.id} className={`${styles.toast} ${styles[toast.type]}`}>
          {toast.type === 'success' && <CheckCircle2 size={16} className={styles.iconSuccess} />}
          {toast.type === 'error' && <AlertCircle size={16} className={styles.iconError} />}
          {toast.type === 'warning' && <AlertCircle size={16} className={styles.iconWarning} />}
          {toast.type === 'info' && <Info size={16} className={styles.iconInfo} />}
          <span className={styles.message}>{toast.message}</span>
          <button className={styles.closeBtn} onClick={() => removeToast(toast.id)}>
            <X size={14} />
          </button>
        </div>
      ))}
    </div>
  );
}

export function Toast({ children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <ToastContainer />;
}

