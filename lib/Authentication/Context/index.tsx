"use client";

import { useQuery } from "@tanstack/react-query";
import { createContext } from "react";

import validateToken from "@/api/auth/validateToken";
import { getHeaders } from "@/api/cookies";
import endpoints from "@/api/endpoints";
import { User } from "@/api/types/auth";
import { useAuthenticationStore } from "@/stores/authentication";

const AuthenticationContext = createContext<User | null>(null);

export default AuthenticationContext;

export interface AuthenticationProviderProps {
  children: React.ReactNode;
  initialUser: User | null;
}

export function AuthenticationProvider({
  children,
  initialUser,
}: AuthenticationProviderProps) {
  const query = useQuery({
    queryKey: [endpoints.auth.validateToken],
    queryFn: () => validateToken(getHeaders()),
    initialData: { success: true, data: initialUser },
  });

  let user: User | null = null;
  if (query.data?.success) user = query.data?.data;

  const setAuthentication = useAuthenticationStore((state) => state.set);
  const clearAuthentication = useAuthenticationStore((state) => state.clear);
  const accessToken = useAuthenticationStore((state) => state.accessToken);
  const headers = getHeaders();

  if (headers["access-token"] && !accessToken) {
    setAuthentication({
      accessToken: headers["access-token"],
      client: headers.client,
      uid: headers.uid,
    });
  } else if (!headers["access-token"] && accessToken) {
    clearAuthentication();
  }

  return (
    <AuthenticationContext.Provider value={user}>
      {children}
    </AuthenticationContext.Provider>
  );
}
