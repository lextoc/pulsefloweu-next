"use client";

import { useForm } from "@mantine/form";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import { clearCookies, setCookies } from "@/api/cookies";
import endpoints from "@/api/endpoints";
import Button from "@/shared/Buttons/Base";
import Input from "@/shared/Inputs/Base";
import Form from "@/shared/Inputs/Form";
import { useSnackbarStore } from "@/stores/snackbar";

import styles from "./index.module.css";

export interface LoginFormValues {
  email: string;
  password: string;
}

export interface LoginFormProps {}

export default function LoginForm(props: LoginFormProps) {
  const queryClient = useQueryClient();
  const showSnackbar = useSnackbarStore((state) => state.show);
  const { push } = useRouter();

  const onSubmit = (values: LoginFormValues) => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    };

    let accessToken: string | undefined = undefined;
    let client: string | undefined = undefined;

    fetch(endpoints.auth.signIn, requestOptions)
      .then((response) => {
        accessToken = response.headers.get("access-token") || undefined;
        client = response.headers.get("client") || undefined;
        return response.json();
      })
      .then((data) => {
        if (data?.errors) {
          showSnackbar({
            message:
              data?.errors?.full_messages?.join(" ") || data?.errors?.join(" "),
            type: "error",
          });
        } else {
          setCookies({
            ["access-token"]: accessToken!,
            client: client!,
            uid: data.data.uid,
          });
          queryClient
            .invalidateQueries([endpoints.auth.validateToken])
            .then(() => {
              push("/app/timer");
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
      <Input
        label="Email address"
        placeholder="Email"
        autoComplete="email"
        {...form.getInputProps("email")}
      />
      <Input
        label="Password"
        type="password"
        placeholder="Password"
        autoComplete="current-password"
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
