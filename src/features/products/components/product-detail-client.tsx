"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { add } from "@/src/features/cart";
import { useAppDispatch } from "@/src/store/hooks";
import { SiteFooter, StoreHeader } from "@/src/shared/layout";
import { useProductDetail } from "../use-product-detail";
import { ProductBreadcrumb } from "./product-breadcrumb";
import { ProductGallery } from "./product-gallery";
import { ProductInformation } from "./product-information";
import { ProductPurchasePanel } from "./product-purchase-panel";
import { RelatedProducts } from "./related-products";

export default function ProductDetailClient({
  productId,
}: {
  productId: string;
}) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { product, related, loading, error } = useProductDetail(productId);

  function goBack() {
    if (window.history.length > 1) router.back();
    else router.push("/");
  }

  function addToCart(quantity: number) {
    if (!product) return;
    for (let count = 0; count < quantity; count += 1) dispatch(add(product));
  }

  return (
    <div className="storefront-page min-h-[100vh] bg-[#fff] text-[#22211f]">
      <StoreHeader />
      <main
        className="store-container product-detail-main w-[min(1320px,_calc(100%_-_64px))] mx-[auto] 
      max-[1100px]:w-[min(100%_-_44px,_1080px)] max-[760px]:w-[calc(100%_-_32px)] max-[430px]:w-[calc(100%_-_24px)] 
      pt-[26px] pb-[76px] max-[680px]:pt-[18px] max-[680px]:pb-[48px]"
      >
        <ProductBreadcrumb category={product?.category} onBack={goBack} />

        {loading ? (
          <div
            aria-live="polite"
            className="product-state min-h-[350px] grid [align-content:center] justify-items-center 
          gap-[12px] text-[#77736d] text-[13px] text-center"
          >
            Loading product details…
          </div>
        ) : error || !product ? (
          <section
            className="product-state product-state-error min-h-[350px] grid [align-content:center] justify-items-center 
          gap-[12px] text-[#77736d] text-[13px] text-center"
            role="alert"
          >
            <h1 className="m-[0] text-[#292724]">Product unavailable</h1>
            <p className="m-[0_0_8px]">
              {error || "We could not find this product."}
            </p>
            <Link
              className="market-button min-h-[43px] w-[fit-content] inline-flex justify-center items-center gap-[11px] p-[0_18px] 
            [border:1px_solid_#242320] rounded-[4px] bg-[#242320] text-[#fff] text-[11px] font-bold 
            [transition:transform_0.18s_ease,_background_0.18s_ease,_border-color_0.18s_ease] cursor-pointer 
            [&:hover:not(:disabled)]:[transform:translateY(-1px)] [&:hover:not(:disabled)]:border-[#334155] 
            [&:hover:not(:disabled)]:bg-[#2563eb] [&:disabled]:[opacity:0.6] [&:disabled]:cursor-wait [.market-hero_&]:mt-[10px] 
            [.bag-empty_&]:mt-[9px] [.ai-hub-hero_&]:mt-[17px] max-[760px]:[.admin-ai-controls_&]:w-[100%] max-[430px]:[.ai-form-bottom_&]:w-[100%] 
            [.admin-ai-controls_&]:flex-none"
              href="/"
            >
              Back to the shop <ArrowRight size={16} />
            </Link>
          </section>
        ) : (
          <>
            <section
              aria-labelledby="product-title"
              className="product-detail-grid grid grid-cols-[minmax(0,_1.04fr)_minmax(360px,_0.96fr)] 
            gap-[clamp(32px,_6vw,_82px)] items-start max-[900px]:grid-cols-[minmax(0,_1fr)_minmax(320px,_0.9fr)] max-[900px]:gap-[30px] 
            max-[680px]:grid-cols-[1fr] max-[680px]:gap-[25px]"
            >
              <ProductGallery product={product} />
              <ProductPurchasePanel onAdd={addToCart} product={product} />
            </section>
            <ProductInformation product={product} />
            <RelatedProducts products={related} />
          </>
        )}
      </main>
      <SiteFooter />
    </div>
  );
}
