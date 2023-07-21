import styles from "./Main.module.css";

export interface IMainProps {
  children: React.ReactNode;
}

export default function Main({ children }: IMainProps) {
  return <main className={styles.root}>{children}</main>;
}
