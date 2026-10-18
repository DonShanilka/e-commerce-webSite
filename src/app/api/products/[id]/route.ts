import { NextResponse } from "next/server";

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function GET(_request: Request, { params }: RouteContext) {
  const { id } = await params;

  if (!/^\d+$/.test(id) || Number(id) < 1) {
    return NextResponse.json(
      { message: "A valid product ID is required." },
      { status: 400 },
    );
  }

  const base = process.env.PRODUCT_SERVICE_URL || "http://localhost:8082";

  try {
    const response = await fetch(`${base}/api/v1/products/${id}`, {
      cache: "no-store",
      signal: AbortSignal.timeout(8000),
    });

    return new NextResponse(await response.text(), {
      status: response.status,
      headers: {
        "content-type":
          response.headers.get("content-type") || "application/json",
      },
    });
  } catch {
    return NextResponse.json(
      { message: "Product service is temporarily unavailable." },
      { status: 502 },
    );
  }
}
