import { CurrencyRow } from '@/types/database';

export const SUPPORTED_CURRENCIES: CurrencyRow[] = [
  { id: 'curr-usd', code: 'USD', name: 'US Dollar', symbol: '$', decimal_places: 2, is_active: true, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
  { id: 'curr-idr', code: 'IDR', name: 'Indonesian Rupiah', symbol: 'Rp', decimal_places: 0, is_active: true, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
  { id: 'curr-eur', code: 'EUR', name: 'Euro', symbol: '€', decimal_places: 2, is_active: true, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
  { id: 'curr-gbp', code: 'GBP', name: 'British Pound', symbol: '£', decimal_places: 2, is_active: true, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
];

export class CurrencyService {
  private static currencies: CurrencyRow[] = [...SUPPORTED_CURRENCIES];

  static async getAllCurrencies(): Promise<CurrencyRow[]> {
    return this.currencies.filter(c => c.is_active);
  }

  static async getCurrencyByCode(code: string): Promise<CurrencyRow | null> {
    return this.currencies.find(c => c.code === code.toUpperCase()) || null;
  }

  static async getCurrencyById(id: string): Promise<CurrencyRow | null> {
    return this.currencies.find(c => c.id === id) || null;
  }

  static async addCurrency(currency: Omit<CurrencyRow, 'id' | 'created_at' | 'updated_at'>): Promise<CurrencyRow> {
    const existing = await this.getCurrencyByCode(currency.code);
    if (existing) {
      throw new Error(`Currency code ${currency.code} already exists`);
    }

    const newCurrency: CurrencyRow = {
      id: `curr-${currency.code.toLowerCase()}`,
      ...currency,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    this.currencies.push(newCurrency);
    return newCurrency;
  }
}
