"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import endpoints from "@/api/endpoints";
import { Folder } from "@/api/types/folders";
import { Project } from "@/api/types/projects";
import { useFetchArray } from "@/hooks/useQueryBase";
import { useNavigationStore } from "@/stores/navigation";

import styles from "./index.module.css";

export interface SideNavigationProjectProps {
  project: Project;
}

export default function SideNavigationProject({
  project,
}: SideNavigationProjectProps) {
  const pathname = usePathname();

  const { data: foldersData } = useFetchArray<Folder>(
    endpoints.projects.folders(project.id || -1),
  );
  const folders: Folder[] = foldersData?.success ? foldersData.data : [];
  const set = useNavigationStore((state) => state.set);
  const onLinkClick = () => {
    set({ shouldToggleMobileMenu: true });
  };

  return (
    <div className={styles.root}>
      <Link
        href={`/app/projects/${project.id}`}
        className={`${styles.link} ${
          pathname === `/app/projects/${project.id}` ? styles.linkActive : ""
        }`}
        onClick={onLinkClick}
      >
        <div className={`${styles.inner} break-word`}>
          <strong>{project.name}</strong>
        </div>
      </Link>
      <div className={styles.folderLinks}>
        {folders.map((folder) => (
          <Link
            key={folder.id}
            href={`/app/projects/${folder.project_id}/folders/${folder.id}`}
            className={`${styles.folderLink} ${
              pathname.startsWith(
                `/app/projects/${folder.project_id}/folders/${folder.id}`,
              ) || pathname.startsWith(`/app/folders/${folder.id}`)
                ? styles.folderLinkActive
                : ""
            }`}
            onClick={onLinkClick}
          >
            <div className={`${styles.inner} break-word`}>{folder.name}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
