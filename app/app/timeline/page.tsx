import { Header } from "@/components/shared/Header";
import PaddingContainer from "@/components/shared/PaddingContainer";

import styles from "./page.module.css";

export interface IDashboardProps {}

export default function Dashboard(props: IDashboardProps) {
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
