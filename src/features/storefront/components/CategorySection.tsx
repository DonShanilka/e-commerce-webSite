import {
  ArrowRight,
  Baby,
  BookOpen,
  Dumbbell,
  Flower2,
  House,
  Shirt,
  ShoppingBag,
  Smartphone,
} from "lucide-react";

const categoryIcons = [
  Smartphone,
  Shirt,
  House,
  Flower2,
  Baby,
  Dumbbell,
  BookOpen,
  ShoppingBag,
];

const categoryBackgrounds = [
  "bg-[#ecebe8]",
  "bg-[#e7e8e7]",
  "bg-[#eff6ff]",
  "bg-[#eff6ff]",
  "bg-[#eff6ff]",
  "bg-[#e9e8e5]",
  "bg-[#eff6ff]",
  "bg-[#e7ebe5]",
];

interface CategorySectionProps {
  categories: string[];
  selectedCategory: string;
  onSelect: (category: string) => void;
}

export function CategorySection({
  categories,
  selectedCategory,
  onSelect,
}: CategorySectionProps) {
  return (
    <section
      aria-labelledby="category-heading"
      className="market-section pt-[38px] [scroll-margin-top:28px] max-[760px]:pt-[31px]"
      id="categories"
    >
      <div className="market-section-heading flex items-end justify-between gap-[16px] mb-[17px] max-[430px]:items-start">
        <div>
          <span className="market-kicker block text-[#64748b] text-[10px] font-bold tracking-[0.12em] uppercase">
            Find your own style
          </span>
          <h2
            id="category-heading"
            className="m-[5px_0_0] text-[22px] font-[650] tracking-[-0.045em] max-[760px]:text-[20px]"
          >
            Shop by category
          </h2>
        </div>
        <a
          className="market-text-link inline-flex items-center gap-[7px] text-[#373530] text-[10px] font-[650] 
          [&:hover]:text-[#334155] max-[430px]:text-[8px]"
          href="#trending"
        >
          View the collection <ArrowRight size={15} />
        </a>
      </div>

      <div
        className="market-categories grid grid-cols-[repeat(8,_minmax(0,_1fr))] gap-[12px] 
      max-[760px]:grid-cols-[repeat(4,_minmax(0,_1fr))] max-[760px]:gap-[14px_8px]"
      >
        {categories.map((category, index) => {
          const Icon = categoryIcons[index % categoryIcons.length];
          return (
            <button
              key={category}
              type="button"
              aria-pressed={selectedCategory === category}
              onClick={() => onSelect(category)}
              className={`market-category grid justify-items-center gap-[8px] p-[0_4px_5px] border-0 bg-[transparent] 
                text-[#403e39] text-[10px] cursor-pointer max-[760px]:text-[8px] ${
                  selectedCategory === category ? "is-selected" : ""
                }`}
            >
              <span
                className={`market-category-icon w-[76px] h-[76px] grid place-items-center [border:1px_solid_transparent]
                     rounded-[50%] text-[#37352f] [transition:transform_0.18s_ease,_border-color_0.18s_ease] 
                     [.market-category:hover_&]:[transform:translateY(-3px)] [.market-category:hover_&]:border-[#475569] 
                     [.market-category.is-selected_&]:[transform:translateY(-3px)] [.market-category.is-selected_&]:border-[#475569] 
                     max-[760px]:w-[61px] max-[760px]:h-[61px] max-[430px]:w-[55px] max-[430px]:h-[55px] ${
                       categoryBackgrounds[index % categoryBackgrounds.length]
                     }`}
              >
                <Icon size={24} strokeWidth={1.45} />
              </span>
              <span>{category}</span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
