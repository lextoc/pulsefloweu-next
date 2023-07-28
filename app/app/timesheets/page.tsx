import { Header } from "@/components/Shared/Header";
import PaddingContainer from "@/components/Shared/PaddingContainer";

import styles from "./page.module.css";

export interface DashboardProps {}

export default function Dashboard(props: DashboardProps) {
  return (
    <div className={styles.root}>
      <Header>
        <PaddingContainer>
          <h1>
            Timesheets generator <span className="wip" />
          </h1>
          <p>Generate timesheets for a specific date range</p>
        </PaddingContainer>
      </Header>
      <PaddingContainer>
        <p>We're currently not working on this feature but it will be there.</p>
      </PaddingContainer>
    </div>
  );
}
