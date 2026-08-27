"use client";

import { useAuthStore } from "@/stores/authStore";

export function useSession() {
  const user = useAuthStore((s) => s.user);
  const isLoading = useAuthStore((s) => s.isLoading);

  return {
    user,
    session: user ? { user, access_token: "firebase-session" } : null,
    loading: isLoading,
  };
}

