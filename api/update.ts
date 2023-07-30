import { getHeaders } from "@/api/cookies";

export default function update<T = object | FormData>(
  endpoint: string,
  values: T,
  method: "PATCH" | "PUT" = "PATCH",
) {
  const requestOptions: any = {
    method,
    headers: {
      "Content-Type": "application/json",
      ...getHeaders(),
    },
    body: values instanceof FormData ? values : JSON.stringify(values),
  };

  if (values instanceof FormData) {
    delete requestOptions.headers["Content-Type"];
  }

  return fetch(endpoint, requestOptions).then((response) => {
    return response.json();
  });
}
