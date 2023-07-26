"use client";

import { useRouter } from "next/navigation";

import destroy from "@/api/destroy";
import endpoints from "@/api/endpoints";
import { Project } from "@/api/types/projects";
import Button from "@/components/Buttons/Base";
import Popover from "@/components/Overlays/Popover";
import { useSnackbarStore } from "@/stores/snackbar";

import styles from "./index.module.css";

export interface ProjectsListItemMenuProps {
  project: Project;
}

export default function ProjectsListItemMenu({
  project,
}: ProjectsListItemMenuProps) {
  const { replace } = useRouter();
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
        replace("/app/dashboard");
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
