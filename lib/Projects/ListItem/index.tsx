"use client";

import { IconArrowBigRightLines } from "@tabler/icons-react";
import Link from "next/link";

import { Project } from "@/api/types/projects";

import styles from "./index.module.css";

export interface ProjectsListItemProps {
  project: Project;
  last?: boolean;
}

export default function ProjectsListItem({ project }: ProjectsListItemProps) {
  return (
    <div className={styles.root}>
      <Link href={`/app/projects/${project.id}`} className={styles.button}>
        <h2>{project.name}</h2>
        <div className={styles.buttonArrow}>
          <IconArrowBigRightLines size="2.5rem" />
        </div>
      </Link>
    </div>
  );
}
