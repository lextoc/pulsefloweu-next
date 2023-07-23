import { Header } from "@/components/shared/Header";
import PaddingContainer from "@/components/shared/PaddingContainer";

import styles from "./page.module.css";

export interface IDashboardProps {}

export default function Dashboard(props: IDashboardProps) {
  return (
    <div className={styles.root}>
      <Header>
        <PaddingContainer>
          <h1>Get started</h1>
          <p>View active timers</p>
        </PaddingContainer>
      </Header>
      <PaddingContainer>:3</PaddingContainer>
    </div>
  );
}
