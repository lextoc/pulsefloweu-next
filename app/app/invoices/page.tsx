import { Header } from "@/components/Shared/Header";
import PaddingContainer from "@/components/Shared/PaddingContainer";

import styles from "./page.module.css";

export interface DashboardProps {}

export default function Dashboard(props: DashboardProps) {
  return (
    <div className={styles.root}>
      <Header>
        <PaddingContainer>
          <h1>Invoice generator</h1>
          <p>Create an invoice for a specific date range</p>
        </PaddingContainer>
      </Header>
      <PaddingContainer>hi!</PaddingContainer>
    </div>
  );
}
