import { IUser } from "@/api/types";

import styles from "./Main.module.css";

export interface IMainProps {
  children: React.ReactNode;
  user: IUser | null | undefined;
}

export default function Main({ children, user }: IMainProps) {
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
