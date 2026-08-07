import "server-only";
// Vercel Cron handler — daily overdue detection job
// PRD F7: Runs once daily; marks Pending invoices with due_date < today as Overdue
// Endpoint: POST /api/cron/overdue-detection (protected by CRON_SECRET)
// Phase 2: Implement idempotent query + status update + notification trigger
export async function runOverdueDetection() {
  console.log("[Cron] Overdue detection: Phase 2 not implemented");
}
