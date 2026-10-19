"use client";

import { useEffect } from "react";
import { fetchProducts } from "./products-thunks";
import { useAppDispatch, useAppSelector } from "@/src/store/hooks";

export function useProductCatalog() {
  const dispatch = useAppDispatch();
  const catalog = useAppSelector((state) => state.products);

  useEffect(() => {
    const request = dispatch(fetchProducts());
    return () => request.abort();
  }, [dispatch]);

  return catalog;
}
