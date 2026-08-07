import { NextRequest, NextResponse } from "next/server";

/**
 * Root middleware — session check + role enforcement.
 * Layer 1 of 3 for RBAC (Middleware → API Route → Postgres RLS).
 *
 * TODO (Phase 2): Implement full session validation using lib/auth/middleware.ts
 */
export async function middleware(request: NextRequest) {
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
