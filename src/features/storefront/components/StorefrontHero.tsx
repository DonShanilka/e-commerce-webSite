import {
  ArrowRight,
  PackageCheck,
  ShieldCheck,
  Sparkles,
  Truck,
} from "lucide-react";

export function StorefrontHero() {
  return (
    <section
      aria-labelledby="hero-title"
      className="market-hero min-h-[383px] relative overflow-hidden flex items-center rounded-[7px] bg-[#eff6ff] 
      [background-image:url('/hero-room.svg')] [background-position:center] [background-size:cover] [&::after]:absolute 
      [&::after]:[inset:0] [&::after]:[content:''] [&::after]:pointer-events-none 
      [&::after]:[background:linear-gradient(90deg,_#eff6ff_0%,_#eff6fff5_32%,_#eff6ffbd_48%,_transparent_70%)] 
      max-[760px]:min-h-[350px] max-[760px]:[background-position:59%_center] 
      max-[760px]:[&::after]:[background:linear-gradient(90deg,_#eff6ff_0%,_#eff6ffef_45%,_#eff6ffa8_67%,_transparent_100%)] 
      max-[430px]:min-h-[330px] max-[430px]:[background-position:63%_center]"
    >
      <div
        className="market-hero-content relative z-[1] w-[min(55%,_650px)] p-[44px_0_31px_7.4%] max-[760px]:w-[76%] 
      max-[760px]:p-[34px_0_25px_7%] max-[430px]:w-[88%] max-[430px]:pl-[6%]"
      >
        <span
          className="market-eyebrow inline-flex items-center gap-[7px] text-[#334155] text-[10px] font-[750] 
        tracking-[0.12em] uppercase max-[430px]:text-[8px]"
        >
          <Sparkles size={15} /> Quality. Style. Everyday.
        </span>

        <h1
          id="hero-title"
          className="m-[16px_0_12px] text-[#201f1d] text-[clamp(38px,_4.8vw,_58px)] font-[650] tracking-[-0.065em] 
          leading-[1.04] max-[760px]:text-[clamp(34px,_8vw,_48px)] max-[430px]:text-[34px]"
        >
          Everything you love,
          <br />
          <span className="text-[#334155]">all in one place.</span>
        </h1>

        <p className="max-w-[385px] text-[#334155] text-[13px] leading-[1.7] max-[760px]:max-w-[290px] max-[760px]:text-[11px]">
          Shop thoughtful finds across every category, with an experience made
          for you.
        </p>

        <a
          className="market-button min-h-[43px] w-[fit-content] inline-flex justify-center items-center gap-[11px] p-[0_18px] 
          [border:1px_solid_#242320] rounded-[4px] bg-[#242320] text-[#fff] text-[11px] font-bold 
          [transition:transform_0.18s_ease,_background_0.18s_ease,_border-color_0.18s_ease] cursor-pointer 
          [&:hover:not(:disabled)]:[transform:translateY(-1px)] [&:hover:not(:disabled)]:border-[#334155] [
          &:hover:not(:disabled)]:bg-[#2563eb] [&:disabled]:[opacity:0.6] [&:disabled]:cursor-wait [.market-hero_&]:mt-[10px] 
          [.bag-empty_&]:mt-[9px] [.ai-hub-hero_&]:mt-[17px] max-[760px]:[.admin-ai-controls_&]:w-[100%] max-[430px]:[.ai-form-bottom_&]:w-[100%] 
          [.admin-ai-controls_&]:flex-none"
          href="#trending"
        >
          Explore the collection <ArrowRight size={17} />
        </a>

        <div
          className="market-hero-promises mt-[27px] flex flex-wrap gap-[20px] text-[#334155] text-[10px] max-[760px]:max-w-[275px] 
        max-[760px]:gap-[9px_14px] max-[760px]:text-[8px] max-[430px]:max-w-[240px]"
        >
          <span className="text-[#334155] inline-flex items-center gap-[7px]">
            <ShieldCheck size={16} /> Secure account
          </span>

          <span className="text-[#334155] inline-flex items-center gap-[7px]">
            <PackageCheck size={16} /> Thoughtful picks
          </span>

          <span className="text-[#334155] inline-flex items-center gap-[7px]">
            <Truck size={16} /> Islandwide service
          </span>
        </div>
      </div>

      <div aria-hidden="true" className="market-hero-art" />
    </section>
  );
}
