export interface TasksDetailProps {
  taskId: number;
}

export default function TasksDetail({ taskId }: TasksDetailProps) {
  return <div>{taskId}</div>;
}
