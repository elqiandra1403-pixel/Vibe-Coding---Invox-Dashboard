"use client";
// Phase 2: useQuery → GET /api/customers/:id
export function useCustomerDetail(_id: string) {
  return { data: null, isLoading: true, error: null };
}
