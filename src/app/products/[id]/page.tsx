import { Suspense } from "react";
import { ProductDetailClient } from "@/src/features/products/components";

type ProductPageProps = {
  params: Promise<{ id: string }>;
};

type ProductPageContentProps = ProductPageProps;

async function ProductPageContent({ params }: ProductPageContentProps) {
  const { id } = await params;

  return <ProductDetailClient productId={id} />;
}

function ProductPageFallback() {
  return (
    <main
      className="store-container product-detail-main w-[min(1320px,_calc(100%_-_64px))] mx-[auto] 
    max-[1100px]:w-[min(100%_-_44px,_1080px)] max-[760px]:w-[calc(100%_-_32px)] max-[430px]:w-[calc(100%_-_24px)] 
    pt-[26px] pb-[76px] max-[680px]:pt-[18px] max-[680px]:pb-[48px]"
    >
      <div
        aria-live="polite"
        className="product-state min-h-[350px] grid [align-content:center] justify-items-center gap-[12px] text-[#77736d] text-[13px] text-center"
      >
        Loading product details…
      </div>
    </main>
  );
}

export default function ProductPage({ params }: ProductPageProps) {
  return (
    <Suspense fallback={<ProductPageFallback />}>
      <ProductPageContent params={params} />
    </Suspense>
  );
}
