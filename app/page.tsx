import Link from "next/link";

import Logo from "@/components/shared/Logo";
import Main from "@/components/shared/Main";
import Wrapper from "@/components/shared/Wrapper";
import { LoginForm } from "@/forms/Authentication/LoginForm";

import styles from "./page.module.css";

export default function Home() {
  return (
    <Main>
      <Wrapper>
        <div className={styles.loginWrapper}>
          <div className={styles.logoWrapper}>
            <Logo />
          </div>
          <div className={styles.login}>
            <p>Please sign in to continue.</p>
            <LoginForm />
          </div>
          <div className={styles.links}>
            <a href="mailto:alexander.claes10@gmail.com">Contact support</a>
            &nbsp;•&nbsp;
            <Link href="/forgot-password">Forgot password</Link>
          </div>
        </div>
      </Wrapper>
    </Main>
  );
}
