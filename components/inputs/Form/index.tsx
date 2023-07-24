import styles from "./index.module.css";

export interface IFormProps
  extends React.DetailedHTMLProps<
    React.FormHTMLAttributes<HTMLFormElement>,
    HTMLFormElement
  > {
  children: React.ReactNode;
}

export default function Form({ children, ...props }: IFormProps) {
  return (
    <form {...props} className={styles.root}>
      {children}
    </form>
  );
}
