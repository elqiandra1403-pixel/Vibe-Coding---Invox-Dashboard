import { NextRequest, NextResponse } from "next/server";
import { runOverdueDetection } from "@/lib/cron/overdueDetection";

// POST /api/cron/overdue-detection — called by Vercel Cron
// Secured by CRON_SECRET header validation
export async function POST(request: NextRequest) {
  const secret = request.headers.get("x-cron-secret");
  if (secret !== process.env.CRON_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  await runOverdueDetection();
  return NextResponse.json({ success: true });
}
