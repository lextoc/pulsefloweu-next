import Link from "next/link";

import Logo from "@/components/Shared/Logo";

import styles from "../page.module.css";

export interface ForgotPasswordProps {}

export default function ForgotPassword(props: ForgotPasswordProps) {
  return (
    <div className={styles.loginWrapper}>
      <div className={styles.logoWrapper}>
        <Logo />
      </div>
      <div className={styles.login}>
        <h1>Forgot password?</h1>
        <p>
          Please{" "}
          <a href="mailto:alexander.claes10@gmail.com">send me an email</a> to
          resolve this.
        </p>
      </div>
      <div className={styles.links}>
        <a href="mailto:alexander.claes10@gmail.com">Contact support</a>
        &nbsp;•&nbsp;
        <Link href="/">Sign in</Link>
        &nbsp;•&nbsp;
        <Link href="/register">Register</Link>
      </div>
    </div>
  );
}
