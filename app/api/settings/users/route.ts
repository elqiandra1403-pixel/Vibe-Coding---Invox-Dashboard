import { NextRequest, NextResponse } from "next/server";
// GET  /api/settings/users — list users
// POST /api/settings/users — invite Staff Finance user
// Access: Admin only
export async function GET(request: NextRequest) {
  return NextResponse.json({ message: "Not implemented" }, { status: 501 });
}
export async function POST(request: NextRequest) {
  return NextResponse.json({ message: "Not implemented" }, { status: 501 });
}
