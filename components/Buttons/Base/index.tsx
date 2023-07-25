import Link from "next/link";

import styles from "./index.module.css";

export interface IButtonProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  children: React.ReactNode;
  variant?: "subtle";
  nextLink?: string;
  danger?: boolean;
  noMargin?: boolean;
}

export default function Button({
  children,
  variant,
  nextLink,
  danger,
  noMargin,
  ...props
}: IButtonProps) {
  const classNames = `${variant === "subtle" ? styles.subtle : styles.root} ${
    danger ? styles.danger : ""
  } ${noMargin ? styles.noMargin : ""}`;

  if (nextLink) {
    return (
      <Link className={classNames} href={nextLink}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classNames} {...props}>
      {children}
    </button>
  );
}
