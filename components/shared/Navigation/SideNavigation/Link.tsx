import Link from "next/link";

import styles from "./Link.module.css";
import { LinkActive } from "./LinkActive";

export interface ISideNavigationLinkProps {
  href: string;
  title: string;
  sub?: string;
}

export default function SideNavigationLink({
  href,
  title,
  sub,
}: ISideNavigationLinkProps) {
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
