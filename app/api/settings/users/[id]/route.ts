import { NextRequest, NextResponse } from "next/server";
// PATCH /api/settings/users/:id — edit role/status (deactivate, change role)
// Access: Admin only — blocks deactivating last Admin
export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  return NextResponse.json({ message: "Not implemented" }, { status: 501 });
}
