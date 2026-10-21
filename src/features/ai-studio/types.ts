import type { LucideIcon } from "lucide-react";
import type { Product } from "@/src/types";

export type AiTool =
  | "assistant"
  | "search"
  | "recommendations"
  | "compare"
  | "reviews";
export type RecommendationSource = "orders" | "preferences";
export type AiResult = {
  answer?: string;
  products?: Product[];
  confidence?: string;
  forecast?: unknown[];
};
export type ToolInfo = {
  title: string;
  kicker: string;
  description: string;
  icon: LucideIcon;
};
