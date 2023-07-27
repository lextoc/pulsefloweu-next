import styles from "./index.module.css";

export interface CardProps {
  header: React.ReactNode;
  content: React.ReactNode;
  footer?: React.ReactNode;
  withMovingBackground?: boolean;
}

export default function Card({
  header,
  content,
  footer,
  withMovingBackground,
}: CardProps) {
  return (
    <article
      className={`${styles.root} ${
        withMovingBackground ? styles.rootMovingBackground : ""
      }`}
    >
      <header className={styles.header}>{header}</header>
      <div className={styles.content}>{content}</div>
      <footer className={styles.footer}>{footer}</footer>
    </article>
  );
}
