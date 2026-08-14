import { TaxRateRow } from '@/types/database';

export class TaxRateService {
  private static taxRates: TaxRateRow[] = [
    {
      id: 'tax-1',
      user_id: 'user-demo',
      name: 'PPN 11%',
      rate: 11.00,
      description: 'Standard Indonesian Value Added Tax',
      is_active: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: 'tax-2',
      user_id: 'user-demo',
      name: 'US Sales Tax 8.25%',
      rate: 8.25,
      description: 'Standard Sales Tax',
      is_active: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }
  ];

  static async getTaxRates(userId: string): Promise<TaxRateRow[]> {
    return this.taxRates.filter(t => t.user_id === userId && t.is_active);
  }

  static async createTaxRate(userId: string, data: Omit<TaxRateRow, 'id' | 'user_id' | 'is_active' | 'created_at' | 'updated_at'>): Promise<TaxRateRow> {
    const newTaxRate: TaxRateRow = {
      id: `tax-${Date.now()}`,
      user_id: userId,
      ...data,
      is_active: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    this.taxRates.push(newTaxRate);
    return newTaxRate;
  }
}
