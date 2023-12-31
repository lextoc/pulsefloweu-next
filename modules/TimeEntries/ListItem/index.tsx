import { useForm } from "@mantine/form";
import { useDebouncedValue } from "@mantine/hooks";
import {
  IconPlayerPauseFilled,
  IconPlayerPlayFilled,
} from "@tabler/icons-react";
import { useQueryClient } from "@tanstack/react-query";
import dayjs, { Dayjs } from "dayjs";
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
import Explosion from "@/components/Shared/Explosion";
import TimeEntryMenu from "@/modules/TimeEntries/Menu";
import { useSnackbarStore } from "@/stores/snackbar";
import { transformSecondsToTimer } from "@/utils/helpers";

import styles from "./index.module.css";

dayjs.extend(timezone);
dayjs.extend(advancedFormat);
dayjs.extend(utc);

export interface TimeEntryListItemProps {
  timeEntry: TimeEntry;
}

export default function TimeEntryListItem({
  timeEntry,
}: TimeEntryListItemProps) {
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
    if (!timeEntry.end_date) return;
    create<CreateTimeEntry>(endpoints.timeEntries.main, {
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

  const form = useForm({
    initialValues: {
      startDate: dayjs(timeEntry.start_date).format("HH:mm"),
      endDate: timeEntry.end_date
        ? dayjs(timeEntry.end_date).format("HH:mm")
        : "",
      date: dayjs(timeEntry.start_date).format("YYYY-MM-DD"),
    },

    validate: {
      // email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
    },
  });

  const [dates] = useDebouncedValue(form.values, 3000);
  const isEnteringNewValues =
    JSON.stringify(dates) !== JSON.stringify(form.values);

  useEffect(() => {
    let newStartDate = setHoursAndMinutes(dayjs(dates.date), dates.startDate);
    let newEndDate = setHoursAndMinutes(
      dayjs(dates.date),
      !dates.endDate ? dayjs().format("HH:mm") : dates.endDate,
    );
    if (
      !dayjs(timeEntry.start_date).isValid() ||
      !dayjs(newStartDate).isValid() ||
      !dayjs(newEndDate).isValid() ||
      (!dayjs(timeEntry.end_date).isValid() && timeEntry.end_date) ||
      dayjs(newStartDate).isAfter(dayjs(newEndDate)) ||
      (dayjs(newStartDate).isSame(dayjs(timeEntry.start_date), "minutes") &&
        (dayjs(newEndDate).isSame(dayjs(timeEntry.end_date), "minutes") ||
          !timeEntry.end_date))
    ) {
      form.setValues({
        startDate: dayjs(timeEntry.start_date).format("HH:mm"),
        endDate: timeEntry.end_date
          ? dayjs(timeEntry.end_date).format("HH:mm")
          : "",
        date: dayjs(timeEntry.start_date).format("YYYY-MM-DD"),
      });
      return;
    }
    onTimeChange(dates.startDate, dates.endDate || undefined);
  }, [dates]);

  const setHoursAndMinutes = (date: Dayjs, value: string): string => {
    const hours = value.split(":")[0];
    const minutes = value.split(":")[1];

    return date
      .set("hours", parseInt(hours, 10))
      .set("minutes", parseInt(minutes, 10))
      .format();
  };

  const onTimeChange = (start: string, end?: string) => {
    let newStartDate = setHoursAndMinutes(dayjs(form.values.date), start);
    let newEndDate = end
      ? setHoursAndMinutes(dayjs(form.values.date), end)
      : undefined;
    updateDate(newStartDate, newEndDate);
  };

  const updateDate = (startDate: string, endDate?: string) => {
    update<{ time_entry: Partial<TimeEntry> }>(
      endpoints.timeEntries.detail(timeEntry.id),
      {
        time_entry: {
          start_date: startDate,
          end_date: endDate,
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
  const [time, setTime] = useState(Date.now());

  // For animating timer.
  useEffect(() => {
    if (!timeEntry.end_date) {
      let interval: NodeJS.Timer;

      const handleVisibilityChange = () => {
        if (document.visibilityState === "visible") {
          interval = setInterval(() => setTime(Date.now()), 1000);
        } else {
          clearInterval(interval);
        }
      };

      handleVisibilityChange();

      document.addEventListener("visibilitychange", handleVisibilityChange);

      return () => {
        clearInterval(interval);
        document.removeEventListener(
          "visibilitychange",
          handleVisibilityChange,
        );
      };
    }
  }, []);

  useEffect(() => {
    if (dayjs(timeEntry.start_date).format("HH:mm") !== form.values.startDate) {
      form.setFieldValue(
        "startDate",
        dayjs(timeEntry.start_date).format("HH:mm"),
      );
    }

    if (
      timeEntry.end_date &&
      dayjs(timeEntry.end_date).format("HH:mm") !== form.values.endDate
    ) {
      form.setFieldValue(
        "endDate",
        timeEntry.end_date ? dayjs(timeEntry.end_date).format("HH:mm") : "",
      );
    }
  }, [timeEntry]);

  return (
    <div
      className={`${styles.root} ${timeEntry.end_date ? "" : styles.active} ${
        isEnteringNewValues ? styles.isUpdating : ""
      }`}
    >
      <div className={styles.left}>
        <button className={styles.button} onClick={() => toggleTaskTimer()}>
          <Explosion isExploding={isExploding} />
          {!timeEntry.end_date ? (
            <IconPlayerPauseFilled className={styles.playIcon} />
          ) : (
            <IconPlayerPlayFilled className={styles.playIcon} />
          )}
        </button>
        <Link
          href={`/app/folders/${timeEntry.folder_id}/tasks/${timeEntry.task_id}`}
          className={styles.nameLink}
        >
          <div className={styles.name}>{timeEntry.task_name}</div>
          <div className={styles.sub}>
            {timeEntry.folder_name} - {timeEntry.project_name}
          </div>
        </Link>
      </div>
      <div className={styles.right}>
        <Input
          className={styles.input}
          type="date"
          transparent
          small
          {...form.getInputProps("date")}
        />
        <Input
          className={styles.input}
          type="time"
          transparent
          small
          {...form.getInputProps("startDate")}
        />
        <span className={styles.separator}>–</span>
        <Input
          className={styles.inputLastTime}
          type="time"
          transparent
          small
          min={form.getInputProps("startDate").value}
          {...form.getInputProps("endDate")}
        />
        <span className={styles.timer}>{transformSecondsToTimer(seconds)}</span>
        <TimeEntryMenu timeEntry={timeEntry} />
      </div>
    </div>
  );
}
