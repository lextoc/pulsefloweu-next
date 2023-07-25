"use client";

import { useForm } from "@mantine/form";
import { useQueryClient } from "@tanstack/react-query";

import create from "@/api/create";
import endpoints from "@/api/endpoints";
import { Project } from "@/api/types/projects";
import Button from "@/components/Buttons/Base";
import Input from "@/components/Inputs/Base";
import Form from "@/components/Inputs/Form";
import { useSnackbarStore } from "@/stores/snackbar";

import styles from "./index.module.css";

export interface CreateProjectCardProps {}

export function CreateProjectCard(props: CreateProjectCardProps) {
  const queryClient = useQueryClient();
  const showSnackbar = useSnackbarStore((state) => state.show);

  const onSubmit = (values: Project) => {
    create<{ project: Project }>(endpoints.createProject, {
      project: values,
    }).then((data) => {
      if (data?.errors) {
        showSnackbar({
          message:
            data?.errors?.full_messages?.join(" ") || data?.errors?.join(" "),
          type: "error",
        });
      } else {
        form.reset();
        queryClient.invalidateQueries([endpoints.getProjects]);
        showSnackbar({
          message: "Project has been created",
        });
      }
    });
  };

  const form = useForm<Project>({
    initialValues: {
      name: "",
    },

    validate: {
      // email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
    },
  });

  return (
    <div className={styles.root}>
      <h3>Create new project</h3>
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
