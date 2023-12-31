"use client";
import { useForm } from "@mantine/form";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

import endpoints from "@/api/endpoints";
import Button from "@/components/Buttons/Base";
import Input from "@/components/Inputs/Base";
import Form from "@/components/Inputs/Form";
import Logo from "@/components/Shared/Logo";
import { useSnackbarStore } from "@/stores/snackbar";

import styles from "../page.module.css";

export interface ForgotPasswordFormValues {
  email: string;
}

export interface ForgotPasswordProps {}

export default function ForgotPassword() {
  const showSnackbar = useSnackbarStore((state) => state.show);
  const { push } = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = (values: ForgotPasswordFormValues) => {
    setIsLoading(true);
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    };

    fetch(endpoints.auth.password, requestOptions)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data?.errors) {
          showSnackbar({
            message: data?.errors?.full_messages?.join(" "),
            type: "error",
          });
        } else {
          push("/");
          showSnackbar({
            message: "Password reset e-mail sent",
          });
        }
      })
      .finally(() => setIsLoading(false));
  };

  const form = useForm({
    initialValues: {
      email: "",
      redirect_url: "http://" + window.location.host + "/reset-password",
    },

    validate: {
      // email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
    },
  });

  return (
    <div className={styles.loginWrapper}>
      <div className={styles.logoWrapper}>
        <Logo />
      </div>
      <div className={styles.login}>
        <h1>Forgot password?</h1>
        <p>
          Please fill in your details below and click on "Continue" to send a
          password reset link.
        </p>
        <Form onSubmit={form.onSubmit((values) => onSubmit(values))}>
          <Input
            label="Email address"
            {...form.getInputProps("email")}
            placeholder="Email"
            autoComplete="email"
          />
          <div className={styles.submit}>
            <Button variant="subtle" nextLink="/">
              Back
            </Button>
            <Button disabled={isLoading} type="submit">
              Continue
            </Button>
          </div>
        </Form>
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
