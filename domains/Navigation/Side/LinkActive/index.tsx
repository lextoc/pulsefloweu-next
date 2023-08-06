"use client";

import { usePathname } from "next/navigation";

import styles from "./index.module.css";

export interface LinkActiveProps {
  href: string;
}

export function LinkActive({ href }: LinkActiveProps) {
  const pathname = usePathname();
  return (
    <div
      className={`${styles.root} ${
        pathname.startsWith(href) ? styles.active : ""
      }`}
    />
  );
}
