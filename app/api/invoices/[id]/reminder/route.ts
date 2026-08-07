import { NextRequest, NextResponse } from "next/server";
// POST /api/invoices/:id/reminder — send payment reminder email
export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  return NextResponse.json({ message: "Not implemented" }, { status: 501 });
}
