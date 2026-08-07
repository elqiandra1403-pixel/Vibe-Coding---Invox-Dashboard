// Supabase Edge Function — Overdue Detection
// Triggered by Vercel Cron → POST /api/cron/overdue-detection
// Phase 2: Query invoices with status=pending, due_date < today, balance_due > 0
// Update status to 'overdue' and create notifications for Admin/Finance users
import { serve } from "https://deno.land/std@0.177.0/http/server.ts";

serve(async (req) => {
  // Phase 2: Implement overdue detection logic
  return new Response(JSON.stringify({ status: "not implemented" }), {
    headers: { "Content-Type": "application/json" },
  });
});
