"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Check } from "lucide-react";
import type { Product } from "@/src/types";
import { useAppDispatch, useAppSelector } from "@/src/store/hooks";
import { add, change, clear, remove, toggle } from "@/src/features/cart";
import { SiteFooter, StoreHeader } from "@/src/shared/layout";
import { useProductCatalog } from "@/src/features/products/use-product-catalog";
import { useIsHydrated } from "@/src/shared/hooks/use-is-hydrated";
import {
  CartDrawer,
  CategorySection,
  ExploreFeatureGrid,
  SignupSection,
  StoreBenefits,
  StorefrontHero,
  TrendingProducts,
} from "./components";

const previewProducts: Product[] = [
  {
    id: 101,
    name: "Studio Wireless Headphones",
    brand: "Soundcore",
    price: 12990,
    category: "Electronics",
    quantity: 12,
  },
  {
    id: 102,
    name: "Ceramic Coffee Set",
    brand: "Homefolk",
    price: 4850,
    category: "Home & Living",
    quantity: 8,
  },
  {
    id: 103,
    name: "Everyday Canvas Tote",
    brand: "Mellow",
    price: 3650,
    category: "Fashion",
    quantity: 14,
  },
  {
    id: 104,
    name: "Minimalist Wrist Watch",
    brand: "Nord",
    price: 8900,
    category: "Fashion",
    quantity: 6,
  },
  {
    id: 105,
    name: "Botanical Skin Care Kit",
    brand: "Bare",
    price: 5900,
    category: "Wellness",
    quantity: 10,
  },
  {
    id: 106,
    name: "Pocket Instant Camera",
    brand: "Polaroid",
    price: 24900,
    category: "Electronics",
    quantity: 4,
  },
  {
    id: 107,
    name: "Cloud Walk Sneakers",
    brand: "Sunday",
    price: 7600,
    category: "Fashion",
    quantity: 9,
  },
  {
    id: 108,
    name: "Indoor Plant & Pot",
    brand: "Rooted",
    price: 2200,
    category: "Home & Living",
    quantity: 16,
  },
];

function HomeContent() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const searchParams = useSearchParams();
  const lines = useAppSelector((state) => state.cart.lines);
  const drawerOpen = useAppSelector((state) => state.cart.open);
  const cartHydrated = useIsHydrated();
  const catalog = useProductCatalog();
  const products = catalog.items.length ? catalog.items : previewProducts;
  const [query, setQuery] = useState(() => searchParams.get("query") || "");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [notice, setNotice] = useState("");

  const categories = useMemo(() => {
    const labels = [
      ...new Set(products.map((product) => product.category).filter(Boolean)),
    ] as string[];
    const fallback = [
      "Electronics",
      "Fashion",
      "Home & Living",
      "Beauty",
      "Baby & Kids",
      "Sports",
      "Books",
      "Groceries",
    ];
    return (labels.length ? labels : fallback).slice(0, 8);
  }, [products]);

  const filteredProducts = useMemo(() => {
    const normalizedQuery = query.toLowerCase();
    return products.filter((product) => {
      const matchesSearch =
        !normalizedQuery ||
        `${product.name} ${product.brand || ""} ${product.category || ""}`
          .toLowerCase()
          .includes(normalizedQuery);
      const matchesCategory =
        !selectedCategory || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [products, query, selectedCategory]);

  useEffect(() => {
    if (!notice) return;
    const timeout = window.setTimeout(() => setNotice(""), 2600);
    return () => window.clearTimeout(timeout);
  }, [notice]);

  return (
    <div className="storefront-page min-h-[100vh] bg-[#fff] text-[#22211f]">
      <StoreHeader onBagClick={() => dispatch(toggle())} onSearch={setQuery} />
      <main className="store-container store-main w-[min(1320px,_calc(100%_-_64px))] mx-[auto] max-[1100px]:w-[min(100%_-_44px,_1080px)] 
      max-[760px]:w-[calc(100%_-_32px)] max-[430px]:w-[calc(100%_-_24px)] pt-[20px] pb-[78px]">
        <StorefrontHero />

        <CategorySection
          categories={categories}
          onSelect={(category) =>
            setSelectedCategory(selectedCategory === category ? "" : category)
          }
          selectedCategory={selectedCategory}
        />

        <ExploreFeatureGrid />

        <TrendingProducts
          loading={catalog.loading}
          onAdd={(product) => {
            dispatch(add(product));
            setNotice(`${product.name} added to your bag`);
          }}
          products={filteredProducts}
        />
        <StoreBenefits />
        <SignupSection />
      </main>
      <SiteFooter />

      {cartHydrated && drawerOpen && (
        <CartDrawer
          lines={lines}
          onChange={(id, quantity) => dispatch(change({ id, quantity }))}
          onCheckout={() => {
            dispatch(toggle());
            router.push("/checkout");
          }}
          onClear={() => dispatch(clear())}
          onClose={() => dispatch(toggle())}
          onRemove={(id) => dispatch(remove(id))}
        />
      )}
      {notice && (
        <div
          className="store-toast fixed z-[60] [left:50%] [bottom:25px] [transform:translateX(-50%)] min-h-[42px] 
          p-[0_17px] flex items-center gap-[8px] rounded-[4px] bg-[#242320] text-[#fff] 
          [box-shadow:0_8px_24px_#0002] text-[11px] animate-[overlay-in_0.18s_ease-out]"
          role="status"
        >
          <Check size={16} />
          {notice}
        </div>
      )}
    </div>
  );
}

export default function HomePage() {
  return (
    <Suspense
      fallback={
        <div className="storefront-page market-empty min-h-[100vh] bg-[#fff] text-[#22211f] p-[25px] 
        [border:1px_solid_#edeae5] bg-[#faf9f7] text-[#334155] text-center text-[12px]">
          Loading the collection…
        </div>
      }
    >
      <HomeContent />
    </Suspense>
  );
}
