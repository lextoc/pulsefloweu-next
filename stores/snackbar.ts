import { create } from "zustand";

interface SnackbarData {
  message?: string;
  type?: "default" | "error" | "success" | "warning";
  visible?: boolean;
}

interface SnackbarState extends SnackbarData {
  show: (data: SnackbarData) => void;
  hide: () => void;
}

export const useSnackbarStore = create<SnackbarState>((set) => ({
  data: {
    message: "",
    type: "",
    visible: false,
  },
  show: (data) =>
    set(() => ({
      message: data.message ?? "",
      type: data.type ?? "default",
      visible: true,
    })),
  hide: () =>
    set(() => ({
      visible: false,
    })),
}));
