import ProjectDetail from "@/domains/Projects/Detail";

export interface AppProjectsProps {
  params: {
    projectId: string;
  };
}

export default function AppProjects(props: AppProjectsProps) {
  if (!props.params.projectId) return null;

  const projectId = parseInt(props.params.projectId, 10);

  return <ProjectDetail projectId={projectId} />;
}
