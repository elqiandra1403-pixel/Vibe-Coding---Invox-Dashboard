'use client';

import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { X, Check } from 'lucide-react';
import styles from './CalendarPopover.module.css';

export interface CalendarPreset {
  label: string;
  val: string;
}

export interface CalendarPopoverProps {
  isOpen: boolean;
  onClose: () => void;
  anchorRef: React.RefObject<HTMLElement>;
  selectedDateNum: string;
  onSelectDateNum: (num: string) => void;
  presets?: CalendarPreset[];
  preferredPlacement?: 'top' | 'bottom' | 'auto';
}

const DEFAULT_PRESETS: CalendarPreset[] = [
  { label: 'All Dates', val: '' },
  { label: 'Today (Aug 05)', val: '5' },
  { label: 'Yesterday (Aug 04)', val: '4' },
  { label: 'Aug 03', val: '3' },
  { label: 'Jul 31', val: '31' },
];

export function CalendarPopover({
  isOpen,
  onClose,
  anchorRef,
  selectedDateNum,
  onSelectDateNum,
  presets = DEFAULT_PRESETS,
  preferredPlacement = 'auto',
}: CalendarPopoverProps) {
  const [mounted, setMounted] = useState(false);
  const [pos, setPos] = useState<{ top: number; left: number } | null>(null);
  const popoverRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!isOpen || !anchorRef.current) return;

    const updatePosition = () => {
      if (!anchorRef.current) return;
      const rect = anchorRef.current.getBoundingClientRect();
      const popoverWidth = 290;
      const estimatedHeight = 360;

      let top = rect.bottom + 8;
      if (preferredPlacement === 'top') {
        top = Math.max(16, rect.top - estimatedHeight - 8);
      } else if (preferredPlacement === 'bottom') {
        top = rect.bottom + 8;
      } else {
        // If bottom overflows window height, flip above button
        if (top + estimatedHeight > window.innerHeight - 16) {
          top = Math.max(16, rect.top - estimatedHeight - 8);
        }
      }

      let left = rect.right - popoverWidth;
      if (left < 16) left = 16;
      if (left + popoverWidth > window.innerWidth - 16) {
        left = window.innerWidth - popoverWidth - 16;
      }

      setPos({ top, left });
    };

    updatePosition();
    window.addEventListener('resize', updatePosition);
    window.addEventListener('scroll', updatePosition, true);

    return () => {
      window.removeEventListener('resize', updatePosition);
      window.removeEventListener('scroll', updatePosition, true);
    };
  }, [isOpen, anchorRef, preferredPlacement]);

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(event.target as Node) &&
        anchorRef.current &&
        !anchorRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose, anchorRef]);

  if (!isOpen || !mounted || !pos) return null;

  return createPortal(
    <div
      ref={popoverRef}
      className={styles.popoverFixed}
      style={{
        top: `${pos.top}px`,
        left: `${pos.left}px`,
      }}
    >
      <div className={styles.header}>
        <span className={styles.kicker}>FILTER BY DATE</span>
        {selectedDateNum && (
          <button
            className={styles.clearBtn}
            onClick={() => {
              onSelectDateNum('');
              onClose();
            }}
          >
            <X size={12} /> Clear
          </button>
        )}
      </div>

      <div className={styles.inputGroup}>
        <input
          type="date"
          className={styles.dateInput}
          onChange={(e) => {
            if (e.target.value) {
              const dateObj = new Date(e.target.value);
              if (!isNaN(dateObj.getTime())) {
                const dayNum = String(dateObj.getDate());
                onSelectDateNum(dayNum);
                onClose();
              }
            }
          }}
        />
      </div>

      <div className={styles.presetSection}>
        <div className={styles.presetTitle}>Quick Presets</div>
        <div className={styles.presetList}>
          {presets.map((preset) => {
            const isActive = selectedDateNum === preset.val;
            return (
              <button
                key={preset.label}
                className={`${styles.presetBtn} ${isActive ? styles.presetBtnActive : ''}`}
                onClick={() => {
                  onSelectDateNum(preset.val);
                  onClose();
                }}
              >
                <span>{preset.label}</span>
                {isActive && <Check size={14} color="#60a5fa" />}
              </button>
            );
          })}
        </div>
      </div>
    </div>,
    document.body
  );
}
