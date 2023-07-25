import Link from "next/link";

import { LinkActive } from "../LinkActive";
import styles from "./index.module.css";

export interface SideNavigationLinkProps {
  href: string;
  title: string;
  sub?: string;
}

export default function SideNavigationLink({
  href,
  title,
  sub,
}: SideNavigationLinkProps) {
  return (
    <Link href={href} className={styles.root}>
      <LinkActive href={href} />
      <div className={styles.inner}>
        <strong>{title}</strong>
        {sub && <div>{sub}</div>}
      </div>
    </Link>
  );
}
