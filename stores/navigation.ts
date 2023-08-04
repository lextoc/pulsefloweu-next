import { create } from "zustand";

interface NavigationData {
  menuTitle?: string;
  shouldToggleMobileMenu?: boolean;
  isMobileMenuOpen?: boolean;
}

interface NavigationState extends NavigationData {
  set: (data: Partial<NavigationData>) => void;
}

export const useNavigationStore = create<NavigationState>()((_set) => ({
  data: {
    menuTitle: "",
    shouldToggleMobileMenu: false,
    isMobileMenuOpen: false,
  },
  set: (data) =>
    _set(() => ({
      ...data,
    })),
}));
