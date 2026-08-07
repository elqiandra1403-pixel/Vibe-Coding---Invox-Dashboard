import { NextRequest, NextResponse } from "next/server";
// GET  /api/customers — list customers
// POST /api/customers — create customer
export async function GET(request: NextRequest) {
  return NextResponse.json({ message: "Not implemented" }, { status: 501 });
}
export async function POST(request: NextRequest) {
  return NextResponse.json({ message: "Not implemented" }, { status: 501 });
}
