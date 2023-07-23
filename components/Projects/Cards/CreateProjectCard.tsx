"use client";

import { useForm } from "@mantine/form";

import { getHeaders } from "@/api/cookies";
import endpoints from "@/api/endpoints";
import Form from "@/components/forms/Form";
import Input from "@/components/forms/Input";
import Button from "@/components/interaction/Button";
import { useSnackbarStore } from "@/stores/snackbar";

import styles from "./CreateProjectCard.module.css";

export interface ICreateProjectCardProps {}

export function CreateProjectCard(props: ICreateProjectCardProps) {
  const showSnackbar = useSnackbarStore((state) => state.show);

  const onSubmit = (values: unknown) => {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...getHeaders(),
      },
      body: JSON.stringify({ project: values }),
    };

    fetch(endpoints.createProject, requestOptions)
      .then((response) => {
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
        }
      });
  };

  const form = useForm({
    initialValues: {
      name: "",
    },

    validate: {
      // email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
    },
  });

  return (
    <div className={styles.root}>
      <h2>Create project</h2>
      <p>
        Enter a name and click on create to make a new project. You'll be able
        to categorize your projects' timesheets in folders.
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
