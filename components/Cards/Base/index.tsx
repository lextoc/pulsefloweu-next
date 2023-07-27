import styles from "./index.module.css";

export interface CardProps {
  header: React.ReactNode;
  content: React.ReactNode;
  footer?: React.ReactNode;
}

export default function Card({ header, content, footer }: CardProps) {
  return (
    <article className={styles.root}>
      <header className={styles.header}>{header}</header>
      <div className={styles.content}>{content}</div>
      <footer className={styles.footer}>{footer}</footer>
    </article>
  );
}
