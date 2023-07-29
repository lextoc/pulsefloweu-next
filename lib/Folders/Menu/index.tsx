"use client";
import { useForm } from "@mantine/form";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";

import destroy from "@/api/destroy";
import endpoints from "@/api/endpoints";
import { CreateFolder, Folder } from "@/api/types/folders";
import update from "@/api/update";
import Button from "@/components/Buttons/Base";
import Input from "@/components/Inputs/Base";
import Form from "@/components/Inputs/Form";
import Modal from "@/components/Overlays/Modals/Base";
import Popover from "@/components/Overlays/Popover";
import { useSnackbarStore } from "@/stores/snackbar";

import styles from "./index.module.css";

export interface FolderMenuProps {
  folder: Folder;
}

export default function FolderMenu({ folder }: FolderMenuProps) {
  const { replace } = useRouter();
  const queryClient = useQueryClient();
  const showSnackbar = useSnackbarStore((state) => state.show);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const form = useForm<Partial<Omit<Folder, "project_id">>>({
    initialValues: {
      name: folder.name,
    },

    validate: {
      // email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
    },
  });

  const onEdit = (values: Partial<CreateFolder>) => {
    update<{ folder: Partial<CreateFolder> }>(endpoints.getFolder(folder.id), {
      folder: {
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
          message: "Folder has been updated",
        });
        setIsEditModalOpen(false);
      }
    });
  };

  const onDelete = () => {
    let projectId = folder.project_id;
    destroy(endpoints.destroyFolder(folder.id)).then((data) => {
      if (data.success) {
        queryClient.invalidateQueries([
          endpoints.getFoldersFromProject(projectId),
        ]);
        showSnackbar({
          message: "Folder has been deleted",
        });
        setIsDeleteModalOpen(false);
        replace(`/app/projects/${projectId}`);
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
              Edit folder
            </Button>
            <Button
              variant="subtle"
              danger
              onClick={() => setIsDeleteModalOpen(true)}
              noMargin
            >
              Delete folder
            </Button>
          </div>
        }
      />
      <Modal isOpen={isEditModalOpen} close={() => setIsEditModalOpen(false)}>
        <h2>Edit folder</h2>
        <p>Editing the "{folder.name}" folder.</p>
        <Form onSubmit={form.onSubmit((values) => onEdit(values))}>
          <Input
            label="Folder name"
            placeholder="Folder name"
            {...form.getInputProps("name")}
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
        <h2>Delete folder?</h2>
        <p>
          Are you absolute sure you want to delete this folder "{folder.name}"
          and delete all of its' tasks and time entries?
        </p>
        <div className="buttons-right">
          <Button variant="subtle" onClick={() => setIsDeleteModalOpen(false)}>
            Cancel
          </Button>
          <Button danger onClick={() => onDelete()}>
            Delete folder
          </Button>
        </div>
      </Modal>
    </div>
  );
}
