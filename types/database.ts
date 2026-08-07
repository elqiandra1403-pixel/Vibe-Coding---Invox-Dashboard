// Auto-generated Supabase DB types
// Phase 2: Run `npx supabase gen types typescript --project-id YOUR_PROJECT_ID > types/database.ts`
// This file should NEVER be edited manually — regenerate from Supabase CLI after migrations

export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export interface Database {
  public: {
    Tables: {
      // Phase 2: Generated from Supabase schema
      invoices: { Row: Record<string, unknown>; Insert: Record<string, unknown>; Update: Record<string, unknown> };
      customers: { Row: Record<string, unknown>; Insert: Record<string, unknown>; Update: Record<string, unknown> };
      payments: { Row: Record<string, unknown>; Insert: Record<string, unknown>; Update: Record<string, unknown> };
      audit_logs: { Row: Record<string, unknown>; Insert: Record<string, unknown>; Update: Record<string, unknown> };
      notifications: { Row: Record<string, unknown>; Insert: Record<string, unknown>; Update: Record<string, unknown> };
      organizations: { Row: Record<string, unknown>; Insert: Record<string, unknown>; Update: Record<string, unknown> };
      subscriptions: { Row: Record<string, unknown>; Insert: Record<string, unknown>; Update: Record<string, unknown> };
    };
  };
}
