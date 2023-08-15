import Link from "next/link";

import Logo from "@/components/Shared/Logo";
import LoginForm from "@/modules/Authentication/LoginForm";

import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.confirmedWrapper}>
      <div className={styles.logoWrapper}>
        <Logo />
      </div>
      <div className={styles.confirmed}>
        <h1>E-mail address confirmed</h1>
        <p>Please sign in to continue.</p>
        <LoginForm />
      </div>
      <div className={styles.links}>
        <a href="mailto:alexander.claes10@gmail.com">Contact support</a>
        &nbsp;•&nbsp;
        <Link href="/forgot-password">Forgot password</Link>
      </div>
    </div>
  );
}
