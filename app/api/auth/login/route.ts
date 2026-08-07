import { NextRequest, NextResponse } from "next/server";
// POST /api/auth/login — email/password authentication
// Phase 2: Implement with lib/auth/session.ts + Supabase Auth
export async function POST(request: NextRequest) {
  return NextResponse.json({ message: "Not implemented" }, { status: 501 });
}
