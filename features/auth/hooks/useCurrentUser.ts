"use client";

import { useAuthStore } from "@/stores/authStore";

export function useCurrentUser() {
  const user = useAuthStore((s) => s.user);
  const isLoading = useAuthStore((s) => s.isLoading);

  return { user, loading: isLoading };
}

