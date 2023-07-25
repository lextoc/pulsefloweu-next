"use client";

import { useIsFetching } from "@tanstack/react-query";

import styles from "./index.module.css";

export interface INavigationProgressProps {}

export default function NavigationProgress(props: INavigationProgressProps) {
  const isFetching = useIsFetching();

  return (
    <div className={`${styles.root} ${isFetching ? styles.isFetching : ""}`} />
  );
}
