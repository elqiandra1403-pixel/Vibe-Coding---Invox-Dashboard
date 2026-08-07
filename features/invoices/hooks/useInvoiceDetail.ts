"use client";
// Phase 2: useQuery → GET /api/invoices/:id
export function useInvoiceDetail(_id: string) {
  return { data: null, isLoading: true, error: null };
}
