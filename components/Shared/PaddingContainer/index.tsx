"use client";

import styles from "./index.module.css";

export interface PaddingContainerProps {
  children: React.ReactNode;
}

export default function PaddingContainer({ children }: PaddingContainerProps) {
  return <div className={styles.root}>{children}</div>;
}
