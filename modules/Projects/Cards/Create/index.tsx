"use client";

import { useForm } from "@mantine/form";
import { useQueryClient } from "@tanstack/react-query";
import Yup from "yup";

import create from "@/api/create";
import endpoints from "@/api/endpoints";
import { CreateProject } from "@/api/types/projects";
import Button from "@/components/Buttons/Base";
import Card from "@/components/Cards/Base";
import Input from "@/components/Inputs/Base";
import Form from "@/components/Inputs/Form";
import { useSnackbarStore } from "@/stores/snackbar";

import styles from "./index.module.css";

export interface ProjectCreateCardProps {}

export function ProjectCreateCard(props: ProjectCreateCardProps) {
  const queryClient = useQueryClient();
  const showSnackbar = useSnackbarStore((state) => state.show);

  const onSubmit = (values: CreateProject) => {
    create<{ project: CreateProject }>(endpoints.projects.main, {
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
        queryClient.invalidateQueries();
        showSnackbar({
          message: "Project has been created",
        });
      }
    });
  };

  const form = useForm<CreateProject>({
    initialValues: {
      name: "",
    },

    validate: {
      name: (value) => {
        return Yup.string()
          .required("Name is required")
          .max(100, "Name must be at most 100 characters")
          .validateSync(value);
      },
    },
  });

  return (
    <Card
      hasMovingBackground
      header={<h3>Create new project</h3>}
      content={
        <>
          <p>
            Enter a name and click on create to make a new project. You'll be
            able to categorize your projects' time entries in folders.
          </p>
          <Form onSubmit={form.onSubmit((values) => onSubmit(values))}>
            <Input
              label="Project name"
              placeholder="Project name"
              inverted
              {...form.getInputProps("name")}
            />
            <div className={styles.submit}>
              <Button type="submit">Create</Button>
            </div>
          </Form>
        </>
      }
    />
  );
}
