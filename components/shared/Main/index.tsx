import { useContext } from "react";

import AuthenticationContext from "@/lib/authentication/Context";

import styles from "./index.module.css";

export interface IMainProps {
  children: React.ReactNode;
}

export default function Main({ children }: IMainProps) {
  const user = useContext(AuthenticationContext);
  return (
    <main
      className={`${styles.root} ${user ? styles.withMenu : ""} ${
        user ? styles.withSidebar : ""
      }`}
    >
      {children}
    </main>
  );
}
