import {
  IconPlayerPauseFilled,
  IconPlayerPlayFilled,
} from "@tabler/icons-react";
import { useQueryClient } from "@tanstack/react-query";
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import utc from "dayjs/plugin/utc";
import Link from "next/link";
import { useState } from "react";

import { getHeaders } from "@/api/cookies";
import create from "@/api/create";
import endpoints from "@/api/endpoints";
import { Task } from "@/api/types/tasks";
import { CreateTimeEntry } from "@/api/types/time-entries";
import Explosion from "@/lib/Tasks/Cards/Base/Explosion";
import { useSnackbarStore } from "@/stores/snackbar";

import styles from "./Task.module.css";

export interface TimerTaskProps {
  task: Task;
}

dayjs.extend(advancedFormat);
dayjs.extend(utc);

export default function TimerTask({ task }: TimerTaskProps) {
  const queryClient = useQueryClient();
  const showSnackbar = useSnackbarStore((state) => state.show);

  const [isExploding, setIsExploding] = useState(false);

  const toggleTaskTimer = (task: Task) => {
    setIsExploding(true);
    setTimeout(() => setIsExploding(false), 1000);
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...getHeaders(),
      },
    };
    fetch(endpoints.misc.stopAll, requestOptions)
      .then((response) => {
        return response.json();
      })
      .then(() => {
        queryClient.invalidateQueries();
        showSnackbar({
          message: "Time entry has been updated",
        });
      });
    if (task.active_time_entries.length) return;
    create<{ time_entry: CreateTimeEntry }>(endpoints.timeEntries.main, {
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

  return (
    <div className={styles.root}>
      <div className={styles.leftTask}>
        <Link
          className={styles.leftTaskLink}
          href={`/app/folders/${task.folder_id}/tasks/${task.id}`}
          title={task.name}
        >
          <div className={`${styles.leftTaskName} ellipsis`}>{task.name}</div>
          <div className={`${styles.leftTaskSub} ellipsis`}>
            {task.folder_name} - {task.project_name}
          </div>
        </Link>
        <button
          className={`${styles.leftPlay} ${
            task.active_time_entries.length ? styles.leftPlayActive : ""
          } ${isExploding ? "exploding" : ""}`}
          onClick={() => toggleTaskTimer(task)}
        >
          {/* <Explosion /> */}
          {task.active_time_entries.length ? (
            <IconPlayerPauseFilled className={styles.playIcon} />
          ) : (
            <IconPlayerPlayFilled className={styles.playIcon} />
          )}
        </button>
      </div>
    </div>
  );
}
