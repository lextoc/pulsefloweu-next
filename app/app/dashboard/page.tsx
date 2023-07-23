import endpoints from "@/api/endpoints";
import getPage from "@/api/getPage";
import { IProject } from "@/api/types/projects";
import { CreateProjectCard } from "@/components/Projects/Cards/CreateProjectCard";
import DashboardProjectListItem from "@/components/Projects/Dashboard/ListItem";
import { Header } from "@/components/shared/Header";
import PaddingContainer from "@/components/shared/PaddingContainer";

import styles from "./page.module.css";

export interface IDashboardProps {}

export default async function Dashboard(props: IDashboardProps) {
  let projects: IProject[] = [];

  const response = await getPage(endpoints.getProjects);
  if (response?.data) projects = response.data;

  return (
    <div className={styles.root}>
      <Header>
        <PaddingContainer>
          <h1>Dashboard</h1>
          <p>Manage project directories</p>
        </PaddingContainer>
      </Header>
      <PaddingContainer>
        <div className="content">
          {projects.map((project) => (
            <DashboardProjectListItem project={project} />
          ))}
          <h2>Create project</h2>
          <CreateProjectCard />
        </div>
      </PaddingContainer>
    </div>
  );
}
