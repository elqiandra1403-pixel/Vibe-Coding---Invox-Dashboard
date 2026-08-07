import { NextRequest, NextResponse } from "next/server";
// GET /api/audit-logs — paginated, filterable by user/entity/date
// Access: Admin only (read); writes are system-only via DB transactions
export async function GET(request: NextRequest) {
  return NextResponse.json({ message: "Not implemented" }, { status: 501 });
}
