"use client";

import { useEffect, useState, type FormEvent } from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { StoreHeader, SiteFooter } from "@/src/shared/layout";
import type { Product } from "@/src/types";
import { useAppDispatch } from "@/src/store/hooks";
import { add } from "@/src/features/cart";
import { normalizeProducts } from "@/src/features/products/product-normalizer";
import { toolInfo } from "../ai-tool-config";
import type { AiResult, AiTool, RecommendationSource } from "../types";
import { AiCompareForm } from "./ai-compare-form";
import { AiToast } from "./ai-result-panel";
import { AiPromptForm } from "./ai-prompt-form";
import { AiRecommendationsForm } from "./ai-recommendations-form";
import { AiResultPanel } from "./ai-result-panel";
import { AiReviewForm } from "./ai-review-form";
import { AiToolSidebar } from "./ai-tool-sidebar";

function productsFrom(data: unknown): Product[] {
  return normalizeProducts(data);
}

export function AiStudio({
  tool,
  initialProduct = "",
}: {
  tool: string;
  initialProduct?: string;
}) {
  const selectedTool = tool as AiTool;
  const details = toolInfo[selectedTool];
  const dispatch = useAppDispatch();
  const [catalog, setCatalog] = useState<Product[]>([]);
  const [catalogLoaded, setCatalogLoaded] = useState(false);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [productId, setProductId] = useState(initialProduct);
  const [preferredCategory, setPreferredCategory] = useState("");
  const [preferredBrand, setPreferredBrand] = useState("");
  const [recommendBy, setRecommendBy] =
    useState<RecommendationSource>("orders");
  const [prompt, setPrompt] = useState("");
  const [budget, setBudget] = useState("");
  const [purpose, setPurpose] = useState("");
  const [result, setResult] = useState<AiResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  useEffect(() => {
    if (
      selectedTool !== "compare" &&
      selectedTool !== "reviews" &&
      selectedTool !== "recommendations"
    ) {
      return;
    }
    let active = true;
    fetch("/api/products?page=0&size=100", { cache: "no-store" })
      .then((response) => (response.ok ? response.json() : null))
      .then((data) => {
        if (!active) return;
        const products = productsFrom(data);
        setCatalog(products);
        setCatalogLoaded(true);
        const queryProduct = Number(initialProduct);
        if (queryProduct && products.some((item) => item.id === queryProduct)) {
          setProductId(String(queryProduct));
          setSelectedIds([queryProduct]);
        }
      })
      .catch(() => {
        if (!active) return;
        setCatalogLoaded(true);
        setError("The product catalog could not be reached.");
      });
    return () => {
      active = false;
    };
  }, [initialProduct, selectedTool]);

  async function runTool(event?: FormEvent<HTMLFormElement>) {
    event?.preventDefault();
    setLoading(true);
    setError("");
    setResult(null);
    setNotice("");

    try {
      let response: Response;
      if (selectedTool === "assistant") {
        response = await fetch("/api/ai/chat", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ message: prompt.trim() }),
        });
      } else if (selectedTool === "search") {
        response = await fetch("/api/ai/search", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ query: prompt.trim(), limit: 8 }),
        });
      } else if (
        selectedTool === "recommendations" &&
        recommendBy === "orders"
      ) {
        const query = new URLSearchParams();
        if (budget) query.set("budget", budget);
        query.set("limit", "8");
        response = await fetch(`/api/ai/recommendations/me?${query}`, {
          cache: "no-store",
        });
      } else if (selectedTool === "recommendations") {
        response = await fetch("/api/ai/recommendations", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({
            preferredCategories: preferredCategory ? [preferredCategory] : [],
            preferredBrands: preferredBrand.trim()
              ? [preferredBrand.trim()]
              : [],
            budget: budget ? Number(budget) : null,
            limit: 8,
          }),
        });
      } else if (selectedTool === "compare") {
        response = await fetch("/api/ai/compare", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({
            productIds: selectedIds,
            purpose: purpose.trim() || null,
          }),
        });
      } else {
        response = await fetch(`/api/ai/reviews/products/${productId}`, {
          cache: "no-store",
        });
      }

      const data = await response.json().catch(() => ({}));
      if (!response.ok)
        throw new Error(
          data.message || "The AI request could not be completed.",
        );
      setResult({ ...data, products: normalizeProducts(data.products) });
    } catch (cause) {
      setError(
        cause instanceof Error
          ? cause.message
          : "The AI request could not be completed.",
      );
    } finally {
      setLoading(false);
    }
  }

  if (!details) return null;
  const Icon = details.icon;

  return (
    <div className="storefront-page min-h-[100vh] bg-[#fff] text-[#22211f]">
      <StoreHeader />
      <main className="store-container ai-tool-page w-[min(1320px,_calc(100%_-_64px))] mx-[auto] max-[1100px]:w-[min(100%_-_44px,_1080px)] max-[760px]:w-[calc(100%_-_32px)] max-[430px]:w-[calc(100%_-_24px)] pt-[24px] pb-[72px]">
        <div className="ai-breadcrumb flex items-center gap-[7px] text-[#475569] text-[9px]">
          <Link href="/" className="hover:text-[#334155]">
            Home
          </Link>
          <ChevronRight size={14} />
          <Link href="/ai" className="hover:text-[#334155]">
            Kade AI
          </Link>
          <ChevronRight size={14} />
          <span>{details.kicker}</span>
        </div>
        <div className="ai-page-layout mt-[18px] grid grid-cols-[205px_minmax(0,_1fr)] gap-[26px] items-start max-[760px]:grid-cols-[1fr] max-[760px]:gap-[12px]">
          <AiToolSidebar selectedTool={selectedTool} />
          <section className="ai-tool-content min-w-[0]">
            <header className="ai-tool-heading p-[9px_0_16px]">
              <span className="ai-tool-heading-icon w-[39px] h-[39px] mb-[12px] grid place-items-center rounded-[50%] bg-[#eff6ff] text-[#334155]">
                <Icon size={22} />
              </span>
              <span className="market-kicker block text-[#64748b] text-[10px] font-bold tracking-[0.12em] uppercase">
                {details.kicker}
              </span>
              <h1 className="m-[5px_0_7px] text-[27px] font-[650] tracking-[-0.055em] max-[760px]:text-[23px]">
                {details.title}
              </h1>
              <p className="max-w-[660px] m-[0] text-[#334155] text-[10px] leading-[1.75]">
                {details.description}
              </p>
            </header>

            {(selectedTool === "assistant" || selectedTool === "search") && (
              <AiPromptForm
                loading={loading}
                onPromptChange={setPrompt}
                onSubmit={(event) => void runTool(event)}
                prompt={prompt}
                tool={selectedTool}
              />
            )}
            {selectedTool === "recommendations" && (
              <AiRecommendationsForm
                budget={budget}
                catalog={catalog}
                error={error}
                loading={loading}
                onBrandChange={setPreferredBrand}
                onBudgetChange={setBudget}
                onCategoryChange={setPreferredCategory}
                onSourceChange={setRecommendBy}
                onSubmit={() => void runTool()}
                preferredBrand={preferredBrand}
                preferredCategory={preferredCategory}
                source={recommendBy}
              />
            )}
            {selectedTool === "compare" && (
              <AiCompareForm
                catalog={catalog}
                catalogLoaded={catalogLoaded}
                loading={loading}
                onPurposeChange={setPurpose}
                onSelectionChange={setSelectedIds}
                onSubmit={(event) => void runTool(event)}
                purpose={purpose}
                selectedIds={selectedIds}
              />
            )}
            {selectedTool === "reviews" && (
              <AiReviewForm
                catalog={catalog}
                loading={loading}
                onProductChange={setProductId}
                onSubmit={(event) => void runTool(event)}
                productId={productId}
              />
            )}

            {error && !error.includes("Sign in") && (
              <div
                className="ai-error mt-[14px] p-[12px_13px] [border:1px_solid_#eff6ff] rounded-[4px] bg-[#f8fafc] text-[#334155] text-[9px] leading-[1.55]"
                role="alert"
              >
                {error}
              </div>
            )}
            {result && (
              <AiResultPanel
                answer={result.answer || ""}
                onAdd={(product) => {
                  dispatch(add(product));
                  setNotice(`${product.name} added to your bag`);
                }}
                result={result}
                tool={selectedTool}
              />
            )}
          </section>
        </div>
      </main>
      <SiteFooter />
      {notice && <AiToast message={notice} />}
    </div>
  );
}
