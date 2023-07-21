"use client";

import { useForm } from "@mantine/form";

import Form from "@/components/forms/Form";
import Input from "@/components/forms/Input";
import Button from "@/components/interaction/Button";
import { useAuthenticationStore } from "@/stores/authentication";
import { useSnackbarStore } from "@/stores/snackbar";

import styles from "./LoginForm.module.css";

export interface ILoginFormValues {
  email: string;
  password: string;
}

export interface ILoginFormProps {}

export function LoginForm(props: ILoginFormProps) {
  const signIn = useAuthenticationStore((state) => state.signIn);
  const reset = useAuthenticationStore((state) => state.reset);
  const show = useSnackbarStore((state) => state.show);

  const onSubmit = (values: ILoginFormValues) => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    };

    let accessToken: string | null = null;

    fetch("http://localhost:3000/auth/sign_in", requestOptions)
      .then((response) => {
        accessToken = response.headers.get("access-token");
        return response.json();
      })
      .then((data) => {
        if (data?.errors) {
          reset();
          show({
            message: data?.errors?.full_messages?.join(" "),
            type: "error",
          });
        } else {
          signIn({
            accessToken,
            ...data.data,
          });
        }
      });
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
      <Input label="Email address" {...form.getInputProps("email")} />
      <Input
        label="Password"
        type="password"
        {...form.getInputProps("password")}
      />
      <div className={styles.submit}>
        <Button variant="subtle" nextLink="/register">
          Register
        </Button>
        <Button type="submit">Sign in</Button>
      </div>
    </Form>
  );
}
