import styles from "./index.module.css";

export interface LabelProps {
  children: React.ReactNode;
}

export function Label({ children }: LabelProps) {
  return <label className={styles.root}>{children}</label>;
}
