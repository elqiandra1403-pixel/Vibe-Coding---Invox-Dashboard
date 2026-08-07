"use client";
// TanStack Query client provider
// Phase 2: Configure with staleTime, retry, error boundary
export function QueryProvider({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
