import Link from "next/link";
import { ArrowRight, UserRound } from "lucide-react";

export function SignupSection() {
  return (
    <section
      className="market-newsletter min-h-[128px] mt-[38px] p-[22px_29px] flex items-center gap-[19px] 
    rounded-[5px] bg-[#f2efea] max-[760px]:flex-wrap max-[760px]:p-[18px] max-[760px]:gap-[12px]"
    >
      <span
        className="market-newsletter-art w-[57px] h-[57px] [flex:0_0_57px] grid place-items-center [border:1px_solid_#eff6ff] 
      rounded-[50%] bg-[#eff6ff] text-[#334155] max-[760px]:w-[44px] max-[760px]:h-[44px] max-[760px]:[flex-basis:44px]"
      >
        <UserRound size={34} strokeWidth={1.2} />
      </span>
      
      <div className="max-[760px]:[flex:1] max-[760px]:min-w-[190px]">
        <span className="market-kicker block text-[#64748b] text-[10px] font-bold tracking-[0.12em] uppercase">
          Your own little corner
        </span>
        <h2 className="m-[5px_0] text-[16px] font-[650] tracking-[-0.03em] max-[760px]:text-[13px]">
          Good finds feel even better when they are yours.
        </h2>
        <p className="m-[0] text-[#334155] text-[10px] max-[760px]:leading-[1.5]">
          Create an account to explore recommendations shaped around your
          orders.
        </p>
      </div>

      <Link
        className="market-button market-button-light min-h-[43px] w-[fit-content] inline-flex justify-center items-center gap-[11px]
        p-[0_18px] [border:1px_solid_#242320] rounded-[4px] bg-[#242320] text-[#fff] text-[11px] font-bold 
        [transition:transform_0.18s_ease,_background_0.18s_ease,_border-color_0.18s_ease] cursor-pointer 
        [&:hover:not(:disabled)]:[transform:translateY(-1px)] [&:hover:not(:disabled)]:border-[#334155] [&:hover:not(:disabled)]:bg-[#2563eb]
        [&:disabled]:[opacity:0.6] [&:disabled]:cursor-wait [.market-hero_&]:mt-[10px] [.bag-empty_&]:mt-[9px] 
        [.ai-hub-hero_&]:mt-[17px] max-[760px]:[.admin-ai-controls_&]:w-[100%] max-[430px]:[.ai-form-bottom_&]:w-[100%] 
        [.admin-ai-controls_&]:flex-none ml-[auto] flex-none bg-[#fff] border-[#eff6ff] text-[#292722] [&:hover:not(:disabled)]:text-[#fff] 
        max-[760px]:ml-[56px]"
        href="/register"
      >
        Join Kade <ArrowRight size={16} />
      </Link>
    </section>
  );
}
