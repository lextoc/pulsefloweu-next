"use client";

import { useForm } from "@mantine/form";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import { clearCookies, setCookies } from "@/api/cookies";
import endpoints from "@/api/endpoints";
import Button from "@/components/Buttons/Base";
import Input from "@/components/Inputs/Base";
import Form from "@/components/Inputs/Form";
import { useAuthenticationStore } from "@/stores/authentication";
import { useSnackbarStore } from "@/stores/snackbar";

import styles from "./index.module.css";

export interface RegisterFormValues {
  email: string;
  password: string;
}

export interface RegisterFormProps {}

export default function RegisterForm(props: RegisterFormProps) {
  const queryClient = useQueryClient();
  const showSnackbar = useSnackbarStore((state) => state.show);
  const { push } = useRouter();

  const onSubmit = (values: RegisterFormValues) => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    };

    let accessToken: string | undefined = undefined;
    let client: string | undefined = undefined;

    fetch(endpoints.auth.main, requestOptions)
      .then((response) => {
        accessToken = response.headers.get("access-token") || undefined;
        client = response.headers.get("client") || undefined;
        return response.json();
      })
      .then((data) => {
        if (data?.errors) {
          showSnackbar({
            message: data?.errors?.full_messages?.join(" "),
            type: "error",
          });
        } else {
          setCookies({
            ["access-token"]: accessToken!,
            client: client!,
            uid: data.data.uid,
          });
          queryClient.invalidateQueries([endpoints.auth.validateToken]);
          push("/app/dashboard");
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
        <Button type="submit">Register</Button>
      </div>
    </Form>
  );
}
