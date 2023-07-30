"use client";
import { useForm } from "@mantine/form";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

import destroy from "@/api/destroy";
import endpoints from "@/api/endpoints";
import { CreateTimeEntry, TimeEntry } from "@/api/types/time-entries";
import update from "@/api/update";
import Button from "@/components/Buttons/Base";
import Input from "@/components/Inputs/Base";
import Form from "@/components/Inputs/Form";
import Modal from "@/components/Overlays/Modals/Base";
import Popover from "@/components/Overlays/Popover";
import { useSnackbarStore } from "@/stores/snackbar";

import styles from "./index.module.css";

export interface TimeEntryMenuProps {
  timeEntry: TimeEntry;
}

export default function TimeEntryMenu({ timeEntry }: TimeEntryMenuProps) {
  const queryClient = useQueryClient();
  const showSnackbar = useSnackbarStore((state) => state.show);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const editForm = useForm<Partial<Omit<TimeEntry, "project_id">>>({
    initialValues: {
      start_date: timeEntry.start_date,
      end_date: timeEntry.end_date,
    },

    validate: {
      // email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
    },
  });

  const onEdit = (values: Partial<CreateTimeEntry>) => {
    update<{ time_entry: Partial<CreateTimeEntry> }>(
      endpoints.getTimeEntry(timeEntry.id),
      {
        time_entry: {
          ...values,
        },
      },
    ).then((data) => {
      if (data?.errors) {
        showSnackbar({
          message:
            data?.errors?.full_messages?.join(" ") || data?.errors?.join(" "),
          type: "error",
        });
      } else {
        queryClient.invalidateQueries();
        showSnackbar({
          message: "Time entry has been updated",
        });
        setIsEditModalOpen(false);
      }
    });
  };

  const onDelete = () => {
    destroy(endpoints.destroyTimeEntry(timeEntry.id)).then((data) => {
      if (data.success) {
        queryClient.invalidateQueries();
        showSnackbar({
          message: "Time entry has been deleted",
        });
        setIsDeleteModalOpen(false);
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
            {/* <Button
              variant="subtle"
              onClick={() => setIsEditModalOpen(true)}
              noMargin
            >
              Edit time entry
            </Button> */}
            <Button
              variant="subtle"
              danger
              onClick={() => setIsDeleteModalOpen(true)}
              noMargin
            >
              Delete time entry
            </Button>
          </div>
        }
      />
      <Modal isOpen={isEditModalOpen} close={() => setIsEditModalOpen(false)}>
        <h2>Edit time entry</h2>
        <Form onSubmit={editForm.onSubmit((values) => onEdit(values))}>
          <Input
            label="Start time"
            placeholder="Start time"
            {...editForm.getInputProps("start_date")}
          />
          <Input
            label="End time"
            placeholder="End time"
            {...editForm.getInputProps("end_date")}
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
        <h2>Delete time entry</h2>
        <p>Are you absolutely sure you want to delete this time entry?</p>
        <div className="buttons-right">
          <Button variant="subtle" onClick={() => setIsDeleteModalOpen(false)}>
            Cancel
          </Button>
          <Button
            danger
            onClick={() => onDelete()}
          >
            Delete time entry
          </Button>
        </div>
      </Modal>
    </div>
  );
}
