import Link from "next/link";

import endpoints from "@/api/endpoints";
import getPage from "@/api/getPage";
import { IProject } from "@/api/types/projects";

import styles from "./Projects.module.css";

export interface ISideNavigationProjectsProps {}

export default async function SideNavigationProjects(
  props: ISideNavigationProjectsProps,
) {
  let projects: IProject[] = [];

  const response = await getPage(endpoints.getProjects);
  if (response?.data) projects = response.data;

  return (
    <div className={styles.root}>
      <div className={styles.subtitle}>Projects</div>
      {projects.map((project) => (
        <Link
          href={`/app/dashboard#project-${project.id}`}
          className={styles.link}
        >
          <div className={styles.inner}>
            <strong>{project.name}</strong>
          </div>
        </Link>
      ))}
    </div>
  );
}
