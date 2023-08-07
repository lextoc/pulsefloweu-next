import FoldersDetail from "@/modules/Folders/Detail";

export interface AppFoldersProps {
  params: {
    folderId: string;
  };
}

export default function AppFolders(props: AppFoldersProps) {
  if (!props.params.folderId) return null;

  const folderId = parseInt(props.params.folderId, 10);

  return <FoldersDetail folderId={folderId} />;
}
