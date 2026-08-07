import { NextRequest, NextResponse } from "next/server";
// GET /api/analytics/invoice-volume
// Access: Admin, Finance only
export async function GET(request: NextRequest) {
  return NextResponse.json({ message: "Not implemented" }, { status: 501 });
}
