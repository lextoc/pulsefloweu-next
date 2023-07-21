export interface IFormProps
  extends React.DetailedHTMLProps<
    React.FormHTMLAttributes<HTMLFormElement>,
    HTMLFormElement
  > {
  children: React.ReactNode;
}

export default function Form({ children, ...props }: IFormProps) {
  return <form {...props}>{children}</form>;
}
