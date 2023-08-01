import { RequestCookies } from "next/dist/compiled/@edge-runtime/cookies";
import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";

import { Cookies } from "@/api/types/auth";

function getCookie(name: string) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  return parts.length === 2 ? parts.pop()?.split(";").shift() : "";
}

export function getCookies(
  cookies: ReadonlyRequestCookies | RequestCookies,
): Cookies {
  const accessToken = cookies.get("access-token")?.value || "";
  const client = cookies.get("client")?.value || "";
  const uid = cookies.get("uid")?.value || "";

  return {
    "access-token": accessToken,
    client,
    uid,
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
    "access-token": getCookie("access-token") || "",
    client: getCookie("client") || "",
    uid: getCookie("uid") || "",
  };
}
