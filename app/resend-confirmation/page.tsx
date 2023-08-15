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

export interface ResendConfirmationFormValues {
  email: string;
}

export interface ResendConfirmationProps {}

export default function ForgotPassword() {
  const showSnackbar = useSnackbarStore((state) => state.show);
  const { push } = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = (values: ResendConfirmationFormValues) => {
    setIsLoading(true);
    const requestOptions = {
      method: "GET",
    };

    fetch(
      `${endpoints.auth.confirmationNew}?email=${values.email}`,
      requestOptions,
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data?.errors || data?.error) {
          showSnackbar({
            message: data?.errors?.full_messages?.join(" ") || data?.error,
            type: "error",
          });
        } else {
          push("/");
          showSnackbar({
            message: data?.message,
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
        <h1>Resend confirmation e-mail</h1>
        <p>
          Please fill in your details below and click on "Continue" to send a
          confirmation e-mail.
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
