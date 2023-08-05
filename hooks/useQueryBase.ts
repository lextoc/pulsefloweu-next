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

interface Meta {
  current_page: number;
  next_page: number | null;
  per_page: number;
  prev_page: number | null;
  total_pages: number;
  total_count: number;
}

interface Response<T> {
  data: T;
  success: boolean;
  meta: Meta;
}

const defaultRequestOptions: RequestInit = {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    ...getHeaders(),
  },
};

export function useFetch<T>(
  endpoint: string,
  params?: object,
  requestOptions?: RequestInit,
  options?: UseQueryOptions<Response<T>, unknown>,
): UseQueryResult<Response<T>, unknown> {
  const mergedOptions = {
    ...defaultRequestOptions,
    ...requestOptions,
  };

  return useQuery<Response<T>, unknown>({
    queryKey: [endpoint, params],
    queryFn: () =>
      fetchData(
        `${endpoint}${params ? `?${queryString.stringify(params)}` : ""}`,
        mergedOptions,
      ),
    enabled: !!getHeaders()["access-token"],
    ...options,
  });
}
