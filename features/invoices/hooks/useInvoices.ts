"use client";
// Phase 2: useQuery → GET /api/invoices with filters
import { InvoiceFilters } from "@/features/invoices/types";
export function useInvoices(_filters?: InvoiceFilters) {
  return { data: [], isLoading: true, error: null };
}
