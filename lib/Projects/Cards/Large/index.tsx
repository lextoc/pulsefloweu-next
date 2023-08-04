"use client";

import Link from "next/link";

import endpoints from "@/api/endpoints";
import { Folder } from "@/api/types/folders";
import { Project } from "@/api/types/projects";
import { useFetchArray } from "@/hooks/useQueryBase";

import ProjectMenu from "../../Menu";
import styles from "./index.module.css";

export interface ProjectsLargeCardProps {
  project: Project;
  last?: boolean;
}

export default function ProjectsLargeCard({ project }: ProjectsLargeCardProps) {
  const { data: foldersData } = useFetchArray<Folder>(
    endpoints.projects.folders(project.id || -1),
  );
  const folders: Folder[] = foldersData?.success ? foldersData.data : [];

  return (
    <div className={styles.root}>
      <header className={styles.header}>
        <Link href={`/app/projects/${project.id}`} className={styles.button}>
          <h2>{project.name}</h2>
          <p>Project</p>
        </Link>
        <ProjectMenu project={project} />
      </header>
      <div className={styles.content}>
        <ul>
          {folders.map((folder) => (
            <li key={folder.id}>
              <Link
                className={styles.folderLink}
                href={`/app/projects/${project.id}/folders/${folder.id}`}
              >
                {folder.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
