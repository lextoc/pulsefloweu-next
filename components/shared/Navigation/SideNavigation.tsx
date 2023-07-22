import Link from "next/link";

import { IUser } from "@/api/types";
import Logo from "@/components/shared/Logo";

import styles from "./SideNavigation.module.css";

export interface ISideNavigationProps {
  user: IUser | null | undefined;
}

export default function SideNavigation({ user }: ISideNavigationProps) {
  if (!user) return null;

  return (
    <div className={styles.root}>
      <Link href="/" className={styles.logo}>
        <Logo small white noLink />
      </Link>
      <a className={styles.link} href="#">
        <div className={styles.linkInner}>
          <strong>Get started</strong>
          <div>View your active timers</div>
        </div>
      </a>
      <a className={styles.link} href="#">
        <div className={styles.linkInner}>
          <strong>Dashboard</strong>
          <div>View project directories</div>
        </div>
      </a>
      <a className={styles.link} href="#">
        <div className={styles.linkInner}>
          <strong>Calendar</strong>
          <div>View your timeline</div>
        </div>
      </a>
    </div>
  );
}
