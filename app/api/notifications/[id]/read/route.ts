import { NextRequest, NextResponse } from "next/server";
// PATCH /api/notifications/:id/read — mark notification as read
export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  return NextResponse.json({ message: "Not implemented" }, { status: 501 });
}
