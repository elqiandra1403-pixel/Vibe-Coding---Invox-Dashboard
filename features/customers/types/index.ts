export interface Customer {
  id: string;
  org_id: string;
  company_name: string;
  billing_email: string;
  phone?: string;
  country?: string;
  address?: string;
  portal_user_id?: string; // linked Client-role user
  total_spend: number;     // derived from invoices
  last_payment_date?: string;
  is_archived: boolean;
  created_at: string;
}

export interface CreateCustomerInput {
  company_name: string;
  billing_email: string;
  phone?: string;
  country?: string;
  address?: string;
}
