"use client";

import { useQuery } from "@tanstack/react-query";
import { createContext } from "react";

import validateToken from "@/api/auth/validateToken";
import { getHeaders } from "@/api/cookies";
import endpoints from "@/api/endpoints";
import { IUser } from "@/api/types/auth";

const AuthenticationContext = createContext<IUser | null>(null);

export default AuthenticationContext;

export interface IAuthenticationProviderProps {
  children: React.ReactNode;
  initialUser: IUser | null;
}

export function AuthenticationProvider({
  children,
  initialUser,
}: IAuthenticationProviderProps) {
  const query = useQuery({
    queryKey: [endpoints.authValidateToken],
    queryFn: () => validateToken(getHeaders()),
    initialData: { success: true, data: initialUser },
  });

  let user: IUser | null = null;
  if (query.data?.success) user = query.data?.data;

  return (
    <AuthenticationContext.Provider value={user}>
      {children}
    </AuthenticationContext.Provider>
  );
}
