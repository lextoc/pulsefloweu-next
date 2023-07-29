"use client";

import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import utc from "dayjs/plugin/utc";

import endpoints from "@/api/endpoints";
import getPage from "@/api/getPage";
import { Task } from "@/api/types/tasks";
import { TimeEntry } from "@/api/types/time-entries";
import { Header } from "@/components/Shared/Header";
import PaddingContainer from "@/components/Shared/PaddingContainer";
import { useNavigationStore } from "@/stores/navigation";

import styles from "./page.module.css";
import TimersTask from "./Task";

dayjs.extend(advancedFormat);
dayjs.extend(utc);

export interface DashboardProps {}

export default function Dashboard(props: DashboardProps) {
  const set = useNavigationStore((state) => state.set);
  set({ menuTitle: "Start timing your tasks" });

  const tasksQuery = useQuery({
    queryKey: [endpoints.getTasks],
    queryFn: () => getPage(endpoints.getTasks),
  });

  let tasks: Task[] = [];
  if (tasksQuery.data?.success) tasks = tasksQuery.data?.data;

  const timeEntriesQuery = useQuery({
    queryKey: [endpoints.getTimeEntries],
    queryFn: () => getPage(endpoints.getTimeEntries),
  });

  let timeEntries: TimeEntry[] = [];
  if (timeEntriesQuery.data?.success) timeEntries = timeEntriesQuery.data?.data;

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
          {/* PUT ROLE DROPDOWN HERE */}
          {tasks.map((task) => (
            <TimersTask key={task.id} task={task} />
          ))}
        </div>
        <PaddingContainer withBottomGap>
          <p>
            Form for creating a new task here, creating it automatically starts
            a time entry
          </p>
          {timeEntries.map((timeEntry) => (
            <div key={timeEntry.id} className={styles.timeEntry}>
              <div className={styles.timeEntryLeft}>
                <div className={styles.timeEntryName}>
                  {timeEntry.task_name}
                </div>
                <div className={styles.timeEntrySub}>
                  {timeEntry.project_name} • {timeEntry.folder_name}
                </div>
              </div>
              <div className={styles.timeEntryRight}>
                {dayjs(timeEntry.start_date).format("HH:mm")}-
                {(timeEntry.end_date &&
                  dayjs(timeEntry.end_date).format("HH:mm")) ||
                  "still running"}
              </div>
            </div>
          ))}
        </PaddingContainer>
      </div>
    </div>
  );
}
