"use client";

import { usePathname } from "next/navigation";
import { useContext } from "react";

import AuthenticationContext from "@/lib/Authentication/Context";

import styles from "./index.module.css";

export interface IMainProps {
  children: React.ReactNode;
}

export default function Main({ children }: IMainProps) {
  const pathname = usePathname();
  const user = useContext(AuthenticationContext);
  const hasNavigation = user || pathname.startsWith("/app");

  return (
    <main
      className={`${styles.root} ${hasNavigation ? styles.withMenu : ""} ${
        hasNavigation ? styles.withSidebar : ""
      }`}
    >
      {children}
    </main>
  );
}
