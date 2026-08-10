'use client';

import React from 'react';
import { LogOut, X, AlertTriangle } from 'lucide-react';
import styles from './SignOutModal.module.css';

interface SignOutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isLoading?: boolean;
}

export function SignOutModal({ isOpen, onClose, onConfirm, isLoading = false }: SignOutModalProps) {
  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.dialog} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeBtn} onClick={onClose} aria-label="Close modal">
          <X size={18} />
        </button>

        <div className={styles.header}>
          <div className={styles.iconCircle}>
            <LogOut size={24} className={styles.icon} />
          </div>
          <div className={styles.titleGroup}>
            <span className={styles.kicker}>SESSION ACTION</span>
            <h2 className={styles.title}>Are you sure you want to sign out?</h2>
            <p className={styles.description}>
              You will be signed out of Invox on this device. Any unsaved invoice drafts or ongoing filters will be cleared.
            </p>
          </div>
        </div>

        <div className={styles.actions}>
          <button 
            type="button" 
            className={styles.cancelBtn} 
            onClick={onClose}
            disabled={isLoading}
          >
            Cancel
          </button>
          <button 
            type="button" 
            className={styles.signOutBtn} 
            onClick={onConfirm}
            disabled={isLoading}
          >
            {isLoading ? 'Signing out...' : 'Yes, sign out'}
          </button>
        </div>
      </div>
    </div>
  );
}
