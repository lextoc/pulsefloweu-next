"use client";

import styles from "./Wrapper.module.css";

export interface IWrapperProps {
  children: React.ReactNode;
}

export default function Wrapper({ children }: IWrapperProps) {
  return <div className={styles.root}>{children}</div>;
}
