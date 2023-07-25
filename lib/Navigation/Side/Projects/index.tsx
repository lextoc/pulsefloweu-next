"use client";

import { useQuery } from "@tanstack/react-query";

import endpoints from "@/api/endpoints";
import getPage from "@/api/getPage";
import { Project } from "@/api/types/projects";

import SideNavigationProject from "../Project";
import styles from "./index.module.css";

export interface SideNavigationProjectsProps {}

export default function SideNavigationProjects(
  props: SideNavigationProjectsProps,
) {
  const query = useQuery({
    queryKey: [endpoints.getProjects],
    queryFn: () => getPage(endpoints.getProjects),
  });

  let projects: Project[] = [];
  if (query.data?.success) projects = query.data?.data;

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
