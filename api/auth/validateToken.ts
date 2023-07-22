import { RequestCookies } from "next/dist/compiled/@edge-runtime/cookies";
import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";

import { getCookies } from "@/api/cookies";
import { IUser } from "@/api/types";

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

  const { accessToken, client, uid } = _cookies;
  const response = await fetch("http://localhost:3000/auth/validate_token", {
    headers: {
      "access-token": accessToken,
      client,
      uid,
    },
  });
  const data = await response.json();
  return data;
}
