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
              <h1>Welcome</h1>
              <p>
                Please fill in your details below and click on register to sign
                in with a new account.
              </p>
              <RegisterForm />
            </div>
            <div className={styles.links}>
              <a href="mailto:alexander.claes10@gmail.com">Contact support</a>
              &nbsp;•&nbsp;
              <Link href="/forgot-password">Forgot password</Link>
            </div>
          </div>
        </Wrapper>
      </Main>
    </Authentication>
  );
}
