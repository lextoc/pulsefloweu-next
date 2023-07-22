import PaddingContainer from "@/components/shared/PaddingContainer";

import styles from "./page.module.css";

export interface IDashboardProps {}

export default function Dashboard(props: IDashboardProps) {
  return (
    <div className={styles.root}>
      <PaddingContainer>
        <h1>Get started</h1>
        <p>View your active timers</p>
      </PaddingContainer>
    </div>
  );
}
