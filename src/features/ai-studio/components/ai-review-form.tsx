import type { FormEvent } from "react";
import { MessageCircle } from "lucide-react";
import type { Product } from "@/src/types";

export function AiReviewForm({
  catalog,
  productId,
  loading,
  onProductChange,
  onSubmit,
}: {
  catalog: Product[];
  productId: string;
  loading: boolean;
  onProductChange: (value: string) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
}) {
  return (
    <form
      className="ai-form-card mt-[15px] p-[19px] [border:1px_solid_#eff6ff] rounded-[5px] bg-[#fff] max-[430px]:p-[14px]"
      onSubmit={onSubmit}
    >
      <label className="ai-field grid gap-[6px] m-[14px_0] text-[#334155] text-[9px] font-[650] [.admin-ai-controls_&]:w-[min(420px,_100%)] [.admin-ai-controls_&]:m-[0]">
        <span>Choose a product</span>
        <select
          onChange={(event) => onProductChange(event.target.value)}
          required
          value={productId}
          className="w-[100%] min-w-[0] h-[42px] p-[0_12px] [border:1px_solid_#eff6ff] rounded-[4px] outline-none bg-[#fff] text-[#292723] text-[11px] font-[450] appearance-auto focus:border-[#475569] focus:[box-shadow:0_0_0_3px_#93c5fd1a]"
        >
          <option value="">Select from the catalog</option>
          {catalog.map((product) => (
            <option key={product.id} value={product.id}>
              {product.name}
            </option>
          ))}
        </select>
      </label>
      <p className="ai-form-help m-[0_0_12px] text-[#334155] text-[9px] leading-[1.7]">
        The summary is created from reviews saved by Review Service. Reviewer
        names and personal details are not included.
      </p>
      <button
        className="market-button min-h-[43px] w-[fit-content] inline-flex justify-center items-center gap-[11px] p-[0_18px] [border:1px_solid_#242320] rounded-[4px] bg-[#242320] text-[#fff] text-[11px] font-bold [transition:transform_0.18s_ease,_background_0.18s_ease,_border-color_0.18s_ease] cursor-pointer [&:hover:not(:disabled)]:[transform:translateY(-1px)] [&:hover:not(:disabled)]:border-[#334155] [&:hover:not(:disabled)]:bg-[#2563eb] [&:disabled]:[opacity:0.6] [&:disabled]:cursor-wait [.market-hero_&]:mt-[10px] [.bag-empty_&]:mt-[9px] [.ai-hub-hero_&]:mt-[17px] max-[760px]:[.admin-ai-controls_&]:w-[100%] max-[430px]:[.ai-form-bottom_&]:w-[100%] [.admin-ai-controls_&]:flex-none"
        disabled={loading || !productId}
        type="submit"
      >
        {loading ? "Reading the reviews..." : "Summarize reviews"}{" "}
        <MessageCircle size={16} />
      </button>
    </form>
  );
}
