import Link from "next/link";

import endpoints from "@/api/endpoints";
import getPage from "@/api/getPage";
import { IFolder } from "@/api/types/folders";
import { IProject } from "@/api/types/projects";

import styles from "./index.module.css";

export interface ISideNavigationProjectProps {
  project: IProject;
}

export default async function SideNavigationProject({
  project,
}: ISideNavigationProjectProps) {
  let folders: IFolder[] = [];
  const response = await getPage(endpoints.getFoldersFromProject(project.id!));
  if (response?.data) folders = response.data;

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
          href={`/app/dashboard#folder-${folder.id}`}
          className={styles.folderLink}
        >
          <div className={styles.inner}>{folder.name}</div>
        </Link>
      ))}
    </div>
  );
}
