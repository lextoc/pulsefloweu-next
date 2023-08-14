"use client";

import { useForm, yupResolver } from "@mantine/form";

import endpoints from "@/api/endpoints";
import { Folder } from "@/api/types/folders";
import { CreateTask } from "@/api/types/tasks";
import { taskValidationSchema } from "@/api/validationSchemas";
import Button from "@/components/Buttons/Base";
import Card from "@/components/Cards/Base";
import Input from "@/components/Inputs/Base";
import Form from "@/components/Inputs/Form";
import { useMutationWithErrorHandling } from "@/hooks/useMutationBase";

import styles from "./index.module.css";

export interface TasksCreateCardProps {
  folder: Folder;
}

export default function TasksCreateCard({ folder }: TasksCreateCardProps) {
  const form = useForm<CreateTask>({
    initialValues: {
      task: {
        name: "",
        folder_id: folder.id,
      },
    },
    validate: yupResolver(taskValidationSchema),
  });

  const { mutate, isLoading } = useMutationWithErrorHandling<CreateTask>({
    method: "POST",
    endpoint: endpoints.tasks.main,
    form: form,
  });

  return (
    <Card
      whiteAnimatedBackground
      header={<h3>Create new task</h3>}
      content={
        <>
          <p>
            Enter a name and click on create to make a new task. In this task
            you'll be able to create time entries.
          </p>
          <Form
            onSubmit={form.onSubmit((values) => mutate(values))}
            onReset={form.reset}
            noValidate
          >
            <Input
              label="Task name"
              placeholder="Task name"
              inverted
              {...form.getInputProps("task.name")}
            />
            <div className={styles.submit}>
              <Button disabled={isLoading} type="submit">
                Create
              </Button>
            </div>
          </Form>
        </>
      }
    />
  );
}
