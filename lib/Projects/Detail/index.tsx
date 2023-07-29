"use client";

import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";

import endpoints from "@/api/endpoints";
import getPage from "@/api/getPage";
import { Folder } from "@/api/types/folders";
import { Project } from "@/api/types/projects";
import Pagination from "@/components/Navigation/Pagination";
import { Header } from "@/components/Shared/Header";
import PaddingContainer from "@/components/Shared/PaddingContainer";
import FoldersCard from "@/lib/Folders/Cards/Base";
import FoldersCreateCard from "@/lib/Folders/Cards/Create";
import ProjectMenu from "@/lib/Projects/Menu";

import styles from "./index.module.css";

export interface IProjectDetailProps {
  projectId?: number;
}

export default function ProjectDetail({ projectId }: IProjectDetailProps) {
  if (!projectId) return null;

  const query = useQuery({
    queryKey: [endpoints.getProject(projectId)],
    queryFn: () => getPage(endpoints.getProject(projectId)),
  });

  let project: Project | null = null;
  if (query.data?.success) project = query.data?.data;

  const searchParams = useSearchParams();
  const current = new URLSearchParams(Array.from(searchParams.entries()));
  const page = current.get("page");

  const foldersQuery = useQuery({
    queryKey: [endpoints.getFoldersFromProject(projectId), page],
    queryFn: () =>
      getPage(endpoints.getFoldersFromProject(projectId), {
        page,
      }),
  });

  let folders: Folder[] = [];
  if (foldersQuery.data?.success) folders = foldersQuery.data?.data;

  if (!project) return null;

  return (
    <>
      <Header>
        <PaddingContainer>
          <div className={styles.header}>
            <h1>{project.name}</h1>
            <ProjectMenu project={project} white />
          </div>
        </PaddingContainer>
      </Header>
      <PaddingContainer withBottomGap>
        <h2>Folders</h2>
        <div className="cards">
          {folders.map((folder) => (
            <FoldersCard key={folder.id} folder={folder} />
          ))}
          <FoldersCreateCard project={project} />
        </div>
        <Pagination {...foldersQuery.data?.meta} />
      </PaddingContainer>
    </>
  );
}
