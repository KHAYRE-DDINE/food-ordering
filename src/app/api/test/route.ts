import { NextResponse } from "next/server";

// Minimal liveness check. Must not expose any configuration or secret metadata.
export async function GET() {
  return NextResponse.json({ ok: true });
}
