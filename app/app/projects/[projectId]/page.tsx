import ProjectDetail from "@/lib/Projects/Detail";

export interface IProjectPageProps {
  params: {
    projectId: string;
  };
}

export default function ProjectPage(props: IProjectPageProps) {
  if (!props.params.projectId) return null;

  const projectId = parseInt(props.params.projectId, 10);

  return <ProjectDetail projectId={projectId} />;
}
