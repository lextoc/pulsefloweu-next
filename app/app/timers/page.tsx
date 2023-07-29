"use client";

import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import utc from "dayjs/plugin/utc";
import { useSearchParams } from "next/navigation";

import endpoints from "@/api/endpoints";
import getPage from "@/api/getPage";
import { Task } from "@/api/types/tasks";
import { TimeEntry } from "@/api/types/time-entries";
import Pagination from "@/components/Navigation/Pagination";
import { Header } from "@/components/Shared/Header";
import PaddingContainer from "@/components/Shared/PaddingContainer";
import { useNavigationStore } from "@/stores/navigation";

import styles from "./page.module.css";
import TimersTask from "./Task";
import TimersTimeEntry from "./TimeEntry";

dayjs.extend(advancedFormat);
dayjs.extend(utc);

export interface DashboardProps {}

export default function Dashboard(props: DashboardProps) {
  const set = useNavigationStore((state) => state.set);
  set({ menuTitle: "Start timing your tasks" });

  const searchParams = useSearchParams();
  const current = new URLSearchParams(Array.from(searchParams.entries()));
  const page = current.get("page");

  const tasksQuery = useQuery({
    queryKey: [endpoints.getTasks],
    queryFn: () => getPage(endpoints.getTasks),
  });

  let tasks: Task[] = [];
  if (tasksQuery.data?.success) tasks = tasksQuery.data?.data;

  const timeEntriesQuery = useQuery({
    queryKey: [endpoints.getTimeEntries, page],
    queryFn: () =>
      getPage(endpoints.getTimeEntries, {
        page,
      }),
  });

  let timeEntries: TimeEntry[] = [];
  if (timeEntriesQuery.data?.success) timeEntries = timeEntriesQuery.data?.data;

  let timeEntriesByDate: any = {};
  const format = "DD MMMM YYYY";
  timeEntries.forEach((timeEntry) => {
    if (
      Array.isArray(
        timeEntriesByDate[dayjs(timeEntry.start_date).format(format)],
      )
    ) {
      timeEntriesByDate[dayjs(timeEntry.start_date).format(format)].push(
        timeEntry,
      );
    } else {
      timeEntriesByDate[dayjs(timeEntry.start_date).format(format)] = [
        timeEntry,
      ];
    }
  });

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
          {tasks.map((task) => (
            <TimersTask key={task.id} task={task} />
          ))}
        </div>
        <PaddingContainer withBottomGap>
          <p>
            Form for creating a new task here, creating it automatically starts
            a time entry. Also (eventually) put role dropdown here somewhere.
          </p>
          <h2>Your time entries</h2>
          {Object.keys(timeEntriesByDate).map((date) => {
            return (
              <div className={styles.dayList}>
                <h3>{date}</h3>
                {timeEntriesByDate[date].map((timeEntry: TimeEntry) => (
                  <TimersTimeEntry key={timeEntry.id} timeEntry={timeEntry} />
                ))}
              </div>
            );
          })}
          <Pagination {...timeEntriesQuery.data?.meta} />
        </PaddingContainer>
      </div>
    </div>
  );
}
