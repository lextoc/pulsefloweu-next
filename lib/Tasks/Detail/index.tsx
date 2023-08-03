"use client";
import { IconListCheck } from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import utc from "dayjs/plugin/utc";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

import endpoints from "@/api/endpoints";
import getPage from "@/api/getPage";
import { Task } from "@/api/types/tasks";
import { TimeEntry } from "@/api/types/time-entries";
import Pagination from "@/components/Navigation/Pagination";
import PaddingContainer from "@/components/Shared/PaddingContainer";
import TimeEntriesListItem from "@/lib/TimeEntries/ListItem";
import { transformSecondsToHumanReadableString } from "@/utils/helpers";

import TaskMenu from "../Menu";
import styles from "./index.module.css";

export interface TasksDetailProps {
  taskId: number;
}

dayjs.extend(advancedFormat);
dayjs.extend(utc);

export default function TasksDetail({ taskId }: TasksDetailProps) {
  const searchParams = useSearchParams();
  const current = new URLSearchParams(Array.from(searchParams.entries()));
  const page = current.get("page");

  /** * Fetch task
   */
  const query = useQuery({
    queryKey: [endpoints.tasks.detail(taskId!)],
    queryFn: () => getPage(endpoints.tasks.detail(taskId!)),
  });

  let task: Task | null = null;
  if (query.data?.success) task = query.data?.data;

  /**
   * Fetch time entries
   */
  const timeEntriesQuery = useQuery({
    queryKey: [endpoints.tasks.timeEntries(taskId!), page],
    queryFn: () =>
      getPage(endpoints.tasks.timeEntries(taskId!), {
        page,
      }),
  });

  let timeEntriesByDate: any = {};
  if (timeEntriesQuery.data?.success)
    timeEntriesByDate = timeEntriesQuery.data?.data;

  const getDateFormat = (date: string) => {
    if (dayjs().isSame(dayjs(date), "day")) return "Today";
    if (dayjs().subtract(1, "day").isSame(dayjs(date), "day"))
      return "Yesterday";
    return dayjs(date).format("dddd DD MMMM YYYY");
  };

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
        <h2 className={styles.contentTitle}>Your time entries</h2>
        {Object.keys(timeEntriesByDate).map((date: string) => {
          return (
            <div key={date} className={styles.dayList}>
              <h3 className={styles.dayTitle}>
                {getDateFormat(date)}{" "}
                <span className={styles.duration}>
                  {transformSecondsToHumanReadableString(
                    timeEntriesByDate[date].data.total_duration,
                  )}
                </span>
              </h3>
              {timeEntriesByDate[date].time_entries.map(
                (timeEntry: TimeEntry) => (
                  <TimeEntriesListItem
                    key={`timer-time-entry-${timeEntry.id}`}
                    timeEntry={timeEntry}
                  />
                ),
              )}
            </div>
          );
        })}
        <Pagination {...timeEntriesQuery.data?.meta} />
      </PaddingContainer>
    </div>
  );
}
