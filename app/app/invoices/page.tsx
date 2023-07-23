import { Header } from "@/components/shared/Header";
import PaddingContainer from "@/components/shared/PaddingContainer";

import styles from "./page.module.css";

export interface IDashboardProps {}

export default function Dashboard(props: IDashboardProps) {
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
