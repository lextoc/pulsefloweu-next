import {
  useQuery,
  UseQueryOptions,
  UseQueryResult,
} from "@tanstack/react-query";
import queryString from "query-string";

import { getHeaders } from "@/api/cookies";

async function fetchData(endpoint: string, requestOptions?: RequestInit) {
  const response = await fetch(endpoint, requestOptions);
  const data = await response.json();
  return data;
}

const defaultRequestOptions: RequestInit = {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    ...getHeaders(),
  },
};

export function useFetchArray<T>(
  endpoint: string,
  params?: object,
  requestOptions?: RequestInit,
  options?: UseQueryOptions<{ data: T[]; success: boolean }, unknown>,
): UseQueryResult<{ data: T[]; success: boolean }, unknown> {
  const mergedOptions = {
    ...defaultRequestOptions,
    ...requestOptions,
  };

  return useQuery<{ data: T[]; success: boolean }, unknown>({
    queryKey: [endpoint],
    queryFn: () =>
      fetchData(
        `${endpoint}${params ? `?${queryString.stringify(params)}` : ""}`,
        mergedOptions,
      ),
    ...options,
  });
}
