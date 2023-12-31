import Link from "next/link";

import Logo from "@/components/Shared/Logo";
import LoginForm from "@/modules/Authentication/LoginForm";

import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.loginWrapper}>
      <div className={styles.logoWrapper}>
        <div>
          <Logo />
          <p>
            PulseFlow offers complimentary access for individual users, allowing
            you to harness its time entry and timesheet generation features
            without any charges. As our platform evolves, incorporating team
            functionality, it's important to note that this enhanced aspect will
            be available under a subscription model to ensure its continued
            availability and quality.
          </p>
        </div>
      </div>
      <div className={styles.login}>
        <h1>Hey there!</h1>
        <p>
          Please sign in to continue. Or click register if you have no account
          yet. <strong>It's free!</strong>
        </p>
        <LoginForm />
      </div>
      <div className={styles.links}>
        <a href="mailto:alexander.claes10@gmail.com">Contact support</a>
        &nbsp;•&nbsp;
        <Link href="/forgot-password">Forgot password</Link>
        &nbsp;•&nbsp;
        <Link href="/resend-confirmation">Resend confirmation e-mail</Link>
      </div>
    </div>
  );
}
