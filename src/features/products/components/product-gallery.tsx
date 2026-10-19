import { ShoppingBag } from "lucide-react";
import type { Product } from "@/src/types";

function getProductImage(image?: string) {
  if (!image) return undefined;
  if (/^(https?:\/\/|data:image\/)/i.test(image)) return image;
  return `data:image/jpeg;base64,${image}`;
}

export function ProductGallery({ product }: { product: Product }) {
  const image = getProductImage(product.image);

  return (
    <div className="product-gallery">
      <div className="product-main-image min-h-[460px] relative grid place-items-center overflow-hidden [border:1px_solid_#ecebe8] 
      bg-[#f5f5f4] max-[900px]:min-h-[380px] max-[900px]:h-[380px] max-[680px]:min-h-[min(92vw,_410px)] max-[680px]:h-[min(92vw,_410px)]">
        {image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            alt={product.name}
            src={image}
            className="w-[100%] h-[460px] object-contain [mix-blend-mode:multiply] max-[900px]:min-h-[380px] max-[900px]:h-[380px] 
            max-[680px]:min-h-[min(92vw,_410px)] max-[680px]:h-[min(92vw,_410px)]"
          />
        ) : (
          <div
            aria-label="No product image available"
            className="product-image-placeholder grid justify-items-center gap-[13px] text-[#94a3b8] text-[12px]"
          >
            <ShoppingBag size={54} strokeWidth={1.1} />
            <span>Product image</span>
          </div>
        )}
        <span className="product-image-label absolute [top:16px] [left:16px] p-[7px_10px] bg-[#ffffffd9] text-[#475569] 
        text-[9px] font-bold tracking-[0.1em] uppercase">
          {product.category || "KADE FIND"}
        </span>
      </div>
      <div
        className="product-gallery-thumbnails flex items-center gap-[14px] mt-[12px]"
        aria-label="Product image gallery"
      >
        <button
          aria-label="Main product image"
          aria-current="true"
          className="product-thumbnail w-[66px] h-[66px] flex-none grid place-items-center overflow-hidden
          [border:1px_solid_#cbd5e1] bg-[#f5f5f4] text-[#64748b] cursor-default max-[680px]:w-[56px] max-[680px]:h-[56px]"
          type="button"
        >
          {image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              alt=""
              src={image}
              className="w-[100%] h-[100%] object-contain [mix-blend-mode:multiply]"
            />
          ) : (
            <ShoppingBag aria-hidden="true" size={22} />
          )}
        </button>
        <div className="product-gallery-caption flex justify-between gap-[14px] pt-[12px] text-[#77736d] text-[10px] 
        max-[680px]:text-[9px] [.product-gallery-thumbnails_&]:grid [.product-gallery-thumbnails_&]:gap-[5px] 
        [.product-gallery-thumbnails_&]:p-[0] [.product-gallery-thumbnails_&]:text-[10px] 
        [.product-gallery-thumbnails_&_span:last-child]:text-[#334155] [.product-gallery-thumbnails_&_span:last-child]:text-[11px] 
        [.product-gallery-thumbnails_&_span:last-child]:font-[650]">
          <span className="last:text-[#334155]">Product image</span>
          <span className="last:text-[#334155]">
            {product.brand || "Kade collection"}
          </span>
        </div>
      </div>
    </div>
  );
}
