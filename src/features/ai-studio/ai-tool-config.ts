import { Bot, Heart, MessageCircle, Search, Waypoints } from "lucide-react";
import type { AiTool, ToolInfo } from "./types";

export const toolInfo: Record<AiTool, ToolInfo> = {
  assistant: {
    title: "Kade shopping assistant",
    kicker: "Tell us what you need",
    description:
      "Ask for ideas in your own words. Kade AI looks at products currently in the catalog and keeps its suggestions grounded in the information available.",
    icon: Bot,
  },
  search: {
    title: "Search with a little more meaning",
    kicker: "Describe what you have in mind",
    description:
      "Use a natural phrase instead of guessing keywords. Search is grounded in the live catalog and returns matching products only.",
    icon: Search,
  },
  recommendations: {
    title: "Picked with you in mind",
    kicker: "Your personal shortlist",
    description:
      "Discover available products selected from the categories and brands in your order history.",
    icon: Heart,
  },
  compare: {
    title: "Compare your options",
    kicker: "A clearer choice",
    description:
      "Pick two or more products and get a side-by-side explanation based only on catalog details.",
    icon: Waypoints,
  },
  reviews: {
    title: "Product review insights",
    kicker: "Listen to the community",
    description:
      "Get a short summary of the common themes and sentiment in reviews stored for a product.",
    icon: MessageCircle,
  },
};

export const toolTabs: { id: AiTool; label: string }[] = [
  { id: "assistant", label: "Assistant" },
  { id: "search", label: "Smart search" },
  { id: "recommendations", label: "For you" },
  { id: "compare", label: "Compare" },
  { id: "reviews", label: "Review insights" },
];
