"use client";
import { useForm } from "@mantine/form";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

import endpoints from "@/api/endpoints";
import Button from "@/components/Buttons/Base";
import Input from "@/components/Inputs/Base";
import Form from "@/components/Inputs/Form";
import Logo from "@/components/Shared/Logo";
import { useSnackbarStore } from "@/stores/snackbar";

import styles from "../page.module.css";

export interface ResetPasswordFormValues {
  password: string;
  password_confirmation: string;
}

export interface ResetPasswordProps {}

export default function ForgotPassword() {
  const showSnackbar = useSnackbarStore((state) => state.show);
  const { push } = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const searchParams = useSearchParams();

  const onSubmit = (values: ResetPasswordFormValues) => {
    setIsLoading(true);
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ["access-token"]: searchParams.get("access-token"),
        client: searchParams.get("client"),
        uid: searchParams.get("uid"),
        ...values,
      }),
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
            message: data.message,
          });
        }
      })
      .finally(() => setIsLoading(false));
  };

  const form = useForm({
    initialValues: {
      password: "",
      password_confirmation: "",
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
          Please fill in your details below and click on "Continue" to update
          your password.
        </p>
        <Form onSubmit={form.onSubmit((values) => onSubmit(values))}>
          <Input
            label="New password"
            placeholder="New password"
            type="password"
            autoComplete="current-password"
            {...form.getInputProps("password")}
          />
          <Input
            label="Repeat new password"
            placeholder="New password confirmation"
            type="password"
            autoComplete="new-password"
            {...form.getInputProps("password_confirmation")}
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
