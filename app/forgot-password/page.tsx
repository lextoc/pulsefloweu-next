import Link from "next/link";

import Authentication from "@/components/shared/Authentication";
import Logo from "@/components/shared/Logo";
import Main from "@/components/shared/Main";
import Wrapper from "@/components/shared/Wrapper";
import { RegisterForm } from "@/forms/Authentication/RegisterForm";

import styles from "../page.module.css";

export interface IRegisterProps {}

export default function Register(props: IRegisterProps) {
  return (
    <Authentication>
      <Main>
        <Wrapper>
          <div className={styles.loginWrapper}>
            <div className={styles.logoWrapper}>
              <Logo />
            </div>
            <div className={styles.login}>
              <h1>Forgot password?</h1>
              <p>
                Please{" "}
                <a href="mailto:alexander.claes10@gmail.com">send an email</a>{" "}
                to resolve this. We're working on this feature.
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
      </Main>
    </Authentication>
  );
}
