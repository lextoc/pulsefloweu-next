import { CreateProjectCard } from "@/components/Projects/Cards/CreateProjectCard";
import PaddingContainer from "@/components/shared/PaddingContainer";

import styles from "./page.module.css";

export interface IDashboardProps {}

export default function Dashboard(props: IDashboardProps) {
  return (
    <div className={styles.root}>
      <PaddingContainer>
        <h1>Dashboard</h1>
        <p>Manage project directories</p>
        <CreateProjectCard />
      </PaddingContainer>
    </div>
  );
}
