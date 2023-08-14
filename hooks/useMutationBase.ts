import { UseFormReturnType } from "@mantine/form";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import create from "@/api/create";
import endpoints from "@/api/endpoints";
import { CreateFolder } from "@/api/types/folders";
import { CreateProject } from "@/api/types/projects";
import { CreateTask } from "@/api/types/tasks";
import { CreateTimeEntry } from "@/api/types/time-entries";
import update from "@/api/update";
import { useSnackbarStore } from "@/stores/snackbar";

export type UseMutationWithErrorHandlingPossibleTypes =
  | CreateProject
  | CreateFolder
  | CreateTask
  | CreateTimeEntry;

export type UseMutationWithErrorHandlingPossibleMethods =
  | "POST"
  | "PUT"
  | "PATCH";

export interface useMutationWithErrorHandlingProps<T> {
  method: UseMutationWithErrorHandlingPossibleMethods;
  endpoint: string;
  form: UseFormReturnType<T>;
}

export const useMutationWithErrorHandling = <
  T extends UseMutationWithErrorHandlingPossibleTypes,
>({
  method,
  endpoint,
  form,
}: useMutationWithErrorHandlingProps<T>) => {
  const queryClient = useQueryClient();
  const showSnackbar = useSnackbarStore((state) => state.show);

  return useMutation({
    mutationFn: (values: T) => {
      if (method === "POST") {
        return create<T>(endpoint, values);
      } else {
        return update<T>(endpoint, values, method);
      }
    },
    onSuccess: (response) => {
      if (response.success) {
        form.reset();
        queryClient.invalidateQueries();
        showSnackbar({
          message: "Folder has been created",
        });
      } else {
        showSnackbar({
          message:
            response?.error?.response?.data?.errors?.full_messages?.join(" ") ||
            response?.error?.response?.data?.errors?.join(" ") ||
            "An error occurred",
          type: "error",
        });
      }
    },
    onError: () => {
      showSnackbar({
        message: "An error occurred",
        type: "error",
      });
    },
  });
};
