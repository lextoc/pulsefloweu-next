import TaskDetail from "@/modules/Tasks/Detail";

export interface AppFoldersTasksProps {
  params: {
    taskId: string;
  };
}

export default function AppFoldersTasks(props: AppFoldersTasksProps) {
  if (!props.params.taskId) return null;

  const taskId = parseInt(props.params.taskId, 10);

  return <TaskDetail taskId={taskId} />;
}
