"use client";

import { useForm, yupResolver } from "@mantine/form";

import endpoints from "@/api/endpoints";
import { CreateProject } from "@/api/types/projects";
import { projectValidationSchema } from "@/api/validationSchemas";
import Button from "@/components/Buttons/Base";
import Card from "@/components/Cards/Base";
import Input from "@/components/Inputs/Base";
import Form from "@/components/Inputs/Form";
import { useMutationWithErrorHandling } from "@/hooks/useMutationBase";

import styles from "./index.module.css";

export interface ProjectCreateCardProps {}

export function ProjectCreateCard(props: ProjectCreateCardProps) {
  const form = useForm<CreateProject>({
    initialValues: {
      project: {
        name: "",
      },
    },
    validate: yupResolver(projectValidationSchema),
  });

  const { mutate, isLoading } = useMutationWithErrorHandling<CreateProject>({
    method: "POST",
    endpoint: endpoints.projects.main,
    form: form,
  });

  return (
    <Card
      whiteAnimatedBackground
      header={<h3>Create new project</h3>}
      content={
        <>
          <p>
            Enter a name and click on create to make a new project. You'll be
            able to categorize your projects' time entries in folders.
          </p>
          <Form
            onSubmit={form.onSubmit((values) => mutate(values))}
            onReset={form.reset}
            noValidate
          >
            <Input
              label="Project name"
              placeholder="Project name"
              inverted
              {...form.getInputProps("project.name")}
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
