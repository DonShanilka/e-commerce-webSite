"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";

export type RegisterFormValues = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
};

const initialForm: RegisterFormValues = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  password: "",
  confirmPassword: "",
};

export function useRegisterForm() {
  const router = useRouter();
  const [form, setForm] = useState(initialForm);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  function update(field: keyof RegisterFormValues, value: string) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    if (form.password !== form.confirmPassword) {
      setError("Your passwords do not match.");
      return;
    }
    if (form.password.length < 8) {
      setError("Choose a password with at least 8 characters.");
      return;
    }

    setBusy(true);
    try {
      const data = new FormData();
      data.set("firstName", form.firstName.trim());
      data.set("lastName", form.lastName.trim());
      data.set("email", form.email.trim());
      data.set("phone", form.phone.trim());
      data.set("password", form.password);

      const response = await fetch("/api/auth/register", {
        method: "POST",
        body: data,
      });

      const result = await response.json().catch(() => ({}));
      if (!response.ok)
        throw new Error(result.message || "We could not create your account.");
      router.replace(result.signedIn ? "/" : "/login");
    } catch (cause) {
      setError(
        cause instanceof Error
          ? cause.message
          : "We could not create your account.",
      );
    } finally {
      setBusy(false);
    }
  }

  return {
    form,
    error,
    busy,
    showPassword,
    update,
    submit,
    togglePassword: () => setShowPassword((visible) => !visible),
  };
}
