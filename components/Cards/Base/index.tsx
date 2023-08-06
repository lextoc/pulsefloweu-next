import styles from "./index.module.css";

export interface CardProps {
  header: React.ReactNode;
  content?: React.ReactNode;
  footer?: React.ReactNode;
  hasMovingBackground?: boolean;
}

export default function Card({
  header,
  content,
  footer,
  hasMovingBackground: withMovingBackground,
}: CardProps) {
  return (
    <article
      className={`${styles.root} ${
        withMovingBackground ? styles.rootMovingBackground : ""
      }`}
    >
      <header className={styles.header}>{header}</header>
      {content && <div className={styles.content}>{content}</div>}
      {footer && <footer className={styles.footer}>{footer}</footer>}
    </article>
  );
}
