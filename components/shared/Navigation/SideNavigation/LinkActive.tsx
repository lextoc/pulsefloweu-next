"use client";

import { usePathname } from "next/navigation";

import styles from "./LinkActive.module.css";

export interface ILinkActiveProps {
  href: string;
}

export function LinkActive({ href }: ILinkActiveProps) {
  const pathname = usePathname();
  return (
    <div
      className={`${styles.root} ${
        pathname.startsWith(href) ? styles.active : ""
      }`}
    />
  );
}
