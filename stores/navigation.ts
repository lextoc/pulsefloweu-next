import { create } from "zustand";

interface NavigationData {
  menuTitle?: string;
}

interface NavigationState extends NavigationData {
  set: (data: Partial<NavigationData>) => void;
}

export const useNavigationStore = create<NavigationState>()((_set) => ({
  data: {
    menuTitle: "",
  },
  set: (data) =>
    _set(() => ({
      ...data
    })),
}));
