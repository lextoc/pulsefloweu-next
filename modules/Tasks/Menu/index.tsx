"use client";
import { useForm, yupResolver } from "@mantine/form";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import destroy from "@/api/destroy";
import endpoints from "@/api/endpoints";
import { CreateTask, Task } from "@/api/types/tasks";
import { taskValidationSchema } from "@/api/validationSchemas";
import Button from "@/components/Buttons/Base";
import Input from "@/components/Inputs/Base";
import Form from "@/components/Inputs/Form";
import Modal from "@/components/Overlays/Modals/Base";
import Popover from "@/components/Overlays/Popover";
import { useMutationWithErrorHandling } from "@/hooks/useMutationBase";
import { useSnackbarStore } from "@/stores/snackbar";
import { RecursivePartial } from "@/utils/helpers";

import styles from "./index.module.css";

export interface TaskMenuProps {
  task: Task;
}

export default function TaskMenu({ task }: TaskMenuProps) {
  const { replace } = useRouter();
  const queryClient = useQueryClient();
  const showSnackbar = useSnackbarStore((state) => state.show);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const editForm = useForm<RecursivePartial<CreateTask>>({
    initialValues: {
      task: {
        name: task.name,
      },
    },
    validate: yupResolver(taskValidationSchema),
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
    useMutationWithErrorHandling<RecursivePartial<CreateTask>>({
      method: "PATCH",
      endpoint: endpoints.tasks.detail(task.id),
      form: editForm,
    });

  const onEdit = (values: RecursivePartial<CreateTask>) => {
    mutateAsync(values).then(() => {
      setIsEditModalOpen(false);
    });
  };

  const onDelete = () => {
    let folderId = task.folder_id;
    destroy(endpoints.tasks.detail(task.id)).then((data) => {
      if (data.success) {
        queryClient.invalidateQueries();
        showSnackbar({
          message: "Task has been deleted",
        });
        setIsDeleteModalOpen(false);
        replace(`/app/folders/${folderId}`);
      } else {
        showSnackbar({
          message: data?.errors?.join(" "),
          type: "error",
        });
      }
    });
  };

  useEffect(() => {
    editForm.setValues({ task: task });
  }, [isEditModalOpen]);

  useEffect(() => {
    deleteForm.reset();
  }, [isDeleteModalOpen]);

  return (
    <div className={styles.root}>
      <Popover
        content={
          <div className={styles.menu}>
            <Button
              variant="subtle"
              onClick={() => setIsEditModalOpen(true)}
              noMargin
            >
              Edit task
            </Button>
            <Button
              variant="subtle"
              danger
              onClick={() => setIsDeleteModalOpen(true)}
              noMargin
            >
              Delete task
            </Button>
          </div>
        }
      />

      <Modal isOpen={isEditModalOpen} close={() => setIsEditModalOpen(false)}>
        <h2>Edit task</h2>
        <p>Editing the "{task.name}" task.</p>
        <Form onSubmit={editForm.onSubmit((values) => onEdit(values))}>
          <Input
            label="Task name"
            placeholder="Task name"
            {...editForm.getInputProps("task.name")}
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
        <h2>Delete task</h2>
        <p>
          Are you absolutely sure you want to delete this task "{task.name}" and
          delete all of its time entries?
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
            Delete task
          </Button>
        </div>
      </Modal>
    </div>
  );
}
