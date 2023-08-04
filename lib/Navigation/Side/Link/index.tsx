import { useTimeout } from "@mantine/hooks";
import Link from "next/link";

import { useNavigationStore } from "@/stores/navigation";

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
  const set = useNavigationStore((state) => state.set);

  const { start } = useTimeout(
    () => set({ shouldToggleMobileMenu: false }),
    50,
  );

  const onClick = () => {
    set({ shouldToggleMobileMenu: true });
    start();
  };

  return (
    <Link href={href} className={styles.root} onClick={() => onClick()}>
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
