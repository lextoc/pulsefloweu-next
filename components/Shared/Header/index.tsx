import styles from "./index.module.css";

export interface HeaderProps {
  children: React.ReactNode;
}

export function Header({ children }: HeaderProps) {
  return <div className={styles.root}>{children}</div>;
}
