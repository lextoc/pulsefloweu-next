import { getHeaders } from "@/api/cookies";

export default function create<T>(endpoint: string, values: T) {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...getHeaders(),
    },
    body: JSON.stringify({ project: values }),
  };

  return fetch(endpoint, requestOptions).then((response) => {
    return response.json();
  });
}
