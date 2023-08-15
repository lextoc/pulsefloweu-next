"use client";
import { useForm, yupResolver } from "@mantine/form";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import destroy from "@/api/destroy";
import endpoints from "@/api/endpoints";
import { CreateProject, Project } from "@/api/types/projects";
import { projectValidationSchema } from "@/api/validationSchemas";
import Button from "@/components/Buttons/Base";
import Input from "@/components/Inputs/Base";
import Form from "@/components/Inputs/Form";
import Modal from "@/components/Overlays/Modals/Base";
import Popover from "@/components/Overlays/Popover";
import { useMutationWithErrorHandling } from "@/hooks/useMutationBase";
import { useSnackbarStore } from "@/stores/snackbar";
import { RecursivePartial } from "@/utils/helpers";

import styles from "./index.module.css";

export interface ProjectMenuProps {
  project: Project;
  white?: boolean;
}

export default function ProjectMenu({ project, white }: ProjectMenuProps) {
  const { replace } = useRouter();
  const queryClient = useQueryClient();
  const showSnackbar = useSnackbarStore((state) => state.show);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const editForm = useForm<RecursivePartial<CreateProject>>({
    initialValues: {
      project: {
        name: project.name,
      },
    },
    validate: yupResolver(projectValidationSchema),
  });

  const deleteForm = useForm({
    initialValues: {
      delete: "",
    },
    validate: {
      delete: (value) => (value === "DELETE" ? null : "Type DELETE"),
    },
  });

  const { mutateAsync, isLoading: isLoadingEdit } =
    useMutationWithErrorHandling<RecursivePartial<CreateProject>>({
      method: "PATCH",
      endpoint: endpoints.projects.detail(project.id),
      form: editForm,
    });

  const onEdit = (values: RecursivePartial<CreateProject>) => {
    mutateAsync(values).then(() => {
      setIsEditModalOpen(false);
    });
  };

  const onDelete = () => {
    destroy(endpoints.projects.detail(project.id)).then((data) => {
      if (data.success) {
        queryClient.invalidateQueries();
        showSnackbar({
          message: "Project has been deleted",
        });
        setIsDeleteModalOpen(false);
        replace("/app/dashboard");
      } else {
        showSnackbar({
          message: data?.errors?.join(" "),
          type: "error",
        });
      }
    });
  };

  useEffect(() => {
    editForm.setValues({ project: project });
  }, [isEditModalOpen]);

  useEffect(() => {
    deleteForm.setValues({ delete: "" });
  }, [isDeleteModalOpen]);

  return (
    <div className={styles.root}>
      <Popover
        white={white}
        content={
          <div className={styles.menu}>
            <Button
              variant="subtle"
              onClick={() => setIsEditModalOpen(true)}
              noMargin
            >
              Edit project
            </Button>
            <Button
              variant="subtle"
              danger
              onClick={() => setIsDeleteModalOpen(true)}
              noMargin
            >
              Delete project
            </Button>
          </div>
        }
      />
      <Modal isOpen={isEditModalOpen} close={() => setIsEditModalOpen(false)}>
        <h2>Edit project</h2>
        <p>Editing the "{project.name}" project.</p>
        <Form onSubmit={editForm.onSubmit((values) => onEdit(values))}>
          <Input
            label="Project name"
            placeholder="Project name"
            {...editForm.getInputProps("project.name")}
          />
          <div className="buttons-right">
            <Button variant="subtle" onClick={() => setIsEditModalOpen(false)}>
              Cancel
            </Button>
            <Button disabled={isLoadingEdit} type="submit">
              Update
            </Button>
          </div>
        </Form>
      </Modal>
      <Modal
        isOpen={isDeleteModalOpen}
        close={() => setIsDeleteModalOpen(false)}
      >
        <h2>Delete project</h2>
        <p>
          Are you absolutely sure you want to delete this project "
          {project.name}" and delete all of its folders, tasks and time entries?
        </p>
        <Input
          label="Type DELETE in capitals"
          placeholder="Type DELETE"
          {...deleteForm.getInputProps("delete")}
        />
        <div className="buttons-right">
          <Button variant="subtle" onClick={() => setIsDeleteModalOpen(false)}>
            Cancel
          </Button>
          <Button
            disabled={!deleteForm.isValid()}
            danger
            onClick={() => onDelete()}
          >
            Delete project
          </Button>
        </div>
      </Modal>
    </div>
  );
}
