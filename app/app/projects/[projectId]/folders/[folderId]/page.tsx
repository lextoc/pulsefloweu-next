export interface IProjectFolderPageProps {
  params: {
    folderId: string;
  };
}

export default function ProjectFolderPage(props: IProjectFolderPageProps) {
  console.log("🚀 ~ props:", props);
  return <div>HI!</div>;
}
