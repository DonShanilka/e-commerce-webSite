import Link from "next/link";
import { ArrowRight, ShoppingBag, Sparkles } from "lucide-react";

export function ExploreFeatureGrid() {
  return (
    <section
      aria-label="Ways to explore Kade"
      className="market-feature-grid mt-[27px] grid grid-cols-[repeat(3,_minmax(0,_1fr))] gap-[15px] 
      max-[760px]:grid-cols-[1fr] max-[760px]:gap-[9px] max-[760px]:mt-[23px]"
    >
      <Link
        className="market-feature feature-sand min-h-[148px] relative overflow-hidden flex flex-col 
        items-start justify-center p-[20px_22px] rounded-[6px] text-[#25231f] isolate [&::after]:absolute 
        [&::after]:z-[-1] [&::after]:[inset:0] [&::after]:[content:''] [&::after]:[opacity:0.28] 
        [&::after]:[background-image:radial-gradient(#93c5fd1e_1px,_transparent_1px)] [&::after]:[background-size:7px_7px] 
        max-[760px]:min-h-[128px] bg-[#eff6ff]"
        href="/#trending"
      >
        <span className="market-feature-kicker max-w-[60%] text-[#334155] text-[9px] font-bold tracking-[0.1em] uppercase">
          A fresh start
        </span>
        <strong className="relative z-[1] mt-[8px] text-[19px] font-[650] tracking-[-0.045em] leading-[1.12]">
          New finds
          <br />
          for everyday.
        </strong>
        <span className="market-feature-link relative z-[1] mt-[12px] inline-flex items-center gap-[6px] text-[9px] font-bold">
          Explore now <ArrowRight size={14} />
        </span>
        <span
          aria-hidden="true"
          className="market-feature-art feature-art-bag absolute [right:13%] [bottom:17%] w-[91px] h-[91px] grid place-items-center 
          rounded-[50%] text-[#334155] bg-[#ffffff68] [transform:rotate(-8deg)] [transition:transform_0.25s_ease] 
          [.market-feature:hover_&]:[transform:rotate(0)_scale(1.06)] max-[760px]:w-[76px] max-[760px]:h-[76px] max-[760px]:[right:11%]"
        >
          <ShoppingBag size={58} strokeWidth={1.1} />
        </span>
      </Link>

      <Link
        className="market-feature feature-stone min-h-[148px] relative overflow-hidden flex flex-col items-start justify-center 
        p-[20px_22px] rounded-[6px] text-[#25231f] isolate [&::after]:absolute [&::after]:z-[-1] [&::after]:[inset:0] [&::after]:[content:''] 
        [&::after]:[opacity:0.28] [&::after]:[background-image:radial-gradient(#93c5fd1e_1px,_transparent_1px)] 
        [&::after]:[background-size:7px_7px] max-[760px]:min-h-[128px] bg-[#edecea]"
        href="/ai/recommendations"
      >
        <span className="market-feature-kicker max-w-[60%] text-[#334155] text-[9px] font-bold tracking-[0.1em] uppercase">
          Made around you
        </span>
        <strong className="relative z-[1] mt-[8px] text-[19px] font-[650] tracking-[-0.045em] leading-[1.12]">
          Find your
          <br />
          next favourite.
        </strong>
        <span className="market-feature-link relative z-[1] mt-[12px] inline-flex items-center gap-[6px] text-[9px] font-bold">
          Get your picks <ArrowRight size={14} />
        </span>
        <span
          aria-hidden="true"
          className="market-feature-art feature-art-star absolute [right:13%] [bottom:17%] w-[91px] h-[91px] grid 
          place-items-center rounded-[50%] text-[#334155] bg-[#ffffff68] [transform:rotate(-8deg)] 
          [transition:transform_0.25s_ease] [.market-feature:hover_&]:[transform:rotate(0)_scale(1.06)] max-[760px]:w-[76px] 
          max-[760px]:h-[76px] max-[760px]:[right:11%] bg-[#f8fafc]"
        >
          <Sparkles size={58} strokeWidth={1.1} />
        </span>
      </Link>

      <Link
        className="market-feature feature-dark min-h-[148px] relative overflow-hidden flex flex-col items-start 
        justify-center p-[20px_22px] rounded-[6px] text-[#25231f] isolate [&::after]:absolute [&::after]:z-[-1] [&::after]:[inset:0] 
        [&::after]:[content:''] [&::after]:[opacity:0.28] [&::after]:[background-image:radial-gradient(#93c5fd1e_1px,_transparent_1px)]
        [&::after]:[background-size:7px_7px] max-[760px]:min-h-[128px] bg-[#282723] text-[#fff]"
        href="/ai"
      >
        <span
          className="market-feature-kicker max-w-[60%] text-[#334155] text-[9px] font-bold 
        tracking-[0.1em] uppercase [.feature-dark_&]:text-[#dbeafe]"
        >
          Meet your shopping assistant
        </span>
        <strong className="relative z-[1] mt-[8px] text-[19px] font-[650] tracking-[-0.045em] leading-[1.12]">
          Ask Kade AI
          <br />
          for a hand.
        </strong>
        <span className="market-feature-link relative z-[1] mt-[12px] inline-flex items-center gap-[6px] text-[9px] font-bold">
          Try AI shopping <ArrowRight size={14} />
        </span>
        <span
          aria-hidden="true"
          className="market-feature-art feature-art-ai absolute [right:13%] [bottom:17%] w-[91px] h-[91px] grid place-items-center
        rounded-[50%] text-[#334155] bg-[#ffffff68] [transform:rotate(-8deg)] [transition:transform_0.25s_ease] 
        [.market-feature:hover_&]:[transform:rotate(0)_scale(1.06)] max-[760px]:w-[76px] max-[760px]:h-[76px] max-[760px]:[right:11%] 
        text-[#dbeafe] bg-[#ffffff12]"
        >
          <Sparkles size={60} strokeWidth={1.1} />
        </span>
      </Link>
    </section>
  );
}
