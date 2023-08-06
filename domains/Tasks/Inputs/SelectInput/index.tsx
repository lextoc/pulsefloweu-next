import { IconCaretDown } from "@tabler/icons-react";
import { useState } from "react";

import endpoints from "@/api/endpoints";
import { Task } from "@/api/types/tasks";
import { useFetch } from "@/hooks/useQueryBase";
import Button from "@/shared/Buttons/Base";
import Input from "@/shared/Inputs/Base";
import Popover from "@/shared/Overlays/Popover";

import styles from "./index.module.css";

export interface TaskSelectInputProps {
  projectId: number;
  taskId: number;
  setTaskId: Function;
}

export function TaskSelectInput({
  projectId,
  taskId,
  setTaskId,
}: TaskSelectInputProps) {
  const [page, setPage] = useState(1);

  const { data: tasksData } = useFetch<Task[]>(endpoints.tasks.main, {
    project_id: projectId,
    page: page,
  });
  const tasks: Task[] = tasksData?.success ? tasksData.data : [];

  return (
    <div>
      <Popover
        content={
          <div className={styles.dropdownButtons}>
            {tasks.map((task) => (
              <Button
                key={`task-${task.id}`}
                variant="subtle"
                noMargin
                onClick={() => setTaskId(task.id)}
              >
                {task.name}
              </Button>
            ))}
          </div>
        }
        button={
          <Input
            fullWidth
            label="Task"
            value={tasks.find((task) => task.id === taskId)?.name}
          />
        }
      />
    </div>
  );
}
