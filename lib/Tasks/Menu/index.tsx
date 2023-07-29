"use client";
import { useForm } from "@mantine/form";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";

import destroy from "@/api/destroy";
import endpoints from "@/api/endpoints";
import { CreateTask, Task } from "@/api/types/tasks";
import update from "@/api/update";
import Button from "@/components/Buttons/Base";
import Input from "@/components/Inputs/Base";
import Form from "@/components/Inputs/Form";
import Modal from "@/components/Overlays/Modals/Base";
import Popover from "@/components/Overlays/Popover";
import { useSnackbarStore } from "@/stores/snackbar";

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

  const editForm = useForm<Partial<Omit<Task, "project_id">>>({
    initialValues: {
      name: task.name,
    },

    validate: {
      // email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
    },
  });

  const deleteForm = useForm({
    initialValues: {
      delete: "",
    },

    validate: {
      delete: (value) => (value === "DELETE" ? null : "Type DELETE"),
    },
  });

  const onEdit = (values: Partial<CreateTask>) => {
    update<{ task: Partial<CreateTask> }>(endpoints.getTask(task.id), {
      task: {
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
        queryClient.invalidateQueries();
        showSnackbar({
          message: "Task has been updated",
        });
        setIsEditModalOpen(false);
      }
    });
  };

  const onDelete = () => {
    let folderId = task.folder_id;
    destroy(endpoints.destroyTask(task.id)).then((data) => {
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
            {...editForm.getInputProps("name")}
          />
          <div className="buttons-right">
            <Button variant="subtle" onClick={() => setIsEditModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">Update</Button>
          </div>
        </Form>
      </Modal>
      <Modal
        isOpen={isDeleteModalOpen}
        close={() => setIsDeleteModalOpen(false)}
      >
        <h2>Delete task?</h2>
        <p>
          Are you absolutely sure you want to delete this task "{task.name}" and
          delete all of its' tasks and time entries?
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
