import Link from "next/link";

import styles from "./Button.module.css";

export interface IButtonProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  children: React.ReactNode;
  variant?: "subtle";
  nextLink?: string;
}

export default function Button({
  children,
  variant,
  nextLink,
  ...props
}: IButtonProps) {
  if (nextLink) {
    return (
      <Link
        className={variant === "subtle" ? styles.subtle : styles.root}
        href={nextLink}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      className={variant === "subtle" ? styles.subtle : styles.root}
      {...props}
    >
      {children}
    </button>
  );
}
