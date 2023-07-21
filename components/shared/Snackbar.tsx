"use client";

import { IconX } from "@tabler/icons-react";

import { useSnackbarStore } from "@/stores/snackbar";

import styles from "./Snackbar.module.css";

export interface ISnackbarProps {}

export function Snackbar(props: ISnackbarProps) {
  const message = useSnackbarStore((state) => state.message);
  const type = useSnackbarStore((state) => state.type);
  const visible = useSnackbarStore((state) => state.visible);
  const hide = useSnackbarStore((state) => state.hide);

  return (
    <div
      className={`${styles.root} ${visible ? "" : styles.hidden} ${
        type ? styles[type] : ""
      }`}
      onClick={hide}
    >
      <span>{message}</span>
      <IconX />
    </div>
  );
}
