"use client";

import { useForm } from "@mantine/form";
import { useQueryClient } from "@tanstack/react-query";

import create from "@/api/create";
import endpoints from "@/api/endpoints";
import { CreateProject } from "@/api/types/projects";
import { useSnackbarStore } from "@/stores/snackbar";
import Button from "@/ui/Buttons/Base";
import Card from "@/ui/Cards/Base";
import Input from "@/ui/Inputs/Base";
import Form from "@/ui/Inputs/Form";

import styles from "./index.module.css";

export interface ProjectCreateCardProps {}

export function ProjectCreateCard(props: ProjectCreateCardProps) {
  const queryClient = useQueryClient();
  const showSnackbar = useSnackbarStore((state) => state.show);

  const onSubmit = (values: CreateProject) => {
    create<{ project: CreateProject }>(endpoints.createProject, {
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

  const form = useForm<CreateProject>({
    initialValues: {
      name: "",
    },

    validate: {
      // email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
    },
  });

  return (
    <Card
      withMovingBackground
      header={<h3>Create new project</h3>}
      content={
        <>
          <p>
            Enter a name and click on create to make a new project. You'll be
            able to categorize your projects' timesheets in folders.
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
