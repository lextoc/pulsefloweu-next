import { Label } from "@/components/forms/Label";

import styles from "./Input.module.css";

export interface IInputProps
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  label?: string;
}

export default function Input({ label, ...props }: IInputProps) {
  return (
    <>
      {label && <Label>{label}</Label>}
      <input className={styles.root} {...props} />
    </>
  );
}
