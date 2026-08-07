import { NextRequest, NextResponse } from "next/server";
// GET /api/invoices/:id/payments — payment history for this invoice
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  return NextResponse.json({ message: "Not implemented" }, { status: 501 });
}
