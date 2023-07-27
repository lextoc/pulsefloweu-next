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
import { CreateTimesheet, Timesheet } from "@/api/types/timesheets";
import Card from "@/components/Cards/Base";
import TaskMenu from "@/lib/Tasks/Menu";
import { useSnackbarStore } from "@/stores/snackbar";
import { convertSecondsToHHmmss } from "@/utils/converters";

import styles from "./index.module.css";

export interface TaskCardProps {
  task: Task;
}

export default function TaskCard({ task }: TaskCardProps) {
  dayjs.extend(advancedFormat);
  dayjs.extend(utc);

  const [time, setTime] = useState(Date.now());

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
   * Fetch timesheets duration
   */
  const timesheetDurationQuery = useQuery({
    queryKey: [endpoints.getTotalDurationOfTasksTimesheets(task?.id || -1)],
    queryFn: () =>
      getPage(endpoints.getTotalDurationOfTasksTimesheets(task?.id || -1)),
  });

  let timesheetsDuration: number | null = null;
  if (timesheetDurationQuery.data)
    timesheetsDuration = timesheetDurationQuery.data;
  console.log(`🚀 ~ timesheets #${task.id}:`, timesheetsDuration);

  /**
   * Fetch active timesheets
   */
  const activeTimesheetQuery = useQuery({
    queryKey: [endpoints.getTimesheetsFromTask(task?.id || -1), "active"],
    queryFn: () =>
      getPage(endpoints.getTimesheetsFromTask(task?.id || -1), {
        active: true,
      }),
  });

  let activeTimesheets: Timesheet[] = [];
  if (activeTimesheetQuery.data?.success)
    activeTimesheets = activeTimesheetQuery.data?.data;

  isActive = !!activeTimesheets.length;

  const onClick = () => {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...getHeaders(),
      },
    };
    fetch(endpoints.stopTimesheets, requestOptions)
      .then((response) => {
        return response.json();
      })
      .then((res) => {
        queryClient.invalidateQueries();
      });
    if (isActive) return;
    create<{ timesheet: CreateTimesheet }>(endpoints.createTimesheet, {
      timesheet: {
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
          message: "Timesheet has been created",
        });
      }
    });
  };

  const seconds = dayjs().diff(
    dayjs(activeTimesheets?.[0]?.start_date),
    "seconds",
  );
  const timer = new Date(seconds * 1000).toISOString().substring(11, 19);

  return (
    <Card
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
          {timesheetsDuration && (
            <li>Spent time of {convertSecondsToHHmmss(timesheetsDuration)}</li>
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
            }`}
            onClick={onClick}
          >
            <div className={styles.buttonInner} />
            {!isActive ? (
              <IconPlayerPlayFilled
                className={styles.buttonIcon}
                size="2.25rem"
              />
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
