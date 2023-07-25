import { FolderDetail } from "@/lib/Folders/Detail";

export interface IProjectFolderPageProps {
  params: {
    folderId: string;
  };
}

export default function ProjectFolderPage(props: IProjectFolderPageProps) {
  if (!props.params.folderId) return null;

  const folderId = parseInt(props.params.folderId, 10);

  return <FolderDetail folderId={folderId} />;
}
