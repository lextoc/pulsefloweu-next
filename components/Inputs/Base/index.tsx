import { ChangeEvent } from "react";

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
}

export default function Input({
  type,
  label,
  inverted,
  transparent,
  small,
  className,
  ...props
}: InputProps) {
  return (
    <>
      {label && <Label>{label}</Label>}
      <input
        className={`${styles.root} ${inverted ? styles.inverted : ""} ${
          transparent ? styles.transparent : ""
        } ${small ? styles.small : ""} ${className}`}
        type={type}
        {...props}
      />
    </>
  );
}
