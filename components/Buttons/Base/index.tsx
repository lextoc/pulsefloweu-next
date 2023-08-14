import Link from "next/link";

import styles from "./index.module.css";

export interface ButtonProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  children: React.ReactNode;
  variant?: "subtle";
  nextLink?: string;
  danger?: boolean;
  noMargin?: boolean;
  testid?: string;
  disabled?: boolean;
}

export default function Button({
  children,
  variant,
  nextLink,
  danger,
  noMargin,
  testid,
  disabled = false,
  ...props
}: ButtonProps) {
  const classNames = `${variant === "subtle" ? styles.subtle : styles.root} ${
    danger ? styles.danger : ""
  } ${noMargin ? styles.noMargin : ""}`;

  if (nextLink) {
    return (
      <Link className={classNames} href={nextLink} data-testid={testid}>
        {children}
      </Link>
    );
  }

  return (
    <button
      className={classNames}
      {...props}
      data-testid={testid}
      disabled={disabled}
      aria-disabled={disabled}
    >
      {children}
    </button>
  );
}
