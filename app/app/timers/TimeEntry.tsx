import {
  IconPlayerPauseFilled,
  IconPlayerPlayFilled,
} from "@tabler/icons-react";
import { useQueryClient } from "@tanstack/react-query";
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import utc from "dayjs/plugin/utc";
import Link from "next/link";
import { useEffect, useState } from "react";

import { getHeaders } from "@/api/cookies";
import create from "@/api/create";
import endpoints from "@/api/endpoints";
import { CreateTimeEntry, TimeEntry } from "@/api/types/time-entries";
import Explosion from "@/lib/Tasks/Cards/Base/Explosion";
import TimeEntryMenu from "@/lib/TimeEntries/Menu";
import { useSnackbarStore } from "@/stores/snackbar";

import styles from "./TimeEntry.module.css";

dayjs.extend(advancedFormat);
dayjs.extend(utc);

export interface TimersTimeEntryProps {
  timeEntry: TimeEntry;
}

export default function TimersTimeEntry({ timeEntry }: TimersTimeEntryProps) {
  const queryClient = useQueryClient();
  const showSnackbar = useSnackbarStore((state) => state.show);

  const [isExploding, setIsExploding] = useState(false);

  const toggleTaskTimer = () => {
    setIsExploding(true);
    setTimeout(() => setIsExploding(false), 1000);
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
      .then(() => {
        queryClient.invalidateQueries();
        showSnackbar({
          message: "Time entry has been updated",
        });
      });
    if (!timeEntry.end_date) return;
    create<{ time_entry: CreateTimeEntry }>(endpoints.createTimeEntry, {
      time_entry: {
        start_date: dayjs().format(),
        folder_id: timeEntry.folder_id,
        task_id: timeEntry.task_id,
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

  const seconds = dayjs(timeEntry.end_date || undefined).diff(
    dayjs(timeEntry.start_date),
    "seconds",
  );
  const timer = new Date(seconds * 1000).toISOString().substring(11, 19);
  const [time, setTime] = useState(Date.now());
  // For animating timer.
  useEffect(() => {
    if (!timeEntry.end_date) {
      const interval = setInterval(() => setTime(Date.now()), 1000);
      return () => {
        clearInterval(interval);
      };
    }
  }, []);

  return (
    <div
      className={`${styles.timeEntry} ${
        timeEntry.end_date ? "" : styles.active
      }`}
    >
      <div className={styles.timeEntryLeft}>
        <button
          className={`${styles.timeEntryButton} ${
            isExploding ? "exploding" : ""
          }`}
          onClick={() => toggleTaskTimer()}
        >
          <Explosion />
          {!timeEntry.end_date ? (
            <IconPlayerPauseFilled size="1.25rem" />
          ) : (
            <IconPlayerPlayFilled size="1.25rem" />
          )}
        </button>
        <Link
          href={`/app/folders/${timeEntry.folder_id}`}
          className={styles.timeEntryNameLink}
        >
          <div className={styles.timeEntryName}>{timeEntry.task_name}</div>
          <div className={styles.timeEntrySub}>
            {timeEntry.project_name} - {timeEntry.folder_name}
          </div>
        </Link>
      </div>
      <div className={styles.timeEntryRight}>
        {timeEntry.end_date ? "" : "Started at"}{" "}
        {dayjs(timeEntry.start_date).format("HH:mm")}{" "}
        {timeEntry.end_date ? "–" : ""}{" "}
        {(timeEntry.end_date && dayjs(timeEntry.end_date).format("HH:mm")) ||
          ""}
        &nbsp;&nbsp;&nbsp;&nbsp;
        <strong>{timer}</strong>
        <TimeEntryMenu timeEntry={timeEntry} />
      </div>
    </div>
  );
}
