"use client";

import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import destroy from "@/api/destroy";
import endpoints from "@/api/endpoints";
import { Project } from "@/api/types/projects";
import Button from "@/ui/Buttons/Base";
import Popover from "@/ui/Overlays/Popover";
import { useSnackbarStore } from "@/stores/snackbar";

import styles from "./index.module.css";

export interface ProjectMenuProps {
  project: Project;
}

export default function ProjectMenu({ project }: ProjectMenuProps) {
  const queryClient = useQueryClient();
  const showSnackbar = useSnackbarStore((state) => state.show);

  const onDelete = () => {
    const hasAgreed = window.confirm(
      "Destroying your project will also remove all its folders, tasks and timesheets. Are you sure?",
    );
    if (!hasAgreed) return;
    let projectId = project.id;
    destroy(endpoints.destroyProject(project.id!)).then((data) => {
      if (data.success) {
        queryClient.invalidateQueries([endpoints.getProject(projectId)]);
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
