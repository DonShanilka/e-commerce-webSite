import type { RegisterFormValues } from "../use-register-form";

export function RegisterNameFields({
  form,
  onChange,
}: {
  form: RegisterFormValues;
  onChange: (field: keyof RegisterFormValues, value: string) => void;
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
        <span>First name</span>
        <input
          autoComplete="given-name"
          maxLength={80}
          name="firstName"
          onChange={(event) => onChange("firstName", event.target.value)}
          placeholder="Your first name"
          required
          value={form.firstName}
          className="w-[100%] min-w-[0] h-[42px] p-[0_12px] [border:1px_solid_#eff6ff] rounded-[4px] outline-none bg-[#fff] 
          text-[#292723] text-[11px] font-[450] border-[#eff6ff] rounded-[8px] focus:border-[#475569] 
          focus:[box-shadow:0_0_0_3px_#93c5fd1a] focus:border-[#334155] focus:[box-shadow:0_0_0_3px_#2563eb20] placeholder:text-[#475569]"
        />
      </label>
      <label
        className="auth-field min-w-[0] grid gap-[6px] text-[#334155] text-[10px] font-[650] [.auth-content_&]:gap-[6px] 
      [.auth-content_&]:text-[#334155] [.auth-content_&]:text-[11px] [.auth-content_&_>_input]:h-[47px] 
      [.auth-content_&_>_input]:text-[12px] [@media(max-height:760px)]:[.auth-content_&_>_input]:h-[38px] 
      [@media(max-height:760px)]:[.auth-content_&_>_input]:h-[40px] [@media((max-height:_760px))]:[.auth-content_&_>_input]:h-[38px] 
      [@media((max-height:_760px))]:[.auth-content_&_>_input]:h-[40px]"
      >
        <span>Last name</span>
        <input
          autoComplete="family-name"
          maxLength={80}
          name="lastName"
          onChange={(event) => onChange("lastName", event.target.value)}
          placeholder="Your last name"
          required
          value={form.lastName}
          className="w-[100%] min-w-[0] h-[42px] p-[0_12px] [border:1px_solid_#eff6ff] rounded-[4px] outline-none bg-[#fff] 
          text-[#292723] text-[11px] font-[450] border-[#eff6ff] rounded-[8px] focus:border-[#475569] focus:[box-shadow:0_0_0_3px_#93c5fd1a] 
          focus:border-[#334155] focus:[box-shadow:0_0_0_3px_#2563eb20] placeholder:text-[#475569]"
        />
      </label>
    </div>
  );
}
