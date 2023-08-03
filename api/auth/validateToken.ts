import { RequestCookies } from "next/dist/compiled/@edge-runtime/cookies";
import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";

import { getCookies } from "@/api/cookies";
import endpoints from "@/api/endpoints";
import { Cookies, User } from "@/api/types/auth";

export type SuccessResponse = {
  success: true;
  data: User | null;
};

export type FailedResponse = {
  success: false;
  errors?: string[];
};

export default async function validateToken(
  cookies: ReadonlyRequestCookies | RequestCookies | Cookies,
): Promise<SuccessResponse | FailedResponse> {
  let _cookies: Cookies | false = false;

  // Check if cookies is a ICookies object, or try to create one.
  if (cookies.hasOwnProperty("client")) _cookies = cookies as Cookies;
  else
    _cookies = getCookies(cookies as ReadonlyRequestCookies | RequestCookies);

  const response = await fetch(endpoints.auth.validateToken, {
    headers: {
      ..._cookies,
    },
  });
  const data = await response.json();
  return data;
}
