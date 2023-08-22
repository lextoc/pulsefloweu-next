"use client";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

import destroy from "@/api/destroy";
import endpoints from "@/api/endpoints";
import { TimeEntry } from "@/api/types/time-entries";
import Button from "@/components/Buttons/Base";
import Modal from "@/components/Overlays/Modals/Base";
import Popover from "@/components/Overlays/Popover";
import { useSnackbarStore } from "@/stores/snackbar";

import { TimeEntriesMenuEditModal } from "./EditModal";
import styles from "./index.module.css";

export interface TimeEntryMenuProps {
  timeEntry: TimeEntry;
}

export default function TimeEntryMenu({ timeEntry }: TimeEntryMenuProps) {
  const queryClient = useQueryClient();
  const showSnackbar = useSnackbarStore((state) => state.show);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const onDelete = () => {
    destroy(endpoints.timeEntries.detail(timeEntry.id)).then((data) => {
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
            <Button
              variant="subtle"
              onClick={() => setIsEditModalOpen(true)}
              noMargin
            >
              Edit time entry
            </Button>
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
      <TimeEntriesMenuEditModal
        isOpen={isEditModalOpen}
        close={() => setIsEditModalOpen(false)}
        timeEntry={timeEntry}
      />
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
          <Button danger onClick={() => onDelete()}>
            Delete time entry
          </Button>
        </div>
      </Modal>
    </div>
  );
}
