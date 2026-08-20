'use client';

import React, { useState } from 'react';
import { CheckCircle2, AlertCircle, Send, FileText, Bell, BellOff } from 'lucide-react';
import { useUiStore } from '@/stores/uiStore';
import styles from './notifications.module.css';

export interface NotificationItem {
  id: string;
  type: 'paid' | 'overdue' | 'reminder' | 'draft' | 'summary';
  title: string;
  detail: string;
  time: string;
  isRead: boolean;
}

const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif-1',
    type: 'paid',
    title: 'Aperture Films paid INV-2026-0139',
    detail: '$15,750.00 landed in your account.',
    time: '2 hours ago',
    isRead: false,
  },
  {
    id: 'notif-2',
    type: 'overdue',
    title: 'INV-2026-0138 is overdue',
    detail: 'Meridian Group is 4 days past due on $3,300.00.',
    time: '5 hours ago',
    isRead: false,
  },
  {
    id: 'notif-3',
    type: 'reminder',
    title: 'Reminder sent',
    detail: 'Automatic follow-up sent to Halcyon Labs for INV-2026-0140.',
    time: 'Yesterday',
    isRead: true,
  },
  {
    id: 'notif-4',
    type: 'draft',
    title: 'Draft created',
    detail: 'You started INV-2026-0136 for Palette Studio.',
    time: '2 days ago',
    isRead: true,
  },
  {
    id: 'notif-5',
    type: 'paid',
    title: 'Cove Hospitality paid INV-2026-0137',
    detail: '$21,600.00 collected.',
    time: '3 days ago',
    isRead: true,
  },
  {
    id: 'notif-6',
    type: 'summary',
    title: 'Weekly summary ready',
    detail: '12 invoices sent, $84,200 collected this week.',
    time: 'Last Monday',
    isRead: true,
  },
];

export default function NotificationsPage() {
  const { notificationSettings, setNotificationSettings } = useUiStore();
  const [items, setItems] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);

  const isNotificationsOff = !notificationSettings.allowNotifications;
  const unreadCount = items.filter(item => !item.isRead).length;

  const handleMarkAllAsRead = () => {
    setItems(items.map(item => ({ ...item, isRead: true })));
  };

  const handleToggleRead = (id: string) => {
    setItems(items.map(item => item.id === id ? { ...item, isRead: !item.isRead } : item));
  };

  const renderIcon = (type: NotificationItem['type']) => {
    switch (type) {
      case 'paid':
        return <CheckCircle2 size={16} />;
      case 'overdue':
        return <AlertCircle size={16} />;
      case 'reminder':
        return <Send size={16} />;
      case 'draft':
        return <FileText size={16} />;
      case 'summary':
        return <Bell size={16} />;
      default:
        return <Bell size={16} />;
    }
  };

  const getIconClass = (type: NotificationItem['type']) => {
    switch (type) {
      case 'paid':
        return styles.iconPaid;
      case 'overdue':
        return styles.iconOverdue;
      case 'reminder':
        return styles.iconReminder;
      case 'draft':
        return styles.iconDraft;
      case 'summary':
        return styles.iconSummary;
      default:
        return styles.iconSummary;
    }
  };

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className="apple-pop-up">
        <div className={styles.headerSection}>
          <div>
            <span className={styles.kicker}>NOTIFICATIONS</span>
            <h1 className={styles.title}>
              {isNotificationsOff ? 'Notifications OFF' : unreadCount > 0 ? `${unreadCount} unread` : 'All read'}
            </h1>
            <p className={styles.subtitle}>
              Payments, reminders, and system events, gathered in one calm feed.
            </p>
          </div>

          <button 
            className={styles.markReadBtn}
            onClick={handleMarkAllAsRead}
            disabled={unreadCount === 0 || isNotificationsOff}
            style={{ opacity: (unreadCount === 0 || isNotificationsOff) ? 0.5 : 1, cursor: (unreadCount === 0 || isNotificationsOff) ? 'default' : 'pointer' }}
          >
            Mark all as read
          </button>
        </div>
      </div>

      {isNotificationsOff && (
        <div className="apple-pop-up" style={{ marginBottom: '16px' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '12px 16px',
            backgroundColor: 'rgba(239, 68, 68, 0.1)',
            border: '1px solid rgba(239, 68, 68, 0.25)',
            borderRadius: '12px',
            color: '#f87171',
            fontSize: '13px',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <BellOff size={16} />
              <span>In-app notifications are currently turned OFF in Settings.</span>
            </div>
            <button
              onClick={() => setNotificationSettings({ allowNotifications: true })}
              style={{
                background: '#ef4444',
                color: '#fff',
                border: 'none',
                padding: '6px 12px',
                borderRadius: '6px',
                fontSize: '12px',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              Turn ON
            </button>
          </div>
        </div>
      )}

      {/* Notifications Card */}
      <div className="apple-pop-up stagger-1">
        <div className={styles.card}>
          <div className={styles.notificationList}>
            {items.map((item) => (
              <div 
                key={item.id} 
                className={styles.notificationRow}
                onClick={() => handleToggleRead(item.id)}
                title="Click to toggle read status"
              >
                <div className={`${styles.iconCircle} ${getIconClass(item.type)}`}>
                  {renderIcon(item.type)}
                </div>

                <div className={styles.contentGroup}>
                  <div className={styles.titleRow}>
                    <span className={styles.itemTitle}>{item.title}</span>
                    {!item.isRead && <span className={styles.unreadDot}></span>}
                  </div>
                  <div className={styles.itemDetail}>{item.detail}</div>
                  <div className={styles.itemTime}>{item.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className={styles.footer}>
        <span>© Invox 2026</span>
        <span>All amounts in USD · Updated just now</span>
      </div>
    </div>
  );
}
