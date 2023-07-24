import Link from "next/link";

import { IUser } from "@/api/types/auth";
import Logo from "@/components/shared/Logo";

import styles from "./index.module.css";
import SideNavigationLink from "./Link";
import SideNavigationProjects from "./Projects";

export interface ISideNavigationProps {
  user: IUser | null | undefined;
}

export default function SideNavigation({ user }: ISideNavigationProps) {
  if (!user) return null;

  return (
    <div className={styles.root}>
      <div className={styles.secondRoot} />
      <div className={styles.thirdRoot} />
      <div className={styles.logoWrapper}>
        <Link href="/" className={styles.logo}>
          <Logo small white noLink />
        </Link>
      </div>
      <div className={styles.inner}>
        <SideNavigationLink
          href="/app/timers"
          title="Get started"
          sub="View your active timers"
        />
        <SideNavigationLink
          href="/app/dashboard"
          title="Dashboard"
          sub="Manage project directories"
        />
        <SideNavigationLink
          href="/app/timeline"
          title="Calendar"
          sub="Use a timeline for inserting timesheets"
        />
        <SideNavigationLink
          href="/app/invoices"
          title="Invoice generator"
          sub="Create an invoice for a specific date range"
        />
        <SideNavigationProjects />
      </div>
    </div>
  );
}
