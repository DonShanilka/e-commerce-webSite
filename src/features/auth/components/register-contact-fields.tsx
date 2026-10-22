import type { RegisterFormValues } from "../use-register-form";

export function RegisterContactFields({
  form,
  onChange,
}: {
  form: RegisterFormValues;
  onChange: (field: keyof RegisterFormValues, value: string) => void;
}) {
  return (
    <>
      <label
        className="auth-field min-w-[0] grid gap-[6px] text-[#334155] text-[10px] font-[650] [.auth-content_&]:gap-[6px] 
      [.auth-content_&]:text-[#334155] [.auth-content_&]:text-[11px] [.auth-content_&_>_input]:h-[47px] 
      [.auth-content_&_>_input]:text-[12px] [@media(max-height:760px)]:[.auth-content_&_>_input]:h-[38px] 
      [@media(max-height:760px)]:[.auth-content_&_>_input]:h-[40px] [@media((max-height:_760px))]:[.auth-content_&_>_input]:h-[38px] 
      [@media((max-height:_760px))]:[.auth-content_&_>_input]:h-[40px]"
      >
        <span>Email address</span>
        <input
          autoComplete="email"
          maxLength={254}
          name="email"
          onChange={(event) => onChange("email", event.target.value)}
          placeholder="you@example.com"
          required
          type="email"
          value={form.email}
          className="w-[100%] min-w-[0] h-[42px] p-[0_12px] [border:1px_solid_#eff6ff] rounded-[4px] outline-none bg-[#fff] 
          text-[#292723] text-[11px] font-[450] border-[#eff6ff] rounded-[8px] focus:border-[#475569] 
          focus:[box-shadow:0_0_0_3px_#93c5fd1a] focus:border-[#334155] focus:[box-shadow:0_0_0_3px_#2563eb20] 
          placeholder:text-[#475569]"
        />
      </label>
      <label
        className="auth-field min-w-[0] grid gap-[6px] text-[#334155] text-[10px] font-[650] [.auth-content_&]:gap-[6px] 
      [.auth-content_&]:text-[#334155] [.auth-content_&]:text-[11px] [.auth-content_&_>_input]:h-[47px] [.auth-content_&_>_input]:text-[12px] 
      [@media(max-height:760px)]:[.auth-content_&_>_input]:h-[38px] [@media(max-height:760px)]:[.auth-content_&_>_input]:h-[40px] 
      [@media((max-height:_760px))]:[.auth-content_&_>_input]:h-[38px] [@media((max-height:_760px))]:[.auth-content_&_>_input]:h-[40px]"
      >
        <span>Phone number</span>
        <input
          autoComplete="tel"
          maxLength={30}
          name="phone"
          onChange={(event) => onChange("phone", event.target.value)}
          placeholder="+94 77 123 4567"
          required
          type="tel"
          value={form.phone}
          className="w-[100%] min-w-[0] h-[42px] p-[0_12px] [border:1px_solid_#eff6ff] rounded-[4px] outline-none bg-[#fff] 
          text-[#292723] text-[11px] font-[450] border-[#eff6ff] rounded-[8px] focus:border-[#475569] 
          focus:[box-shadow:0_0_0_3px_#93c5fd1a] focus:border-[#334155] focus:[box-shadow:0_0_0_3px_#2563eb20] 
          placeholder:text-[#475569]"
        />
      </label>
    </>
  );
}
