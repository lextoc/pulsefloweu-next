import { getHeaders } from "@/api/cookies";

export default function destroy(endpoint: string) {
  const requestOptions = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      ...getHeaders(),
    },
  };

  return fetch(endpoint, requestOptions).then((response) => {
    if (response.status === 204) {
      return { success: true, data: null };
    } else {
      return { success: false, errors: ["Something went wrong"] };
    }
  });
}
