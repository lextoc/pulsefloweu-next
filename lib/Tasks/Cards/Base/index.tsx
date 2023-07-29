import {
  IconPlayerPauseFilled,
  IconPlayerPlayFilled,
} from "@tabler/icons-react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import utc from "dayjs/plugin/utc";
import Link from "next/link";
import { useEffect, useState } from "react";

import { getHeaders } from "@/api/cookies";
import create from "@/api/create";
import endpoints from "@/api/endpoints";
import getPage from "@/api/getPage";
import { Task } from "@/api/types/tasks";
import { CreateTimeEntry, TimeEntry } from "@/api/types/time-entries";
import Card from "@/components/Cards/Base";
import TaskMenu from "@/lib/Tasks/Menu";
import { useSnackbarStore } from "@/stores/snackbar";
import { convertSecondsToHHmmss } from "@/utils/converters";

import Explosion from "./Explosion";
import styles from "./index.module.css";

export interface TaskCardProps {
  task: Task;
}

export default function TaskCard({ task }: TaskCardProps) {
  dayjs.extend(advancedFormat);
  dayjs.extend(utc);

  const [time, setTime] = useState(Date.now());
  const [isExploding, setIsExploding] = useState(false);

  // For animating timer.
  useEffect(() => {
    const interval = setInterval(() => setTime(Date.now()), 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  const queryClient = useQueryClient();
  const showSnackbar = useSnackbarStore((state) => state.show);
  let isActive = false;

  /**
   * Fetch active timeEntries
   */
  const activeTimeEntryQuery = useQuery({
    queryKey: [endpoints.getTimeEntriesFromTask(task?.id || -1), "active"],
    queryFn: () =>
      getPage(endpoints.getTimeEntriesFromTask(task?.id || -1), {
        active: true,
      }),
  });

  let activeTimeEntries: TimeEntry[] = [];
  if (activeTimeEntryQuery.data?.success)
    activeTimeEntries = activeTimeEntryQuery.data?.data;

  isActive = !!activeTimeEntries.length;

  const onClick = () => {
    setIsExploding(true);
    setTimeout(() => setIsExploding(false), 3000);
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...getHeaders(),
      },
    };
    fetch(endpoints.stopTimeEntries, requestOptions)
      .then((response) => {
        return response.json();
      })
      .then((res) => {
        queryClient.invalidateQueries();
      });
    if (isActive) return;
    create<{ time_entry: CreateTimeEntry }>(endpoints.createTimeEntry, {
      time_entry: {
        start_date: dayjs().format(),
        folder_id: task.folder_id,
        task_id: task.id,
      },
    }).then((data) => {
      if (data?.errors) {
        showSnackbar({
          message:
            data?.errors?.full_messages?.join(" ") || data?.errors?.join(" "),
          type: "error",
        });
      } else {
        queryClient.invalidateQueries();
        showSnackbar({
          message: "Time entry has been created",
        });
      }
    });
  };

  const seconds = dayjs().diff(
    dayjs(activeTimeEntries?.[0]?.start_date),
    "seconds",
  );
  const timer = new Date(seconds * 1000).toISOString().substring(11, 19);

  return (
    <Card
      withMovingBackground={isActive}
      header={
        <>
          <Link
            href={`/app/folders/${task.folder_id}/tasks/${task.id}`}
            className={styles.link}
          >
            <h3 className={styles.title}>{task.name}</h3>
            <p>Task #{task.id}</p>
          </Link>
          <TaskMenu task={task} />
        </>
      }
      content={
        <ul>
          {(task.total_duration_of_time_entries || 0) > 0 && (
            <li>
              Spent time of&nbsp;
              <span
                className={`${isExploding ? "main" : ""} ${styles.converter}`}
              >
                {convertSecondsToHHmmss(task.total_duration_of_time_entries)}
              </span>
            </li>
          )}
        </ul>
      }
      footer={
        <>
          <p className={styles.timestamp}>
            <small>
              <i>
                Created on{" "}
                {dayjs(task.created_at).utc(true).format("Do MMMM, YYYY")}
              </i>
            </small>
          </p>
          <button
            className={`${styles.button} ${
              isActive ? styles.buttonActive : ""
            } ${isExploding ? "exploding" : ""}`}
            onClick={onClick}
          >
            <div className={styles.buttonInner} />
            <Explosion />
            {!isActive ? (
              <>
                <IconPlayerPlayFilled
                  className={styles.buttonIcon}
                  size="2.25rem"
                />
              </>
            ) : (
              <div className={styles.buttonTimer}>
                <IconPlayerPauseFilled
                  className={styles.buttonIcon}
                  size="2.25rem"
                />
                <div className={styles.buttonTimerText}>{timer}</div>
              </div>
            )}
          </button>
        </>
      }
    />
  );
}
