import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ProductCard } from "@/src/shared/ui";
import type { Product } from "@/src/types";

export function RelatedProducts({ products }: { products: Product[] }) {
  return (
    <section
      aria-labelledby="related-products-title"
      className="product-related-section mt-[61px] max-[680px]:mt-[43px]"
    >
      <div className="market-section-heading flex items-end justify-between gap-[16px] mb-[17px] max-[430px]:items-start">
        <div>
          <span className="market-kicker block text-[#64748b] text-[10px] font-bold tracking-[0.12em] uppercase">
            A few more good finds
          </span>
          <h2
            id="related-products-title"
            className="m-[5px_0_0] text-[22px] font-[650] tracking-[-0.045em] max-[760px]:text-[20px]"
          >
            You may also like
          </h2>
        </div>
        <Link
          className="market-text-link inline-flex items-center gap-[7px] text-[#373530] text-[10px] font-[650] 
          [&:hover]:text-[#334155] max-[430px]:text-[8px]"
          href="/#products"
        >
          View all products <ArrowRight size={15} />
        </Link>
      </div>
      {products.length ? (
        <div className="product-related-grid grid grid-cols-[repeat(5,_minmax(0,_1fr))] gap-[14px] 
        max-[900px]:grid-cols-[repeat(3,_minmax(0,_1fr))] max-[680px]:grid-cols-[repeat(2,_minmax(0,_1fr))] 
        max-[680px]:gap-[10px]">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <p className="product-related-empty p-[30px] [border:1px_solid_#ebe9e6] text-[#77736d] text-[12px] text-center">
          More picks in this category are coming soon.
        </p>
      )}
    </section>
  );
}
