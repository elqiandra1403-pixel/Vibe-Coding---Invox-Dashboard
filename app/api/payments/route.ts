import { NextRequest, NextResponse } from "next/server";
// GET  /api/payments — list all payments
// POST /api/payments — record payment against an invoice
export async function GET(request: NextRequest) {
  return NextResponse.json({ message: "Not implemented" }, { status: 501 });
}
export async function POST(request: NextRequest) {
  return NextResponse.json({ message: "Not implemented" }, { status: 501 });
}
