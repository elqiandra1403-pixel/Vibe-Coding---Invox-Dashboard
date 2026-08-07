"use client";
// Wraps Supabase auth state changes → syncs to authStore
// Phase 2: Subscribe to supabase.auth.onAuthStateChange()
export function AuthProvider({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
