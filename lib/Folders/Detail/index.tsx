"use client";

import { IconFolderHeart } from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import utc from "dayjs/plugin/utc";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

import endpoints from "@/api/endpoints";
import getPage from "@/api/getPage";
import { Folder } from "@/api/types/folders";
import { Project } from "@/api/types/projects";
import { Task } from "@/api/types/tasks";
import Pagination from "@/components/Navigation/Pagination";
import PaddingContainer from "@/components/Shared/PaddingContainer";
import { useFetchArray } from "@/hooks/useQueryBase";
import FolderMenu from "@/lib/Folders/Menu";
import TasksCard from "@/lib/Tasks/Cards/Base";
import TasksCreateCard from "@/lib/Tasks/Cards/Create";
import { useNavigationStore } from "@/stores/navigation";

import styles from "./index.module.css";

dayjs.extend(advancedFormat);
dayjs.extend(utc);

export interface FoldersDetailProps {
  folderId?: number;
}

export default function FoldersDetail({ folderId }: FoldersDetailProps) {
  const searchParams = useSearchParams();
  const current = new URLSearchParams(Array.from(searchParams.entries()));
  const page = current.get("page");

  /**
   * Fetch folder
   */
  const query = useQuery({
    queryKey: [endpoints.getFolder(folderId!)],
    queryFn: () => getPage(endpoints.getFolder(folderId!)),
  });

  let folder: Folder | null = null;
  if (query.data?.success) folder = query.data?.data;

  const set = useNavigationStore((state) => state.set);
  set({ menuTitle: `Viewing folder "${folder?.name || ""}"` });

  /**
   * Fetch project
   */
  const projectQuery = useQuery({
    queryKey: [endpoints.getProject(folder?.project_id || -1)],
    queryFn: () => getPage(endpoints.getProject(folder?.project_id || -1)),
  });

  let project: Project | null = null;
  if (projectQuery.data?.success) project = projectQuery.data?.data;

  /**
   * Fetch tasks
   */
  const { data: tasksData } = useFetchArray<Task>(
    endpoints.getTasksFromFolder(folder?.id || -1),
    { page },
  );
  const tasks: Task[] = tasksData?.success ? tasksData.data : [];

  if (!folder) return null;

  return (
    <PaddingContainer withBottomGap>
      <header className={styles.header}>
        <div className={styles.headerIcon}>
          <IconFolderHeart size="4rem" color="rgb(var(--main))" />
        </div>
        <div>
          <div className={styles.headerInner}>
            <h1>{folder.name}</h1>
            <FolderMenu folder={folder} />
          </div>
          <p>
            Folder of{" "}
            <Link
              href={`/app/projects/${folder.project_id}`}
              className={styles.link}
            >
              {project && project.name}
            </Link>
            <br />
            <small>
              <i>
                Created on{" "}
                {dayjs(folder.created_at).utc(true).format("Do MMMM, YYYY")}{" "}
              </i>
            </small>
          </p>
        </div>
      </header>
      <hr />
      <div className={`${styles.cards} cards`}>
        <TasksCreateCard folder={folder} />
        {tasks.map((task) => (
          <TasksCard key={task.id} task={task} />
        ))}
      </div>
      <Pagination {...tasksData?.meta} />
    </PaddingContainer>
  );
}
