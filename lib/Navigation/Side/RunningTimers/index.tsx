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
import endpoints from "@/api/endpoints";
import getPage from "@/api/getPage";
import { TimeEntryWithTaskName } from "@/api/types/time-entries";
import { useSnackbarStore } from "@/stores/snackbar";
import { transformSecondsToHumanReadableString } from "@/utils/helpers";

import styles from "./index.module.css";

dayjs.extend(advancedFormat);
dayjs.extend(utc);

export interface SideNavigationRunningTimersProps {}

export default function SideNavigationRunningTimers(
  props: SideNavigationRunningTimersProps,
) {
  const queryClient = useQueryClient();
  const showSnackbar = useSnackbarStore((state) => state.show);

  const [time, setTime] = useState(Date.now());

  // For animating timer.
  useEffect(() => {
    const interval = setInterval(() => setTime(Date.now()), 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  const query = useQuery({
    queryKey: [endpoints.getRunningTimers],
    queryFn: () => getPage(endpoints.getRunningTimers),
  });

  let timeEntries: TimeEntryWithTaskName[] = [];
  if (query.data?.success) timeEntries = query.data?.data;

  const onClick = () => {
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
  };

  if (!timeEntries.length) return null;

  const seconds = dayjs().diff(dayjs(timeEntries?.[0]?.start_date), "seconds");

  return (
    <>
      {timeEntries.map((timeEntry) => (
        <div className={styles.wrapper}>
          <Link
            href={`/app/folders/${timeEntry.folder_id}/tasks/${timeEntry.task_id}`}
            className={styles.left}
          >
            <div className={styles.name}>{timeEntry.task_name}</div>
            <div className={styles.timer}>
              {transformSecondsToHumanReadableString(seconds)}
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
