import { NextRequest, NextResponse } from "next/server";
// POST /api/auth/oauth/google — Google OAuth exchange
export async function POST(request: NextRequest) {
  return NextResponse.json({ message: "Not implemented" }, { status: 501 });
}
