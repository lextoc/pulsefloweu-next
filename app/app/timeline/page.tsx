import { Header } from "@/components/Shared/Header";
import PaddingContainer from "@/components/Shared/PaddingContainer";

import styles from "./page.module.css";

export interface DashboardProps {}

export default function Dashboard(props: DashboardProps) {
  return (
    <div className={styles.root}>
      <Header>
        <PaddingContainer>
          <h1>Your calendar</h1>
          <p>Use a timeline for inserting timesheets</p>
        </PaddingContainer>
      </Header>
      <PaddingContainer>hi!</PaddingContainer>
    </div>
  );
}
