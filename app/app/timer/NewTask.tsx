import { useForm } from "@mantine/form";
import { IconCaretDown } from "@tabler/icons-react";
import { useQueryClient } from "@tanstack/react-query";
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import utc from "dayjs/plugin/utc";
import { useId, useState } from "react";

import { getHeaders } from "@/api/cookies";
import create from "@/api/create";
import endpoints from "@/api/endpoints";
import { Folder } from "@/api/types/folders";
import { Project } from "@/api/types/projects";
import { CreateTask } from "@/api/types/tasks";
import { CreateTimeEntry } from "@/api/types/time-entries";
import Button from "@/components/Buttons/Base";
import Input from "@/components/Inputs/Base";
import Form from "@/components/Inputs/Form";
import Popover from "@/components/Overlays/Popover";
import PaddingContainer from "@/components/Shared/PaddingContainer";
import { useFetchArray } from "@/hooks/useQueryBase";
import { useSnackbarStore } from "@/stores/snackbar";

import styles from "./NewTask.module.css";

dayjs.extend(advancedFormat);
dayjs.extend(utc);

export interface NewTaskProps {}

export default function NewTask(props: NewTaskProps) {
  const queryClient = useQueryClient();
  const showSnackbar = useSnackbarStore((state) => state.show);

  const [selectedProjectId, setSelectedProjectId] = useState<number | null>(
    null,
  );

  const { data: projectsData } = useFetchArray<Project>(
    endpoints.projects.main,
  );
  const projects: Project[] = projectsData?.success ? projectsData.data : [];

  if (!selectedProjectId && projects.length) {
    setSelectedProjectId(projects[0].id);
  }

  const [selectedFolderId, setSelectedFolderId] = useState<number | null>(null);

  const { data: foldersData } = useFetchArray<Folder>(
    endpoints.projects.folders(selectedProjectId || -1),
  );
  const folders: Folder[] = foldersData?.success ? foldersData.data : [];

  if (!selectedFolderId && folders.length) {
    setSelectedFolderId(folders[0].id);
  }

  const onSubmit = (values: Omit<CreateTask, "folder_id">) => {
    if (!selectedFolderId) return;
    create<{ task: CreateTask }>(endpoints.tasks.main, {
      task: {
        folder_id: selectedFolderId,
        ...values,
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
          create<{ time_entry: CreateTimeEntry }>(endpoints.timeEntries.main, {
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

  const form = useForm<Omit<CreateTask, "folder_id">>({
    initialValues: {
      name: "",
    },

    validate: {
      // email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
    },
  });

  const projectId = useId();
  const folderId = useId();

  return (
    <div className={styles.root}>
      <PaddingContainer>
        <Form onSubmit={form.onSubmit((values) => onSubmit(values))}>
          <Input
            label="Create new task"
            placeholder="New task name"
            {...form.getInputProps("name")}
          />
          <div className={styles.dropdowns}>
            <div className={styles.dropdownWrapper}>
              <label htmlFor={projectId}>Project:</label>
              <Popover
                id={projectId}
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
              <label htmlFor={folderId}>Folder:</label>
              <Popover
                id={folderId}
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
        </Form>
      </PaddingContainer>
    </div>
  );
}
