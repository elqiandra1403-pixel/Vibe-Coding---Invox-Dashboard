"use client";
// Global toast hook — reads from ToastProvider
// Phase 2: Implement with toast queue from providers/ToastProvider
export function useToast() {
  return {
    toast: (_message: string, _type: "success" | "error" | "info" = "info") => {},
    dismiss: (_id: string) => {},
  };
}
