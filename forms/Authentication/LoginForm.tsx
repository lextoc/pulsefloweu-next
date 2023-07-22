"use client";

import { useForm } from "@mantine/form";
import { useRouter } from "next/navigation";

import { clearCookies, setCookies } from "@/api/cookies";
import endpoints from "@/api/endpoints";
import Form from "@/components/forms/Form";
import Input from "@/components/forms/Input";
import Button from "@/components/interaction/Button";
import { useSnackbarStore } from "@/stores/snackbar";

import styles from "./LoginForm.module.css";

export interface ILoginFormValues {
  email: string;
  password: string;
}

export interface ILoginFormProps {}

export function LoginForm(props: ILoginFormProps) {
  const showSnackbar = useSnackbarStore((state) => state.show);
  const { push } = useRouter();

  const onSubmit = (values: ILoginFormValues) => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    };

    let accessToken: string | null = null;
    let client: string | null = null;

    fetch(endpoints.authSignIn, requestOptions)
      .then((response) => {
        accessToken = response.headers.get("access-token");
        client = response.headers.get("client");
        return response.json();
      })
      .then((data) => {
        if (data?.errors) {
          clearCookies();
          showSnackbar({
            message:
              data?.errors?.full_messages?.join(" ") || data?.errors?.join(" "),
            type: "error",
          });
        } else {
          setCookies({
            accessToken: accessToken!,
            client: client!,
            uid: data.data.uid,
          });
          push("/app/timers");
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
        {...form.getInputProps("email")}
      />
      <Input
        label="Password"
        type="password"
        placeholder="Password"
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
