import { createAsyncThunk } from "@reduxjs/toolkit";
import { normalizeProducts } from "@/src/features/products/product-normalizer";
import type { Product } from "@/src/types";

export const fetchProducts = createAsyncThunk<
  Product[],
  void,
  { rejectValue: string }
>("products/fetchCatalog", async (_, { rejectWithValue, signal }) => {
  try {
    const response = await fetch("/api/products?page=0&size=40", {
      cache: "no-store",
      signal,
    });

    if (!response.ok)
      return rejectWithValue("We could not load the product catalog.");
    
    return normalizeProducts(await response.json());
  } catch (error) {
    if (error instanceof Error && error.name === "AbortError") throw error;
    return rejectWithValue("We could not load the product catalog.");
  }
});
