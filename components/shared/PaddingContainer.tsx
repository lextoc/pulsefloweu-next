"use client";

import styles from "./PaddingContainer.module.css";

export interface IPaddingContainerProps {
  children: React.ReactNode;
}

export default function PaddingContainer({ children }: IPaddingContainerProps) {
  return <div className={styles.root}>{children}</div>;
}
