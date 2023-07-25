import { Header } from "@/components/Shared/Header";
import PaddingContainer from "@/components/Shared/PaddingContainer";

import styles from "./page.module.css";

export interface DashboardProps {}

export default function Dashboard(props: DashboardProps) {
  return (
    <div className={styles.root}>
      <Header>
        <PaddingContainer>
          <h1>Get started</h1>
          <p>View active timers</p>
        </PaddingContainer>
      </Header>
      <PaddingContainer>Timerssss</PaddingContainer>
    </div>
  );
}
