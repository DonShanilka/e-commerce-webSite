import { createSlice } from "@reduxjs/toolkit";
import type { Product } from "@/src/types";
import { fetchProducts } from "./products-thunks";

export type ProductsState = {
  items: Product[];
  loading: boolean;
  error: string | null;
};

const initialState: ProductsState = { items: [], loading: false, error: null };

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        if (!action.meta.aborted)
          state.error = action.payload ?? "We could not load products.";
      });
  },
});

export default productsSlice.reducer;
