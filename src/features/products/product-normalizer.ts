import type { Product } from "@/src/types";

type ProductRecord = Record<string, unknown>;

function productItems(payload: unknown): unknown[] {
  if (Array.isArray(payload)) return payload;
  if (!payload || typeof payload !== "object") return [];

  const data = payload as ProductRecord;
  for (const key of ["content", "products", "items", "data", "result"]) {
    if (Array.isArray(data[key])) return data[key] as unknown[];
  }

  return [];
}

export function normalizeProducts(payload: unknown): Product[] {
  const products: Product[] = [];
  const seenIds = new Set<number>();

  for (const value of productItems(payload)) {
    if (!value || typeof value !== "object") continue;

    const item = value as ProductRecord;
    const id = Number(item.id ?? item.productId);
    const name = String(item.name ?? item.productName ?? "").trim();

    if (!Number.isSafeInteger(id) || id < 1 || !name || seenIds.has(id))
      continue;
    seenIds.add(id);

    const price = Number(item.price);
    const quantity = Number(item.quantity ?? item.stock);

    products.push({
      id,
      name,
      description:
        typeof item.description === "string" ? item.description : undefined,
      price: Number.isFinite(price) ? price : 0,
      quantity: Number.isFinite(quantity) ? quantity : undefined,
      category: typeof item.category === "string" ? item.category : undefined,
      brand: typeof item.brand === "string" ? item.brand : undefined,
      image: typeof item.image === "string" ? item.image : undefined,
    });
  }

  return products;
}
