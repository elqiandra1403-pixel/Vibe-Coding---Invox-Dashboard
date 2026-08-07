'use client';
// Invox Settings Page - Updated

import React, { useState, useEffect } from 'react';
import { Sun, Moon, CheckCircle2, ShieldCheck, Sparkles } from 'lucide-react';
import { useUiStore } from '@/stores/uiStore';
import styles from './settings.module.css';

export default function SettingsPage() {
  const { userProfile, setUserProfile, theme, setTheme, addToast } = useUiStore();

  const [fullName, setFullName] = useState(userProfile.name);
  const [email, setEmail] = useState(userProfile.email);
  const [company, setCompany] = useState(userProfile.company);
  const [currency, setCurrency] = useState(userProfile.currency);

  const [emailPayment, setEmailPayment] = useState(true);
  const [overdueReminders, setOverdueReminders] = useState(true);
  const [weeklyDigest, setWeeklyDigest] = useState(false);

  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    setFullName(userProfile.name);
    setEmail(userProfile.email);
    setCompany(userProfile.company);
    setCurrency(userProfile.currency);
  }, [userProfile]);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setUserProfile({
      name: fullName,
      email: email,
      company: company,
      currency: currency,
    });
    setIsSaved(true);
    addToast('Profile & workspace preferences saved successfully!', 'success');
    setTimeout(() => setIsSaved(false), 2000);
  };

  const handleThemeChange = (newTheme: 'light' | 'dark') => {
    setTheme(newTheme);
    const modeLabel = newTheme === 'dark' ? 'Dark' : 'Light';
    addToast('Appearance updated to ' + modeLabel + ' mode', 'info');
  };

  const handleToggle = (setter: (val: boolean) => void, current: boolean, label: string) => {
    const nextVal = !current;
    setter(nextVal);
    const statusLabel = nextVal ? 'enabled' : 'disabled';
    addToast(label + ' ' + statusLabel, 'info');
  };

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className="apple-pop-up">
        <div className={styles.headerSection}>
          <span className={styles.kicker}>SETTINGS</span>
          <h1 className={styles.title}>Preferences</h1>
          <p className={styles.subtitle}>
            Tune Invox to feel like yours.
          </p>
        </div>
      </div>

      <div className={styles.gridRow}>
        {/* Left Column (8 cols): Profile & Notifications */}
        <div className={`${styles.col8} apple-pop-up stagger-1`}>
          {/* Profile Card */}
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <span className={styles.kicker}>WHO YOU ARE</span>
              <h2 className={styles.cardTitle}>Profile</h2>
            </div>

            <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div className={styles.formGrid}>
                <div className={styles.inputGroup}>
                  <label className={styles.inputLabel}>FULL NAME</label>
                  <input 
                    type="text" 
                    className={styles.input} 
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                  />
                </div>

                <div className={styles.inputGroup}>
                  <label className={styles.inputLabel}>EMAIL</label>
                  <input 
                    type="email" 
                    className={styles.input} 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className={styles.inputGroup}>
                  <label className={styles.inputLabel}>COMPANY</label>
                  <input 
                    type="text" 
                    className={styles.input} 
                    placeholder="e.g. Aperture Films"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                  />
                </div>

                <div className={styles.inputGroup}>
                  <label className={styles.inputLabel}>DEFAULT CURRENCY</label>
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

              <button type="submit" className={styles.saveBtn}>
                {isSaved ? 'Saved!' : 'Save changes'}
              </button>
            </form>
          </div>

          {/* Notifications Card */}
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <span className={styles.kicker}>WHAT YOU HEAR ABOUT</span>
              <h2 className={styles.cardTitle}>Notifications</h2>
            </div>

            <div className={styles.toggleList}>
              <div className={styles.toggleRow}>
                <span className={styles.toggleLabel}>Email me when a payment lands</span>
                <label className={styles.switch}>
                  <input 
                    type="checkbox" 
                    checked={emailPayment} 
                    onChange={() => handleToggle(setEmailPayment, emailPayment, 'Payment emails')} 
                  />
                  <span className={styles.slider}></span>
                </label>
              </div>

              <div className={styles.toggleRow}>
                <span className={styles.toggleLabel}>Automatic reminders for overdue invoices</span>
                <label className={styles.switch}>
                  <input 
                    type="checkbox" 
                    checked={overdueReminders} 
                    onChange={() => handleToggle(setOverdueReminders, overdueReminders, 'Overdue reminders')} 
                  />
                  <span className={styles.slider}></span>
                </label>
              </div>

              <div className={styles.toggleRow}>
                <span className={styles.toggleLabel}>Weekly digest every Monday</span>
                <label className={styles.switch}>
                  <input 
                    type="checkbox" 
                    checked={weeklyDigest} 
                    onChange={() => handleToggle(setWeeklyDigest, weeklyDigest, 'Weekly digest')} 
                  />
                  <span className={styles.slider}></span>
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column (4 cols): Appearance & Workspace */}
        <div className={`${styles.col4} apple-pop-up stagger-2`}>
          {/* Appearance Card */}
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <span className={styles.kicker}>THEME</span>
              <h2 className={styles.cardTitle}>Appearance</h2>
            </div>

            <div className={styles.themeGrid}>
              <div 
                className={styles.themeCard}
                data-active={theme === 'light'}
                onClick={() => handleThemeChange('light')}
                style={{ cursor: 'pointer' }}
              >
                {theme === 'light' && <CheckCircle2 size={14} className={styles.checkBadge} />}
                <Sun size={20} />
                <span>Light</span>
              </div>

              <div 
                className={styles.themeCard}
                data-active={theme === 'dark'}
                onClick={() => handleThemeChange('dark')}
                style={{ cursor: 'pointer' }}
              >
                {theme === 'dark' && <CheckCircle2 size={14} className={styles.checkBadge} />}
                <Moon size={20} />
                <span>Dark</span>
              </div>
            </div>

            <span style={{ fontSize: '11px', color: 'var(--invox-color-text-tertiary, #888)', marginTop: '4px' }}>
              Your choice is remembered on this device.
            </span>
          </div>

          {/* Workspace Card */}
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <span className={styles.kicker}>TEAM</span>
              <h2 className={styles.cardTitle}>Workspace</h2>
            </div>

            <div className={styles.workspaceList}>
              <div className={styles.workspaceRow}>
                <span className={styles.workspaceLabel}>Plan</span>
                <span className={styles.workspaceVal} style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Sparkles size={12} color="#EAB308" /> Studio
                </span>
              </div>
              <div className={styles.workspaceRow}>
                <span className={styles.workspaceLabel}>Seats</span>
                <span className={styles.workspaceVal}>3 of 5</span>
              </div>
              <div className={styles.workspaceRow}>
                <span className={styles.workspaceLabel}>Billing cycle</span>
                <span className={styles.workspaceVal}>Monthly</span>
              </div>
            </div>

            <button
              onClick={() => addToast('Workspace plan is currently at Studio tier', 'info')}
              style={{
                marginTop: '12px',
                padding: '8px 12px',
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid var(--invox-color-border)',
                borderRadius: '8px',
                color: 'var(--invox-color-text-primary)',
                fontSize: '12px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justify-content: 'center',
                gap: '6px',
                transition: 'background-color 150ms ease',
              }}
            >
              <ShieldCheck size={14} /> Manage Seats & Plan
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className={styles.footer}>
        <span>© Invox 2026</span>
        <span>All amounts in {currency} · Updated just now</span>
      </div>
    </div>
  );
}
