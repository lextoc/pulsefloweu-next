import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthenticationData {
  accessToken?: number;
  allow_password_change?: boolean;
  email?: string;
  id?: number;
  image?: string;
  name?: string;
  nickname?: string;
  provider?: string;
  uid?: string;
}

interface AuthenticationState extends AuthenticationData {
  signIn: (data: AuthenticationData) => void;
  reset: () => void;
}

export const useAuthenticationStore = create<AuthenticationState>()(
  persist(
    (set) => ({
      data: {
        accessToken: undefined,
        allow_password_change: undefined,
        email: undefined,
        id: undefined,
        image: undefined,
        name: undefined,
        nickname: undefined,
        provider: undefined,
        uid: undefined,
      },
      signIn: (data) =>
        set(() => ({
          accessToken: data.accessToken ?? undefined,
          allow_password_change: data.allow_password_change ?? undefined,
          email: data.email ?? undefined,
          id: data.id ?? undefined,
          image: data.image ?? undefined,
          name: data.name ?? undefined,
          nickname: data.nickname ?? undefined,
          provider: data.provider ?? undefined,
          uid: data.uid ?? undefined,
        })),
      reset: () =>
        set(() => ({
          accessToken: undefined,
          allow_password_change: undefined,
          email: undefined,
          id: undefined,
          image: undefined,
          name: undefined,
          nickname: undefined,
          provider: undefined,
          uid: undefined,
        })),
    }),
    {
      name: "authentication",
    },
  ),
);
