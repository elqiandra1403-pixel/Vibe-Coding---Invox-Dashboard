import { CustomerRow } from '@/types/database';

export class CustomerService {
  private static customers: CustomerRow[] = [
    {
      id: 'cust-1',
      user_id: 'user-demo',
      name: 'Northwind Studio',
      email: 'billing@northwind.studio',
      phone: '+1 555-0199',
      company_name: 'Northwind Studio LLC',
      address: '100 Market St',
      city: 'San Francisco',
      state: 'CA',
      country: 'USA',
      postal_code: '94105',
      tax_id: 'US-987654321',
      notes: 'Key creative agency customer',
      is_archived: false,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: 'cust-2',
      user_id: 'user-demo',
      name: 'Sable & Co.',
      email: 'finance@sableco.com',
      phone: '+1 555-0188',
      company_name: 'Sable & Co Inc',
      address: '250 Broadway',
      city: 'New York',
      state: 'NY',
      country: 'USA',
      postal_code: '10007',
      tax_id: 'US-123456789',
      notes: 'Enterprise account',
      is_archived: false,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }
  ];

  static async getCustomers(userId: string): Promise<CustomerRow[]> {
    return this.customers.filter(c => c.user_id === userId && !c.is_archived);
  }

  static async getCustomerById(userId: string, id: string): Promise<CustomerRow | null> {
    const customer = this.customers.find(c => c.id === id && c.user_id === userId);
    return customer || null;
  }

  static async createCustomer(userId: string, data: Omit<CustomerRow, 'id' | 'user_id' | 'is_archived' | 'created_at' | 'updated_at'>): Promise<CustomerRow> {
    const newCustomer: CustomerRow = {
      id: `cust-${Date.now()}`,
      user_id: userId,
      ...data,
      is_archived: false,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    this.customers.push(newCustomer);
    return newCustomer;
  }

  static async updateCustomer(userId: string, id: string, updates: Partial<CustomerRow>): Promise<CustomerRow | null> {
    const index = this.customers.findIndex(c => c.id === id && c.user_id === userId);
    if (index === -1) return null;

    const updated: CustomerRow = {
      ...this.customers[index],
      ...updates,
      updated_at: new Date().toISOString(),
    };
    this.customers[index] = updated;
    return updated;
  }

  static async archiveCustomer(userId: string, id: string): Promise<boolean> {
    const customer = await this.getCustomerById(userId, id);
    if (!customer) return false;
    customer.is_archived = true;
    customer.updated_at = new Date().toISOString();
    return true;
  }
}
