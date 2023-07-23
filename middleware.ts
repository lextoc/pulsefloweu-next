import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import validateToken from "@/api/auth/validateToken";

const publicRoutes = ["/register", "/", "/forgot-password"];
const excludedPaths = ["/favicon.ico", "/_next/"];

function startsWithAnyOf(paths: string[], pathname: string) {
  return paths.some((path) => pathname.startsWith(path));
}

export async function middleware(request: NextRequest) {
  const { pathname } = new URL(request.url);

  if (startsWithAnyOf(excludedPaths, pathname)) return;

  const response = await validateToken(request.cookies);
  const isSignedIn = response.success;

  if (isSignedIn && publicRoutes.includes(pathname))
    return NextResponse.redirect(new URL("/app/dashboard", request.url));

  if (!isSignedIn && pathname.startsWith("/app/")) {
    const response = NextResponse.redirect(new URL("/", request.url));
    response.cookies.set("access-token", "", { path: "/" });
    response.cookies.set("client", "", { path: "/" });
    response.cookies.set("uid", "", { path: "/" });
    return response;
  }
}
