import styles from "./index.module.css";

export interface HeaderProps {
  children: React.ReactNode;
  main?: boolean;
}

export function Header({ children, main }: HeaderProps) {
  return (
    <div className={`${styles.root} ${main ? styles.rootMain : ""}`}>
      {children}
    </div>
  );
}
