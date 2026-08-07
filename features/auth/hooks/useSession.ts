"use client";
// Phase 2: Return current session from authStore / Supabase Auth
export function useSession() {
  return { session: null, loading: true };
}
