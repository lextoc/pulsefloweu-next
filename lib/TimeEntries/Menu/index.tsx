"use client";
import { useForm } from "@mantine/form";
import { useDebouncedValue } from "@mantine/hooks";
import { useQueryClient } from "@tanstack/react-query";
import dayjs, { Dayjs } from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import { useEffect, useState } from "react";

import destroy from "@/api/destroy";
import endpoints from "@/api/endpoints";
import { TimeEntry } from "@/api/types/time-entries";
import update from "@/api/update";
import Button from "@/components/Buttons/Base";
import Input from "@/components/Inputs/Base";
import Modal from "@/components/Overlays/Modals/Base";
import Popover from "@/components/Overlays/Popover";
import { useSnackbarStore } from "@/stores/snackbar";

import styles from "./index.module.css";

dayjs.extend(timezone);
dayjs.extend(advancedFormat);
dayjs.extend(utc);

export interface TimeEntryMenuProps {
  timeEntry: TimeEntry;
}

export default function TimeEntryMenu({ timeEntry }: TimeEntryMenuProps) {
  const queryClient = useQueryClient();
  const showSnackbar = useSnackbarStore((state) => state.show);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const editForm = useForm({
    initialValues: {
      start_date: dayjs(timeEntry.start_date).format("HH:mm"),
      end_date: dayjs(timeEntry.end_date).format("HH:mm"),
      date: dayjs(timeEntry.start_date).format("YYYY-MM-DD"),
    },

    validate: {
      // email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
    },
  });

  useEffect(() => {
    editForm.setValues({
      start_date: dayjs(timeEntry.start_date).format("HH:mm"),
      end_date: dayjs(timeEntry.end_date).format("HH:mm"),
      date: dayjs(timeEntry.start_date).format("YYYY-MM-DD"),
    });
  }, [timeEntry]);

  const [dates] = useDebouncedValue(editForm.getTransformedValues(), 1000);

  useEffect(() => {
    let newStartDate = setHoursAndMinutes(dayjs(dates.date), dates.start_date);
    let newEndDate = setHoursAndMinutes(dayjs(dates.date), dates.end_date);
    if (
      !dayjs(timeEntry.start_date).isValid() ||
      !dayjs(newStartDate).isValid() ||
      !dayjs(newEndDate).isValid() ||
      !dayjs(timeEntry.end_date).isValid() ||
      dayjs(newStartDate).isAfter(dayjs(newEndDate)) ||
      (dayjs(newStartDate).isSame(dayjs(timeEntry.start_date), "minutes") &&
        dayjs(newEndDate).isSame(dayjs(timeEntry.end_date), "minutes"))
    ) {
      editForm.setValues({
        start_date: dayjs(timeEntry.start_date).format("HH:mm"),
        end_date: dayjs(timeEntry.end_date).format("HH:mm"),
        date: dayjs(timeEntry.start_date).format("YYYY-MM-DD"),
      });
      return;
    }
    onTimeChange(dates.start_date, dates.end_date);
  }, [dates]);

  const setHoursAndMinutes = (date: Dayjs, value: string): string => {
    const hours = value.split(":")[0];
    const minutes = value.split(":")[1];

    return date
      .set("hours", parseInt(hours, 10))
      .set("minutes", parseInt(minutes, 10))
      .format();
  };

  const onTimeChange = (start: string, end: string) => {
    let newStartDate = setHoursAndMinutes(dayjs(editForm.values.date), start);
    let newEndDate = setHoursAndMinutes(dayjs(editForm.values.date), end);
    updateDate(newStartDate, newEndDate);
  };

  const updateDate = (startDate: string, endDate: string) => {
    update<{ time_entry: Partial<TimeEntry> }>(
      endpoints.timeEntries.detail(timeEntry.id),
      {
        time_entry: {
          start_date: startDate,
          end_date: endDate,
        },
      },
    ).then(() => {
      queryClient.invalidateQueries();
      showSnackbar({
        message: "Time entry has been updated",
      });
    });
  };

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
            {timeEntry.end_date && (
              <Button
                variant="subtle"
                onClick={() => setIsEditModalOpen(true)}
                noMargin
              >
                Edit time entry
              </Button>
            )}
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
        <p>Your changes will go through as you enter them.</p>
        <Input
          label="Date"
          type="date"
          placeholder="Date"
          {...editForm.getInputProps("date")}
        />
        <Input
          fullWidth
          type="time"
          label="Start time"
          placeholder="Start time"
          {...editForm.getInputProps("start_date")}
        />
        <Input
          fullWidth
          type="time"
          label="End time"
          placeholder="End time"
          {...editForm.getInputProps("end_date")}
        />
        <div className="buttons-right">
          <Button variant="subtle" onClick={() => setIsEditModalOpen(false)}>
            Close
          </Button>
        </div>
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
          <Button danger onClick={() => onDelete()}>
            Delete time entry
          </Button>
        </div>
      </Modal>
    </div>
  );
}
