import { NextRequest, NextResponse } from "next/server";
// POST /api/invoices/:id/send — send invoice email → status: Pending
export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  return NextResponse.json({ message: "Not implemented" }, { status: 501 });
}
