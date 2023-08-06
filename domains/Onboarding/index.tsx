"use client";

import { useForm } from "@mantine/form";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";

import { clearCookies } from "@/api/cookies";
import create from "@/api/create";
import endpoints from "@/api/endpoints";
import { CreateFolder } from "@/api/types/folders";
import { CreateProject, Project } from "@/api/types/projects";
import { CreateTask } from "@/api/types/tasks";
import update from "@/api/update";
import AuthenticationContext from "@/domains/Authentication/Context";
import { useFetch } from "@/hooks/useQueryBase";
import Button from "@/shared/Buttons/Base";
import Input from "@/shared/Inputs/Base";
import Form from "@/shared/Inputs/Form";
import Modal from "@/shared/Overlays/Modals/Base";
import { useAuthenticationStore } from "@/stores/authentication";
import { useSnackbarStore } from "@/stores/snackbar";

export interface UserFormValues {
  firstName: string;
  lastName: string;
  username: string;
}

export interface ProjectFormValues {
  projectName: string;
  folderName: string;
  taskName: string;
}

export interface OnboardingProps {}

export function Onboarding(props: OnboardingProps) {
  const showSnackbar = useSnackbarStore((state) => state.show);
  const queryClient = useQueryClient();
  const { push } = useRouter();

  const user = useContext(AuthenticationContext);
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [isOnboardingModalOpen, setIsOnboardingModalOpen] = useState(false);

  const {
    data: projectsData,
    isLoading: isProjectsLoading,
    isFetched: isProjectsFetched,
  } = useFetch<Project[]>(endpoints.projects.main);
  const projects: Project[] = projectsData?.success ? projectsData.data : [];
  const clearAuthentication = useAuthenticationStore((state) => state.clear);

  if (
    user?.email &&
    (!user?.first_name || !user?.last_name || !user?.username)
  ) {
    if (!isUserModalOpen) setIsUserModalOpen(true);
  } else {
    if (isUserModalOpen) setIsUserModalOpen(false);
  }

  if (
    projects.length <= 0 &&
    !isProjectsLoading &&
    user?.email &&
    isProjectsFetched
  ) {
    if (!isOnboardingModalOpen) setIsOnboardingModalOpen(true);
  } else {
    if (isOnboardingModalOpen) setIsOnboardingModalOpen(false);
  }

  const onSignOut = () => {
    clearCookies();
    clearAuthentication();
    queryClient.invalidateQueries([endpoints.auth.validateToken]).then(() => {
      queryClient.invalidateQueries();
    });
  };

  const userForm = useForm<UserFormValues>({
    initialValues: {
      firstName: "",
      lastName: "",
      username: "",
    },

    validate: {
      // email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
    },
  });

  const onSubmitUser = (values: UserFormValues) => {
    update(endpoints.auth.main, {
      first_name: values.firstName,
      last_name: values.lastName,
      username: values.username,
    }).then((data) => {
      if (data?.errors) {
        showSnackbar({
          message: data?.errors?.join(" "),
          type: "error",
        });
      } else {
        queryClient.invalidateQueries().then(() => {
          setIsUserModalOpen(false);
        });
      }
    });
  };

  const onSubmitProject = (values: ProjectFormValues) => {
    if (!values.projectName || !values.folderName || !values.taskName) return;
    create<{ project: CreateProject }>(endpoints.projects.main, {
      project: { name: values.projectName },
    }).then((data) => {
      if (data?.errors) {
        showSnackbar({
          message: data?.errors?.join(" "),
          type: "error",
        });
      } else {
        const projectId = data.data?.id;
        create<{ folder: CreateFolder }>(endpoints.folders.main, {
          folder: { project_id: projectId, name: values.folderName },
        }).then((data) => {
          if (data?.errors) {
            showSnackbar({
              message: data?.errors?.join(" "),
              type: "error",
            });
          } else {
            const folderId = data.data?.id;
            create<{ task: CreateTask }>(endpoints.tasks.main, {
              task: { name: values.taskName, folder_id: folderId },
            }).then((data) => {
              if (data?.errors) {
                showSnackbar({
                  message: data?.errors?.join(" "),
                  type: "error",
                });
              } else {
                queryClient.invalidateQueries().then(() => {
                  setIsOnboardingModalOpen(false);
                });
              }
            });
          }
        });
      }
    });
  };

  const projectForm = useForm<ProjectFormValues>({
    initialValues: {
      projectName: "",
      folderName: "",
      taskName: "",
    },

    validate: {
      // email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
    },
  });

  return (
    <>
      <Modal isOpen={isUserModalOpen} close={() => false}>
        <h1>Onboarding</h1>
        <p>Please fill in your details before continuing.</p>
        <Form onSubmit={userForm.onSubmit((values) => onSubmitUser(values))}>
          <Input
            label="First name"
            {...userForm.getInputProps("firstName")}
            placeholder="First name"
          />
          <Input
            label="Last name"
            {...userForm.getInputProps("lastName")}
            placeholder="Last name"
          />
          <Input
            label="Username"
            {...userForm.getInputProps("username")}
            placeholder="Username"
          />
          <div className="buttons-right">
            <Button variant="subtle" onClick={onSignOut}>
              Sign out
            </Button>
            <Button type="submit">Save and continue</Button>
          </div>
        </Form>
      </Modal>
      <Modal
        isOpen={!isUserModalOpen && isOnboardingModalOpen}
        close={() => false}
      >
        <h1>Set up project</h1>
        <p>Please set up your project with a first task.</p>
        <Form
          onSubmit={projectForm.onSubmit((values) => onSubmitProject(values))}
        >
          <Input
            label="Project name"
            {...projectForm.getInputProps("projectName")}
            placeholder="e.g. 'Tracky'"
          />
          <Input
            label="Folder name"
            {...projectForm.getInputProps("folderName")}
            placeholder="e.g. 'Features'"
          />
          <Input
            label="Task name"
            {...projectForm.getInputProps("taskName")}
            placeholder="e.g. 'Implement rate functionality'"
          />
          <div className="buttons-right">
            <Button variant="subtle" onClick={onSignOut}>
              Sign out
            </Button>
            <Button
              type="submit"
              disabled={
                !projectForm.values.projectName ||
                !projectForm.values.folderName ||
                !projectForm.values.taskName
              }
            >
              Create project
            </Button>
          </div>
        </Form>
      </Modal>
    </>
  );
}
