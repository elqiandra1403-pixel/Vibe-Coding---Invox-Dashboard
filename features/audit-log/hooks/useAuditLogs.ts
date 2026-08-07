"use client";
// Phase 2: useQuery → GET /api/audit-logs
import { AuditLogFilters } from "@/features/audit-log/types";
export function useAuditLogs(_filters?: AuditLogFilters) {
  return { data: [], isLoading: true, total: 0 };
}
