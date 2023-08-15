"use client";

import { useForm } from "@mantine/form";
import { useRouter } from "next/navigation";
import { useState } from "react";

import endpoints from "@/api/endpoints";
import Button from "@/components/Buttons/Base";
import Input from "@/components/Inputs/Base";
import Form from "@/components/Inputs/Form";
import { useSnackbarStore } from "@/stores/snackbar";

import styles from "./index.module.css";

export interface RegisterFormValues {
  email: string;
  password: string;
}

export interface RegisterFormProps {}

export default function RegisterForm() {
  const showSnackbar = useSnackbarStore((state) => state.show);
  const { push } = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = (values: RegisterFormValues) => {
    setIsLoading(true);
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    };

    fetch(endpoints.auth.main, requestOptions)
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
            message: "Confirmation e-mail sent",
          });
        }
      })
      .finally(() => setIsLoading(false));
  };

  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },

    validate: {
      // email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
    },
  });

  return (
    <Form onSubmit={form.onSubmit((values) => onSubmit(values))}>
      <Input
        label="Email address"
        {...form.getInputProps("email")}
        placeholder="Email"
        autoComplete="email"
      />
      <Input
        label="Password"
        placeholder="Password"
        type="password"
        autoComplete="current-password"
        {...form.getInputProps("password")}
      />
      <div className={styles.submit}>
        <Button variant="subtle" nextLink="/">
          Sign in
        </Button>
        <Button disabled={isLoading} type="submit">
          Register
        </Button>
      </div>
    </Form>
  );
}
