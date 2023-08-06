import FoldersDetail from "@/domains/Folders/Detail";

export interface AppProjectsFoldersProps {
  params: {
    folderId: string;
  };
}

export default function AppProjectsFolders(props: AppProjectsFoldersProps) {
  if (!props.params.folderId) return null;

  const folderId = parseInt(props.params.folderId, 10);

  return <FoldersDetail folderId={folderId} />;
}
