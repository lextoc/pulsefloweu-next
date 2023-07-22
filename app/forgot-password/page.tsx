import Link from "next/link";

import Logo from "@/components/shared/Logo";
import Wrapper from "@/components/shared/Wrapper";

import styles from "../page.module.css";

export interface IRegisterProps {}

export default function Register(props: IRegisterProps) {
  return (
    <Wrapper>
      <div className={styles.loginWrapper}>
        <div className={styles.logoWrapper}>
          <Logo />
        </div>
        <div className={styles.login}>
          <h1>Forgot password?</h1>
          <p>
            Please{" "}
            <a href="mailto:alexander.claes10@gmail.com">send an email</a> to
            resolve this. We're working on this feature.
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
    </Wrapper>
  );
}
