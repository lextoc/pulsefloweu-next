import styles from "./index.module.css";

export interface LabelProps {
  children: React.ReactNode;
  htmlFor?: string;
}

export function Label({ children, htmlFor }: LabelProps) {
  return (
    <label htmlFor={htmlFor} className={styles.root}>
      {children}
    </label>
  );
}
