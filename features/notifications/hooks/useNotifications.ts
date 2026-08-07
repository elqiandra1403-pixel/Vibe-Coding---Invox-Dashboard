"use client";
// Phase 2: useQuery → GET /api/notifications (capped at 50 per user)
export function useNotifications() {
  return { data: [], isLoading: true };
}
export function useUnreadCount() {
  return { count: 0 };
}
