"use client";

import { useQuery } from "@tanstack/react-query";

import endpoints from "@/api/endpoints";
import getPage from "@/api/getPage";
import { IFolder } from "@/api/types/folders";
import { IProject } from "@/api/types/projects";
import FolderCard from "@/lib/folders/cards/base";
import CreateFolderCard from "@/lib/folders/cards/Create";

import styles from "./index.module.css";
import ProjectsDashboardListItemMenu from "./Menu";

export interface IProjectsDashboardListItemProps {
  project: IProject;
}

export default function ProjectsDashboardListItem({
  project,
}: IProjectsDashboardListItemProps) {
  const query = useQuery({
    queryKey: [endpoints.getFoldersFromProject(project.id!)],
    queryFn: () => getPage(endpoints.getFoldersFromProject(project.id!)),
  });

  let folders: IFolder[] = [];
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
