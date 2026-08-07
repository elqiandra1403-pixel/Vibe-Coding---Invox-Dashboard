export interface OrgSettings {
  id: string;
  name: string;
  logo_url?: string;
  currency: string; // ISO 4217
  invoice_prefix: string;
  created_at: string;
}

export interface UserRecord {
  id: string;
  email: string;
  full_name?: string;
  role: "admin" | "finance" | "client";
  is_active: boolean;
  customer_id?: string;
  invited_at?: string;
  last_sign_in?: string;
}
