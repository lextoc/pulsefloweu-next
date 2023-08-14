"use client";

import { useForm, yupResolver } from "@mantine/form";

import endpoints from "@/api/endpoints";
import { CreateFolder } from "@/api/types/folders";
import { Project } from "@/api/types/projects";
import { folderValidationSchema } from "@/api/validationSchemas";
import Button from "@/components/Buttons/Base";
import Card from "@/components/Cards/Base";
import Input from "@/components/Inputs/Base";
import Form from "@/components/Inputs/Form";
import { useMutationWithErrorHandling } from "@/hooks/useMutationBase";

import styles from "./index.module.css";

export interface FoldersCreateCardProps {
  project: Project;
}

export default function FoldersCreateCard({ project }: FoldersCreateCardProps) {
  const form = useForm<CreateFolder>({
    initialValues: {
      folder: {
        name: "",
        project_id: project.id,
      },
    },
    validate: yupResolver(folderValidationSchema),
  });

  const { mutate, isLoading } = useMutationWithErrorHandling<CreateFolder>({
    method: "POST",
    endpoint: endpoints.folders.main,
    form: form,
  });

  return (
    <Card
      whiteAnimatedBackground
      header={<h3>Create new folder</h3>}
      content={
        <>
          <p>
            Enter a name and click on create to make a new folder. In this
            folder you'll be able to create time entries.
          </p>
          <Form
            onSubmit={form.onSubmit((values) => mutate(values))}
            onReset={form.reset}
            noValidate
          >
            <Input
              label="Folder name"
              placeholder="Folder name"
              inverted
              {...form.getInputProps("folder.name")}
            />
            <div className={styles.submit}>
              <Button type="submit" disabled={isLoading}>
                Create
              </Button>
            </div>
          </Form>
        </>
      }
    />
  );
}
