"use client";

import { useQuery } from "@tanstack/react-query";

import endpoints from "@/api/endpoints";
import getPage from "@/api/getPage";
import { Folder } from "@/api/types/folders";
import { Project } from "@/api/types/projects";
import FolderCard from "@/lib/Folders/Cards/Base";
import FoldersCreateCard from "@/lib/Folders/Cards/Create";
import ProjectMenu from "@/lib/Projects/Menu";

import styles from "./index.module.css";

export interface ProjectsListItemProps {
  project: Project;
  last?: boolean;
}

export default function ProjectsListItem({
  project,
  last,
}: ProjectsListItemProps) {
  const query = useQuery({
    queryKey: [endpoints.getFoldersFromProject(project.id || -1)],
    queryFn: () => getPage(endpoints.getFoldersFromProject(project.id || -1)),
  });

  let folders: Folder[] = [];
  if (query.data?.success) folders = query.data?.data;

  return (
    <div id={`#project-${project.id}`}>
      <div className={styles.header}>
        <h2>{project.name}</h2>
        <ProjectMenu project={project} />
      </div>
      <div className="cards">
        {folders.map((folder) => (
          <FolderCard key={folder.id} folder={folder} />
        ))}
        <FoldersCreateCard project={project} />
      </div>
      {!last && <hr className="divider" />}
    </div>
  );
}
