import { NextRequest, NextResponse } from "next/server";
import { setSessionCookie } from "@/src/lib/server/session-cookie";

export async function POST(req: NextRequest) {
  const base = process.env.USER_SERVICE_URL || "http://localhost:8081";

  try {
    const body = await req.json();
    const upstream = await fetch(`${base}/api/v1/users/authenticate`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(body),
      cache: "no-store",
      signal: AbortSignal.timeout(10000),
    });

    const data = await upstream.json().catch(() => ({}));

    if (!upstream.ok)
      return NextResponse.json(
        { message: data.message || "Could not sign in. Please try again." },
        { status: upstream.status },
      );

    const response = NextResponse.json({ user: data.user });

    setSessionCookie(
      response,
      data.user,
      data.accessToken,
      Number(data.expiresIn),
    );
    return response;
  } catch {
    return NextResponse.json(
      { message: "Could not connect to the account service." },
      { status: 502 },
    );
  }
}
