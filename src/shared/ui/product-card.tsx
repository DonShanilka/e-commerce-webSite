import Link from "next/link";
import {
  ArrowUpRight,
  BookOpen,
  Camera,
  Coffee,
  Flower2,
  Headphones,
  House,
  Plus,
  Shirt,
  Smartphone,
} from "lucide-react";
import type { Product } from "@/src/types";

type ProductCardProps = {
  product: Product;
  onAdd?: (product: Product) => void;
  variant?: "store" | "compact";
};

const visuals = [
  { icon: Headphones, tone: "sage" },
  { icon: Coffee, tone: "sand" },
  { icon: Shirt, tone: "rose" },
  { icon: Smartphone, tone: "blue" },
  { icon: Flower2, tone: "cream" },
  { icon: Camera, tone: "lilac" },
  { icon: House, tone: "stone" },
  { icon: BookOpen, tone: "mint" },
];

function imageSource(image?: string) {
  if (!image) return null;
  if (/^(https?:\/\/|data:image\/)/i.test(image)) return image;
  if (/^[A-Za-z0-9+/]+={0,2}$/.test(image) && image.length > 100) {
    return `data:image/jpeg;base64,${image}`;
  }
  return null;
}

export function ProductCard({
  product,
  onAdd,
  variant = "store",
}: ProductCardProps) {
  const productName = product.name?.trim() || "Product";
  const index =
    Math.abs(Number(product.id) || productName.length) % visuals.length;
  const { icon: Icon, tone } = visuals[index];
  const image = imageSource(product.image);
  const stock = Number(product.quantity ?? 0);

  return (
    <article
      className={`catalog-card min-w-[0] overflow-hidden border border-[#eae8e4] rounded-[5px] bg-white transition-transform hover:-translate-y-[3px] hover:shadow-lg ${variant === "compact" ? "catalog-card-compact" : ""}`}
    >
      <Link
        className={`catalog-card-art h-[190px] relative overflow-hidden grid place-items-center text-[#36332f] [.ai-result-products_&]:h-[140px] max-[760px]:h-[160px] max-[430px]:h-[135px] max-[680px]:[.product-related-grid_&]:h-[155px] ${{ sage: "bg-[#eeefeb]", sand: "bg-[#eff6ff]", rose: "bg-[#eff6ff]", blue: "bg-[#e9edef]", cream: "bg-[#eff6ff]", lilac: "bg-[#eeebf0]", stone: "bg-[#efede8]", mint: "bg-[#e8eee8]" }[tone]}`}
        href={`/products/${product.id}`}
      >
        <span className="catalog-card-badge absolute z-[2] [top:10px] [left:10px] p-[6px_8px] rounded-[2px] bg-[#ffffffd9] text-[#334155] text-[8px] font-[650]">
          {stock > 0 ? "Ready to explore" : "Kade pick"}
        </span>
        {image ? (
          // The Product Service only returns a safe image URL when one is configured.
          // eslint-disable-next-line @next/next/no-img-element
          <img
            alt={productName}
            className="catalog-card-image max-w-[86%] max-h-[80%] relative z-[1] object-contain [mix-blend-mode:multiply] [.product-related-grid_&]:w-[88%] [.product-related-grid_&]:h-[80%]"
            src={image}
          />
        ) : (
          <span
            className="catalog-card-illustration w-[110px] h-[110px] relative z-[1] grid place-items-center [border:1px_solid_#ffffff8c] rounded-[50%] bg-[#ffffff78] text-[#334155] [filter:drop-shadow(0_14px_11px_#1d4ed81a)] [transition:transform_0.24s_ease] [.catalog-card:hover_&]:[transform:scale(1.06)_rotate(-3deg)] max-[430px]:w-[84px] max-[430px]:h-[84px]"
            aria-hidden="true"
          >
            <Icon
              size={variant === "compact" ? 48 : 64}
              strokeWidth={1.15}
              className="max-[430px]:w-[44px] max-[430px]:h-[44px]"
            />
          </span>
        )}
        <span
          className="catalog-card-open absolute [right:10px] [bottom:10px] z-[2] w-[28px] h-[28px] grid place-items-center [border:1px_solid_#ffffffa3] rounded-[50%] bg-[#ffffffcf] text-[#35322d]"
          aria-hidden="true"
        >
          <ArrowUpRight size={17} />
        </span>
      </Link>
      <div className="catalog-card-info p-[12px_12px_11px] [.ai-result-products_&]:p-[9px] max-[430px]:p-[10px_9px]">
        <div className="catalog-card-meta flex justify-between gap-[6px] text-[#475569] text-[8px] tracking-[0.03em]">
          <span>
            {product.brand || product.category || "Everyday essentials"}
          </span>
          {stock > 0 && (
            <span className="catalog-stock-dot text-[#334155] [&::before]:[content:''] [&::before]:w-[5px] [&::before]:h-[5px] [&::before]:inline-block [&::before]:m-[0_4px_1px_0] [&::before]:rounded-[50%] [&::before]:bg-[#93c5fd] max-[430px]:text-[7px]">
              In stock
            </span>
          )}
        </div>
        <h3 className="min-h-[34px] m-[7px_0_3px] overflow-hidden [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:2] text-[#292724] text-[11px] font-[650] leading-[1.45] max-[430px]:text-[10px]">
          {productName}
        </h3>
        {product.description && (
          <p className="min-h-[33px] m-[4px_0_7px] overflow-hidden [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:2] text-[#334155] text-[9px] leading-[1.45]">
            {product.description}
          </p>
        )}
        <div className="catalog-card-bottom flex items-center justify-between gap-[8px] mt-[9px]">
          <span className="catalog-price text-[#292724] text-[12px] font-[750] max-[430px]:text-[10px]">
            LKR {Number(product.price || 0).toLocaleString("en-LK")}
          </span>
          {onAdd && (
            <button
              aria-label={`Add ${productName} to your bag`}
              className="catalog-add w-[29px] h-[29px] grid place-items-center [border:1px_solid_#e4e1dc] rounded-[4px] bg-[#fff] text-[#334155] cursor-pointer [&:hover]:border-[#2a2925] [&:hover]:bg-[#2a2925] [&:hover]:text-[#fff]"
              onClick={() => onAdd(product)}
              type="button"
            >
              <Plus size={17} />
            </button>
          )}
        </div>
      </div>
    </article>
  );
}
