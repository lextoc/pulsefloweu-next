import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import utc from "dayjs/plugin/utc";
import Link from "next/link";

import { Folder } from "@/api/types/folders";
import FolderMenu from "@/lib/Folders/Menu";

import styles from "./index.module.css";

export interface FolderCardProps {
  folder: Folder;
}

export default function FolderCard({ folder }: FolderCardProps) {
  dayjs.extend(advancedFormat);
  dayjs.extend(utc);

  return (
    <div className={styles.root} id={`folder-${folder.id}`}>
      <header className={styles.header}>
        <Link
          href={`/app/projects/${folder.project_id}/folders/${folder.id}`}
          className={styles.link}
        >
          <h3 className={styles.title}>{folder.name}</h3>
          <p>Folder</p>
        </Link>
        <FolderMenu folder={folder} />
      </header>
      <div className={styles.content}>
        <p>
          This folder has 8 tasks:
          <br />
          <ul>
            <li>Spent 192 hours</li>
            <li>This week 34 hours</li>
            <br />
            <li>Profit of £289</li>
            <li>This week of £18</li>
          </ul>
        </p>
        <p className={styles.timestamp}>
          <small>
            <i>
              Created on{" "}
              {dayjs(folder.created_at).utc(true).format("Do MMMM, YYYY")}
            </i>
          </small>
        </p>
      </div>
    </div>
  );
}
