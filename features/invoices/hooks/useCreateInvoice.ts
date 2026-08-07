"use client";
// Phase 2: useMutation → POST /api/invoices
export function useCreateInvoice() {
  return { mutate: (_data: unknown) => {}, isLoading: false };
}
