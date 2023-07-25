"use client";

import { useQuery } from "@tanstack/react-query";
import { createContext } from "react";

import validateToken from "@/api/auth/validateToken";
import { getHeaders } from "@/api/cookies";
import endpoints from "@/api/endpoints";
import { User } from "@/api/types/auth";

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
    queryKey: [endpoints.authValidateToken],
    queryFn: () => validateToken(getHeaders()),
    initialData: { success: true, data: initialUser },
  });

  let user: User | null = null;
  if (query.data?.success) user = query.data?.data;

  return (
    <AuthenticationContext.Provider value={user}>
      {children}
    </AuthenticationContext.Provider>
  );
}
