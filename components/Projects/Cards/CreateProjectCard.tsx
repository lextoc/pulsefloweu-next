"use client";

import { useForm } from "@mantine/form";

import Form from "@/components/forms/Form";
import Input from "@/components/forms/Input";
import Button from "@/components/interaction/Button";

import styles from "./CreateProjectCard.module.css";

export interface ICreateProjectCardProps {}

export function CreateProjectCard(props: ICreateProjectCardProps) {
  const onSubmit = (values: unknown) => {
    // const requestOptions = {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(values),
    // };
    // let accessToken: string | null = null;
    // let client: string | null = null;
    // fetch(endpoints.authSignIn, requestOptions)
    //   .then((response) => {
    //     accessToken = response.headers.get("access-token");
    //     client = response.headers.get("client");
    //     return response.json();
    //   })
    //   .then((data) => {
    //     if (data?.errors) {
    //       clearCookies();
    //       showSnackbar({
    //         message:
    //           data?.errors?.full_messages?.join(" ") || data?.errors?.join(" "),
    //         type: "error",
    //       });
    //     } else {
    //       setCookies({
    //         accessToken: accessToken!,
    //         client: client!,
    //         uid: data.data.uid,
    //       });
    //       push("/app/timers");
    //     }
    //   });
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
    <div className={styles.root}>
      <h2>Create project</h2>
      <p>
        Enter a name and click on create to make a new project{" "}
        <i>(e.g. a new client)</i>. You'll be able to categorize your projects'
        timesheets in folders.
      </p>
      <Form onSubmit={form.onSubmit((values) => onSubmit(values))}>
        <Input
          label="Name"
          placeholder="Project name"
          inverted
          {...form.getInputProps("name")}
        />
        <div className={styles.submit}>
          <Button type="submit">Create</Button>
        </div>
      </Form>
    </div>
  );
}
