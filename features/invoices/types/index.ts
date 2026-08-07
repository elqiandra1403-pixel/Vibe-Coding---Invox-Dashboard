export type InvoiceStatus = "draft" | "pending" | "paid" | "overdue" | "cancelled";

export interface LineItem {
  id: string;
  description: string;
  quantity: number;
  unit_price: number;
  amount: number; // quantity × unit_price
}

export interface Invoice {
  id: string;
  org_id: string;
  invoice_number: string; // INV-{YYYY}-{0001}
  customer_id: string;
  customer_name: string;
  status: InvoiceStatus;
  issue_date: string;
  due_date: string;
  line_items: LineItem[];
  subtotal: number;
  discount: number;
  tax_rate: number;
  tax_amount: number;
  total: number;
  balance_due: number;
  sent_at?: string;
  paid_at?: string;
  created_at: string;
  updated_at: string;
}

export interface InvoiceFilters {
  customer_id?: string;
  status?: InvoiceStatus;
  date_from?: string;
  date_to?: string;
  search?: string;
  page?: number;
  limit?: number;
}

export interface CreateInvoiceInput {
  customer_id: string;
  issue_date: string;
  due_date: string;
  line_items: Omit<LineItem, "id" | "amount">[];
  discount?: number;
  tax_rate?: number;
  notes?: string;
}
