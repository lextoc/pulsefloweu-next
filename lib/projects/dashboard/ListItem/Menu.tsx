"use client";

import destroy from "@/api/destroy";
import endpoints from "@/api/endpoints";
import { IProject } from "@/api/types/projects";
import Button from "@/components/buttons/base";
import Popover from "@/components/overlays/Popover";
import { useSnackbarStore } from "@/stores/snackbar";

import styles from "./Menu.module.css";

export interface IProjectsDashboardListItemMenuProps {
  project: IProject;
}

export default function ProjectsDashboardListItemMenu({
  project,
}: IProjectsDashboardListItemMenuProps) {
  const showSnackbar = useSnackbarStore((state) => state.show);

  const onDelete = () => {
    const hasAgreed = window.confirm(
      "Destroying your project will also remove all its folders, tasks and timesheets. Are you sure?",
    );
    if (!hasAgreed) return;
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
    <div className={styles.root}>
      <Popover
        content={
          <div className={styles.menu}>
            <Button variant="subtle" danger onClick={onDelete} noMargin>
              Delete project
            </Button>
          </div>
        }
      />
    </div>
  );
}
