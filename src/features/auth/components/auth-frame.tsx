import Link from "next/link";
import type { ReactNode } from "react";
import { X } from "lucide-react";

type AuthFrameProps = {
  children: ReactNode;
};

export function AuthFrame({ children }: AuthFrameProps) {
  return (
    <main
      className="auth-page min-h-[100vh] grid grid-cols-[minmax(320px,_0.9fr)_minmax(520px,_1.1fr)] 
    bg-[#fff] max-[760px]:grid-cols-[minmax(0,_1fr)] [.auth-page&]:fixed [.auth-page&]:z-[100] [.auth-page&]:[inset:0] 
    \[.auth-page&]:grid [.auth-page&]:grid-cols-[minmax(0,_1fr)] [.auth-page&]:min-h-[0] [.auth-page&]:h-[100dvh] 
    [.auth-page&]:place-items-center [.auth-page&]:overflow-hidden [.auth-page&]:p-[20px] [.auth-page&]:isolate 
    [.auth-page&]:bg-[transparent] max-[520px]:[.auth-page&]:p-[10px]"
    >
      <div
        aria-hidden="true"
        className="auth-backdrop absolute z-[0] [inset:-24px] overflow-hidden bg-[#dbeafe] [&::after]:absolute 
        [&::after]:[inset:0] [&::after]:[content:''] [&::after]:[background:linear-gradient(135deg,_#1d4ed85c,_#2563eb52_52%,_#eff6ff66)]"
      >
        <iframe
          aria-hidden="true"
          loading="eager"
          src="/"
          tabIndex={-1}
          title="Kade storefront"
          className="w-[145%] h-[145%] border-0 [filter:blur(3px)] [transform:scale(0.7)] [transform-origin:top_left] pointer-events-none"
        />
      </div>
      <section
        aria-modal="true"
        className="auth-modal relative z-[1] flex w-[min(100%,_460px)] min-h-[min(760px,_calc(100dvh_-_40px))] 
        max-h-[calc(100dvh_-_40px)] flex-col overflow-hidden [border:1px_solid_#ffffffb8] rounded-[18px] bg-[#fff] 
        [box-shadow:0_28px_90px_#0f172a45] animate-[auth-popup-in_220ms_ease-out_both] max-[520px]:w-[min(100%,_420px)] 
        max-[520px]:min-h-[min(760px,_calc(100dvh_-_20px))] max-[520px]:max-h-[calc(100dvh_-_20px)] 
        max-[520px]:rounded-[15px] [@media(max-height:760px)]:min-h-[calc(100dvh_-_32px)] 
        [@media(max-height:760px)]:max-h-[calc(100dvh_-_32px)] [@media((max-height:_760px))]:min-h-[calc(100dvh_-_32px)] 
        [@media((max-height:_760px))]:max-h-[calc(100dvh_-_32px)]"
        role="dialog"
      >
        <Link
          href="/"
          className="auth-brand inline-flex items-center gap-[9px] text-[#181817] text-[20px] font-[850] tracking-[0.19em] 
          whitespace-nowrap relative z-[1] [align-self:flex-start] absolute [top:25px] [left:30px] z-[2] text-[#111827] 
          text-[19px] font-extrabold tracking-[0.16em] max-[520px]:[top:20px] max-[520px]:[left:22px] max-[520px]:text-[17px] 
          [@media(max-height:760px)]:[top:17px] [@media((max-height:_760px))]:[top:17px]"
          aria-label="Kade home"
        >
          KADE<span className="text-[#475569] ml-[-8px] text-[#2563eb]">.</span>
        </Link>
        <Link
          aria-label="Close"
          className="auth-close absolute [top:18px] [right:18px] z-[2] grid w-[34px] h-[34px] place-items-center 
          [border:1px_solid_#e6eaf0] rounded-[50%] bg-[#fff] text-[#64748b] [transition:background_160ms_ease,_color_160ms_ease] 
          [&:hover]:bg-[#eff6ff] [&:hover]:text-[#1d4ed8] max-[520px]:[top:14px] max-[520px]:[right:14px] max-[520px]:w-[32px] max-[520px]:h-[32px]"
          href="/"
        >
          <X size={18} />
        </Link>
        <section
          className="auth-content min-h-[100vh] p-[28px_clamp(24px,_6vw,_90px)] grid place-items-center min-w-[0] 
        min-h-[0] [flex:1] overflow-x-hidden overflow-y-auto p-[76px_48px_36px] [scrollbar-width:thin] 
        [scrollbar-color:#bfdbfe_transparent] max-[760px]:min-h-[100vh] max-[760px]:p-[26px_22px] max-[760px]:content-start 
        max-[430px]:px-[17px] max-[520px]:p-[68px_26px_27px] max-[380px]:pr-[20px] max-[380px]:pl-[20px] [@media(max-height:760px)]:pt-[60px] [
        @media(max-height:760px)]:pb-[18px] [@media((max-height:_760px))]:pt-[60px] [@media((max-height:_760px))]:pb-[18px]"
        >
          <div className="auth-modal-form grid w-[100%] place-items-center">
            {children}
          </div>
        </section>
      </section>
    </main>
  );
}
