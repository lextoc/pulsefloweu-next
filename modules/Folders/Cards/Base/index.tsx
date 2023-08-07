import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import utc from "dayjs/plugin/utc";
import Link from "next/link";

import { Folder } from "@/api/types/folders";
import Card from "@/components/Cards/Base";
import FolderMenu from "@/modules/Folders/Menu";

import styles from "./index.module.css";

dayjs.extend(advancedFormat);
dayjs.extend(utc);

export interface FoldersCardProps {
  folder: Folder;
}

export default function FoldersCard({ folder }: FoldersCardProps) {
  return (
    <Card
      header={
        <>
          <Link
            href={`/app/projects/${folder.project_id}/folders/${folder.id}`}
            className={styles.link}
          >
            <h3 className={styles.title}>{folder.name}</h3>
            <p>Folder #{folder.id}</p>
          </Link>
          <FolderMenu folder={folder} />
        </>
      }
      content={
        <div className={styles.content}>
          {/* <p>This folder has 8 tasks:</p>
          <ul>
            <li>Spent 192 hours</li>
            <li>This week 34 hours</li>
            <br />
            <li>Profit of £289</li>
            <li>This week of £18</li>
          </ul> */}
        </div>
      }
      footer={
        <p className={styles.timestamp}>
          <small>
            <i>
              Created on{" "}
              {dayjs(folder.created_at).utc(true).format("Do MMMM, YYYY")}
            </i>
          </small>
        </p>
      }
    />
  );
}
