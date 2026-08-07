"use client";
// Phase 2: useQuery → GET /api/analytics/*
export function useRevenueData() {
  return { data: [], isLoading: true };
}
export function useVolumeData() {
  return { data: [], isLoading: true };
}
export function useSuccessRate() {
  return { data: null, isLoading: true };
}
