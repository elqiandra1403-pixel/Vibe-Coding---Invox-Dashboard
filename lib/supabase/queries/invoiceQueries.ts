import { createClient } from "../client";

// RLS-aware invoice query builders
export const invoiceQueries = {
  list: async (_filters?: Record<string, unknown>) => {
    const supabase = createClient();
    if (!supabase) return null;

    const { data, error } = await supabase
      .from('invoices')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(10);

    if (error) {
      console.error('Error fetching invoices:', error);
      return null;
    }

    return data;
  },
  findById: async (_id: string) => null,
  create: async (_data: Record<string, unknown>) => null,
  update: async (_id: string, _data: Record<string, unknown>) => null,
  delete: async (_id: string) => null,
};
