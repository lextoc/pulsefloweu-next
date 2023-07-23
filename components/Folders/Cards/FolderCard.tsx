import { IFolder } from "@/api/types/folders";

import styles from "./FolderCard.module.css";

export interface IFolderCardProps {
  folder: IFolder;
}

export default function FolderCard({ folder }: IFolderCardProps) {
  return (
    <div className={styles.root}>
      <pre>{JSON.stringify(folder)}</pre>
    </div>
  );
}
