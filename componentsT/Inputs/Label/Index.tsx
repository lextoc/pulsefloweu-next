import styles from "./index.module.css";

export interface ILabelProps {
  children: React.ReactNode;
}

export function Label({ children }: ILabelProps) {
  return <label className={styles.root}>{children}</label>;
}
