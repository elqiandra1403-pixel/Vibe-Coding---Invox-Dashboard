export type SupportedCurrency = 'USD' | 'EUR' | 'GBP' | 'IDR';

export interface CurrencyConfig {
  code: SupportedCurrency;
  symbol: string;
  name: string;
  locale: string;
  decimals: number;
}

export const CURRENCY_CONFIGS: Record<SupportedCurrency, CurrencyConfig> = {
  USD: { code: 'USD', symbol: '$', name: 'US Dollar', locale: 'en-US', decimals: 2 },
  EUR: { code: 'EUR', symbol: '€', name: 'Euro', locale: 'de-DE', decimals: 2 },
  GBP: { code: 'GBP', symbol: '£', name: 'British Pound', locale: 'en-GB', decimals: 2 },
  IDR: { code: 'IDR', symbol: 'Rp', name: 'Indonesian Rupiah', locale: 'id-ID', decimals: 0 },
};

export const DEFAULT_EXCHANGE_RATES: Record<SupportedCurrency, number> = {
  USD: 1.0,
  EUR: 0.92,
  GBP: 0.79,
  IDR: 16000.0,
};

/**
 * Converts an amount from one currency to another using exchange rates relative to USD base.
 */
export function convertCurrency(
  amount: number,
  fromCurrency: string = 'USD',
  toCurrency: string = 'USD',
  rates: Record<string, number> = DEFAULT_EXCHANGE_RATES
): number {
  if (!amount || isNaN(amount)) return 0;
  
  const from = (fromCurrency || 'USD').toUpperCase();
  const to = (toCurrency || 'USD').toUpperCase();

  if (from === to) return amount;

  const fromRate = rates[from] ?? DEFAULT_EXCHANGE_RATES[from as SupportedCurrency] ?? 1.0;
  const toRate = rates[to] ?? DEFAULT_EXCHANGE_RATES[to as SupportedCurrency] ?? 1.0;

  const amountInUSD = amount / fromRate;
  const converted = amountInUSD * toRate;

  // Round IDR to nearest integer if converting to IDR
  if (to === 'IDR') {
    return Math.round(converted);
  }

  return Number(converted.toFixed(2));
}

/**
 * Formats a monetary amount into its localized currency representation.
 */
export function formatCurrency(amount: number, currency: string = 'USD'): string {
  const code = (currency || 'USD').toUpperCase() as SupportedCurrency;
  const config = CURRENCY_CONFIGS[code] || CURRENCY_CONFIGS.USD;
  const validAmount = isNaN(amount) ? 0 : amount;

  if (code === 'IDR') {
    const formattedNum = new Intl.NumberFormat('id-ID', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(Math.round(validAmount));
    return `Rp${formattedNum}`;
  }

  return new Intl.NumberFormat(config.locale, {
    style: 'currency',
    currency: config.code,
    minimumFractionDigits: config.decimals,
    maximumFractionDigits: config.decimals,
  }).format(validAmount);
}

/**
 * Formats a compact currency representation for chart Y-axes (e.g. $750k, €690k, £592k, Rp12B).
 */
export function formatCompactCurrency(amountInUSD: number, targetCurrency: string = 'USD'): string {
  const code = (targetCurrency || 'USD').toUpperCase() as SupportedCurrency;
  const config = CURRENCY_CONFIGS[code] || CURRENCY_CONFIGS.USD;
  const converted = convertCurrency(amountInUSD, 'USD', code);

  if (converted === 0) return `${config.symbol}0`;

  if (code === 'IDR') {
    if (converted >= 1000000000) {
      const val = (converted / 1000000000).toFixed(1).replace(/\.0$/, '');
      return `Rp${val}M`; // Miliar
    }
    if (converted >= 1000000) {
      const val = (converted / 1000000).toFixed(1).replace(/\.0$/, '');
      return `Rp${val}Jt`; // Juta
    }
    if (converted >= 1000) {
      const val = (converted / 1000).toFixed(1).replace(/\.0$/, '');
      return `Rp${val}rb`;
    }
    return `Rp${Math.round(converted)}`;
  }

  if (converted >= 1000000) {
    const val = (converted / 1000000).toFixed(1).replace(/\.0$/, '');
    return `${config.symbol}${val}M`;
  }
  if (converted >= 1000) {
    const val = (converted / 1000).toFixed(1).replace(/\.0$/, '');
    return `${config.symbol}${val}k`;
  }

  return `${config.symbol}${Math.round(converted)}`;
}

/**
 * Parses numeric value from a currency string (e.g., "$1,200.00" or "Rp19.200.000" -> 1200 / 19200000)
 */
export function parseAmount(value: string | number): number {
  if (typeof value === 'number') return isNaN(value) ? 0 : value;
  if (!value) return 0;

  const str = String(value).trim();
  if (str.includes('Rp') || (str.match(/\.\d{3}/) && !str.includes(','))) {
    const cleanedDots = str.replace(/[^\d-]/g, '');
    return parseFloat(cleanedDots) || 0;
  }

  const cleaned = str.replace(/[^\d.-]/g, '');
  return parseFloat(cleaned) || 0;
}
