import endpoints from "@/api/endpoints";
import { Task } from "@/api/types/tasks";
import { useFetch } from "@/hooks/useQueryBase";

export interface TaskSelectInputProps {
  projectId: number;
}

export function TaskSelectInput({ projectId }: TaskSelectInputProps) {
  const { data: tasksData } = useFetch<Task[]>(endpoints.tasks.main, {
    project_id: projectId,
  });
  const tasks: Task[] = tasksData?.success ? tasksData.data : [];
  console.log("🚀  tasks:", tasks);

  return (
    <div>
      <p>{projectId}</p>
    </div>
  );
}
