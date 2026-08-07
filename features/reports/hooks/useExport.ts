"use client";
// Phase 2: trigger GET /api/reports/export or GET /api/invoices/:id/pdf
export function useExport() {
  return { exportCSV: (_options: unknown) => {}, isExporting: false };
}
