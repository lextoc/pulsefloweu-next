"use client";

import { IconFolderHeart } from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import utc from "dayjs/plugin/utc";
import Link from "next/link";

import endpoints from "@/api/endpoints";
import getPage from "@/api/getPage";
import { Folder } from "@/api/types/folders";
import { Project } from "@/api/types/projects";
import { Task } from "@/api/types/tasks";
import PaddingContainer from "@/components/Shared/PaddingContainer";
import FolderMenu from "@/lib/Folders/Menu";
import TaskCard from "@/lib/Tasks/Cards/Base";
import TasksCreateCard from "@/lib/Tasks/Cards/Create";

import styles from "./index.module.css";

export interface IFolderDetailProps {
  folderId?: number;
}

export function FolderDetail({ folderId }: IFolderDetailProps) {
  dayjs.extend(advancedFormat);
  dayjs.extend(utc);

  if (!folderId) return null;

  /**
   * Fetch folder
   */
  const query = useQuery({
    queryKey: [endpoints.getFolder(folderId)],
    queryFn: () => getPage(endpoints.getFolder(folderId)),
  });

  let folder: Folder | null = null;
  if (query.data?.success) folder = query.data?.data;

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
  const taskQuery = useQuery({
    queryKey: [endpoints.getTasksFromFolder(folder?.id || -1)],
    queryFn: () => getPage(endpoints.getTasksFromFolder(folder?.id || -1)),
  });

  let tasks: Task[] = [];
  if (taskQuery.data?.success) tasks = taskQuery.data?.data;

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
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
    </PaddingContainer>
  );
}
