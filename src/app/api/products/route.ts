import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/src/lib/server/auth";

export async function GET(req: NextRequest) {

  const base = process.env.PRODUCT_SERVICE_URL || "http://localhost:8082";
  const params = new URLSearchParams(req.nextUrl.searchParams);

  if (!params.has("page")) params.set("page", "0");
  if (!params.has("size")) params.set("size", "24");
  
  try {
    const session = await getSession();
    const r = await fetch(`${base}/api/v1/products?${params}`, {
      headers: session
        ? { Authorization: `Bearer ${session.token}` }
        : undefined,
      cache: "no-store",
      signal: AbortSignal.timeout(8000),
    });
    return new NextResponse(await r.text(), {
      status: r.status,
      headers: {
        "content-type": r.headers.get("content-type") || "application/json",
      },
    });
  } catch {
    return NextResponse.json(
      { message: "Product service is temporarily unavailable." },
      { status: 502 },
    );
  }
}
