import Link from "next/link";

import Logo from "@/components/shared/Logo";
import { LoginForm } from "@/forms/Authentication/LoginForm";

import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.loginWrapper}>
      <div className={styles.logoWrapper}>
        <div>
          <Logo />
          <p>
            Use Tracky,{" "}
            <a href="https://github.com/lextoc/tracky-next" target="_blank">
              an open-source website
            </a>{" "}
            that will remain <strong>free forever</strong>, for tracking your
            tasks with timesheets. You can create an{" "}
            <strong>infinite amount of projects</strong> that can be brought to
            order with folders in each of them containing your tasks.
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
      </div>
    </div>
  );
}
