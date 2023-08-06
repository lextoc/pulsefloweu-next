"use client";

import { useForm } from "@mantine/form";
import { useQueryClient } from "@tanstack/react-query";

import create from "@/api/create";
import endpoints from "@/api/endpoints";
import { Folder } from "@/api/types/folders";
import { CreateTask } from "@/api/types/tasks";
import Button from "@/shared/Buttons/Base";
import Card from "@/shared/Cards/Base";
import Input from "@/shared/Inputs/Base";
import Form from "@/shared/Inputs/Form";
import { useSnackbarStore } from "@/stores/snackbar";

import styles from "./index.module.css";

export interface TasksCreateCardProps {
  folder: Folder;
}

export default function TasksCreateCard({ folder }: TasksCreateCardProps) {
  const queryClient = useQueryClient();
  const showSnackbar = useSnackbarStore((state) => state.show);

  const onSubmit = (values: Omit<CreateTask, "folder_id">) => {
    create<{ task: CreateTask }>(endpoints.tasks.main, {
      task: {
        folder_id: folder.id,
        ...values,
      },
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
          message: "Task has been created",
        });
      }
    });
  };

  const form = useForm<Omit<CreateTask, "folder_id">>({
    initialValues: {
      name: "",
    },

    validate: {
      // email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
    },
  });

  return (
    <Card
      hasMovingBackground
      header={<h3>Create new task</h3>}
      content={
        <>
          <p>
            Enter a name and click on create to make a new task. In this task
            you'll be able to create time entries.
          </p>
          <Form onSubmit={form.onSubmit((values) => onSubmit(values))}>
            <Input
              label="Task name"
              placeholder="Task name"
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
