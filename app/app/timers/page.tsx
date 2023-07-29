"use client";

import { Header } from "@/components/Shared/Header";
import PaddingContainer from "@/components/Shared/PaddingContainer";
import { useNavigationStore } from "@/stores/navigation";

import styles from "./page.module.css";

export interface DashboardProps {}

export default function Dashboard(props: DashboardProps) {
  const set = useNavigationStore((state) => state.set);
  set({ menuTitle: "Start timing your tasks" });

  return (
    <div className={styles.root}>
      <Header>
        <PaddingContainer>
          <h1>Get started</h1>
          <p>View active timers</p>
        </PaddingContainer>
      </Header>
      <PaddingContainer>
        <p>
          First we're implementing a working folder detail page where you can
          start/stop timers. After that this page will get attention.
        </p>
      </PaddingContainer>
    </div>
  );
}
