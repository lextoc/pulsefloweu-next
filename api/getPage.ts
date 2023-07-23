import { cookies } from "next/headers";

import { getCookies } from "@/api/cookies";

export default function getPage(endpoint: string): Promise<any> {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      ...getCookies(cookies()),
    },
  };

  return fetch(endpoint, requestOptions).then((response) => {
    return response.json();
  });
}
