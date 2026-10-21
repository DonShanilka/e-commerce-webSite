import { Sparkles } from "lucide-react";
import type { Product } from "@/src/types";
import type { RecommendationSource } from "../types";
import Link from "next/link";

export function AiRecommendationsForm({
  catalog,
  source,
  preferredCategory,
  preferredBrand,
  budget,
  loading,
  error,
  onSourceChange,
  onCategoryChange,
  onBrandChange,
  onBudgetChange,
  onSubmit,
}: {
  catalog: Product[];
  source: RecommendationSource;
  preferredCategory: string;
  preferredBrand: string;
  budget: string;
  loading: boolean;
  error: string;
  onSourceChange: (value: RecommendationSource) => void;
  onCategoryChange: (value: string) => void;
  onBrandChange: (value: string) => void;
  onBudgetChange: (value: string) => void;
  onSubmit: () => void;
}) {
  const categories = [
    ...new Set(catalog.map((product) => product.category).filter(Boolean)),
  ];

  return (
    <div className="ai-form-card mt-[15px] p-[19px] [border:1px_solid_#eff6ff] rounded-[5px] bg-[#fff] max-[430px]:p-[14px]">
      <span className="ai-input-label block mb-[8px] text-[#334155] text-[10px] font-bold">
        A shortlist made from your own orders
      </span>
      <p className="ai-form-help m-[0_0_12px] text-[#334155] text-[9px] leading-[1.7]">
        Your order history stays with the order service. Only the product
        categories and brands needed to find related products are used here.
      </p>
      <div
        className="ai-mode-switch m-[14px_0_10px] p-[3px] inline-flex gap-[3px] rounded-[4px] bg-[#f3f0eb] max-[600px]:w-[100%]"
        role="group"
        aria-label="Recommendation source"
      >
        <button
          aria-pressed={source === "orders"}
          className={`min-h-[31px] rounded-[3px] border-0 bg-transparent px-[11px] text-[#334155] text-[8px] font-medium cursor-pointer max-[600px]:flex-1 max-[600px]:px-[6px] ${source === "orders" ? "bg-white font-bold shadow-sm" : ""}`}
          onClick={() => onSourceChange("orders")}
          type="button"
        >
          Use my order history
        </button>
        <button
          aria-pressed={source === "preferences"}
          className={`min-h-[31px] rounded-[3px] border-0 bg-transparent px-[11px] text-[#334155] text-[8px] font-medium cursor-pointer max-[600px]:flex-1 max-[600px]:px-[6px] ${source === "preferences" ? "bg-white font-bold shadow-sm" : ""}`}
          onClick={() => onSourceChange("preferences")}
          type="button"
        >
          Choose my interests
        </button>
      </div>
      {source === "preferences" && (
        <div className="ai-preference-fields grid grid-cols-[repeat(2,_minmax(0,_1fr))] gap-[12px] max-[600px]:grid-cols-[1fr] max-[600px]:gap-[0]">
          <label className="ai-field grid gap-[6px] m-[14px_0] text-[#334155] text-[9px] font-[650] [.admin-ai-controls_&]:w-[min(420px,_100%)] [.admin-ai-controls_&]:m-[0]">
            <span>Category</span>
            <select
              onChange={(event) => onCategoryChange(event.target.value)}
              value={preferredCategory}
              className="w-[100%] min-w-[0] h-[42px] p-[0_12px] [border:1px_solid_#eff6ff] rounded-[4px] outline-none bg-[#fff] text-[#292723] text-[11px] font-[450] appearance-auto focus:border-[#475569] focus:[box-shadow:0_0_0_3px_#93c5fd1a]"
            >
              <option value="">Any category</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </label>
          <label className="ai-field grid gap-[6px] m-[14px_0] text-[#334155] text-[9px] font-[650] [.admin-ai-controls_&]:w-[min(420px,_100%)] [.admin-ai-controls_&]:m-[0]">
            <span>Brand</span>
            <input
              maxLength={80}
              onChange={(event) => onBrandChange(event.target.value)}
              placeholder="Any brand"
              value={preferredBrand}
              className="w-[100%] min-w-[0] h-[42px] p-[0_12px] [border:1px_solid_#eff6ff] rounded-[4px] outline-none bg-[#fff] text-[#292723] text-[11px] font-[450] focus:border-[#475569] focus:[box-shadow:0_0_0_3px_#93c5fd1a]"
            />
          </label>
        </div>
      )}
      <label className="ai-field grid gap-[6px] m-[14px_0] text-[#334155] text-[9px] font-[650] [.admin-ai-controls_&]:w-[min(420px,_100%)] [.admin-ai-controls_&]:m-[0]">
        <span>Optional budget limit</span>
        <span className="ai-budget-wrap flex items-center [border:1px_solid_#eff6ff] rounded-[4px] text-[#475569]">
          <span className="pl-[12px] text-[10px]">LKR</span>
          <input
            min="0"
            onChange={(event) => onBudgetChange(event.target.value)}
            placeholder="Any budget"
            step="100"
            type="number"
            value={budget}
            className="w-[100%] min-w-[0] h-[42px] p-[0_12px] [border:1px_solid_#eff6ff] rounded-[4px] outline-none bg-[#fff] text-[#292723] text-[11px] font-[450] focus:border-[#475569] focus:[box-shadow:0_0_0_3px_#93c5fd1a] border-0 focus:[box-shadow:none]"
          />
        </span>
      </label>
      <button
        className="market-button min-h-[43px] w-[fit-content] inline-flex justify-center items-center gap-[11px] p-[0_18px] [border:1px_solid_#242320] rounded-[4px] bg-[#242320] text-[#fff] text-[11px] font-bold [transition:transform_0.18s_ease,_background_0.18s_ease,_border-color_0.18s_ease] cursor-pointer [&:hover:not(:disabled)]:[transform:translateY(-1px)] [&:hover:not(:disabled)]:border-[#334155] [&:hover:not(:disabled)]:bg-[#2563eb] [&:disabled]:[opacity:0.6] [&:disabled]:cursor-wait [.market-hero_&]:mt-[10px] [.bag-empty_&]:mt-[9px] [.ai-hub-hero_&]:mt-[17px] max-[760px]:[.admin-ai-controls_&]:w-[100%] max-[430px]:[.ai-form-bottom_&]:w-[100%] [.admin-ai-controls_&]:flex-none"
        disabled={loading}
        onClick={onSubmit}
        type="button"
      >
        {loading
          ? "Finding your picks..."
          : source === "orders"
            ? "Build my shortlist"
            : "Find products for me"}{" "}
        <Sparkles size={16} />
      </button>
      {source === "orders" && error.includes("Sign in") && (
        <p className="ai-signin-note m-[12px_0_0] text-[#334155] text-[9px]">
          Sign in first to use your own order history.{" "}
          <Link
            href="/login?next=/ai/recommendations"
            className="text-[#334155] font-bold underline [text-underline-offset:2px]"
          >
            Sign in
          </Link>{" "}
          or{" "}
          <Link
            href="/register"
            className="text-[#334155] font-bold underline [text-underline-offset:2px]"
          >
            create an account
          </Link>
          .
        </p>
      )}
      <p className="ai-form-help ai-form-help-bottom m-[0_0_12px] text-[#334155] text-[9px] leading-[1.7] m-[15px_0_0]">
        You can also choose your interests above without signing in.
      </p>
    </div>
  );
}
