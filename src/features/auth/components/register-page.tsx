"use client";

import { AuthFrame } from "./auth-frame";
import { RegisterForm } from "./register-form";
import { useRegisterForm } from "../use-register-form";

export function RegisterPage() {
  const registration = useRegisterForm();

  return (
    <AuthFrame>
      <RegisterForm
        busy={registration.busy}
        error={registration.error}
        form={registration.form}
        onChange={registration.update}
        onSubmit={(event) => void registration.submit(event)}
        onTogglePassword={registration.togglePassword}
        showPassword={registration.showPassword}
      />
    </AuthFrame>
  );
}
