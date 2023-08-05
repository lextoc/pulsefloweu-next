import { create } from "zustand";

export interface AuthenticationData {
  accessToken?: string;
  client?: string;
  uid?: string;
}

interface AuthenticationState extends AuthenticationData {
  set: (data: Partial<AuthenticationData>) => void;
  clear: () => void;
}

export const useAuthenticationStore = create<AuthenticationState>((_set) => ({
  data: {
    accessToken: "",
    client: "",
    uid: "",
  },
  clear: () => {
    _set({
      accessToken: "",
      client: "",
      uid: "",
    });
  },
  set: (data) =>
    _set(() => ({
      ...data,
    })),
}));
