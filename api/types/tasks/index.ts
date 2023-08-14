import { TimeEntry } from "../time-entries";

export interface Task {
  id: number;
  name: string;
  user_id: number;
  folder_id: number;
  created_at: string;
  updated_at: string;
  total_duration_of_time_entries: number;
  folder_name: string;
  project_name: string;
  project_id: number;
  active_time_entries: TimeEntry[];
}

export type CreateTask = {
  task: Omit<
    Task,
    | "id"
    | "user_id"
    | "created_at"
    | "updated_at"
    | "total_duration_of_time_entries"
    | "folder_name"
    | "project_name"
    | "active_time_entries"
    | "project_id"
  >;
};
