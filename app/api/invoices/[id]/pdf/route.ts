import { NextRequest, NextResponse } from "next/server";
// GET /api/invoices/:id/pdf — generate/download branded invoice PDF
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  return NextResponse.json({ message: "Not implemented" }, { status: 501 });
}
