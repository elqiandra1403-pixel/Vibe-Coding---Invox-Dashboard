import { NextRequest, NextResponse } from "next/server";
// GET   /api/settings/organization — get org profile
// PATCH /api/settings/organization — update org name, logo, currency, invoice prefix
// Access: Admin only
export async function GET(request: NextRequest) {
  return NextResponse.json({ message: "Not implemented" }, { status: 501 });
}
export async function PATCH(request: NextRequest) {
  return NextResponse.json({ message: "Not implemented" }, { status: 501 });
}
