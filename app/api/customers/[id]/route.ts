import { NextRequest, NextResponse } from "next/server";
// GET    /api/customers/:id — customer detail + invoice history
// PATCH  /api/customers/:id — edit customer
// DELETE /api/customers/:id — delete (blocked if invoices exist)
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  return NextResponse.json({ message: "Not implemented" }, { status: 501 });
}
export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  return NextResponse.json({ message: "Not implemented" }, { status: 501 });
}
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  return NextResponse.json({ message: "Not implemented" }, { status: 501 });
}
