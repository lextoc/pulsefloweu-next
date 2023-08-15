import { useTimeout } from "@mantine/hooks";
import { IconPlayerPauseFilled } from "@tabler/icons-react";
import { useQueryClient } from "@tanstack/react-query";
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import utc from "dayjs/plugin/utc";
import Link from "next/link";
import { useEffect, useState } from "react";

import { getHeaders } from "@/api/cookies";
import endpoints from "@/api/endpoints";
import { TimeEntryWithTaskName } from "@/api/types/time-entries";
import { useFetch } from "@/hooks/useQueryBase";
import { useNavigationStore } from "@/stores/navigation";
import { useSnackbarStore } from "@/stores/snackbar";
import { transformSecondsToTimer } from "@/utils/helpers";

import styles from "./index.module.css";

dayjs.extend(advancedFormat);
dayjs.extend(utc);

export interface SideNavigationRunningTimeEntriesProps {}

export default function SideNavigationRunningTimeEntries() {
  const queryClient = useQueryClient();
  const showSnackbar = useSnackbarStore((state) => state.show);
  const [time, setTime] = useState(Date.now());
  const set = useNavigationStore((state) => state.set);

  const { start } = useTimeout(
    () => set({ shouldToggleMobileMenu: false }),
    50,
  );

  // For animating timer.
  useEffect(() => {
    const interval = setInterval(() => setTime(Date.now()), 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  const { data: timeEntriesData } = useFetch<TimeEntryWithTaskName[]>(
    endpoints.misc.runningTimeEntries,
  );
  const timeEntries: TimeEntryWithTaskName[] = timeEntriesData?.success
    ? timeEntriesData.data
    : [];

  const onClick = () => {
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
        set({ shouldToggleMobileMenu: true });
        start();
        queryClient.invalidateQueries();
        showSnackbar({
          message: "Time entry has been updated",
        });
      });
  };

  if (!timeEntries.length) return null;

  const seconds = dayjs().diff(dayjs(timeEntries?.[0]?.start_date), "seconds");

  return (
    <>
      {timeEntries.map((timeEntry) => (
        <div key={timeEntry.id} className={styles.wrapper}>
          <Link
            href={`/app/folders/${timeEntry.folder_id}/tasks/${timeEntry.task_id}`}
            className={styles.left}
            onClick={() => set({ shouldToggleMobileMenu: true })}
          >
            <div className={styles.name}>{timeEntry.task_name}</div>
            <div className={styles.timer}>
              {transformSecondsToTimer(seconds)}
            </div>
          </Link>
          <button className={styles.iconButton} onClick={onClick}>
            <div className={styles.icon}>
              <IconPlayerPauseFilled />
            </div>
          </button>
        </div>
      ))}
    </>
  );
}
