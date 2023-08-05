import {
  useQuery,
  UseQueryOptions,
  UseQueryResult,
} from "@tanstack/react-query";
import queryString from "query-string";

import { getHeaders } from "@/api/cookies";
import {
  AuthenticationData,
  useAuthenticationStore,
} from "@/stores/authentication";

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

const defaultRequestOptions = (headers: AuthenticationData): RequestInit => ({
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    ...headers,
  },
});

export function useFetch<T>(
  endpoint: string,
  params?: object,
  requestOptions?: RequestInit,
  options?: UseQueryOptions<Response<T>, unknown>,
): UseQueryResult<Response<T>, unknown> {
  const accessToken = useAuthenticationStore((state) => state.accessToken);
  const client = useAuthenticationStore((state) => state.client);
  const uid = useAuthenticationStore((state) => state.uid);

  const headers = { ["access-token"]: accessToken, client, uid };

  const mergedOptions = {
    ...defaultRequestOptions(headers),
    ...requestOptions,
  };

  return useQuery<Response<T>, unknown>({
    queryKey: [endpoint, params],
    queryFn: () =>
      fetchData(
        `${endpoint}${params ? `?${queryString.stringify(params)}` : ""}`,
        mergedOptions,
      ),
    enabled: !!headers["access-token"] && !!headers.client && !!headers.uid,
    ...options,
  });
}
