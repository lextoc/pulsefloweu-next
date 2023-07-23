import Link from "next/link";

import { IFolder } from "@/api/types/folders";

import styles from "./FolderCard.module.css";

export interface IFolderCardProps {
  folder: IFolder;
}

export default function FolderCard({ folder }: IFolderCardProps) {
  return (
    <div className={styles.root} id={`#folder-${folder.id}`}>
      <Link href="folder.." className={styles.link}>
        <h3>{folder.name}</h3>
        <p>Folder</p>
      </Link>
      <div className={styles.content}>
        <p>tasks...</p>
      </div>
    </div>
  );
}
