import { RequestCookies } from "next/dist/compiled/@edge-runtime/cookies";
import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";

import { ICookies } from "@/api/types";

function getCookie(name: string) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts?.pop()?.split(";").shift();
}

export function getCookies(
  cookies: ReadonlyRequestCookies | RequestCookies,
): false | ICookies {
  if (
    !cookies.get("accessToken")?.value ||
    !cookies.get("client")?.value ||
    !cookies.get("uid")?.value
  )
    return false;

  return {
    accessToken: cookies.get("accessToken")!.value,
    client: cookies.get("client")!.value,
    uid: cookies.get("uid")!.value,
  };
}

export function setCookies(cookies: ICookies) {
  document.cookie = `accessToken=${cookies.accessToken};path=/;`;
  document.cookie = `client=${cookies.client};path=/;`;
  document.cookie = `uid=${cookies.uid};path=/;`;
}

export function clearCookies() {
  document.cookie = "accessToken=;path=/;";
  document.cookie = "client=;path=/;";
  document.cookie = "uid=;path=/;";
}

export function getHeaders() {
  return {
    "access-token": getCookie("accessToken")!,
    client: getCookie("client")!,
    uid: getCookie("uid")!,
  };
}