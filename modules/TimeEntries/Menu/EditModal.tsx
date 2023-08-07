import { useForm } from "@mantine/form";
import { useDebouncedValue } from "@mantine/hooks";
import { useQueryClient } from "@tanstack/react-query";
import dayjs, { Dayjs } from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import { useEffect } from "react";

import endpoints from "@/api/endpoints";
import { TimeEntry } from "@/api/types/time-entries";
import update from "@/api/update";
import { TaskSelectInput } from "@/modules/Tasks/Inputs/SelectInput";
import Button from "@/components/Buttons/Base";
import Input from "@/components/Inputs/Base";
import Modal from "@/components/Overlays/Modals/Base";
import { useSnackbarStore } from "@/stores/snackbar";

dayjs.extend(timezone);
dayjs.extend(advancedFormat);
dayjs.extend(utc);

export interface TimeEntriesMenuEditModalProps {
  isOpen: boolean;
  close: Function;
  timeEntry: TimeEntry;
}

export function TimeEntriesMenuEditModal({
  isOpen,
  close,
  timeEntry,
}: TimeEntriesMenuEditModalProps) {
  const queryClient = useQueryClient();
  const showSnackbar = useSnackbarStore((state) => state.show);

  const editForm = useForm({
    initialValues: {
      task_id: timeEntry.task_id,
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

  const [dates] = useDebouncedValue(editForm.getTransformedValues(), 3000);

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
    _update(newStartDate, newEndDate);
  };

  const _update = (startDate?: string, endDate?: string, taskId?: number) => {
    update<{ time_entry: Partial<TimeEntry> }>(
      endpoints.timeEntries.detail(timeEntry.id),
      {
        time_entry: {
          start_date: startDate,
          end_date: endDate,
          task_id: taskId,
        },
      },
    ).then(() => {
      queryClient.invalidateQueries();
      showSnackbar({
        message: "Time entry has been updated",
      });
    });
  };

  return (
    <Modal isOpen={isOpen} close={() => close()}>
      <h2>Edit time entry</h2>
      <p>Your changes will go through as you enter them.</p>
      <TaskSelectInput
        projectId={timeEntry.project_id}
        taskId={timeEntry.task_id}
        setTaskId={(taskId: number) => _update(undefined, undefined, taskId)}
      />
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
        <Button variant="subtle" onClick={() => close()}>
          Close
        </Button>
      </div>
    </Modal>
  );
}
