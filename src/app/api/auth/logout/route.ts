import { NextResponse } from "next/server";
import { clearSessionCookies } from "@/src/lib/server/session-cookie";

export async function POST() {
  const r = NextResponse.json({ ok: true });
  clearSessionCookies(r);
  return r;
}
