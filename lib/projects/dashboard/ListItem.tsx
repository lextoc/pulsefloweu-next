import endpoints from "@/api/endpoints";
import getPage from "@/api/getPage";
import { IFolder } from "@/api/types/folders";
import { IProject } from "@/api/types/projects";
import FolderCard from "@/lib/folders/cards/base";
import CreateFolderCard from "@/lib/folders/cards/Create";

import styles from "./ListItem.module.css";
import ProjectsDashboardListItemMenu from "./ListItem/Menu";

export interface IProjectsDashboardListItemProps {
  project: IProject;
}

export default async function ProjectsDashboardListItem({
  project,
}: IProjectsDashboardListItemProps) {
  let folders: IFolder[] = [];
  const response = await getPage(endpoints.getFoldersFromProject(project.id!));
  if (response?.data) folders = response.data;

  return (
    <div id={`#project-${project.id}`}>
      <div className={styles.header}>
        <h2>{project.name}</h2>
        <ProjectsDashboardListItemMenu project={project} />
      </div>
      <div className="cards">
        {folders.map((folder) => (
          <FolderCard folder={folder} />
        ))}
        <CreateFolderCard project={project} />
      </div>
      <hr className="divider" />
    </div>
  );
}
