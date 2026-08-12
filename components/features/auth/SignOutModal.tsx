'use client';

import React, { useMemo, useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useRouter } from 'next/navigation';
import { LogOut, X, Loader2 } from 'lucide-react';
import { useUiStore } from '@/stores/uiStore';
import { createClient } from '@/lib/supabase/client';
import styles from './SignOutModal.module.css';

export function SignOutModal() {
  const router = useRouter();
  const { signOutModalOpen, setSignOutModalOpen, userProfile, addToast } = useUiStore();
  const [mounted, setMounted] = useState(false);
  const [isSigningOut, setIsSigningOut] = useState(false);

  const supabase = useMemo(() => createClient(), []);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (signOutModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [signOutModalOpen]);

  if (!signOutModalOpen || !mounted) return null;

  const handleConfirmSignOut = async () => {
    setIsSigningOut(true);
    try {
      if (supabase) {
        await supabase.auth.signOut();
      }
      addToast('Signed out of Invox session', 'info');
      setSignOutModalOpen(false);
      router.push('/login');
    } catch (err: any) {
      addToast('Failed to sign out', 'error');
    } finally {
      setIsSigningOut(false);
    }
  };

  return createPortal(
    <div className={styles.overlay} onClick={() => setSignOutModalOpen(false)}>
      <div className={styles.dialog} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <div className={styles.titleGroup}>
            <div className={styles.iconBox}>
              <LogOut size={20} />
            </div>
            <div>
              <span className={styles.kicker}>SECURITY & SESSION</span>
              <h2 className={styles.title}>Confirm Sign Out</h2>
            </div>
          </div>
          <button 
            className={styles.closeBtn} 
            onClick={() => setSignOutModalOpen(false)}
            disabled={isSigningOut}
          >
            <X size={18} />
          </button>
        </div>

        <div className={styles.body}>
          <p className={styles.description}>
            Are you sure you want to sign out of <strong>Invox</strong>?
          </p>
          <div className={styles.userCard}>
            <div className={styles.userInitials}>
              {(userProfile.name || 'User').slice(0, 2).toUpperCase()}
            </div>
            <div className={styles.userDetails}>
              <span className={styles.userName}>{userProfile.name}</span>
              <span className={styles.userEmail}>{userProfile.email}</span>
            </div>
          </div>
        </div>

        <div className={styles.footer}>
          <button 
            className={styles.cancelBtn} 
            onClick={() => setSignOutModalOpen(false)}
            disabled={isSigningOut}
          >
            Cancel
          </button>
          <button 
            className={styles.confirmBtn} 
            onClick={handleConfirmSignOut}
            disabled={isSigningOut}
          >
            {isSigningOut ? (
              <>
                <Loader2 size={16} className={styles.spin} />
                Signing out...
              </>
            ) : (
              <>
                <LogOut size={16} />
                Sign out
              </>
            )}
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}
