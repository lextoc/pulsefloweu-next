import { Label } from "@/ui/Inputs/Label";

import styles from "./index.module.css";

export interface InputProps
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  label?: string;
  inverted?: boolean;
}

export default function Input({ label, inverted, ...props }: InputProps) {
  return (
    <>
      {label && <Label>{label}</Label>}
      <input
        className={`${styles.root} ${inverted ? styles.inverted : ""}`}
        {...props}
      />
    </>
  );
}
