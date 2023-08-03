"use client";

import endpoints from "@/api/endpoints";
import { Project } from "@/api/types/projects";
import { useFetchArray } from "@/hooks/useQueryBase";

import SideNavigationProject from "../Project";
import styles from "./index.module.css";

export interface SideNavigationProjectsProps {}

export default function SideNavigationProjects(
  props: SideNavigationProjectsProps,
) {
  const { data: projectsData } = useFetchArray<Project>(endpoints.getProjects);
  const projects: Project[] = projectsData?.success ? projectsData.data : [];

  if (!projects.length) return null;

  return (
    <div className={styles.root}>
      <div className={styles.subtitle}>Projects</div>
      <div className={styles.inner}>
        {projects.map((project) => (
          <SideNavigationProject key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
}
