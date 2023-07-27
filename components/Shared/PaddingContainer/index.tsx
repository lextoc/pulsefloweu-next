"use client";

import styles from "./index.module.css";

export interface PaddingContainerProps {
  children: React.ReactNode;
  withBottomGap?: boolean;
}

export default function PaddingContainer({
  children,
  withBottomGap,
}: PaddingContainerProps) {
  return (
    <div className={`${styles.root} ${withBottomGap ? styles.bottomGap : ""}`}>
      {children}
    </div>
  );
}
