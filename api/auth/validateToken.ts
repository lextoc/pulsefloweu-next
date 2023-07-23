import { RequestCookies } from "next/dist/compiled/@edge-runtime/cookies";
import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";

import { getCookies } from "@/api/cookies";
import endpoints from "@/api/endpoints";
import { IUser } from "@/api/types/auth";

export type TSuccessResponse = {
  success: true;
  data: IUser;
};

export type TFailedResponse = {
  success: false;
  errors?: string[];
};

export default async function validateToken(
  cookies: ReadonlyRequestCookies | RequestCookies,
): Promise<TSuccessResponse | TFailedResponse> {
  const _cookies = getCookies(cookies);

  if (_cookies === false)
    return { success: false, errors: ["No valid cookies"] };

  const response = await fetch(endpoints.authValidateToken, {
    headers: {
      ..._cookies,
    },
  });
  const data = await response.json();
  return data;
}
