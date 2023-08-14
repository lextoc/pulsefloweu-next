import { useId } from "react";

import { Label } from "@/components/Inputs/Label";

import styles from "./index.module.css";

export interface InputProps
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  label?: string;
  inverted?: boolean;
  transparent?: boolean;
  small?: boolean;
  fullWidth?: boolean;
  error?: string;
}

export default function Input({
  type = "text",
  label,
  inverted,
  transparent,
  small,
  className,
  fullWidth,
  error,
  ...props
}: InputProps) {
  const id = useId();

  return (
    <div
      className={`${styles.root} ${
        type === "checkbox" || type === "radio" ? styles.rootCheckbox : ""
      }`}
    >
      {type !== "checkbox" && type !== "radio" && label && (
        <Label htmlFor={id}>{label}</Label>
      )}
      <input
        id={id}
        className={`${styles.input} ${
          type === "checkbox" || type === "radio" ? styles.checkbox : ""
        } ${inverted ? styles.inverted : ""} ${
          transparent ? styles.transparent : ""
        } ${small ? styles.small : ""} ${className || ""} ${
          fullWidth ? styles.fullWidth : ""
        }`}
        type={type}
        {...props}
      />
      {(type === "checkbox" || type === "radio") && label && (
        <Label htmlFor={id}>{label}</Label>
      )}
      {error && <div className={styles.error}>{error}</div>}
    </div>
  );
}
