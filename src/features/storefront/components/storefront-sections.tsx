"use client";

import { useState } from "react";

import {
  StorefrontHero,
  CategorySection,
  ExploreFeatureGrid,
  StoreBenefits,
  SignupSection,
} from "@/src/features/storefront/components";

const categories = [
  "Electronics",
  "Fashion",
  "Home",
  "Beauty",
  "Baby & Kids",
  "Sports",
  "Books",
  "Accessories",
];

export default function StorefrontPage() {
  const [selectedCategory, setSelectedCategory] = useState("");

  return (
    <>
      <StorefrontHero />
      <CategorySection
        categories={categories}
        selectedCategory={selectedCategory}
        onSelect={setSelectedCategory}
      />
      <ExploreFeatureGrid />
      <StoreBenefits />
      <SignupSection />
    </>
  );
}
