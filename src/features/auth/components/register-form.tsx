import Link from "next/link";
import { ArrowRight, UserRoundPlus } from "lucide-react";
import type { RegisterFormValues } from "../use-register-form";
import { RegisterContactFields } from "./register-contact-fields";
import { RegisterNameFields } from "./register-name-fields";
import { RegisterPasswordFields } from "./register-password-fields";

export function RegisterForm({
  form,
  error,
  busy,
  showPassword,
  onChange,
  onSubmit,
  onTogglePassword,
}: {
  form: RegisterFormValues;
  error: string;
  busy: boolean;
  showPassword: boolean;
  onChange: (field: keyof RegisterFormValues, value: string) => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  onTogglePassword: () => void;
}) {
  return (
    <div
      className="auth-form-wrap w-[min(100%,_490px)] p-[24px_0] max-[760px]:[align-self:start] max-[760px]:p-[0_0_25px] 
    [.auth-content_&]:w-[min(100%,_390px)] [.auth-content_&]:p-[14px_0] [.auth-content_&_>_h2]:mt-[8px] 
    [.auth-content_&_>_h2]:text-[28px] [.auth-content_&_>_h2]:leading-[1.2] max-[520px]:[.auth-content_&]:p-[9px_0] 
    max-[380px]:[.auth-content_&_>_h2]:text-[25px] [@media(max-height:760px)]:[.auth-content_&]:p-[8px_0] 
    [@media(max-height:760px)]:[.auth-content_&_>_h2]:text-[24px] [@media((max-height:_760px))]:[.auth-content_&]:p-[8px_0] 
    [@media((max-height:_760px))]:[.auth-content_&_>_h2]:text-[24px]"
    >
      <span
        className="auth-form-kicker text-[#334155] text-[9px] font-[750] tracking-[0.14em] uppercase 
      [.auth-content_&]:text-[#64748b] [.auth-content_&]:text-[10px] [.auth-content_&]:font-bold [.auth-content_&]:tracking-[0.12em] 
      [.auth-content_&]:uppercase"
      >
        Create your account
      </span>
      <h2 className="m-[8px_0_5px] text-[#26231f] text-[27px] font-[650] tracking-[-0.055em] max-[760px]:text-[25px]">
        Join the Kade community
      </h2>
      <p
        className="auth-form-intro m-[0_0_22px] text-[#334155] text-[11px] [.auth-content_&]:m-[8px_0_22px] 
      [.auth-content_&]:text-[#64748b] [.auth-content_&]:text-[12px] [.auth-content_&]:leading-[1.55] 
      [@media(max-height:760px)]:[.auth-content_&]:mb-[14px] [@media((max-height:_760px))]:[.auth-content_&]:mb-[14px]"
      >
        Create your buyer account to get started.
      </p>

      <div
        aria-label="Account type"
        className="auth-role-options auth-role-register grid grid-cols-[repeat(2,_minmax(0,_1fr))] gap-[10px] m-[0_0_4px] 
        [.auth-content_&]:gap-[10px] [.auth-content_&]:mb-[8px] [.auth-content_&_button]:min-h-[64px]
        [.auth-content_&_button]:p-[10px_13px] [.auth-content_&_button]:text-[12px] [.auth-content_&_button_small]:text-[9px] 
        [@media(max-height:760px)]:[.auth-content_&_button]:min-h-[52px] [@media((max-height:_760px))]:[.auth-content_&_button]:min-h-[52px]"
        role="group"
      >
        <button
          aria-pressed="true"
          className="selected [.ai-product-option&]:border-[#475569] [.ai-product-option&]:bg-[#faf7f2] 
          [.ai-mode-switch_button&]:bg-[#fff] [.ai-mode-switch_button&]:text-[#334155] 
          [.ai-mode-switch_button&]:[box-shadow:0_1px_3px_#1e3a8a12] [.ai-mode-switch_button&]:font-bold 
          [.auth-role-options_button&]:border-[#334155] [.auth-role-options_button&]:bg-[#f8fafc] 
          [.auth-role-options_button&]:text-[#334155] [.auth-role-options_button&]:[box-shadow:inset_0_0_0_1px_#2563eb] 
          min-h-[69px] p-[11px_13px] grid [align-content:center] gap-[4px] [border:1px_solid_#eff6ff] rounded-[8px] bg-[#fff] 
          text-[#334155] text-left text-[12px] font-bold cursor-pointer"
          type="button"
        >
          Buyer
          <small className="text-[#475569] text-[9px] font-[450]">
            Open registration
          </small>
        </button>
        <button
          aria-disabled="true"
          className="auth-role-restricted [.auth-role-options_&]:cursor-not-allowed [.auth-role-options_&]:[opacity:0.58] 
          min-h-[69px] p-[11px_13px] grid [align-content:center] gap-[4px] [border:1px_solid_#eff6ff] rounded-[8px] 
          bg-[#fff] text-[#334155] text-left text-[12px] font-bold cursor-pointer"
          disabled
          type="button"
        >
          Admin
          <small className="text-[#475569] text-[9px] font-[450]">
            Invitation required
          </small>
        </button>
      </div>
      <p
        className="auth-role-note m-[-2px_0_3px] text-[#475569] text-[9px] leading-[1.5] [.auth-content_&]:m-[0_0_12px] 
      [.auth-content_&]:text-[#64748b] [.auth-content_&]:text-[9px] [.auth-content_&]:leading-[1.45]"
      >
        Admin accounts must be created or approved by an administrator.
      </p>

      {error && (
        <div
          className="auth-alert m-[0_0_14px] p-[11px_12px] [border:1px_solid_#eff6ff] rounded-[4px] bg-[#f8fafc] 
          text-[#334155] text-[10px] leading-[1.5] [.auth-content_&]:mb-[12px] [.auth-content_&]:p-[10px_12px]"
          role="alert"
        >
          {error}
        </div>
      )}

      <form
        className="auth-form grid gap-[13px] [.auth-content_&]:gap-[15px] [@media(max-height:760px)]:[.auth-content_&]:gap-[10px] 
        [@media((max-height:_760px))]:[.auth-content_&]:gap-[10px]"
        onSubmit={onSubmit}
      >
        <RegisterNameFields form={form} onChange={onChange} />
        <RegisterContactFields form={form} onChange={onChange} />
        <RegisterPasswordFields
          form={form}
          onChange={onChange}
          onToggleVisibility={onTogglePassword}
          showPassword={showPassword}
        />
        <p
          className="auth-terms m-[0] text-[#475569] text-[9px] leading-[1.6] [.auth-content_&]:m-[1px_0] 
        [.auth-content_&]:text-[#64748b] [.auth-content_&]:text-[9px] [.auth-content_&]:leading-[1.5]"
        >
          By creating an account, you agree to Kade’s account terms and privacy
          practices.
        </p>
        <button
          className="auth-submit w-[100%] min-h-[45px] mt-[2px] p-[0_15px] inline-flex items-center justify-between 
          [border:1px_solid_#282723] rounded-[4px] bg-[#282723] text-[#fff] text-[11px] font-bold cursor-pointer 
          [transition:background_0.18s_ease] border-[#334155] rounded-[8px] bg-[#1d4ed8] [&:hover:not(:disabled)]:bg-[#2563eb] 
          [&:hover:not(:disabled)]:border-[#334155] [&:hover:not(:disabled)]:bg-[#1d4ed8] [&:disabled]:[opacity:0.65] 
          [&:disabled]:cursor-wait [.auth-content_&]:min-h-[48px] [.auth-content_&]:mt-[3px] [@media(max-height:760px)]:[.auth-content_&]:min-h-[43px] 
          [@media((max-height:_760px))]:[.auth-content_&]:min-h-[43px]"
          disabled={busy}
          type="submit"
        >
          {busy ? "Creating your account..." : "Create account"}
          {busy ? (
            <span
              className="auth-spinner w-[15px] h-[15px] [border:2px_solid_#ffffff77] [border-top-color:#fff] rounded-[50%] 
            animate-[spin_0.7s_linear_infinite]"
            />
          ) : (
            <ArrowRight size={18} />
          )}
        </button>
      </form>

      <p
        className="auth-switch m-[18px_0_0] text-[#334155] text-[10px] text-center [.auth-content_&]:mt-[20px] 
      [@media(max-height:760px)]:[.auth-content_&]:mt-[12px] [@media((max-height:_760px))]:[.auth-content_&]:mt-[12px]"
      >
        Already have an account?{" "}
        <Link
          href="/login"
          className="text-[#334155] font-bold underline [text-underline-offset:2px] ml-[3px]"
        >
          Sign in
        </Link>
      </p>
      <div
        className="auth-secure-note mt-[21px] pt-[14px] flex justify-center items-center gap-[7px] 
      [border-top:1px_solid_#f0ede8] text-[#475569] text-[9px] [border-top-color:#eff6ff] [.auth-content_&]:mt-[19px] 
      [.auth-content_&]:pt-[13px] [@media(max-height:760px)]:[.auth-content_&]:mt-[12px] 
      [@media((max-height:_760px))]:[.auth-content_&]:mt-[12px]"
      >
        <UserRoundPlus size={16} className="text-[#334155]" /> Your account is
        protected with secure sign-in.
      </div>
    </div>
  );
}
