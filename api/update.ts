import { getHeaders } from "@/api/cookies";

export default function update<T>(endpoint: string, values: T) {
  const requestOptions: any = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      ...getHeaders(),
    },
    body: JSON.stringify(values),
  };

  if (values instanceof FormData) {
    delete requestOptions.headers["Content-Type"];
  }

  return fetch(endpoint, requestOptions).then((response) => {
    return response.json();
  });
}
