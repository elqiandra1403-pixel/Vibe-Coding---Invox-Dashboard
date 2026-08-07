import { NextRequest, NextResponse } from "next/server";
// POST /api/customers/:id/invite — send portal invite → create pending Client user
export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  return NextResponse.json({ message: "Not implemented" }, { status: 501 });
}
