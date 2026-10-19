"use client";

import { useState } from "react";
import type { Product } from "@/src/types";

type ProductTab = "details" | "delivery" | "reviews";

export function ProductInformation({ product }: { product: Product }) {
  const [activeTab, setActiveTab] = useState<ProductTab>("details");
  const stock = Number(product.quantity ?? 0);

  return (
    <section
      aria-label="Product information"
      className="product-information mt-[55px] [border:1px_solid_#ebe9e6] max-[680px]:mt-[36px]"
    >
      <div
        aria-label="Product information sections"
        className="product-tabs grid grid-cols-[repeat(3,_minmax(0,_1fr))] 
      [border-bottom:1px_solid_#ebe9e6]"
        role="tablist"
      >
        <button
          aria-selected={activeTab === "details"}
          className={`min-h-[51px] p-[8px_4px] border-0 [border-right:1px_solid_#ebe9e6] bg-[#fff] text-[#77736d] text-[11px] 
            cursor-pointer max-[680px]:text-[9px] ${activeTab === "details" ? "text-[#334155] [box-shadow:inset_0_-2px_#334155]" : ""}`}
          onClick={() => setActiveTab("details")}
          role="tab"
          type="button"
        >
          Product details
        </button>
        <button
          aria-selected={activeTab === "delivery"}
          className={`min-h-[51px] p-[8px_4px] border-0 [border-right:1px_solid_#ebe9e6] bg-[#fff] text-[#77736d] text-[11px] 
            cursor-pointer max-[680px]:text-[9px] ${activeTab === "delivery" ? "text-[#334155] [box-shadow:inset_0_-2px_#334155]" : ""}`}
          onClick={() => setActiveTab("delivery")}
          role="tab"
          type="button"
        >
          Delivery & returns
        </button>
        <button
          aria-selected={activeTab === "reviews"}
          className={`min-h-[51px] p-[8px_4px] border-0 bg-[#fff] text-[#77736d] text-[11px] cursor-pointer 
            max-[680px]:text-[9px] ${activeTab === "reviews" ? "text-[#334155] [box-shadow:inset_0_-2px_#334155]" : ""}`}
          onClick={() => setActiveTab("reviews")}
          role="tab"
          type="button"
        >
          Reviews
        </button>
      </div>
      <div
        className="product-tab-content min-h-[150px] p-[25px_30px] max-[680px]:p-[21px_18px]"
        role="tabpanel"
      >
        {activeTab === "details" && (
          <div className="product-detail-copy">
            <h2 className="m-[0_0_10px] text-[#292724] text-[16px] font-semibold">
              Made for your everyday
            </h2>
            <p className="max-w-[820px] m-[0] text-[#706c66] text-[11px] leading-[1.8]">
              {product.description?.trim() ||
                `${product.name} is part of our ${product.category || "everyday"} collection. Browse the related picks below to find more items you may love.`}
            </p>
            <dl className="grid grid-cols-[repeat(3,_minmax(0,_1fr))] gap-[18px] m-[20px_0_0] max-[680px]:grid-cols-[1fr_1fr]">
              <div className="grid gap-[5px]">
                <dt className="text-[#88847e] text-[9px] uppercase">Brand</dt>
                <dd className="m-[0] text-[#34332f] text-[11px]">
                  {product.brand || "Kade"}
                </dd>
              </div>
              <div className="grid gap-[5px]">
                <dt className="text-[#88847e] text-[9px] uppercase">
                  Category
                </dt>
                <dd className="m-[0] text-[#34332f] text-[11px]">
                  {product.category || "Everyday essentials"}
                </dd>
              </div>
              <div className="grid gap-[5px]">
                <dt className="text-[#88847e] text-[9px] uppercase">
                  Availability
                </dt>
                <dd className="m-[0] text-[#34332f] text-[11px]">
                  {stock > 0 ? "Available to order" : "Currently unavailable"}
                </dd>
              </div>
            </dl>
          </div>
        )}
        {activeTab === "delivery" && (
          <div className="product-detail-copy">
            <h2 className="m-[0_0_10px] text-[#292724] text-[16px] font-semibold">
              Delivery & returns
            </h2>
            <p className="max-w-[820px] m-[0] text-[#706c66] text-[11px] leading-[1.8]">
              We deliver across Sri Lanka. Delivery options and timing are
              confirmed during checkout. If something is not right, contact our
              support team for help with your order.
            </p>
          </div>
        )}
        {activeTab === "reviews" && (
          <div className="product-detail-copy">
            <h2 className="m-[0_0_10px] text-[#292724] text-[16px] font-semibold">
              Customer reviews
            </h2>
            <p className="max-w-[820px] m-[0] text-[#706c66] text-[11px] leading-[1.8]">
              There are no customer reviews available for this product yet.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
