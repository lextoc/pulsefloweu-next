import { RequestCookies } from "next/dist/compiled/@edge-runtime/cookies";
import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";

import { Cookies } from "@/api/types/auth";

function getCookie(name: string) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts?.pop()?.split(";").shift();
}

export function getCookies(
  cookies: ReadonlyRequestCookies | RequestCookies,
): false | Cookies {
  if (
    !cookies.get("access-token")?.value ||
    !cookies.get("client")?.value ||
    !cookies.get("uid")?.value
  )
    return false;

  return {
    ["access-token"]: cookies.get("access-token")!.value,
    client: cookies.get("client")!.value,
    uid: cookies.get("uid")!.value,
  };
}

export function setCookies(cookies: Cookies) {
  document.cookie = `access-token=${cookies["access-token"]};path=/;`;
  document.cookie = `client=${cookies.client};path=/;`;
  document.cookie = `uid=${cookies.uid};path=/;`;
}

export function clearCookies() {
  document.cookie = "access-token=;path=/;";
  document.cookie = "client=;path=/;";
  document.cookie = "uid=;path=/;";
}

export function getHeaders() {
  return {
    "access-token": getCookie("access-token")!,
    client: getCookie("client")!,
    uid: getCookie("uid")!,
  };
}
