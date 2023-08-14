"use client";

import { useTimeout } from "@mantine/hooks";
import Link from "next/link";
import { usePathname } from "next/navigation";

import Logo from "@/components/Shared/Logo";
import SideNavigationLink from "@/modules/Navigation/Side/Link";
import SideNavigationProjects from "@/modules/Navigation/Side/Projects";
import SideNavigationRunningTimeEntries from "@/modules/Navigation/Side/RunningTimeEntries";
import { useNavigationStore } from "@/stores/navigation";

import styles from "./index.module.css";

export interface SideNavigationProps {}

export default function SideNavigation() {
  const pathname = usePathname();
  const shouldToggleMobileMenu = useNavigationStore(
    (state) => state.shouldToggleMobileMenu,
  );
  const isMobileMenuOpen = useNavigationStore(
    (state) => state.isMobileMenuOpen,
  );
  const set = useNavigationStore((state) => state.set);

  const { start } = useTimeout(
    () => set({ shouldToggleMobileMenu: false }),
    50,
  );

  if (!pathname.startsWith("/app")) return null;

  const onLinkClick = () => {
    set({ shouldToggleMobileMenu: true });
    start();
  };

  return (
    <>
      <button
        className={`${styles.mobileOverlay} ${
          shouldToggleMobileMenu ? styles.opacityOverlay : ""
        } ${isMobileMenuOpen ? styles.opacityOverlay : ""}`}
        aria-label="Close mobile menu"
        onClick={onLinkClick}
      />
      <div
        className={`${styles.root} ${
          shouldToggleMobileMenu ? styles.moveOut : ""
        } ${isMobileMenuOpen ? styles.moveIn : ""}`}
      >
        <div className={styles.secondRoot} aria-hidden="true" />
        <div className={styles.thirdRoot} aria-hidden="true" />
        <div className={styles.logoWrapper}>
          <Link href="/" className={styles.logo} onClick={onLinkClick}>
            <Logo small white noLink />
          </Link>
        </div>
        <div className={styles.inner}>
          <SideNavigationRunningTimeEntries />
          <SideNavigationLink
            href="/app/get-started"
            title="Get started"
            sub="Start inserting time entries for your tasks"
          />
          <SideNavigationLink
            href="/app/dashboard"
            title="Dashboard"
            sub="Manage your projects"
          />
          {/* <SideNavigationLink
          href="/app/timeline"
          title="Calendar"
          sub="Use a timeline for inserting time entries"
          wip
        /> */}
          <SideNavigationLink
            href="/app/timesheets"
            title="Timesheets generator"
            sub="Generate timesheets for a specific date range"
            wip
          />
          <SideNavigationProjects />
        </div>
      </div>
    </>
  );
}
