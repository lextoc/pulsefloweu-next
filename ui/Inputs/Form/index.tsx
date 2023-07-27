import styles from "./index.module.css";

export interface FormProps
  extends React.DetailedHTMLProps<
    React.FormHTMLAttributes<HTMLFormElement>,
    HTMLFormElement
  > {
  children: React.ReactNode;
}

export default function Form({ children, ...props }: FormProps) {
  return (
    <form {...props} className={styles.root}>
      {children}
    </form>
  );
}
