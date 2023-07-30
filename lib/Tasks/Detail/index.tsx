"use client";
import { IconListCheck } from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import utc from "dayjs/plugin/utc";
import Link from "next/link";

import endpoints from "@/api/endpoints";
import getPage from "@/api/getPage";
import { Task } from "@/api/types/tasks";
import { TimeEntry } from "@/api/types/time-entries";
import PaddingContainer from "@/components/Shared/PaddingContainer";
import TimeEntriesListItem from "@/lib/TimeEntries/ListItem";

import TaskMenu from "../Menu";
import styles from "./index.module.css";

export interface TasksDetailProps {
  taskId: number;
}

dayjs.extend(advancedFormat);
dayjs.extend(utc);

export default function TasksDetail({ taskId }: TasksDetailProps) {
  /** * Fetch task
   */
  const query = useQuery({
    queryKey: [endpoints.getTask(taskId!)],
    queryFn: () => getPage(endpoints.getTask(taskId!)),
  });

  let task: Task | null = null;
  if (query.data?.success) task = query.data?.data;

  /**
   * Fetch time entries
   */
  const timeEntriesQuery = useQuery({
    queryKey: [endpoints.getTimeEntriesFromTask(taskId!)],
    queryFn: () => getPage(endpoints.getTimeEntriesFromTask(taskId!)),
  });

  let timeEntries: TimeEntry[] | null = null;
  if (timeEntriesQuery.data?.success) timeEntries = timeEntriesQuery.data?.data;

  return (
    <div>
      <PaddingContainer withBottomGap>
        <header className={styles.header}>
          <div className={styles.headerIcon}>
            <IconListCheck size="4rem" color="rgb(var(--main))" />
          </div>
          <div>
            <div className={styles.headerInner}>
              <h1>{task?.name}</h1>
              {task && <TaskMenu task={task} />}
            </div>
            <p>
              Task of{" "}
              <Link
                href={`/app/folders/${task?.folder_id}`}
                className={styles.link}
              >
                {task?.folder_name && task?.folder_name}
              </Link>{" "}
              folder in project{" "}
              <Link
                href={`/app/projects/${task?.project_id}`}
                className={styles.link}
              >
                {task?.folder_name && task?.project_name}
              </Link>
              <br />
              <small>
                <i>
                  Created on{" "}
                  {dayjs(task?.created_at)
                    .utc(true)
                    .format("Do MMMM, YYYY")}{" "}
                </i>
              </small>
            </p>
          </div>
        </header>
        <hr />
        {timeEntries?.map((timeEntry) => (
          <TimeEntriesListItem key={timeEntry.id} timeEntry={timeEntry} />
        ))}
      </PaddingContainer>
    </div>
  );
}
