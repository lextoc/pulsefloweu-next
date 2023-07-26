import {
  IconPlayerPauseFilled,
  IconPlayerPlayFilled,
} from "@tabler/icons-react";
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import utc from "dayjs/plugin/utc";
import Link from "next/link";

import { Task } from "@/api/types/tasks";
import TaskMenu from "@/lib/Tasks/Menu";

import styles from "./index.module.css";

export interface TaskCardProps {
  task: Task;
}

export default function TaskCard({ task }: TaskCardProps) {
  dayjs.extend(advancedFormat);
  dayjs.extend(utc);

  return (
    <div className={styles.root} id={`#task-${task.id}`}>
      <header className={styles.header}>
        <Link
          href={`/app/folders/${task.folder_id}/tasks/${task.id}`}
          className={styles.link}
        >
          <h3 className={styles.title}>{task.name}</h3>
          <p>Task</p>
        </Link>
        <TaskMenu task={task} />
      </header>
      <div className={styles.content}>
        <p>
          Here we will show a cost input field and at the bottom a play button.
        </p>
        <p className={styles.timestamp}>
          <small>
            <i>
              Created on{" "}
              {dayjs(task.created_at).utc(true).format("Do MMMM, YYYY")}
            </i>
          </small>
        </p>
      </div>
      <div className={`${styles.button} ${styles.buttonActive}`}>
        <div className={styles.buttonInner} />
        {/* <IconPlayerPlayFilled className={styles.buttonIcon} size="2.5rem" /> */}
        <div className={styles.buttonTimer}>
          <IconPlayerPauseFilled className={styles.buttonIcon} size="2.25rem" />
          <div className={styles.buttonTimerText}>00:00:02</div>
        </div>
      </div>
    </div>
  );
}
