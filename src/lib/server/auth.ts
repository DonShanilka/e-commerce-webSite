import { cookies } from "next/headers";
import { jwtVerify } from "jose";
import { SESSION_COOKIE_NAMES } from "@/src/lib/server/session-cookie";

export type Session = {
  id: string;
  roles: string[];
  email?: string;
  token: string;
};

export async function getSession(): Promise<Session | null> {

  const cookieStore = await cookies();
  const tokens = SESSION_COOKIE_NAMES.map((name) => cookieStore.get(name)?.value).filter(
    (token): token is string => Boolean(token),
  );
  
  if (tokens.length === 0) return null;

  const encoded = process.env.JWT_SECRET_BASE64;
  if (!encoded) return null;

  const secret = Buffer.from(encoded, "base64");
  if (secret.length < 32) return null;

  for (const token of tokens) {
    try {
      const { payload } = await jwtVerify(token, secret, {
        algorithms: ["HS256"],
        issuer: "ecommerce-user-service",
      });
      return {
        id: String(payload.sub),
        roles: Array.isArray(payload.roles) ? payload.roles.map(String) : [],
        email: payload.email ? String(payload.email) : undefined,
        token,
      };
    } catch {
      // Continue in case another role-specific or legacy session cookie is valid.
    }
  }

  return null;
}

export function isAdmin(s: Session | null) {
  return !!s?.roles.includes("ADMIN");
}
