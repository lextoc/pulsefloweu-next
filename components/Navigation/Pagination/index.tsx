import { usePathname, useRouter, useSearchParams } from "next/navigation";

import styles from "./index.module.css";

export interface PaginationProps {
  current_page: number;
  next_page: number | null;
  per_page: number;
  prev_page: number | null;
  total_pages: number;
  total_count: number;
}

export default function Pagination({
  current_page,
  next_page,
  per_page,
  prev_page,
  total_pages,
  total_count,
}: PaginationProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const onClick = (page: number) => {
    const current = new URLSearchParams(Array.from(searchParams.entries()));
    if (current.delete) current.delete("page");
    current.set("page", `${page}`);
    router.push(`${pathname}?${current.toString()}`);
  };

  return (
    <div className={styles.root}>
      <div className={styles.pagination}>
        {Array.from(Array(total_pages), (e, index) => (
          <button
            key={index}
            className={`${styles.button} ${
              index + 1 === current_page ? styles.buttonActive : ""
            }`}
            onClick={() => onClick(index + 1)}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
}
