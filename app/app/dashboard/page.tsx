"use client";

import { useQuery } from "@tanstack/react-query";

import endpoints from "@/api/endpoints";
import getPage from "@/api/getPage";
import { IProject } from "@/api/types/projects";
import { Header } from "@/components/Shared/Header";
import PaddingContainer from "@/components/Shared/PaddingContainer";
import { CreateProjectCard } from "@/lib/Projects/Cards/Create";
import DashboardProjectListItem from "@/lib/Projects/ListItem";

import styles from "./page.module.css";

export interface IDashboardProps {}

export default function Dashboard(props: IDashboardProps) {
  const query = useQuery({
    queryKey: [endpoints.getProjects],
    queryFn: () => getPage(endpoints.getProjects),
  });

  let projects: IProject[] = [];
  if (query.data?.success) projects = query.data?.data;

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
            <DashboardProjectListItem key={project.id} project={project} />
          ))}
          <h2>Create project</h2>
          <CreateProjectCard />
        </div>
      </PaddingContainer>
    </div>
  );
}
