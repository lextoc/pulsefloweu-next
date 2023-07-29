"use client";

import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { usePathname } from "next/navigation";

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
  const pathname = usePathname();

  const query = useQuery({
    queryKey: [endpoints.getFoldersFromProject(project.id!)],
    queryFn: () => getPage(endpoints.getFoldersFromProject(project.id!)),
  });

  let folders: Folder[] = [];
  if (query.data?.success) folders = query.data?.data;

  return (
    <div className={styles.root}>
      <Link
        href={`/app/projects/${project.id}`}
        className={`${styles.link} ${
          pathname === `/app/projects/${project.id}` ? styles.linkActive : ""
        }`}
      >
        <div className={styles.inner}>
          <strong>{project.name}</strong>
        </div>
      </Link>
      <div className={styles.folderLinks}>
        {folders.map((folder) => (
          <Link
            key={folder.id}
            href={`/app/projects/${folder.project_id}/folders/${folder.id}`}
            className={`${styles.folderLink}
          ${
            pathname.startsWith(
              `/app/projects/${folder.project_id}/folders/${folder.id}`,
            )
              ? styles.folderLinkActive
              : ""
          }
        `}
          >
            <div className={styles.inner}>{folder.name}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
