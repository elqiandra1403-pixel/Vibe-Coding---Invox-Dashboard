// Auto-generated Supabase DB Types & Interfaces

export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export interface UserRow {
  id: string;
  name: string;
  email: string;
  avatar: string | null;
  role: 'admin' | 'finance' | 'client' | 'user';
  default_currency_id: string | null;
  created_at: string;
  updated_at: string;
}

export interface CustomerRow {
  id: string;
  user_id: string;
  name: string;
  email: string;
  phone: string | null;
  company_name: string | null;
  address: string | null;
  city: string | null;
  state: string | null;
  country: string | null;
  postal_code: string | null;
  tax_id: string | null;
  notes: string | null;
  is_archived: boolean;
  created_at: string;
  updated_at: string;
}

export interface CurrencyRow {
  id: string;
  code: string;
  name: string;
  symbol: string;
  decimal_places: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface InvoiceRow {
  id: string;
  user_id: string;
  customer_id: string;
  invoice_number: string;
  currency_id: string;
  issue_date: string;
  due_date: string;
  subtotal: number;
  discount: number;
  tax: number;
  total: number;
  amount_paid: number;
  amount_due: number;
  status: 'draft' | 'sent' | 'pending' | 'paid' | 'overdue' | 'cancelled';
  notes: string | null;
  payment_terms: string | null;
  created_at: string;
  updated_at: string;
}

export interface InvoiceItemRow {
  id: string;
  invoice_id: string;
  product_id: string | null;
  description: string;
  quantity: number;
  unit_price: number;
  discount: number;
  tax: number;
  subtotal: number;
  total: number;
  created_at: string;
  updated_at: string;
}

export interface ProductRow {
  id: string;
  user_id: string;
  name: string;
  description: string | null;
  sku: string | null;
  unit: string;
  default_price: number;
  currency_id: string | null;
  tax_rate: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface PaymentRow {
  id: string;
  invoice_id: string;
  amount: number;
  currency_id: string;
  payment_date: string;
  payment_method: 'bank_transfer' | 'cash' | 'credit_card' | 'debit_card' | 'e_wallet' | 'other';
  reference_number: string | null;
  notes: string | null;
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  created_at: string;
  updated_at: string;
}

export interface TaxRateRow {
  id: string;
  user_id: string;
  name: string;
  rate: number;
  description: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface InvoiceStatusHistoryRow {
  id: string;
  invoice_id: string;
  previous_status: string | null;
  new_status: string;
  changed_by: string | null;
  changed_at: string;
}

export interface AuditLogRow {
  id: string;
  user_id: string;
  action: string;
  entity_type: string;
  entity_id: string;
  metadata: Json | null;
  created_at: string;
}

export interface Database {
  public: {
    Tables: {
      users: { Row: UserRow; Insert: Partial<UserRow>; Update: Partial<UserRow> };
      customers: { Row: CustomerRow; Insert: Partial<CustomerRow>; Update: Partial<CustomerRow> };
      currencies: { Row: CurrencyRow; Insert: Partial<CurrencyRow>; Update: Partial<CurrencyRow> };
      invoices: { Row: InvoiceRow; Insert: Partial<InvoiceRow>; Update: Partial<InvoiceRow> };
      invoice_items: { Row: InvoiceItemRow; Insert: Partial<InvoiceItemRow>; Update: Partial<InvoiceItemRow> };
      products: { Row: ProductRow; Insert: Partial<ProductRow>; Update: Partial<ProductRow> };
      payments: { Row: PaymentRow; Insert: Partial<PaymentRow>; Update: Partial<PaymentRow> };
      tax_rates: { Row: TaxRateRow; Insert: Partial<TaxRateRow>; Update: Partial<TaxRateRow> };
      invoice_status_history: { Row: InvoiceStatusHistoryRow; Insert: Partial<InvoiceStatusHistoryRow>; Update: Partial<InvoiceStatusHistoryRow> };
      audit_logs: { Row: AuditLogRow; Insert: Partial<AuditLogRow>; Update: Partial<AuditLogRow> };
    };
  };
}
