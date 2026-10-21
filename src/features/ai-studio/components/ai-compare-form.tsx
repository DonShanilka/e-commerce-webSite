import type { FormEvent } from "react";
import { Check, Waypoints } from "lucide-react";
import type { Product } from "@/src/types";

export function AiCompareForm({
  catalog,
  catalogLoaded,
  selectedIds,
  purpose,
  loading,
  onSelectionChange,
  onPurposeChange,
  onSubmit,
}: {
  catalog: Product[];
  catalogLoaded: boolean;
  selectedIds: number[];
  purpose: string;
  loading: boolean;
  onSelectionChange: (ids: number[]) => void;
  onPurposeChange: (value: string) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
}) {
  return (
    <form
      className="ai-form-card mt-[15px] p-[19px] [border:1px_solid_#eff6ff] rounded-[5px] bg-[#fff] max-[430px]:p-[14px]"
      onSubmit={onSubmit}
    >
      <span className="ai-input-label block mb-[8px] text-[#334155] text-[10px] font-bold">
        Choose products to compare
      </span>
      <p className="ai-form-help m-[0_0_12px] text-[#334155] text-[9px] leading-[1.7]">
        Select two or more products from the live catalog. No specifications are
        added if the catalog does not provide them.
      </p>
      {catalog.length ? (
        <div className="ai-product-select-grid max-h-[310px] m-[12px_0] overflow-auto grid grid-cols-[repeat(2,_minmax(0,_1fr))] gap-[7px] max-[760px]:grid-cols-[1fr]">
          {catalog.map((product) => {
            const checked = selectedIds.includes(product.id);
            return (
              <label
                className={`ai-product-option min-h-[53px] relative flex items-center gap-[8px] p-[8px] rounded-[4px] border cursor-pointer ${checked ? "border-[#475569] bg-[#faf7f2]" : "border-[#eff6ff]"}`}
                key={product.id}
              >
                <input
                  checked={checked}
                  onChange={() => {
                    const updated = checked
                      ? selectedIds.filter((id) => id !== product.id)
                      : selectedIds.length < 20
                        ? [...selectedIds, product.id]
                        : selectedIds;
                    onSelectionChange(updated);
                  }}
                  type="checkbox"
                  className="absolute [opacity:0] pointer-events-none"
                />
                <span className="ai-product-option-check w-[16px] h-[16px] [flex:0_0_16px] grid place-items-center [border:1px_solid_#eff6ff] rounded-[3px] text-[#fff] [.ai-product-option.selected_&]:border-[#334155] [.ai-product-option.selected_&]:bg-[#2563eb]">
                  {checked && <Check size={13} />}
                </span>
                <span className="ai-product-option-copy min-w-[0] grid gap-[4px]">
                  <strong className="overflow-hidden text-[#334155] text-[9px] text-ellipsis whitespace-nowrap">
                    {product.name}
                  </strong>
                  <small className="text-[#475569] text-[8px]">
                    {product.brand || product.category || "Kade catalog"} · LKR{" "}
                    {Number(product.price || 0).toLocaleString("en-LK")}
                  </small>
                </span>
              </label>
            );
          })}
        </div>
      ) : (
        <div className="ai-inline-loading p-[22px] text-[#334155] text-[10px] text-center">
          {catalogLoaded
            ? "No products are available in the catalog yet."
            : "Loading the product catalog…"}
        </div>
      )}
      <label className="ai-field grid gap-[6px] m-[14px_0] text-[#334155] text-[9px] font-[650] [.admin-ai-controls_&]:w-[min(420px,_100%)] [.admin-ai-controls_&]:m-[0]">
        <span>What matters most to you?</span>
        <input
          maxLength={300}
          onChange={(event) => onPurposeChange(event.target.value)}
          placeholder="For example: value for everyday use"
          value={purpose}
          className="w-[100%] min-w-[0] h-[42px] p-[0_12px] [border:1px_solid_#eff6ff] rounded-[4px] outline-none bg-[#fff] text-[#292723] text-[11px] font-[450] focus:border-[#475569] focus:[box-shadow:0_0_0_3px_#93c5fd1a]"
        />
      </label>
      <button
        className="market-button min-h-[43px] w-[fit-content] inline-flex justify-center items-center gap-[11px] p-[0_18px] [border:1px_solid_#242320] rounded-[4px] bg-[#242320] text-[#fff] text-[11px] font-bold [transition:transform_0.18s_ease,_background_0.18s_ease,_border-color_0.18s_ease] cursor-pointer [&:hover:not(:disabled)]:[transform:translateY(-1px)] [&:hover:not(:disabled)]:border-[#334155] [&:hover:not(:disabled)]:bg-[#2563eb] [&:disabled]:[opacity:0.6] [&:disabled]:cursor-wait [.market-hero_&]:mt-[10px] [.bag-empty_&]:mt-[9px] [.ai-hub-hero_&]:mt-[17px] max-[760px]:[.admin-ai-controls_&]:w-[100%] max-[430px]:[.ai-form-bottom_&]:w-[100%] [.admin-ai-controls_&]:flex-none"
        disabled={loading || selectedIds.length < 2}
        type="submit"
      >
        {loading
          ? "Comparing products..."
          : `Compare ${selectedIds.length || "products"}`}{" "}
        <Waypoints size={16} />
      </button>
    </form>
  );
}
