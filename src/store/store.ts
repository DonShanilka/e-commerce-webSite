import { configureStore } from "@reduxjs/toolkit";
import type { UnknownAction } from "redux";
import authReducer from "@/src/features/auth/auth-slice";
import cartReducer from "@/src/features/cart/cart-slice";
import productsReducer from "@/src/features/products/products-slice";

export const makeStore = () =>
  configureStore({
    reducer: rootReducer,
    // The DevTools enhancer also uses Math.random() during initialization.
    devTools: typeof window !== "undefined",
  });

export type RootState = {
  auth: ReturnType<typeof authReducer>;
  cart: ReturnType<typeof cartReducer>;
  products: ReturnType<typeof productsReducer>;
};

function rootReducer(
  state: RootState | undefined,
  action: UnknownAction,
): RootState {
  return {
    auth: authReducer(state?.auth, action),
    cart: cartReducer(state?.cart, action),
    products: productsReducer(state?.products, action),
  };
}

export type AppStore = ReturnType<typeof makeStore>;
export type AppDispatch = AppStore["dispatch"];
