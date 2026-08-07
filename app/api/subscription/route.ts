import { NextRequest, NextResponse } from "next/server";
// GET /api/subscription — get plan tier, seats used/limit, billing status
// Access: Admin only
export async function GET(request: NextRequest) {
  return NextResponse.json({ message: "Not implemented" }, { status: 501 });
}
