import FoldersDetail from "@/lib/Folders/Detail";

export interface IFolderPageProps {
  params: {
    folderId: string;
  };
}

export default function FolderPage(props: IFolderPageProps) {
  if (!props.params.folderId) return null;

  const folderId = parseInt(props.params.folderId, 10);

  return <FoldersDetail folderId={folderId} />;
}
