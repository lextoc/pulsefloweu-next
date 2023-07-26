import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import utc from "dayjs/plugin/utc";
import Link from "next/link";

import { Task } from "@/api/types/tasks";

import styles from "./index.module.css";
import TaskCardMenu from "./Menu";

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
        <TaskCardMenu task={task} />
      </header>
      <div className={styles.content}>
        <p>
          This task has 8 tasks:
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
              {dayjs(task.created_at).utc(true).format("Do MMMM, YYYY")}
            </i>
          </small>
        </p>
      </div>
    </div>
  );
}
