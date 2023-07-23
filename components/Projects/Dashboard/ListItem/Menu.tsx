"use client";

import destroy from "@/api/destroy";
import endpoints from "@/api/endpoints";
import { IProject } from "@/api/types/projects";
import Button from "@/components/interaction/Button";
import { useSnackbarStore } from "@/stores/snackbar";

export interface IProjectsDashboardListItemMenuProps {
  project: IProject;
}

export default function ProjectsDashboardListItemMenu({
  project,
}: IProjectsDashboardListItemMenuProps) {
  const showSnackbar = useSnackbarStore((state) => state.show);

  const onDelete = () => {
    destroy(endpoints.destroyProject(project.id!)).then((data) => {
      if (data.success) {
        showSnackbar({
          message: "Project has been deleted",
        });
      } else {
        showSnackbar({
          message: data?.errors?.join(" "),
          type: "error",
        });
      }
    });
  };

  return (
    <div>
      <Button variant="subtle" danger onClick={onDelete} noMargin>
        Delete project
      </Button>
    </div>
  );
}
