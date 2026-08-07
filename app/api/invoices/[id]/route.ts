import { NextRequest, NextResponse } from "next/server";
// GET    /api/invoices/:id — invoice detail + line items + payments
// PATCH  /api/invoices/:id — edit (Draft: full; Sent+: status/payment only)
// DELETE /api/invoices/:id — delete Draft with no payments
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  return NextResponse.json({ message: "Not implemented" }, { status: 501 });
}
export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  return NextResponse.json({ message: "Not implemented" }, { status: 501 });
}
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  return NextResponse.json({ message: "Not implemented" }, { status: 501 });
}
