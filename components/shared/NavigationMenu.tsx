"use client";

import { useRouter } from "next/navigation";

import Button from "@/components/interaction/Button";
import { useAuthenticationStore } from "@/stores/authentication";

import styles from "./NavigationMenu.module.css";

export interface INavigationMenuProps {}

export default function NavigationMenu(props: INavigationMenuProps) {
  const accessToken = useAuthenticationStore((state) => state.accessToken);
  const email = useAuthenticationStore((state) => state.email);
  const signOut = useAuthenticationStore((state) => state.reset);
  const { push } = useRouter();

  const onSignOut = () => {
    signOut();
    push("/");
  };

  if (!accessToken) return null;

  return (
    <div className={styles.root}>
      <button onClick={onSignOut}>Sign out</button>
      <div className={styles.account}>Signed in as {email}</div>
    </div>
  );
}
