import { NextRequest, NextResponse } from "next/server";
// POST /api/auth/logout — end Supabase session
export async function POST(request: NextRequest) {
  return NextResponse.json({ message: "Not implemented" }, { status: 501 });
}
