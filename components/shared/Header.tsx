import styles from "./Header.module.css";

export interface IHeaderProps {
  children: React.ReactNode;
}

export function Header({ children }: IHeaderProps) {
  return <div className={styles.root}>{children}</div>;
}
