"use client";

import { IconX } from "@tabler/icons-react";
import { useEffect, useState } from "react";

import { useSnackbarStore } from "@/stores/snackbar";

import styles from "./index.module.css";

export interface SnackbarProps {}

export default function Snackbar(props: SnackbarProps) {
  const message = useSnackbarStore((state) => state.message);
  const type = useSnackbarStore((state) => state.type);
  const visible = useSnackbarStore((state) => state.visible);
  const hide = useSnackbarStore((state) => state.hide);

  const [timer, setTimer] = useState<NodeJS.Timeout | undefined>(undefined);

  useEffect(() => {
    if (visible && message) {
      if (timer) {
        clearTimeout(timer);
      }
      setTimer(setTimeout(() => hide(), 5000));

      return () => {
        clearTimeout(timer);
      };
    }
    if (!visible && timer) {
      clearTimeout(timer);
    }
  }, [visible, message]);

  return (
    <div className={styles.wrapper}>
      <div
        className={`${styles.root} ${visible ? "" : styles.hidden} ${
          type ? styles[type] : ""
        }`}
        onClick={hide}
      >
        <span>{message}</span>
        <IconX size="1rem" />
      </div>
    </div>
  );
}
