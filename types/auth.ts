// Auth-related global types
export type Role = "admin" | "finance" | "client";

export interface UserProfile {
  id: string;
  email: string;
  full_name?: string;
  avatar_url?: string;
  role: Role;
  org_id: string;
  customer_id?: string; // Client-role only
  is_active: boolean;
}
