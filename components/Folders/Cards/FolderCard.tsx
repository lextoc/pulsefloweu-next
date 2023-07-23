import Link from "next/link";

import { IFolder } from "@/api/types/folders";

import styles from "./FolderCard.module.css";
import FolderCardMenu from "./FolderCard/Menu";

export interface IFolderCardProps {
  folder: IFolder;
}

export default function FolderCard({ folder }: IFolderCardProps) {
  return (
    <div className={styles.root} id={`#folder-${folder.id}`}>
      <header className={styles.header}>
        <Link href={`/app/folders/${folder.id}`} className={styles.link}>
          <h3>{folder.name}</h3>
          <p>Folder</p>
        </Link>
        <FolderCardMenu folder={folder} />
      </header>
      <div className={styles.content}>
        <p>tasks...</p>
      </div>
    </div>
  );
}
