import {
  IconPlayerPauseFilled,
  IconPlayerPlayFilled,
} from "@tabler/icons-react";
import { useQueryClient } from "@tanstack/react-query";
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import utc from "dayjs/plugin/utc";
import { useState } from "react";

import { getHeaders } from "@/api/cookies";
import create from "@/api/create";
import endpoints from "@/api/endpoints";
import { CreateTimeEntry, TimeEntry } from "@/api/types/time-entries";
import Explosion from "@/lib/Tasks/Cards/Base/Explosion";
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
        <div>
          <div className={styles.timeEntryName}>{timeEntry.task_name}</div>
          <div className={styles.timeEntrySub}>
            {timeEntry.project_name} - {timeEntry.folder_name}
          </div>
        </div>
      </div>
      <div className={styles.timeEntryRight}>
        {dayjs(timeEntry.start_date).format("HH:mm")} –{" "}
        {(timeEntry.end_date && dayjs(timeEntry.end_date).format("HH:mm")) ||
          "still running"}
      </div>
    </div>
  );
}
