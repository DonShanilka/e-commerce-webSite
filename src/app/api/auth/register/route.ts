import { NextRequest, NextResponse } from "next/server";
import { setSessionCookie } from "@/src/lib/server/session-cookie";

const userServiceUrl = process.env.USER_SERVICE_URL || "http://localhost:8081";

function jsonError(message: string, status: number) {
  return NextResponse.json({ message }, { status });
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

export async function POST(request: NextRequest) {
  if (Number(request.headers.get("content-length") || 0) > 65536) {
    return jsonError("The registration form is too large.", 413);
  }

  let form: FormData;

  try {
    form = await request.formData();
  } catch {
    return jsonError(
      "Please complete the registration form and try again.",
      400,
    );
  }

  const firstName = String(form.get("firstName") || "").trim();
  const lastName = String(form.get("lastName") || "").trim();
  const email = String(form.get("email") || "")
    .trim()
    .toLowerCase();
  const phone = String(form.get("phone") || "").trim();
  const password = String(form.get("password") || "");

  if (!firstName || !lastName || !email || !phone || !password) {
    return jsonError(
      "Complete every required field to create your account.",
      400,
    );
  }

  if (firstName.length > 80 || lastName.length > 80 || phone.length > 30) {
    return jsonError("One or more fields are longer than allowed.", 400);
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254) {
    return jsonError("Enter a valid email address.", 400);
  }

  if (password.length < 8 || new TextEncoder().encode(password).length > 72) {
    return jsonError(
      "Use at least 8 characters and a password accepted by the account service.",
      400,
    );
  }

  const registration = new FormData();
  registration.set("firstName", firstName);
  registration.set("lastName", lastName);
  registration.set("email", email);
  registration.set("phone", phone);
  registration.set("password", password);

  try {
    const created = await fetch(`${userServiceUrl}/api/v1/users`, {
      method: "POST",
      body: registration,
      cache: "no-store",
      signal: AbortSignal.timeout(10000),
    });
    const createdText = await created.text();
    const createdData = parseResponse(createdText);

    if (!created.ok) {
      const message =
        typeof createdData === "string"
          ? createdData
          : isRecord(createdData) && typeof createdData.message === "string"
            ? createdData.message
            : "We could not create your account. Please try again.";
      return jsonError(message, created.status);
    }

    try {
      const signedIn = await fetch(
        `${userServiceUrl}/api/v1/users/authenticate`,
        {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ email, password }),
          cache: "no-store",
          signal: AbortSignal.timeout(10000),
        },
      );
      const auth: unknown = await signedIn.json().catch(() => null);

      if (
        signedIn.ok &&
        isRecord(auth) &&
        typeof auth.accessToken === "string"
      ) {
        const response = NextResponse.json(
          { user: auth.user, signedIn: true },
          { status: 201 },
        );
        setSessionCookie(
          response,
          auth.user,
          auth.accessToken,
          Number(auth.expiresIn),
        );
        return response;
      }
    } catch {
      // The account has already been created, so registration remains successful.
    }

    return NextResponse.json(
      { user: createdData, signedIn: false },
      { status: 201 },
    );
  } catch {
    return jsonError(
      "Could not connect to the account service. Please try again shortly.",
      502,
    );
  }
}

function parseResponse(body: string): unknown {
  try {
    return JSON.parse(body);
  } catch {
    return body;
  }
}
