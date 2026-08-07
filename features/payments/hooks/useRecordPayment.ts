"use client";
// Phase 2: useMutation → POST /api/payments
export function useRecordPayment() {
  return { mutate: (_data: unknown) => {}, isLoading: false };
}
