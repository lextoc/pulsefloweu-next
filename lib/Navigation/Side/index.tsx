"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import Logo from "@/components/Shared/Logo";
import SideNavigationLink from "@/lib/Navigation/Side/Link";
import SideNavigationProjects from "@/lib/Navigation/Side/Projects";

import styles from "./index.module.css";

export interface SideNavigationProps {}

export default function SideNavigation(props: SideNavigationProps) {
  const pathname = usePathname();

  if (!pathname.startsWith("/app")) return null;

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
          sub="Manage your projects"
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
