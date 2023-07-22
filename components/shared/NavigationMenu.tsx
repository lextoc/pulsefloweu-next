"use client";

import { useRouter } from "next/navigation";

import { clearCookies } from "@/api/cookies";
import { IUser } from "@/api/types";
import Logo from "@/components/shared/Logo";

import styles from "./NavigationMenu.module.css";

export interface INavigationMenuProps {
  user: IUser | null | undefined;
}

export default function NavigationMenu({ user }: INavigationMenuProps) {
  const { push } = useRouter();

  const onSignOut = () => {
    clearCookies();
    push("/");
  };

  if (!user) {
    clearCookies();
    return null;
  }

  if (!user?.id) return null;

  return (
    <div className={styles.root}>
      <div className={styles.account}>
        Signed in as {user?.email}
        <button onClick={onSignOut}>Sign out</button>
      </div>
    </div>
  );
}
