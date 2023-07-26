"use client";

import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import utc from "dayjs/plugin/utc";
import Link from "next/link";

import endpoints from "@/api/endpoints";
import getPage from "@/api/getPage";
import { Folder } from "@/api/types/folders";
import { Project } from "@/api/types/projects";
import PaddingContainer from "@/components/Shared/PaddingContainer";
import FolderCardMenu from "@/lib/Folders/Cards/Base/Menu";

import styles from "./index.module.css";

export interface IFolderDetailProps {
  folderId?: number;
}

export function FolderDetail({ folderId }: IFolderDetailProps) {
  dayjs.extend(advancedFormat);
  dayjs.extend(utc);

  if (!folderId) return null;

  const query = useQuery({
    queryKey: [endpoints.getFolder(folderId)],
    queryFn: () => getPage(endpoints.getFolder(folderId)),
  });

  let folder: Folder | null = null;
  if (query.data?.success) folder = query.data?.data;

  const projectQuery = useQuery({
    queryKey: [endpoints.getProject(folder?.project_id || -1)],
    queryFn: () => getPage(endpoints.getProject(folder?.project_id || -1)),
  });

  let project: Project | null = null;
  if (projectQuery.data?.success) project = projectQuery.data?.data;

  if (!folder) return null;

  return (
    <PaddingContainer withBottomGap>
      <header className={styles.header}>
        <h1>{folder.name}</h1>
        <FolderCardMenu folder={folder} />
      </header>
      <p>
        of{" "}
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
      time to render timesheet creation and task creation
    </PaddingContainer>
  );
}
