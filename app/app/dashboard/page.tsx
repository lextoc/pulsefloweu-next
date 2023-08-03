"use client";

import endpoints from "@/api/endpoints";
import { Project } from "@/api/types/projects";
import { Header } from "@/components/Shared/Header";
import PaddingContainer from "@/components/Shared/PaddingContainer";
import { useFetchArray } from "@/hooks/useQueryBase";
import { ProjectCreateCard } from "@/lib/Projects/Cards/Create";
import ProjectsLargeCard from "@/lib/Projects/Cards/Large";
import { useNavigationStore } from "@/stores/navigation";

import styles from "./page.module.css";

export interface AppDashboardProps {}

export default function AppDashboard(props: AppDashboardProps) {
  const set = useNavigationStore((state) => state.set);
  set({ menuTitle: "Create projects and manage memberships and permissions" });

  const { data: projectsData } = useFetchArray<Project>(endpoints.projects.main);
  const projects: Project[] = projectsData?.success ? projectsData.data : [];

  return (
    <div className={styles.root}>
      <Header>
        <PaddingContainer>
          <h1>Dashboard</h1>
          <p>Manage your projects</p>
        </PaddingContainer>
      </Header>
      <PaddingContainer>
        <div className="content">
          <div className="big-cards">
            {projects.map((project) => (
              <ProjectsLargeCard key={project.id} project={project} />
            ))}
          </div>
          <div className={styles.create}>
            <h2>Create project</h2>
            <ProjectCreateCard />
          </div>
        </div>
      </PaddingContainer>
    </div>
  );
}
