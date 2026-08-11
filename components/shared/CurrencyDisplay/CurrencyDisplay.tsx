'use client';

import React from 'react';
import { useUiStore } from '@/stores/uiStore';
import { convertCurrency, formatCurrency, parseAmount } from '@/utils/currency';

export interface CurrencyDisplayProps {
  amount: number | string;
  originalCurrency?: string;
  className?: string;
  style?: React.CSSProperties;
  showOriginalHint?: boolean;
}

export function CurrencyDisplay({
  amount,
  originalCurrency = 'USD',
  className,
  style,
  showOriginalHint = false,
}: CurrencyDisplayProps) {
  const targetCurrency = useUiStore((state) => state.userProfile?.currency || 'USD');
  const numericAmount = parseAmount(amount);

  const converted = convertCurrency(numericAmount, originalCurrency, targetCurrency);
  const formattedDisplay = formatCurrency(converted, targetCurrency);
  const formattedOriginal = formatCurrency(numericAmount, originalCurrency);

  const isDifferentCurrency =
    originalCurrency.toUpperCase() !== targetCurrency.toUpperCase();

  if (showOriginalHint && isDifferentCurrency) {
    return (
      <span className={className} style={{ display: 'inline-flex', flexDirection: 'column', ...style }}>
        <span>{formattedDisplay}</span>
        <span
          style={{
            fontSize: '11px',
            color: 'var(--invox-color-text-secondary, #94A3B8)',
            fontWeight: 400,
            marginTop: '2px',
          }}
        >
          ≈ {formattedOriginal} {originalCurrency.toUpperCase()}
        </span>
      </span>
    );
  }

  return (
    <span className={className} style={style}>
      {formattedDisplay}
    </span>
  );
}
