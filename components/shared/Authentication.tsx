"use client";

import { useRouter } from "next/navigation";

import { useAuthenticationStore } from "@/stores/authentication";

export interface IAuthenticationProps {
  children: React.ReactNode;
}

export default function Authentication({ children }: IAuthenticationProps) {
  const accessToken = useAuthenticationStore((state) => state.accessToken);
  const { replace } = useRouter();

  if (accessToken) replace("/dashboard");

  return <>{children}</>;
}
