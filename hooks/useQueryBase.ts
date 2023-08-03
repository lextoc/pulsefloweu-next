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
  options?: UseQueryOptions<
    { data: T[]; success: boolean; meta: Meta },
    unknown
  >,
): UseQueryResult<{ data: T[]; success: boolean; meta: Meta }, unknown> {
  const mergedOptions = {
    ...defaultRequestOptions,
    ...requestOptions,
  };

  return useQuery<{ data: T[]; success: boolean; meta: Meta }, unknown>({
    queryKey: [endpoint, params],
    queryFn: () =>
      fetchData(
        `${endpoint}${params ? `?${queryString.stringify(params)}` : ""}`,
        mergedOptions,
      ),
    ...options,
  });
}
