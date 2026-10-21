import { Check, Sparkles } from "lucide-react";
import { ProductCard } from "@/src/shared/ui";
import type { Product } from "@/src/types";
import type { AiResult, AiTool } from "../types";

export function AiResultPanel({
  result,
  tool,
  answer,
  onAdd,
}: {
  result: AiResult;
  tool: AiTool;
  answer: string;
  onAdd: (product: Product) => void;
}) {
  const hasProducts = Boolean(result.products?.length);
  const useProductCards =
    hasProducts && ["assistant", "search", "recommendations"].includes(tool);
  const visibleAnswer = useProductCards
    ? answer
        .split(/\r?\n/)
        .filter((line) => !/^\s*\|.*\|\s*$/.test(line))
        .join("\n")
        .replace(/\n{3,}/g, "\n\n")
        .trim()
    : answer.trim();

  return (
    <section
      aria-live="polite"
      className="ai-result-card mt-[15px] overflow-hidden rounded-[5px] border border-[#eff6ff] bg-white p-0"
    >
      <div className="ai-result-top min-h-[45px] p-[0_17px] flex items-center justify-between gap-[12px] bg-[#f6f3ef]">
        <span className="first:inline-flex first:items-center first:gap-[7px] first:text-[#334155] first:text-[9px] first:font-bold">
          <Sparkles size={16} className="text-[#334155]" /> Kade AI response
        </span>
        {result.confidence && (
          <span className="ai-confidence p-[5px_8px] rounded-[20px] bg-[#fff] text-[#334155] text-[8px] capitalize">
            {result.confidence} confidence
          </span>
        )}
      </div>
      {visibleAnswer && (
        <p className="ai-answer m-[0] p-[17px] whitespace-pre-wrap text-[#334155] text-[10px] leading-[1.8]">
          {visibleAnswer}
        </p>
      )}
      {result.products?.length ? (
        <div className="ai-result-products p-[0_17px_17px]">
          <div className="mb-3 flex items-baseline justify-between gap-3">
            <h2 className="mb-3 text-[13px] font-semibold text-[#292724]">
              {tool === "compare"
                ? "Products in this comparison"
                : tool === "recommendations"
                  ? "Recommended for you"
                  : "Products matching your request"}
            </h2>
            <span className="shrink-0 text-[9px] text-[#77736d]">
              {result.products.length}{" "}
              {result.products.length === 1 ? "item" : "items"}
            </span>
          </div>
          <div className="market-product-grid grid grid-cols-[repeat(5,_minmax(0,_1fr))] gap-[14px] [.ai-result-products_&]:grid-cols-[repeat(auto-fit,_minmax(145px,_1fr))] max-[1100px]:grid-cols-[repeat(4,_minmax(0,_1fr))] max-[760px]:grid-cols-[repeat(2,_minmax(0,_1fr))] max-[760px]:gap-[10px]">
            {result.products.map((product) => (
              <ProductCard key={product.id} onAdd={onAdd} product={product} />
            ))}
          </div>
        </div>
      ) : null}
    </section>
  );
}

export function AiToast({ message }: { message: string }) {
  return (
    <div
      className="store-toast fixed z-[60] [left:50%] [bottom:25px] [transform:translateX(-50%)] min-h-[42px] p-[0_17px] flex items-center gap-[8px] rounded-[4px] bg-[#242320] text-[#fff] [box-shadow:0_8px_24px_#0002] text-[11px] animate-[overlay-in_0.18s_ease-out]"
      role="status"
    >
      <Check size={16} />
      {message}
    </div>
  );
}
