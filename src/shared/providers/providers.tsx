"use client";

import { Provider } from "react-redux";
import { useEffect, useState } from "react";
import { makeStore } from "@/src/store/store";
import { restore, type CartLine } from "@/src/features/cart";

const CART_STORAGE_KEY = "kade-cart";

function readCart(): CartLine[] {
  try {
    const stored = window.localStorage.getItem(CART_STORAGE_KEY);
    if (!stored) return [];
    const parsed: unknown = JSON.parse(stored);
    if (!Array.isArray(parsed)) return [];

    return parsed.filter((line): line is CartLine => {
      if (!line || typeof line !== "object" || !("product" in line))
        return false;
      const product = line.product;
      return Boolean(
        product &&
        typeof product === "object" &&
        "id" in product &&
        Number.isFinite(product.id) &&
        "name" in product &&
        typeof product.name === "string" &&
        "price" in product &&
        Number.isFinite(product.price) &&
        Number.isInteger(line.quantity) &&
        line.quantity > 0,
      );
    });
  } catch {
    return [];
  }
}

function storedCart(lines: CartLine[]) {
  return lines.map(({ product, quantity }) => ({
    product: {
      ...product,
      image:
        product.image &&
        /^[A-Za-z0-9+/]+={0,2}$/.test(product.image) &&
        product.image.length > 200_000
          ? undefined
          : product.image,
    },
    quantity,
  }));
}

export function Providers({ children }: { children: React.ReactNode }) {
  const [store] = useState(makeStore);

  useEffect(() => {
    store.dispatch(restore(readCart()));
    return store.subscribe(() => {
      try {
        const lines = store.getState().cart.lines;
        window.localStorage.setItem(
          CART_STORAGE_KEY,
          JSON.stringify(storedCart(lines)),
        );
      } catch {
        // Keep shopping available when browser storage is disabled or full.
      }
    });
  }, [store]);

  return <Provider store={store}>{children}</Provider>;
}
