import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/src/lib/server/auth";
import { clearSessionCookies } from "@/src/lib/server/session-cookie";

export async function POST(req: NextRequest) {
  const session = await getSession();

  if (!session) {
    const response = NextResponse.json(
      { message: "Your session expired. Sign in again to place your order." },
      { status: 401 },
    );
    clearSessionCookies(response);
    return response;
  }

  try {
    const body = await req.json();
    if (
      !Array.isArray(body.items) ||
      body.items.length < 1 ||
      body.items.length > 30
    )
      return NextResponse.json(
        { message: "Check the items in your order." },
        { status: 400 },
      );

    const productBase =
      process.env.PRODUCT_SERVICE_URL || "http://localhost:8082";
    const items = [];

    for (const line of body.items) {
      const id = Number(line.productId),
        quantity = Number(line.quantity);
      if (
        !Number.isSafeInteger(id) ||
        id < 1 ||
        !Number.isSafeInteger(quantity) ||
        quantity < 1 ||
        quantity > 99
      )
        return NextResponse.json(
          { message: "Invalid quantity in the order." },
          { status: 400 },
        );

      const productRes = await fetch(`${productBase}/api/v1/products/${id}`, {
        cache: "no-store",
        signal: AbortSignal.timeout(7000),
      });

      if (!productRes.ok)
        return NextResponse.json(
          { message: "One of the products is no longer available." },
          { status: 409 },
        );

      const p = await productRes.json();
      items.push({
        productId: id,
        quantity,
        productName: p.name,
        price: p.price,
      });
    }

    const expiry = String(Math.floor(Date.now() / 1000) + 60);
    const secret = process.env.AI_INTERNAL_API_KEY;

    if (!secret)
      return NextResponse.json(
        { message: "Order service is not configured." },
        { status: 503 },
      );

    const { createHmac } = await import("node:crypto");
    const assertion = createHmac("sha256", secret)
      .update(`${session.id}\n${expiry}`)
      .digest("base64url");

    const base = process.env.ORDER_SERVICE_URL || "http://localhost:8085";
    const response = await fetch(`${base}/api/v1/orders`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "X-AI-Internal-Key": secret,
        "X-Authenticated-User": session.id,
        "X-User-Assertion-Expiry": expiry,
        "X-User-Assertion": assertion,
      },
      body: JSON.stringify({ userId: Number(session.id), items }),
      cache: "no-store",
      signal: AbortSignal.timeout(12000),
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
      { message: "Could not place the order." },
      { status: 502 },
    );
  }
}
