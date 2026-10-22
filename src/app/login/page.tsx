"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, Eye, EyeOff, LockKeyhole } from "lucide-react";
import { AuthFrame } from "@/src/features/auth";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [selectedRole, setSelectedRole] = useState<"BUYER" | "ADMIN">("BUYER");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const router = useRouter();

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setError("");

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const result = await response.json();
      if (!response.ok)
        throw new Error(result.message || "Check your email and password.");

      const accountRole = String(result.user?.role || "").toUpperCase();
      if (selectedRole === "ADMIN" && accountRole !== "ADMIN") {
        throw new Error("This account does not have administrator access.");
      }

      const requested = new URLSearchParams(window.location.search).get("next");
      const destination =
        selectedRole === "ADMIN"
          ? "/admin"
          : requested?.startsWith("/") && !requested.startsWith("//")
            ? requested
            : "/";
      router.replace(destination);
    } catch (cause) {
      setError(
        cause instanceof Error
          ? cause.message
          : "Could not sign in. Please try again.",
      );
    } finally {
      setBusy(false);
    }
  }

  return (
    <AuthFrame>
      <div
        className="auth-form-wrap auth-login-wrap w-[min(100%,_490px)] p-[24px_0] max-[760px]:[align-self:start] 
      max-[760px]:p-[0_0_25px] [.auth-content_&]:w-[min(100%,_390px)] [.auth-content_&]:p-[14px_0] [.auth-content_&_>_h2]:mt-[8px] 
      [.auth-content_&_>_h2]:text-[28px] [.auth-content_&_>_h2]:leading-[1.2] 
      max-[520px]:[.auth-content_&]:p-[9px_0] max-[380px]:[.auth-content_&_>_h2]:text-[25px] 
      [@media(max-height:760px)]:[.auth-content_&]:p-[8px_0] [@media(max-height:760px)]:[.auth-content_&_>_h2]:text-[24px] 
      [@media((max-height:_760px))]:[.auth-content_&]:p-[8px_0] [@media((max-height:_760px))]:[.auth-content_&_>_h2]:text-[24px]"
      >
        <span
          className="auth-form-kicker text-[#334155] text-[9px] font-[750] tracking-[0.14em] uppercase 
        [.auth-content_&]:text-[#64748b] [.auth-content_&]:text-[10px] [.auth-content_&]:font-bold 
        [.auth-content_&]:tracking-[0.12em] [.auth-content_&]:uppercase"
        >
          Your Kade account
        </span>
        <h2 className="m-[8px_0_5px] text-[#26231f] text-[27px] font-[650] tracking-[-0.055em] max-[760px]:text-[25px]">
          Welcome back
        </h2>
        <p
          className="auth-form-intro m-[0_0_22px] text-[#334155] text-[11px] [.auth-content_&]:m-[8px_0_22px] 
        [.auth-content_&]:text-[#64748b] [.auth-content_&]:text-[12px] [.auth-content_&]:leading-[1.55] 
        [@media(max-height:760px)]:[.auth-content_&]:mb-[14px] [@media((max-height:_760px))]:[.auth-content_&]:mb-[14px]"
        >
          Choose your account type, then enter your sign-in details.
        </p>

        <div
          aria-label="Sign in as"
          className="auth-role-options grid grid-cols-[repeat(2,_minmax(0,_1fr))] gap-[10px] m-[0_0_4px] [.auth-content_&]:gap-[10px] 
          [.auth-content_&]:mb-[8px] [.auth-content_&_button]:min-h-[64px] [.auth-content_&_button]:p-[10px_13px] 
          [.auth-content_&_button]:text-[12px] [.auth-content_&_button_small]:text-[9px] [@media(max-height:760px)]:[.auth-content_&_button]:min-h-[52px] 
          [@media((max-height:_760px))]:[.auth-content_&_button]:min-h-[52px]"
          role="group"
        >
          <button
            aria-pressed={selectedRole === "BUYER"}
            className={
              selectedRole === "BUYER"
                ? "selected [.ai-product-option&]:border-[#475569] [.ai-product-option&]:bg-[#faf7f2] [.ai-mode-switch_button&]:bg-[#fff] [.ai-mode-switch_button&]:text-[#334155] [.ai-mode-switch_button&]:[box-shadow:0_1px_3px_#1e3a8a12] [.ai-mode-switch_button&]:font-bold [.auth-role-options_button&]:border-[#334155] [.auth-role-options_button&]:bg-[#f8fafc] [.auth-role-options_button&]:text-[#334155] [.auth-role-options_button&]:[box-shadow:inset_0_0_0_1px_#2563eb]"
                : ""
            }
            onClick={() => setSelectedRole("BUYER")}
            type="button"
          >
            Buyer
            <small className="text-[#475569] text-[9px] font-[450]">
              Shop and manage your orders
            </small>
          </button>
          <button
            aria-pressed={selectedRole === "ADMIN"}
            className={
              selectedRole === "ADMIN"
                ? "selected [.ai-product-option&]:border-[#475569] [.ai-product-option&]:bg-[#faf7f2] [.ai-mode-switch_button&]:bg-[#fff] [.ai-mode-switch_button&]:text-[#334155] [.ai-mode-switch_button&]:[box-shadow:0_1px_3px_#1e3a8a12] [.ai-mode-switch_button&]:font-bold [.auth-role-options_button&]:border-[#334155] [.auth-role-options_button&]:bg-[#f8fafc] [.auth-role-options_button&]:text-[#334155] [.auth-role-options_button&]:[box-shadow:inset_0_0_0_1px_#2563eb]"
                : ""
            }
            onClick={() => setSelectedRole("ADMIN")}
            type="button"
          >
            Admin
            <small className="text-[#475569] text-[9px] font-[450]">
              For authorized administrators
            </small>
          </button>
        </div>

        {error && (
          <div
            className="auth-alert m-[0_0_14px] p-[11px_12px] [border:1px_solid_#eff6ff] rounded-[4px] bg-[#f8fafc] text-[#334155] 
            text-[10px] leading-[1.5] [.auth-content_&]:mb-[12px] [.auth-content_&]:p-[10px_12px]"
            role="alert"
          >
            {error}
          </div>
        )}

        <form
          className="auth-form grid gap-[13px] [.auth-content_&]:gap-[15px] [@media(max-height:760px)]:[.auth-content_&]:gap-[10px] 
          [@media((max-height:_760px))]:[.auth-content_&]:gap-[10px]"
          onSubmit={submit}
        >
          <label
            className="auth-field min-w-[0] grid gap-[6px] text-[#334155] text-[10px] font-[650] [.auth-content_&]:gap-[6px] 
          [.auth-content_&]:text-[#334155] [.auth-content_&]:text-[11px] [.auth-content_&_>_input]:h-[47px] [.auth-content_&_>_input]:text-[12px] 
          [@media(max-height:760px)]:[.auth-content_&_>_input]:h-[38px] [@media(max-height:760px)]:[.auth-content_&_>_input]:h-[40px] 
          [@media((max-height:_760px))]:[.auth-content_&_>_input]:h-[38px] [@media((max-height:_760px))]:[.auth-content_&_>_input]:h-[40px]"
          >
            <span>Email address</span>
            <input
              autoComplete="email"
              onChange={(event) => setEmail(event.target.value)}
              placeholder="you@example.com"
              required
              type="email"
              value={email}
              className="w-[100%] min-w-[0] h-[42px] p-[0_12px] [border:1px_solid_#eff6ff] rounded-[4px] outline-none bg-[#fff] 
              text-[#292723] text-[11px] font-[450] border-[#eff6ff] rounded-[8px] focus:border-[#475569] 
              focus:[box-shadow:0_0_0_3px_#93c5fd1a] focus:border-[#334155] focus:[box-shadow:0_0_0_3px_#2563eb20] placeholder:text-[#475569]"
            />
          </label>
          <label
            className="auth-field min-w-[0] grid gap-[6px] text-[#334155] text-[10px] font-[650] [.auth-content_&]:gap-[6px] 
          [.auth-content_&]:text-[#334155] [.auth-content_&]:text-[11px] [.auth-content_&_>_input]:h-[47px] [.auth-content_&_>_input]:text-[12px] 
          [@media(max-height:760px)]:[.auth-content_&_>_input]:h-[38px] [@media(max-height:760px)]:[.auth-content_&_>_input]:h-[40px] 
          [@media((max-height:_760px))]:[.auth-content_&_>_input]:h-[38px] [@media((max-height:_760px))]:[.auth-content_&_>_input]:h-[40px]"
          >
            <span>Password</span>
            <span
              className="auth-password-wrap relative flex [.auth-content_&_>_input]:h-[47px] [.auth-content_&_>_input]:text-[12px] 
            [@media(max-height:760px)]:[.auth-content_&_>_input]:h-[38px] [@media(max-height:760px)]:[.auth-content_&_>_input]:h-[40px] 
            [@media((max-height:_760px))]:[.auth-content_&_>_input]:h-[38px] [@media((max-height:_760px))]:[.auth-content_&_>_input]:h-[40px]"
            >
              <input
                autoComplete="current-password"
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Your password"
                required
                type={showPassword ? "text" : "password"}
                value={password}
                className="w-[100%] min-w-[0] h-[42px] p-[0_12px] [border:1px_solid_#eff6ff] rounded-[4px] outline-none bg-[#fff] 
                text-[#292723] text-[11px] font-[450] border-[#eff6ff] rounded-[8px] focus:border-[#475569] 
                focus:[box-shadow:0_0_0_3px_#93c5fd1a] focus:border-[#334155] focus:[box-shadow:0_0_0_3px_#2563eb20] 
                placeholder:text-[#475569] pr-[42px]"
              />
              <button
                aria-label={showPassword ? "Hide password" : "Show password"}
                className="auth-password-toggle absolute [top:0] [right:0] w-[41px] h-[42px] grid place-items-center border-0 
                bg-[transparent] text-[#334155] cursor-pointer [.auth-content_&]:h-[47px] [@media(max-height:760px)]:[.auth-content_&]:h-[38px] 
                [@media(max-height:760px)]:[.auth-content_&]:h-[40px] [@media((max-height:_760px))]:[.auth-content_&]:h-[38px] 
                [@media((max-height:_760px))]:[.auth-content_&]:h-[40px]"
                onClick={() => setShowPassword((visible) => !visible)}
                type="button"
              >
                {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
              </button>
            </span>
          </label>
          <button
            className="auth-submit w-[100%] min-h-[45px] mt-[2px] p-[0_15px] inline-flex items-center justify-between 
            [border:1px_solid_#282723] rounded-[4px] bg-[#282723] text-[#fff] text-[11px] font-bold cursor-pointer 
            [transition:background_0.18s_ease] border-[#334155] rounded-[8px] bg-[#1d4ed8] [&:hover:not(:disabled)]:bg-[#2563eb] 
            [&:hover:not(:disabled)]:border-[#334155] [&:hover:not(:disabled)]:bg-[#1d4ed8] [&:disabled]:[opacity:0.65] 
            [&:disabled]:cursor-wait [.auth-content_&]:min-h-[48px] [.auth-content_&]:mt-[3px] 
            [@media(max-height:760px)]:[.auth-content_&]:min-h-[43px] [@media((max-height:_760px))]:[.auth-content_&]:min-h-[43px]"
            disabled={busy}
            type="submit"
          >
            {busy ? "Signing in..." : "Sign in"}
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
          New to Kade?{" "}
          <Link
            href="/register"
            className="text-[#334155] font-bold underline [text-underline-offset:2px] ml-[3px]"
          >
            Create an account
          </Link>
        </p>
        <div
          className="auth-secure-note mt-[21px] pt-[14px] flex justify-center items-center gap-[7px] [border-top:1px_solid_#f0ede8] 
        text-[#475569] text-[9px] [border-top-color:#eff6ff] [.auth-content_&]:mt-[19px] [.auth-content_&]:pt-[13px] 
        [@media(max-height:760px)]:[.auth-content_&]:mt-[12px] [@media((max-height:_760px))]:[.auth-content_&]:mt-[12px]"
        >
          <LockKeyhole size={16} className="text-[#334155]" />
          Your sign-in is encrypted and protected.
        </div>
      </div>
    </AuthFrame>
  );
}
