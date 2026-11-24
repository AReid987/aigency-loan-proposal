import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { AUTH_COOKIE, expectedToken, safeEqual } from "@/lib/auth";

// Paths that must remain reachable without a password.
const PUBLIC_PATHS = ["/login", "/api/auth", "/favicon.ico", "/icon.svg"];

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (PUBLIC_PATHS.some((p) => pathname.startsWith(p))) {
    return NextResponse.next();
  }

  const token = req.cookies.get(AUTH_COOKIE)?.value ?? "";
  if (safeEqual(token, await expectedToken())) {
    return NextResponse.next();
  }

  const url = req.nextUrl.clone();
  url.pathname = "/login";
  url.searchParams.set("from", pathname);
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|icon.svg).*)"],
};