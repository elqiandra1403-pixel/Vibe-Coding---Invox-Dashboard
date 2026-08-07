"use client";
// Phase 2: useQuery → GET /api/customers
export function useCustomers() {
  return { data: [], isLoading: true, error: null };
}
