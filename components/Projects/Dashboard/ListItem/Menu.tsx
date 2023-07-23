"use client";

import destroy from "@/api/destroy";
import endpoints from "@/api/endpoints";
import { IProject } from "@/api/types/projects";
import Button from "@/components/interaction/Button";

export interface IProjectsDashboardListItemMenuProps {
  project: IProject;
}

export default function ProjectsDashboardListItemMenu({
  project,
}: IProjectsDashboardListItemMenuProps) {
  const onDelete = () => {
    destroy(endpoints.destroyProject(project.id!));
  };

  return (
    <div>
      <Button variant="subtle" danger onClick={onDelete} noMargin>
        Delete project
      </Button>
    </div>
  );
}
