import { NextRequest, NextResponse } from "next/server";
import { getSession, isAdmin } from "@/src/lib/server/auth";

type Context = { params: Promise<{ resource: string }> };

const services: Record<string, [string, string]> = {
  products: ["PRODUCT_SERVICE_URL", "http://localhost:8082"],
  orders: ["ORDER_SERVICE_URL", "http://localhost:8085"],
  users: ["USER_SERVICE_URL", "http://localhost:8081"],
  inventory: ["INVENTORY_SERVICE_URL", "http://localhost:8083"],
};

const statuses = new Set([
  "PENDING",
  "CONFIRMED",
  "PROCESSING",
  "COMPLETED",
  "CANCELLED",
]);

async function authorize() {
  const session = await getSession();
  if (!isAdmin(session))
    return {
      response: NextResponse.json(
        { message: "Administrator access is required." },
        { status: 403 },
      ),
    };
  return { session };
}

function serviceUrl(resource: string) {
  const service = services[resource];
  if (!service) return null;
  return process.env[service[0]] || service[1];
}

async function relay(url: string, init: RequestInit) {
  try {
    const upstream = await fetch(url, {
      ...init,
      cache: "no-store",
      signal: AbortSignal.timeout(10000),
    });
    return new NextResponse(await upstream.text(), {
      status: upstream.status,
      headers: {
        "content-type":
          upstream.headers.get("content-type") || "application/json",
      },
    });
  } catch {
    return NextResponse.json(
      { message: "Could not connect to the service." },
      { status: 502 },
    );
  }
}

export async function GET(_request: NextRequest, { params }: Context) {
  const { session, response } = await authorize();
  if (response) return response;

  const { resource } = await params;
  const base = serviceUrl(resource);

  if (!base)
    return NextResponse.json(
      { message: "This data is not available." },
      { status: 404 },
    );

  const paths: Record<string, string> = {
    products: "/api/v1/products?page=0&size=100",
    orders: "/api/v1/orders",
    users: "/api/v1/users",
    inventory: "/api/v1/inventory",
  };

  const headers: Record<string, string> = {
    Authorization: `Bearer ${session!.token}`,
  };

  if (resource === "orders") {
    const key = process.env.AI_INTERNAL_API_KEY;
    if (!key)
      return NextResponse.json(
        { message: "Order service is not configured." },
        { status: 503 },
      );
    headers["X-AI-Internal-Key"] = key;
  }
  return relay(base + paths[resource], { headers });
}

export async function POST(request: NextRequest, { params }: Context) {
  const { session, response } = await authorize();
  if (response) return response;

  const { resource } = await params;

  if (resource !== "products")
    return NextResponse.json(
      { message: "This action is not allowed." },
      { status: 405 },
    );

  const form = await request.formData();

  for (const key of ["name", "price", "quantity"]) {
    const value = form.get(key);
    if (typeof value !== "string" || !value.trim())
      return NextResponse.json(
        { message: "Product name, price, and stock are required." },
        { status: 400 },
      );
  }

  if (
    Number(form.get("price")) <= 0 ||
    !Number.isSafeInteger(Number(form.get("quantity"))) ||
    Number(form.get("quantity")) < 0
  ) {
    return NextResponse.json(
      { message: "Enter a valid price and stock quantity." },
      { status: 400 },
    );
  }
  return relay(`${serviceUrl(resource)}/api/v1/products`, {
    method: "POST",
    headers: { Authorization: `Bearer ${session!.token}` },
    body: form,
  });
}

export async function PUT(request: NextRequest, { params }: Context) {
  const { session, response } = await authorize();
  if (response) return response;

  const { resource } = await params;

  if (resource !== "products")
    return NextResponse.json(
      { message: "This action is not allowed." },
      { status: 405 },
    );

  const form = await request.formData();
  const id = Number(form.get("id"));

  if (!Number.isSafeInteger(id) || id < 1)
    return NextResponse.json(
      { message: "Invalid product ID." },
      { status: 400 },
    );

  if (form.has("price") && Number(form.get("price")) <= 0)
    return NextResponse.json(
      { message: "Enter a valid price." },
      { status: 400 },
    );

  if (
    form.has("quantity") &&
    (!Number.isSafeInteger(Number(form.get("quantity"))) ||
      Number(form.get("quantity")) < 0)
  )
    return NextResponse.json(
      { message: "Enter a valid stock quantity." },
      { status: 400 },
    );

  return relay(`${serviceUrl(resource)}/api/v1/products`, {
    method: "PUT",
    headers: { Authorization: `Bearer ${session!.token}` },
    body: form,
  });
}

export async function PATCH(request: NextRequest, { params }: Context) {
  const { response } = await authorize();
  if (response) return response;

  const { resource } = await params;

  if (resource !== "orders")
    return NextResponse.json(
      { message: "This action is not allowed." },
      { status: 405 },
    );

  const body = (await request.json().catch(() => null)) as {
    id?: number;
    status?: string;
  } | null;

  const id = Number(body?.id);
  const status = String(body?.status || "").toUpperCase();

  if (!Number.isSafeInteger(id) || id < 1 || !statuses.has(status))
    return NextResponse.json(
      { message: "Invalid order ID or status." },
      { status: 400 },
    );

  const key = process.env.AI_INTERNAL_API_KEY;

  if (!key)
    return NextResponse.json(
      { message: "Order service is not configured." },
      { status: 503 },
    );

  const base = serviceUrl(resource)!;
  return relay(
    `${base}/api/v1/orders/${id}/status?status=${encodeURIComponent(status)}`,
    {
      method: "PATCH",
      headers: { "X-AI-Internal-Key": key },
    },
  );
}

export async function DELETE(request: NextRequest, { params }: Context) {
  const { session, response } = await authorize();
  if (response) return response;

  const { resource } = await params;

  if (resource !== "products")
    return NextResponse.json(
      { message: "This action is not allowed." },
      { status: 405 },
    );

  const id = Number(request.nextUrl.searchParams.get("id"));

  if (!Number.isSafeInteger(id) || id < 1)
    return NextResponse.json(
      { message: "Invalid product ID." },
      { status: 400 },
    );
  return relay(`${serviceUrl(resource)}/api/v1/products/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${session!.token}` },
  });
}
