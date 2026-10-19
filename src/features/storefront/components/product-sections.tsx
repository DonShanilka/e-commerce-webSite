import { Search } from "lucide-react";
import type { Product } from "@/src/types";
import { ProductCard } from "@/src/shared/ui";

export function TrendingProducts({
  products,
  loading,
  onAdd,
}: {
  products: Product[];
  loading: boolean;
  onAdd: (product: Product) => void;
}) {
  const trending = products;

  return (
    <section
      aria-labelledby="trending-heading"
      className="market-section pt-[38px] [scroll-margin-top:28px] max-[760px]:pt-[31px]"
      id="trending"
    >
      <div className="market-section-heading flex items-end justify-between gap-[16px] mb-[17px] max-[430px]:items-start">
        <div>
          <span className="market-kicker block text-[#64748b] text-[10px] font-bold tracking-[0.12em] uppercase">
            Thoughtful finds, ready to explore
          </span>
          <h2
            id="trending-heading"
            className="m-[5px_0_0] text-[22px] font-[650] tracking-[-0.045em] max-[760px]:text-[20px]"
          >
            Trending now
          </h2>
        </div>
        <div className="market-result-count inline-flex items-center gap-[8px] text-[#334155] text-[10px] max-[430px]:text-[8px]">
          <span>{products.length} products</span>
          <Search size={16} className="text-[#475569]" />
        </div>
      </div>
      {trending.length ? (
        <div
          className="market-product-grid grid grid-cols-[repeat(5,_minmax(0,_1fr))] gap-[14px] 
        [.ai-result-products_&]:grid-cols-[repeat(auto-fit,_minmax(145px,_1fr))] max-[1100px]:grid-cols-[repeat(4,_minmax(0,_1fr))] 
        max-[760px]:grid-cols-[repeat(2,_minmax(0,_1fr))] max-[760px]:gap-[10px]"
        >
          {trending.map((product) => (
            <ProductCard key={product.id} onAdd={onAdd} product={product} />
          ))}
        </div>
      ) : (
        <div className="market-empty p-[25px] [border:1px_solid_#edeae5] bg-[#faf9f7] text-[#334155] text-center text-[12px]">
          No products match that search. Try another name or category.
        </div>
      )}
      {loading && (
        <p className="market-live-note mt-[10px] p-[10px] text-[#64748b] text-center text-[11px]">
          Connecting to your product collection…
        </p>
      )}
    </section>
  );
}
