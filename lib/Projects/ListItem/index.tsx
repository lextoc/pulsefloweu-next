"use client";

import { useQuery } from "@tanstack/react-query";

import endpoints from "@/api/endpoints";
import getPage from "@/api/getPage";
import { Folder } from "@/api/types/folders";
import { Project } from "@/api/types/projects";
import FolderCard from "@/lib/Folders/Cards/Base";
import CreateFolderCard from "@/lib/Folders/Cards/Create";
import ProjectsDashboardListItemMenu from "@/lib/Projects/ListItem/Menu";

import styles from "./index.module.css";

export interface ProjectsDashboardListItemProps {
  project: Project;
}

export default function ProjectsDashboardListItem({
  project,
}: ProjectsDashboardListItemProps) {
  const query = useQuery({
    queryKey: [endpoints.getFoldersFromProject(project.id!)],
    queryFn: () => getPage(endpoints.getFoldersFromProject(project.id!)),
  });

  let folders: Folder[] = [];
  if (query.data?.success) folders = query.data?.data;

  return (
    <div id={`#project-${project.id}`}>
      <div className={styles.header}>
        <h2>{project.name}</h2>
        <ProjectsDashboardListItemMenu project={project} />
      </div>
      <div className="cards">
        {folders.map((folder) => (
          <FolderCard key={folder.id} folder={folder} />
        ))}
        <CreateFolderCard project={project} />
      </div>
      <hr className="divider" />
    </div>
  );
}
