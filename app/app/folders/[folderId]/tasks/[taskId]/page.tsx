import TaskDetail from "@/lib/Tasks/Detail";

export interface IFolderTaskPageProps {
  params: {
    taskId: string;
  };
}

export default function FolderTaskPage(props: IFolderTaskPageProps) {
  if (!props.params.taskId) return null;

  const taskId = parseInt(props.params.taskId, 10);

  return <TaskDetail taskId={taskId} />;
}
