// Auth types
export type Role = "admin" | "finance" | "client";

export interface UserProfile {
  id: string;
  email: string;
  role: Role;
  org_id: string;
  customer_id?: string; // Client-role only
  full_name?: string;
  avatar_url?: string;
}

export interface Session {
  user: UserProfile;
  access_token: string;
}
