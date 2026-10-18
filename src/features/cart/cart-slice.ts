import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Product } from "@/src/types";

export type CartLine = { product: Product; quantity: number };
export type CartState = { lines: CartLine[]; open: boolean };

const initialState: CartState = { lines: [], open: false };

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    add: (state, action: PayloadAction<Product>) => {
      const line = state.lines.find(
        ({ product }) => product.id === action.payload.id,
      );
      if (line) line.quantity += 1;
      else state.lines.push({ product: action.payload, quantity: 1 });
    },
    remove: (state, action: PayloadAction<number>) => {
      state.lines = state.lines.filter(
        ({ product }) => product.id !== action.payload,
      );
    },
    change: (
      state,
      action: PayloadAction<{ id: number; quantity: number }>,
    ) => {
      const line = state.lines.find(
        ({ product }) => product.id === action.payload.id,
      );
      if (line) line.quantity = Math.max(1, action.payload.quantity);
    },
    toggle: (state) => {
      state.open = !state.open;
    },
    clear: (state) => {
      state.lines = [];
    },
    restore: (state, action: PayloadAction<CartLine[]>) => {
      state.lines = action.payload;
      state.open = false;
    },
  },
});

export const { add, remove, change, toggle, clear, restore } =
  cartSlice.actions;
export default cartSlice.reducer;
