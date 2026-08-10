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
import { createClient } from '@/lib/supabase/client';
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
  const { userProfile, setSignOutModalOpen } = useUiStore();

  const initials = (userProfile.name || 'User')
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <aside className={styles.sidebar}>
      <div className={styles.logo}>
        <div className={styles.logoIcon}>iv</div>
        Invox
      </div>

      <nav className={styles.nav}>
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link 
              key={item.name} 
              href={item.href} 
              className={styles.navLink}
              data-active={isActive}
            >
              <Icon className={styles.navIcon} />
              {item.name}
            </Link>
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
          Sign out
        </button>
      </div>
    </aside>
  );
}
