import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { StoreUser } from "@/src/types";

export type AuthState = { user: StoreUser | null; ready: boolean };
const initialState: AuthState = { user: null, ready: false };

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<StoreUser | null>) => {
      state.user = action.payload;
      state.ready = true;
    },
    signOut: (state) => {
      state.user = null;
      state.ready = true;
    },
  },
});

export const { setUser, signOut } = authSlice.actions;
export default authSlice.reducer;
