"use client";

import { useEffect, useState } from "react";
import { normalizeProducts } from "./product-normalizer";
import type { Product } from "@/src/types";

export function useProductDetail(productId: string) {
  const [product, setProduct] = useState<Product | null>(null);
  const [related, setRelated] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    async function loadProduct() {
      setLoading(true);
      setError("");
      try {
        const [detailResponse, catalogResponse] = await Promise.all([
          fetch(`/api/products/${productId}`, { cache: "no-store" }),
          fetch("/api/products?page=0&size=100", { cache: "no-store" }),
        ]);
        if (!detailResponse.ok) {
          throw new Error(
            detailResponse.status === 404
              ? "This product could not be found."
              : "We could not load this product. Please try again.",
          );
        }

        const detail = await detailResponse.json();
        const normalized = normalizeProducts([detail])[0];
        if (!normalized)
          throw new Error("The product details are unavailable.");
        normalized.image =
          typeof detail.image === "string" ? detail.image : undefined;

        const catalog = normalizeProducts(
          catalogResponse.ok ? await catalogResponse.json() : [],
        );

        const fallback = catalog.filter((item) => item.id !== normalized.id);
        const sameCategory = normalized.category
          ? fallback.filter(
              (item) =>
                item.category?.trim().toLowerCase() ===
                normalized.category?.trim().toLowerCase(),
            )
          : [];
        const recommendations = (
          sameCategory.length ? sameCategory : fallback
        ).slice(0, 5);

        const recommendationsWithImages = await Promise.all(
          recommendations.map(async (item) => {
            if (item.image) return item;
            try {
              const response = await fetch(`/api/products/${item.id}`, {
                cache: "no-store",
              });
              if (!response.ok) return item;
              const details = await response.json();
              return typeof details.image === "string"
                ? { ...item, image: details.image }
                : item;
            } catch {
              return item;
            }
          }),
        );

        if (!active) return;
        setProduct(normalized);
        setRelated(recommendationsWithImages);
      } catch (reason) {
        if (active) {
          setError(
            reason instanceof Error
              ? reason.message
              : "We could not load this product.",
          );
        }
      } finally {
        if (active) setLoading(false);
      }
    }
    void loadProduct();
    return () => {
      active = false;
    };
  }, [productId]);

  return { product, related, loading, error };
}
