"use client";
// Phase 2: useQuery → GET /api/payments
export function usePayments() {
  return { data: [], isLoading: true, error: null };
}
