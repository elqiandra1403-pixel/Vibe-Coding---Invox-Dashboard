'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Search, Sun, Moon, Bell, Plus, CheckCircle2, AlertCircle, Send, FileText, Menu } from 'lucide-react';
import { useUiStore } from '@/stores/uiStore';
import styles from './Header.module.css';

export function Header() {
  const router = useRouter();
  const { theme, toggleTheme, setSearchModalOpen, setNewInvoiceModalOpen, addToast, toggleMobileMenu } = useUiStore();
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(2);
  const notifRef = useRef<HTMLDivElement>(null);

  const isDark = theme === 'dark';

  // Close notification popover when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
        setIsNotifOpen(false);
      }
    };
    if (isNotifOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isNotifOpen]);

  const handleMarkAllRead = () => {
    setUnreadCount(0);
    addToast('All notifications marked as read');
  };

  return (
    <header className={styles.header}>
      <div className={styles.headerLeft}>
        <button 
          className={styles.mobileMenuBtn}
          onClick={toggleMobileMenu}
          aria-label="Toggle mobile menu"
          title="Toggle Navigation Menu"
        >
          <Menu size={20} />
        </button>

        <div 
          className={styles.searchContainer}
          onClick={() => setSearchModalOpen(true)}
        >
          <Search className={styles.searchIcon} />
          <input 
            type="text" 
            placeholder="Search invoices, customers (⌘K)" 
            className={styles.searchInput}
            readOnly
            style={{ cursor: 'pointer' }}
          />
        </div>
      </div>

      <div className={styles.actions}>
        <button 
          className={styles.iconButton} 
          aria-label="Toggle theme"
          onClick={() => {
            toggleTheme();
            addToast(`Switched to ${isDark ? 'Light' : 'Dark'} mode`);
          }}
          title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
        >
          {isDark ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        {/* In-Place Notification Popover */}
        <div className={styles.notifWrapper} ref={notifRef}>
          <button 
            className={styles.iconButton} 
            aria-label="Notifications"
            onClick={() => setIsNotifOpen(!isNotifOpen)}
            title="Toggle notifications overlay"
            style={{
              color: isNotifOpen ? 'var(--invox-color-text-primary)' : 'var(--invox-color-text-secondary)',
              backgroundColor: isNotifOpen ? 'rgba(255, 255, 255, 0.08)' : 'transparent',
            }}
          >
            <Bell size={20} />
            {unreadCount > 0 && <span className={styles.unreadBadge} />}
          </button>

          {isNotifOpen && (
            <div className={styles.notifPopover}>
              <div className={styles.popoverHeader}>
                <div className={styles.popoverTitle}>
                  Notifications {unreadCount > 0 && `(${unreadCount} new)`}
                </div>
                {unreadCount > 0 && (
                  <button 
                    className={styles.markAllReadBtn}
                    onClick={handleMarkAllRead}
                  >
                    Mark all read
                  </button>
                )}
              </div>

              <div className={styles.notifList}>
                <div className={styles.notifItem} onClick={() => { setIsNotifOpen(false); router.push('/invoices'); }}>
                  <CheckCircle2 size={16} color="#22c55e" style={{ flexShrink: 0, marginTop: 2 }} />
                  <div>
                    <div className={styles.notifItemText}>
                      Aperture Films paid INV-2026-0139
                    </div>
                    <div className={styles.notifItemTime}>$15,750.00 landed • 2h ago</div>
                  </div>
                </div>

                <div className={styles.notifItem} onClick={() => { setIsNotifOpen(false); router.push('/invoices'); }}>
                  <AlertCircle size={16} color="#ef4444" style={{ flexShrink: 0, marginTop: 2 }} />
                  <div>
                    <div className={styles.notifItemText}>
                      INV-2026-0138 is overdue
                    </div>
                    <div className={styles.notifItemTime}>Meridian Group • 5h ago</div>
                  </div>
                </div>

                <div className={styles.notifItem} onClick={() => { setIsNotifOpen(false); router.push('/notifications'); }}>
                  <Send size={16} color="#6366f1" style={{ flexShrink: 0, marginTop: 2 }} />
                  <div>
                    <div className={styles.notifItemText}>
                      Reminder sent to Halcyon Labs
                    </div>
                    <div className={styles.notifItemTime}>Yesterday</div>
                  </div>
                </div>

                <div className={styles.notifItem} onClick={() => { setIsNotifOpen(false); router.push('/invoices'); }}>
                  <FileText size={16} color="#9ca3af" style={{ flexShrink: 0, marginTop: 2 }} />
                  <div>
                    <div className={styles.notifItemText}>
                      Draft created for Palette Studio
                    </div>
                    <div className={styles.notifItemTime}>2 days ago</div>
                  </div>
                </div>
              </div>

              <button 
                className={styles.viewAllNotifsLink}
                onClick={() => {
                  setIsNotifOpen(false);
                  router.push('/notifications');
                }}
              >
                Go to Notifications page →
              </button>
            </div>
          )}
        </div>

        <button 
          className={styles.newInvoiceButton}
          onClick={() => setNewInvoiceModalOpen(true)}
        >
          <Plus size={16} />
          New invoice
        </button>
      </div>
    </header>
  );
}

