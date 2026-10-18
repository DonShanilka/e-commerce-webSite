import { createHmac } from "node:crypto";
import { NextRequest, NextResponse } from "next/server";
import { getSession, isAdmin } from "@/src/lib/server/auth";

type RouteContext = { params: Promise<{ path: string[] }> };

const aiServiceUrl = (
  process.env.AI_SERVICE_URL || "http://localhost:8087"
).replace(/\/$/, "");
const publicActions = new Set(["chat", "search", "compare", "recommendations"]);

function error(message: string, status: number) {
  return NextResponse.json({ message }, { status });
}

async function relay(path: string, init: RequestInit = {}) {
  try {
    const upstream = await fetch(`${aiServiceUrl}/api/v1/ai/${path}`, {
      ...init,
      cache: "no-store",
      signal: AbortSignal.timeout(20000),
    });
    return new NextResponse(await upstream.text(), {
      status: upstream.status,
      headers: {
        "content-type":
          upstream.headers.get("content-type") || "application/json",
        "cache-control": "no-store",
      },
    });
  } catch {
    return error(
      "The AI service is unavailable right now. Please try again shortly.",
      502,
    );
  }
}

function internalHeaders() {
  const key = process.env.AI_INTERNAL_API_KEY;
  if (!key) return null;
  return { "X-AI-Internal-Key": key };
}

export async function POST(request: NextRequest, { params }: RouteContext) {
  const { path } = await params;
  const action = path.length === 1 ? path[0] : "";

  if (!publicActions.has(action))
    return error("This AI tool is not available.", 404);
  if (Number(request.headers.get("content-length") || 0) > 65536) {
    return error("The request is too large. Please shorten your message.", 413);
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return error("Enter a valid request and try again.", 400);
  }

  return relay(action, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(body),
  });
}

export async function GET(request: NextRequest, { params }: RouteContext) {
  const { path } = await params;
  const [resource, source, identifier] = path;
  const session = await getSession();
  const credentials = internalHeaders();

  if (resource === "recommendations" && source === "me" && path.length === 2) {
    if (!session)
      return error("Sign in to see recommendations based on your orders.", 401);
    if (!credentials)
      return error("Personal recommendations are not configured yet.", 503);

    const userId = Number(session.id);
    if (!Number.isSafeInteger(userId) || userId < 1) {
      return error(
        "Your account could not be verified. Please sign in again.",
        401,
      );
    }

    const expiry = String(Math.floor(Date.now() / 1000) + 60);
    const assertion = createHmac("sha256", credentials["X-AI-Internal-Key"])
      .update(`${userId}\n${expiry}`)
      .digest("base64url");

    const query = new URLSearchParams();
    const limit = request.nextUrl.searchParams.get("limit");
    const budget = request.nextUrl.searchParams.get("budget");

    if (limit) query.set("limit", limit);
    if (budget) query.set("budget", budget);

    const suffix = query.size ? `?${query}` : "";

    return relay(`recommendations/users/${userId}${suffix}`, {
      headers: {
        ...credentials,
        "X-Authenticated-User": String(userId),
        "X-User-Assertion-Expiry": expiry,
        "X-User-Assertion": assertion,
      },
    });
  }

  if (resource === "reviews" && source === "products" && path.length === 3) {
    if (!/^\d+$/.test(identifier || "") || Number(identifier) < 1) {
      return error("Choose a valid product.", 400);
    }
    if (!credentials)
      return error("Review insights are not configured yet.", 503);
    return relay(`reviews/analyze/products/${identifier}`, {
      headers: credentials,
    });
  }

  if (resource === "forecast" && source === "products" && path.length === 3) {
    if (!isAdmin(session))
      return error("Administrator access is required.", 403);
    if (!/^\d+$/.test(identifier || "") || Number(identifier) < 1) {
      return error("Choose a valid product.", 400);
    }
    if (!credentials)
      return error("Sales forecasting is not configured yet.", 503);

    const periodsAhead =
      request.nextUrl.searchParams.get("periodsAhead") || "7";
    return relay(
      `forecast/products/${identifier}?periodsAhead=${encodeURIComponent(periodsAhead)}`,
      {
        headers: credentials,
      },
    );
  }

  return error("This AI resource is not available.", 404);
}
