import queryString from "query-string";

import { getHeaders } from "@/api/cookies";

export default function getPage(endpoint: string, params?: {}): Promise<any> {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      ...getHeaders(),
    },
  };

  return fetch(
    `${endpoint}${params ? `?${queryString.stringify(params)}` : ""}`,
    requestOptions,
  ).then((response) => {
    return response.json();
  });
}
