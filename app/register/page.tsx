import Link from "next/link";

import RegisterForm from "@/lib/Authentication/RegisterForm";
import Logo from "@/ui/Shared/Logo";

import styles from "../page.module.css";

export interface RegisterProps {}

export default function Register(props: RegisterProps) {
  return (
    <div className={styles.loginWrapper}>
      <div className={styles.logoWrapper}>
        <Logo />
      </div>
      <div className={styles.login}>
        <h1>Welcome</h1>
        <p>
          Please fill in your details below and click on register to sign in
          with a new account.
        </p>
        <RegisterForm />
      </div>
      <div className={styles.links}>
        <a href="mailto:alexander.claes10@gmail.com">Contact support</a>
        &nbsp;•&nbsp;
        <Link href="/forgot-password">Forgot password</Link>
      </div>
    </div>
  );
}
