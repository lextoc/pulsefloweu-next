"use client";

import { createContext, use } from "react";

import validateToken from "@/api/auth/validateToken";
import { getHeaders } from "@/api/cookies";
import { IUser } from "@/api/types/auth";

const AuthenticationContext = createContext<IUser | null>(null);

export default AuthenticationContext;

export interface IAuthenticationProviderProps {
  children: React.ReactNode;
}

export function AuthenticationProvider({
  children,
}: IAuthenticationProviderProps) {
  const response = use(validateToken(getHeaders()));
  let user: IUser | null = null;
  if (response.success) user = response.data;

  return (
    <AuthenticationContext.Provider value={user}>
      {children}
    </AuthenticationContext.Provider>
  );
}
