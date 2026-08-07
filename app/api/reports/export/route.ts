import { NextRequest, NextResponse } from "next/server";
// GET /api/reports/export — CSV export (filters as query params)
// Up to 5,000 rows sync; >5,000 queued and emailed
export async function GET(request: NextRequest) {
  return NextResponse.json({ message: "Not implemented" }, { status: 501 });
}
