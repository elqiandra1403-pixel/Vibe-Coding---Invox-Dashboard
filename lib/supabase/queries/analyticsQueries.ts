import { createClient } from "../client";

// Analytics aggregate query builders (read-only, org-scoped)
export const analyticsQueries = {
  overview: async () => {
    const supabase = createClient();
    if (!supabase) return null;

    const { data, error } = await supabase
      .from('invoices')
      .select('amount, status');

    if (error) {
      console.error('Error fetching analytics overview:', error);
      return null;
    }

    return data;
  },
  revenueSeries: async (_months: number) => [],
  volumeSeries: async (_months: number) => [],
  successRate: async (_days: number) => null,
};
