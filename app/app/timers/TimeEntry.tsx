import {
  IconPlayerPauseFilled,
  IconPlayerPlayFilled,
} from "@tabler/icons-react";
import { useQueryClient } from "@tanstack/react-query";
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import Link from "next/link";
import { useEffect, useState } from "react";

import { getHeaders } from "@/api/cookies";
import create from "@/api/create";
import endpoints from "@/api/endpoints";
import { CreateTimeEntry, TimeEntry } from "@/api/types/time-entries";
import update from "@/api/update";
import Input from "@/components/Inputs/Base";
import Explosion from "@/lib/Tasks/Cards/Base/Explosion";
import TimeEntryMenu from "@/lib/TimeEntries/Menu";
import { useSnackbarStore } from "@/stores/snackbar";

import styles from "./TimeEntry.module.css";

dayjs.extend(timezone);
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

  const onTimeChange = (field: string, value: string) => {
    const hours = value.split(":")[0];
    const minutes = value.split(":")[1];

    let newDate = dayjs(timeEntry.end_date)
      .set("hours", parseInt(hours, 10))
      .set("minutes", parseInt(minutes, 10));

    updateDate(field, newDate.tz(dayjs.tz.guess()).toISOString());
  };

  const updateDate = (field, date) => {
    console.log("🚀  field, date:", field, date);
    update<{ time_entry: Partial<CreateTimeEntry> }>(
      endpoints.getTimeEntry(timeEntry.id),
      {
        time_entry: {
          [field]: date,
        },
      },
    ).then(() => {
      queryClient.invalidateQueries();
      showSnackbar({
        message: "Time entry has been updated",
      });
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
      className={`${styles.root} ${timeEntry.end_date ? "" : styles.active}`}
    >
      <div className={styles.left}>
        <button
          className={`${styles.button} ${isExploding ? "exploding" : ""}`}
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
          className={styles.nameLink}
        >
          <div className={styles.name}>{timeEntry.task_name}</div>
          <div className={styles.sub}>
            {timeEntry.project_name} - {timeEntry.folder_name}
          </div>
        </Link>
      </div>
      <div className={styles.right}>
        <Input
          className={styles.input}
          type="time"
          value={dayjs(timeEntry.start_date).format("HH:mm")}
          transparent
          small
          disabled={!timeEntry.end_date}
          onChange={(e) => onTimeChange("start_date", e?.currentTarget?.value)}
        />
        <span className={styles.separator}>–</span>
        <Input
          type="time"
          value={dayjs(timeEntry.end_date).format("HH:mm")}
          transparent
          small
          disabled={!timeEntry.end_date}
          onChange={(e) => onTimeChange("end_date", e?.currentTarget?.value)}
        />
        <span className={styles.timer}>{timer}</span>
        <TimeEntryMenu timeEntry={timeEntry} />
      </div>
    </div>
  );
}
