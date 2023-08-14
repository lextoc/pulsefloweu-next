import { useForm, yupResolver } from "@mantine/form";
import { IconCaretDown } from "@tabler/icons-react";
import { useQueryClient } from "@tanstack/react-query";
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import utc from "dayjs/plugin/utc";
import { useEffect, useId, useState } from "react";
import * as Yup from "yup";

import { getHeaders } from "@/api/cookies";
import create from "@/api/create";
import endpoints from "@/api/endpoints";
import { Folder } from "@/api/types/folders";
import { Project } from "@/api/types/projects";
import { CreateTask } from "@/api/types/tasks";
import { CreateTimeEntry } from "@/api/types/time-entries";
import { taskValidationSchema } from "@/api/validationSchemas";
import Button from "@/components/Buttons/Base";
import Input from "@/components/Inputs/Base";
import Form from "@/components/Inputs/Form";
import Popover from "@/components/Overlays/Popover";
import PaddingContainer from "@/components/Shared/PaddingContainer";
import { useFetch } from "@/hooks/useQueryBase";
import { useSnackbarStore } from "@/stores/snackbar";

import styles from "./NewTask.module.css";

dayjs.extend(advancedFormat);
dayjs.extend(utc);

export interface NewTaskProps {}

// TODO refactor
export default function NewTask() {
  const queryClient = useQueryClient();
  const showSnackbar = useSnackbarStore((state) => state.show);

  const [selectedProjectId, setSelectedProjectId] = useState<number | null>(
    null,
  );

  const { data: projectsData } = useFetch<Project[]>(endpoints.projects.main);
  const projects: Project[] = projectsData?.success ? projectsData.data : [];

  if (!selectedProjectId && projects.length) {
    setSelectedProjectId(projects[0].id);
  }

  const [selectedFolderId, setSelectedFolderId] = useState<number | null>(null);

  const { data: foldersData } = useFetch<Folder[]>(
    endpoints.projects.folders(selectedProjectId || -1),
  );
  const folders: Folder[] = foldersData?.success ? foldersData.data : [];

  if (!selectedFolderId && folders.length) {
    setSelectedFolderId(folders[0].id);
  }

  useEffect(() => {
    setSelectedFolderId(null);
  }, [selectedProjectId]);

  const onSubmit = (values: Omit<CreateTask, "folder_id">) => {
    if (!selectedFolderId) return;
    create<CreateTask>(endpoints.tasks.main, {
      task: {
        ...values.task,
        folder_id: selectedFolderId,
      },
    }).then((data) => {
      const taskId = data?.data?.id;
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...getHeaders(),
        },
      };
      fetch(endpoints.misc.stopAll, requestOptions)
        .then((response) => {
          return response.json();
        })
        .then(() => {
          create<CreateTimeEntry>(endpoints.timeEntries.main, {
            time_entry: {
              start_date: dayjs().format(),
              folder_id: selectedFolderId,
              task_id: taskId,
            },
          }).then((data) => {
            if (data?.errors) {
              showSnackbar({
                message:
                  data?.errors?.full_messages?.join(" ") ||
                  data?.errors?.join(" "),
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
        });
    });
  };

  const form = useForm<CreateTask>({
    initialValues: {
      task: {
        name: "",
        folder_id: -1,
      },
    },
    validate: yupResolver(taskValidationSchema),
  });

  const htmlProjectId = useId();
  const htmlFolderId = useId();

  return (
    <div className={styles.root}>
      <PaddingContainer>
        <Form onSubmit={form.onSubmit((values) => onSubmit(values))}>
          <Input
            label="Create new task"
            placeholder="New task name"
            {...form.getInputProps("task.name")}
          />
        </Form>
        <div className={styles.dropdowns}>
          <div className={styles.dropdownWrapper}>
            <label htmlFor={htmlProjectId}>Project:</label>
            <Popover
              id={htmlProjectId}
              content={
                <div className={styles.dropdownButtons}>
                  {projects.map((project) => (
                    <Button
                      key={`task-form-project-${project.id}`}
                      variant="subtle"
                      noMargin
                      onClick={() => setSelectedProjectId(project.id)}
                    >
                      {project.name}
                    </Button>
                  ))}
                </div>
              }
              button={
                <div className={styles.dropdown}>
                  {selectedProjectId
                    ? projects.find(
                        (project) => project.id === selectedProjectId,
                      )?.name
                    : "Select project"}
                  <IconCaretDown size="1rem" />
                </div>
              }
            />
          </div>
          <div className={styles.dropdownWrapper}>
            <label htmlFor={htmlFolderId}>Folder:</label>
            <Popover
              id={htmlFolderId}
              content={
                <div className={styles.dropdownButtons}>
                  {folders.map((folder) => (
                    <Button
                      key={`task-form-folder-${folder.id}`}
                      variant="subtle"
                      noMargin
                      onClick={() => setSelectedFolderId(folder.id)}
                    >
                      {folder.name}
                    </Button>
                  ))}
                </div>
              }
              button={
                <div className={styles.dropdown}>
                  {selectedFolderId
                    ? folders.find((folder) => folder.id === selectedFolderId)
                        ?.name
                    : "Select folder"}
                  <IconCaretDown size="1rem" />
                </div>
              }
            />
          </div>
        </div>
      </PaddingContainer>
    </div>
  );
}
