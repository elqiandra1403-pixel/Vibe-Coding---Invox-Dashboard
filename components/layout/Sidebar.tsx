'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { 
  LayoutDashboard, 
  FileText, 
  Users, 
  CreditCard, 
  LineChart, 
  Bell, 
  Settings,
  LogOut
} from 'lucide-react';
import { useUiStore } from '@/stores/uiStore';
import styles from './Sidebar.module.css';

const NAV_ITEMS = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Invoices', href: '/invoices', icon: FileText },
  { name: 'Customers', href: '/customers', icon: Users },
  { name: 'Payments', href: '/payments', icon: CreditCard },
  { name: 'Analytics', href: '/analytics', icon: LineChart },
  { name: 'Notifications', href: '/notifications', icon: Bell },
  { name: 'Settings', href: '/settings', icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { userProfile, setSignOutModalOpen, mobileMenuOpen, setMobileMenuOpen } = useUiStore();

  const initials = (userProfile.name || 'User')
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    router.push(href);
  };

  return (
    <>
      {/* Mobile Drawer Overlay Backdrop */}
      {mobileMenuOpen && (
        <div 
          className={styles.backdrop} 
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      <aside className={`${styles.sidebar} ${mobileMenuOpen ? styles.mobileOpen : ''}`}>
        <div className={styles.logo}>
          <div className={styles.logoIcon}>iv</div>
          Invox
        </div>

        <nav className={styles.nav}>
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <button 
                key={item.name} 
                className={styles.navLink}
                data-active={isActive}
                onClick={() => handleNavClick(item.href)}
                style={{
                  textAlign: 'left',
                  cursor: 'pointer',
                  width: '100%',
                  border: 'none',
                }}
              >
                <Icon className={styles.navIcon} />
                <span className={styles.navText}>{item.name}</span>
              </button>
            );
          })}
        </nav>

        <div className={styles.footer}>
          <div className={styles.userProfile}>
            <div className={styles.avatar}>{initials}</div>
            <div className={styles.userInfo}>
              <span className={styles.userName}>{userProfile.name}</span>
              <span className={styles.userEmail}>{userProfile.email}</span>
            </div>
          </div>
          <button className={styles.signOutButton} onClick={() => setSignOutModalOpen(true)}>
            <LogOut size={14} />
            <span className={styles.signOutText}>Sign out</span>
          </button>
        </div>
      </aside>
    </>
  );
}
