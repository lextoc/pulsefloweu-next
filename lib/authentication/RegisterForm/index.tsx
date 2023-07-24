"use client";

import { useForm } from "@mantine/form";
import { useRouter } from "next/navigation";

import { clearCookies, setCookies } from "@/api/cookies";
import endpoints from "@/api/endpoints";
import Button from "@/components/buttons/base";
import Input from "@/components/inputs/base";
import Form from "@/components/inputs/Form";
import { useSnackbarStore } from "@/stores/snackbar";

import styles from "./index.module.css";

export interface IRegisterFormValues {
  email: string;
  password: string;
}

export interface IRegisterFormProps {}

export default function RegisterForm(props: IRegisterFormProps) {
  const showSnackbar = useSnackbarStore((state) => state.show);
  const { push } = useRouter();

  const onSubmit = (values: IRegisterFormValues) => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    };

    let accessToken: string | null = null;
    let client: string | null = null;

    fetch(endpoints.auth, requestOptions)
      .then((response) => {
        accessToken = response.headers.get("access-token");
        client = response.headers.get("client");
        return response.json();
      })
      .then((data) => {
        if (data?.errors) {
          clearCookies();
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
