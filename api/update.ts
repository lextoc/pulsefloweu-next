import { getHeaders } from "@/api/cookies";

export default function update<T>(endpoint: string, values: T) {
  const requestOptions = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      ...getHeaders(),
    },
    body: JSON.stringify(values),
  };

  return fetch(endpoint, requestOptions).then((response) => {
    return response.json();
  });
}
