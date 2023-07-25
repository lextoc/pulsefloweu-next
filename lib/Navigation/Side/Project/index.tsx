"use client";

import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

import endpoints from "@/api/endpoints";
import getPage from "@/api/getPage";
import { Folder } from "@/api/types/folders";
import { Project } from "@/api/types/projects";

import styles from "./index.module.css";

export interface SideNavigationProjectProps {
  project: Project;
}

export default function SideNavigationProject({
  project,
}: SideNavigationProjectProps) {
  const query = useQuery({
    queryKey: [endpoints.getFoldersFromProject(project.id!)],
    queryFn: () => getPage(endpoints.getFoldersFromProject(project.id!)),
  });

  let folders: Folder[] = [];
  if (query.data?.success) folders = query.data?.data;

  return (
    <div className={styles.root}>
      <Link
        href={`/app/dashboard#project-${project.id}`}
        className={styles.link}
      >
        <div className={styles.inner}>
          <strong>{project.name}</strong>
        </div>
      </Link>
      {folders.map((folder) => (
        <Link
          key={folder.id}
          href={`/app/dashboard#folder-${folder.id}`}
          className={styles.folderLink}
        >
          <div className={styles.inner}>{folder.name}</div>
        </Link>
      ))}
    </div>
  );
}
