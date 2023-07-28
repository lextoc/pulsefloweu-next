"use client";

import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import destroy from "@/api/destroy";
import endpoints from "@/api/endpoints";
import { Task } from "@/api/types/tasks";
import Button from "@/components/Buttons/Base";
import Popover from "@/components/Overlays/Popover";
import { useSnackbarStore } from "@/stores/snackbar";

import styles from "./index.module.css";

export interface TaskMenuProps {
  task: Task;
}

export default function TaskMenu({ task }: TaskMenuProps) {
  const queryClient = useQueryClient();
  const showSnackbar = useSnackbarStore((state) => state.show);

  const onDelete = () => {
    const hasAgreed = window.confirm(
      "Destroying your task will also remove all its tasks and time entries. Are you sure?",
    );
    if (!hasAgreed) return;
    let folderId = task.folder_id;
    destroy(endpoints.destroyTask(task.id)).then((data) => {
      if (data.success) {
        queryClient.invalidateQueries([endpoints.getTasksFromFolder(folderId)]);
        showSnackbar({
          message: "Task has been deleted",
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
              Delete task
            </Button>
          </div>
        }
      />
    </div>
  );
}
