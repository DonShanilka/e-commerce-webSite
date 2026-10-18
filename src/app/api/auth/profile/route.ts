import { NextResponse } from "next/server";
import { getSession } from "@/src/lib/server/auth";

export async function GET() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json(
      { message: "Sign in to view your profile." },
      { status: 401 },
    );
  }

  const base = process.env.USER_SERVICE_URL || "http://localhost:8081";

  try {
    const response = await fetch(
      `${base}/api/v1/users/${encodeURIComponent(session.id)}`,
      {
        headers: { authorization: `Bearer ${session.token}` },
        cache: "no-store",
        signal: AbortSignal.timeout(8000),
      },
    );
    const body = await response.text();

    return new NextResponse(body, {
      status: response.status,
      headers: {
        "content-type":
          response.headers.get("content-type") || "application/json",
        "cache-control": "no-store",
      },
    });
  } catch {
    return NextResponse.json(
      { message: "Account details are temporarily unavailable." },
      { status: 502 },
    );
  }
}
