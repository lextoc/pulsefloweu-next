"use client";

import { usePathname } from "next/navigation";
import { useContext } from "react";

import AuthenticationContext from "@/lib/Authentication/Context";

import styles from "./index.module.css";

export interface MainProps {
  children: React.ReactNode;
}

export default function Main({ children }: MainProps) {
  const pathname = usePathname();
  const user = useContext(AuthenticationContext);
  const hasNavigation = user && pathname.startsWith("/app");

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
