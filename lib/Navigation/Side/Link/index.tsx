import Link from "next/link";

import { LinkActive } from "../LinkActive";
import styles from "./index.module.css";

export interface SideNavigationLinkProps {
  href: string;
  title: string;
  sub?: string;
  wip?: boolean;
}

export default function SideNavigationLink({
  href,
  title,
  sub,
  wip,
}: SideNavigationLinkProps) {
  return (
    <Link href={href} className={styles.root}>
      <LinkActive href={href} />
      <div className={styles.inner}>
        <strong>
          {title}
          {wip && <span className="wip" />}
        </strong>
        {sub && <div>{sub}</div>}
      </div>
    </Link>
  );
}
