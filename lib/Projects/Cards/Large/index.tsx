"use client";

import { IconArrowBigRightLines } from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

import endpoints from "@/api/endpoints";
import getPage from "@/api/getPage";
import { Folder } from "@/api/types/folders";
import { Project } from "@/api/types/projects";

import ProjectMenu from "../../Menu";
import styles from "./index.module.css";

export interface ProjectsLargeCardProps {
  project: Project;
  last?: boolean;
}

export default function ProjectsLargeCard({ project }: ProjectsLargeCardProps) {
  const query = useQuery({
    queryKey: [endpoints.getFoldersFromProject(project.id!)],
    queryFn: () => getPage(endpoints.getFoldersFromProject(project.id!)),
  });

  let folders: Folder[] = [];
  if (query.data?.success) folders = query.data?.data;

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
            <li>
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
