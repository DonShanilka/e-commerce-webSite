import { Eye, EyeOff } from "lucide-react";
import type { RegisterFormValues } from "../use-register-form";

export function RegisterPasswordFields({
  form,
  showPassword,
  onChange,
  onToggleVisibility,
}: {
  form: RegisterFormValues;
  showPassword: boolean;
  onChange: (field: keyof RegisterFormValues, value: string) => void;
  onToggleVisibility: () => void;
}) {
  return (
    <div
      className="auth-field-row grid grid-cols-[repeat(2,_minmax(0,_1fr))] gap-[12px] max-[430px]:grid-cols-[1fr] 
    max-[430px]:gap-[12px] [.auth-content_&]:grid-cols-[1fr] [.auth-content_&]:gap-[15px] 
    min-[521px]:[.auth-content_&]:grid-cols-[repeat(2,_minmax(0,_1fr))] min-[521px]:[.auth-content_&]:gap-[12px] 
    [@media(max-height:760px)]:[.auth-content_&]:gap-[10px] [@media((max-height:_760px))]:[.auth-content_&]:gap-[10px]"
    >
      <label
        className="auth-field min-w-[0] grid gap-[6px] text-[#334155] text-[10px] font-[650] [.auth-content_&]:gap-[6px] 
      [.auth-content_&]:text-[#334155] [.auth-content_&]:text-[11px] [.auth-content_&_>_input]:h-[47px] 
      [.auth-content_&_>_input]:text-[12px] [@media(max-height:760px)]:[.auth-content_&_>_input]:h-[38px] 
      [@media(max-height:760px)]:[.auth-content_&_>_input]:h-[40px] [@media((max-height:_760px))]:[.auth-content_&_>_input]:h-[38px] 
      [@media((max-height:_760px))]:[.auth-content_&_>_input]:h-[40px]"
      >
        <span>Password</span>
        <span
          className="auth-password-wrap relative flex [.auth-content_&_>_input]:h-[47px] [.auth-content_&_>_input]:text-[12px] 
        [@media(max-height:760px)]:[.auth-content_&_>_input]:h-[38px] [@media(max-height:760px)]:[.auth-content_&_>_input]:h-[40px] 
        [@media((max-height:_760px))]:[.auth-content_&_>_input]:h-[38px] [@media((max-height:_760px))]:[.auth-content_&_>_input]:h-[40px]"
        >
          <input
            autoComplete="new-password"
            minLength={8}
            name="password"
            onChange={(event) => onChange("password", event.target.value)}
            placeholder="At least 8 characters"
            required
            type={showPassword ? "text" : "password"}
            value={form.password}
            className="w-[100%] min-w-[0] h-[42px] p-[0_12px] [border:1px_solid_#eff6ff] rounded-[4px] outline-none bg-[#fff] 
            text-[#292723] text-[11px] font-[450] border-[#eff6ff] rounded-[8px] focus:border-[#475569] focus:[box-shadow:0_0_0_3px_#93c5fd1a]
            focus:border-[#334155] focus:[box-shadow:0_0_0_3px_#2563eb20] placeholder:text-[#475569] pr-[42px]"
          />
          <button
            aria-label={showPassword ? "Hide password" : "Show password"}
            className="auth-password-toggle absolute [top:0] [right:0] w-[41px] h-[42px] grid place-items-center border-0 
            bg-[transparent] text-[#334155] cursor-pointer [.auth-content_&]:h-[47px] [@media(max-height:760px)]:[.auth-content_&]:h-[38px] 
            [@media(max-height:760px)]:[.auth-content_&]:h-[40px] [@media((max-height:_760px))]:[.auth-content_&]:h-[38px] 
            [@media((max-height:_760px))]:[.auth-content_&]:h-[40px]"
            onClick={onToggleVisibility}
            type="button"
          >
            {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
          </button>
        </span>
      </label>
      <label
        className="auth-field min-w-[0] grid gap-[6px] text-[#334155] text-[10px] font-[650] [.auth-content_&]:gap-[6px] 
      [.auth-content_&]:text-[#334155] [.auth-content_&]:text-[11px] [.auth-content_&_>_input]:h-[47px] [.auth-content_&_>_input]:text-[12px] 
      [@media(max-height:760px)]:[.auth-content_&_>_input]:h-[38px] [@media(max-height:760px)]:[.auth-content_&_>_input]:h-[40px] 
      [@media((max-height:_760px))]:[.auth-content_&_>_input]:h-[38px] [@media((max-height:_760px))]:[.auth-content_&_>_input]:h-[40px]"
      >
        <span>Confirm password</span>
        <input
          autoComplete="new-password"
          minLength={8}
          name="confirmPassword"
          onChange={(event) => onChange("confirmPassword", event.target.value)}
          placeholder="Type it again"
          required
          type={showPassword ? "text" : "password"}
          value={form.confirmPassword}
          className="w-[100%] min-w-[0] h-[42px] p-[0_12px] [border:1px_solid_#eff6ff] rounded-[4px] outline-none bg-[#fff] text-[#292723] 
          text-[11px] font-[450] border-[#eff6ff] rounded-[8px] focus:border-[#475569] focus:[box-shadow:0_0_0_3px_#93c5fd1a] 
          focus:border-[#334155] focus:[box-shadow:0_0_0_3px_#2563eb20] placeholder:text-[#475569]"
        />
      </label>
    </div>
  );
}
