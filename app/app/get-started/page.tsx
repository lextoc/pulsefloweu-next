"use client";

import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import utc from "dayjs/plugin/utc";
import { useSearchParams } from "next/navigation";

import endpoints from "@/api/endpoints";
import { Task } from "@/api/types/tasks";
import { TimeEntry } from "@/api/types/time-entries";
import Pagination from "@/components/Navigation/Pagination";
import { Header } from "@/components/Shared/Header";
import PaddingContainer from "@/components/Shared/PaddingContainer";
import { useFetch } from "@/hooks/useQueryBase";
import TimeEntryListItem from "@/modules/TimeEntries/ListItem";
import { useNavigationStore } from "@/stores/navigation";
import { transformSecondsToHumanReadableString } from "@/utils/helpers";

import NewTask from "./NewTask";
import styles from "./page.module.css";
import TimerTask from "./Task";

dayjs.extend(advancedFormat);
dayjs.extend(utc);

export interface AppTimerProps {}

export default function AppTimer() {
  const set = useNavigationStore((state) => state.set);
  set({ menuTitle: "Start timing your tasks" });

  const searchParams = useSearchParams();
  const current = new URLSearchParams(Array.from(searchParams.entries()));
  const page = current.get("page");

  const { data: tasksData, isFetched: isTasksFetched } = useFetch<Task[]>(
    endpoints.tasks.main,
  );
  const tasks: Task[] = tasksData?.success ? tasksData.data : [];

  const { data: timeEntriesData, isFetched } = useFetch<TimeEntry[]>(
    endpoints.timeEntries.main,
    { page },
  );
  const timeEntries: TimeEntry[] = timeEntriesData?.success
    ? timeEntriesData.data
    : [];

  const getDateFormat = (date: string) => {
    if (dayjs().isSame(dayjs(date), "day")) return "Today";
    if (dayjs().subtract(1, "day").isSame(dayjs(date), "day"))
      return "Yesterday";
    return dayjs(date).format("dddd DD MMMM YYYY");
  };

  const hasTimeEntries = Object.keys(timeEntries).length > 0;

  return (
    <div className={styles.root}>
      <Header>
        <PaddingContainer>
          <h1>Get started</h1>
          <p>Start inserting time entries for your tasks</p>
        </PaddingContainer>
      </Header>
      <div className={styles.content}>
        <div className={styles.sidebar}>
          <div className={styles.secondSidebar} />
          <div className={styles.thirdSidebar} />
          <h4 className={styles.yourTasks}>
            {tasks.length > 0
              ? "Your recently used tasks"
              : isTasksFetched
              ? "No tasks yet"
              : ""}
          </h4>
          {tasks.map((task) => (
            <TimerTask key={`timers-task-${task.id}`} task={task} />
          ))}
        </div>
        <div className={styles.right}>
          <NewTask />
          <PaddingContainer withBottomGap>
            <h2>
              {hasTimeEntries
                ? "Your time entries"
                : isFetched
                ? "No time entries yet"
                : ""}
            </h2>
            {Object.keys(timeEntries).map((date) => {
              return (
                <div key={date} className={styles.dayList}>
                  <h3>
                    {getDateFormat(date)}{" "}
                    <span className={styles.duration}>
                      {transformSecondsToHumanReadableString(
                        //@ts-ignore
                        timeEntries[date].data.total_duration,
                      )}
                    </span>
                  </h3>
                  {/* @ts-ignore */}
                  {timeEntries[date].time_entries.map(
                    (timeEntry: TimeEntry) => (
                      <TimeEntryListItem
                        key={`timers-time-entry-${timeEntry.id}`}
                        timeEntry={timeEntry}
                      />
                    ),
                  )}
                </div>
              );
            })}
            <Pagination {...timeEntriesData?.meta} />
          </PaddingContainer>
        </div>
      </div>
    </div>
  );
}
