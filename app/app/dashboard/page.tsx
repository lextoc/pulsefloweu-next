import endpoints from "@/api/endpoints";
import getPage from "@/api/getPage";
import { CreateProjectCard } from "@/components/Projects/Cards/CreateProjectCard";
import { Header } from "@/components/shared/Header";
import PaddingContainer from "@/components/shared/PaddingContainer";

import styles from "./page.module.css";

export interface IDashboardProps {}

export default function Dashboard(props: IDashboardProps) {
  getPage(endpoints.getProjects).then((data) => {
    console.log("🚀 ~ data:", data);
  });

  return (
    <div className={styles.root}>
      <Header>
        <PaddingContainer>
          <h1>Dashboard</h1>
          <p>You're managing project directories</p>
        </PaddingContainer>
      </Header>
      <PaddingContainer>
        <h2>Project title</h2>
        <hr className="divider" />
        <CreateProjectCard />
      </PaddingContainer>
    </div>
  );
}
