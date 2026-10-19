"use client";

import { useState } from "react";
import {
  Check,
  Heart,
  Minus,
  Plus,
  ShieldCheck,
  ShoppingBag,
  Truck,
} from "lucide-react";
import type { Product } from "@/src/types";

const money = (amount: number) => `LKR ${amount.toLocaleString("en-LK")}`;

export function ProductPurchasePanel({
  product,
  onAdd,
}: {
  product: Product;
  onAdd: (quantity: number) => void;
}) {

  const stock = Number(product.quantity ?? 0);
  const [quantity, setQuantity] = useState(1);
  const [saved, setSaved] = useState(false);
  const [notice, setNotice] = useState("");

  function addToBag() {
    if (stock < 1) return;
    onAdd(quantity);
    setNotice(`${product.name} added to your bag.`);
    window.setTimeout(() => setNotice(""), 2600);
  }

  return (
    <div className="product-purchase-panel pt-[10px] max-[680px]:pt-[0]">
      <div className="product-detail-kicker text-[#64748b] text-[10px] font-bold tracking-[0.12em] uppercase">
        {product.brand || product.category || "KADE COLLECTION"}
      </div>
      <h1
        id="product-title"
        className="m-[12px_0_10px] text-[#252522] text-[clamp(28px,_3vw,_40px)] font-[550] tracking-[-0.045em] 
        leading-[1.15] max-[680px]:text-[30px]"
      >
        {product.name}
      </h1>
      <div
        className="product-rating flex items-center gap-[9px] text-[#7b7771] text-[11px]"
        aria-label="Reviews are not available yet"
      >
        <span
          aria-hidden="true"
          className="first:text-[#b58b45] first:text-[17px] first:tracking-[0.08em]"
        >
          ☆☆☆☆☆
        </span>
        <span className="first:text-[#b58b45] first:text-[17px] first:tracking-[0.08em]">
          New find
        </span>
      </div>
      <div className="product-detail-price mt-[17px] text-[#262624] text-[25px] font-semibold">
        {money(Number(product.price || 0))}
      </div>
      <p className="product-detail-description m-[17px_0_24px] pb-[23px] [border-bottom:1px_solid_#ecebe8] 
      text-[#6c6964] text-[13px] leading-[1.8]">
        {product.description?.trim() ||
          "A thoughtful everyday find, selected to bring a little more ease and style to your home."}
      </p>

      <div className="product-detail-meta flex justify-between gap-[14px] p-[10px_0] [border-bottom:1px_solid_#f0efed] 
      text-[#77736d] text-[11px]">
        <span>Category</span>
        <strong className="text-[#292724] font-semibold text-right">
          {product.category || "Everyday essentials"}
        </strong>
      </div>
      <div className="product-detail-meta flex justify-between gap-[14px] p-[10px_0] [border-bottom:1px_solid_#f0efed] 
      text-[#77736d] text-[11px]">
        <span>Availability</span>
        <strong
          className={
            stock > 0
              ? "product-availability [.product-detail-meta_&]:text-[#526c55]"
              : "product-unavailable [.product-detail-meta_&]:text-[#8b5f54]"
          }
        >
          {stock > 0 ? `${stock} in stock` : "Currently unavailable"}
        </strong>
      </div>

      <div className="product-buy-row flex items-center justify-between gap-[18px] mt-[21px]">
        <div
          aria-label="Quantity"
          className="product-quantity-control h-[42px] inline-flex items-center [border:1px_solid_#e2e0dc]"
        >
          <button
            aria-label="Decrease quantity"
            disabled={quantity <= 1}
            onClick={() => setQuantity((value) => Math.max(1, value - 1))}
            type="button"
            className="w-[39px] h-[40px] grid place-items-center border-0 bg-[transparent] text-[#34332f] cursor-pointer
            disabled:text-[#c4c1bc] disabled:cursor-not-allowed"
          >
            <Minus size={15} />
          </button>
          <span
            aria-live="polite"
            className="min-w-[30px] text-[#292724] text-[12px] text-center"
          >
            {quantity}
          </span>
          <button
            aria-label="Increase quantity"
            disabled={quantity >= stock}
            onClick={() => setQuantity((value) => Math.min(stock, value + 1))}
            type="button"
            className="w-[39px] h-[40px] grid place-items-center border-0 bg-[transparent] text-[#34332f] cursor-pointer 
            disabled:text-[#c4c1bc] disabled:cursor-not-allowed"
          >
            <Plus size={15} />
          </button>
        </div>
        <strong className="product-line-total text-[#292724] text-[18px] font-[650]">
          {money(Number(product.price || 0) * quantity)}
        </strong>
      </div>

      <div className="product-action-row grid grid-cols-[1fr_1fr] gap-[10px] mt-[17px]">
        <button
          className="product-add-button min-h-[45px] flex items-center justify-center gap-[9px] [border:1px_solid_#292724] 
          text-[10px] font-bold tracking-[0.06em] uppercase cursor-pointer bg-[#292724] text-[#fff] 
          [&:hover:not(:disabled)]:bg-[#3c3b38] [&:disabled]:border-[#c9c6c1] [&:disabled]:bg-[#c9c6c1] [&:disabled]:cursor-not-allowed"
          disabled={stock < 1}
          onClick={addToBag}
          type="button"
        >
          <ShoppingBag size={17} /> {stock > 0 ? "Add to bag" : "Out of stock"}
        </button>
        <button
          aria-pressed={saved}
          className={`product-wishlist-button min-h-[45px] flex items-center justify-center gap-[9px] border border-[#292724] 
            text-[10px] font-bold tracking-[0.06em] uppercase cursor-pointer bg-white text-[#34332f] hover:border-[#334155] 
            hover:text-[#334155] ${saved ? "is-saved border-[#334155] text-[#334155]" : ""}`}
          onClick={() => setSaved((value) => !value)}
          type="button"
        >
          <Heart size={17} fill={saved ? "currentColor" : "none"} />
          {saved ? "Saved" : "Wishlist"}
        </button>
      </div>
      {notice && (
        <p
          className="product-add-notice flex items-center gap-[7px] m-[12px_0_0] text-[#526c55] text-[11px]"
          role="status"
        >
          <Check size={15} /> {notice}
        </p>
      )}
      <div className="product-promises flex flex-wrap gap-[20px] mt-[22px] pt-[17px] [border-top:1px_solid_#ecebe8] 
      text-[#6d6963] text-[10px]">
        <span className="inline-flex items-center gap-[8px]">
          <Truck size={17} className="text-[#475569]" /> Islandwide delivery
        </span>
        <span className="inline-flex items-center gap-[8px]">
          <ShieldCheck size={17} className="text-[#475569]" /> Secure checkout
        </span>
      </div>
    </div>
  );
}
