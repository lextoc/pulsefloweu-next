import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const isSignedIn = !!request.cookies.get("accessToken")?.value;
  console.log("🚀 ~ isSignedIn:", isSignedIn);

  // return NextResponse.redirect(new URL("/homejojo", request.url));
}
