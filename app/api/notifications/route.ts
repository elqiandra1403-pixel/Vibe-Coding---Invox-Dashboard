import { NextRequest, NextResponse } from "next/server";
// GET /api/notifications — list (capped at 50 most recent per user)
export async function GET(request: NextRequest) {
  return NextResponse.json({ message: "Not implemented" }, { status: 501 });
}
