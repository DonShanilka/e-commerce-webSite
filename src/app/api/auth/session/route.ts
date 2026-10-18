import { NextResponse } from "next/server";
import { getSession } from "@/src/lib/server/auth";

export async function GET() {
  const s = await getSession();
  return NextResponse.json({
    user: s
      ? { id: s.id, role: s.roles.includes("ADMIN") ? "ADMIN" : "CUSTOMER" }
      : null,
  });
}
