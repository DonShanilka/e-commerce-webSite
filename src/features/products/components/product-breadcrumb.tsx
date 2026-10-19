import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export function ProductBreadcrumb({
  category,
  onBack,
}: {
  category?: string;
  onBack: () => void;
}) {
  return (
    <nav
      aria-label="Breadcrumb"
      className="product-breadcrumbs flex flex-wrap gap-[9px] items-center 
    mb-[24px] text-[#7a7772] text-[11px] max-[680px]:mb-[17px]"
    >
      <button
        aria-label="Go back"
        className="product-back-button inline-flex items-center gap-[6px] p-[0] border-0 
      bg-[transparent] text-[#334155] [font:inherit] cursor-pointer [&:hover]:text-[#1d4ed8]"
        onClick={onBack}
        type="button"
      >
        <ArrowLeft aria-hidden="true" size={15} />
        <span>Back</span>
      </button>
      <span aria-hidden="true" className="product-breadcrumb-divider">
        /
      </span>
      <Link href="/" className="hover:text-[#334155]">
        Home
      </Link>
      <span aria-hidden="true">/</span>
      <Link href="/#products" className="hover:text-[#334155]">
        Shop
      </Link>
      {category && (
        <span className="product-breadcrumb-current text-[#334155]">
          / {category}
        </span>
      )}
    </nav>
  );
}
