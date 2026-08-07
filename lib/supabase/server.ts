import "server-only";
// Server-side Supabase client (uses cookies for session)
// Phase 2: Implement using @supabase/ssr createServerClient with Next.js cookies()
export async function createServerClient() {
  throw new Error("Phase 2: Implement server Supabase client");
}

// Service-role client for privileged operations (cron, audit log writes)
export function createServiceClient() {
  throw new Error("Phase 2: Implement service role client");
}
