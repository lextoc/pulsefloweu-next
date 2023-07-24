import { getHeaders } from "@/api/cookies";

export default function getPage(endpoint: string): Promise<any> {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      ...getHeaders(),
    },
  };

  return fetch(endpoint, requestOptions).then((response) => {
    return response.json();
  });
}
