import { NextRequest, NextResponse } from "next/server";
// GET  /api/invoices — list invoices (filter: customer, status, date, search)
// POST /api/invoices — create invoice (Draft)
// Access: Admin, Finance (GET also: Client scoped via RLS)
export async function GET(request: NextRequest) {
  return NextResponse.json({ message: "Not implemented" }, { status: 501 });
}
export async function POST(request: NextRequest) {
  return NextResponse.json({ message: "Not implemented" }, { status: 501 });
}
