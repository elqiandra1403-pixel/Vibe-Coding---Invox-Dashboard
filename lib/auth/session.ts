import "server-only";
import { UserProfile } from "@/features/auth/types";

// Extract and validate session from request — throws on invalid/missing session
// Phase 2: Implement using Supabase server client + JWT verification
export async function getSession(): Promise<UserProfile | null> {
  return null;
}

export async function requireSession(): Promise<UserProfile> {
  const session = await getSession();
  if (!session) throw new Error("UNAUTHORIZED");
  return session;
}
