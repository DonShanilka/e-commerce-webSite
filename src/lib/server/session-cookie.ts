import type { NextResponse } from "next/server";

export const SESSION_COOKIE_NAMES = [
  "kade_buyer_session",
  "kade_seller_session",
  "kade_session",
] as const;

type SessionUser = {
  role?: unknown;
  roles?: unknown;
};

export function sessionCookieName(user: unknown) {
  const account = user && typeof user === "object" ? (user as SessionUser) : {};
  const roles = [
    account.role,
    ...(Array.isArray(account.roles) ? account.roles : []),
  ].map((role) =>
    String(role ?? "")
      .toUpperCase()
      .replace(/^ROLE_/, ""),
  );

  return roles.some((role) => role === "ADMIN" || role === "SELLER")
    ? "kade_seller_session"
    : "kade_buyer_session";
}

export function clearSessionCookies(response: NextResponse) {
  for (const name of SESSION_COOKIE_NAMES) {
    response.cookies.set(name, "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 0,
    });
  }
}

export function setSessionCookie(
  response: NextResponse,
  user: unknown,
  token: string,
  expiresIn: number,
) {
  clearSessionCookies(response);
  response.cookies.set(sessionCookieName(user), token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: Math.min(Number(expiresIn) || 900, 900),
  });
}
