export interface TimeEntry {
  id: number;
  start_date: string;
  end_date: string;
  user_id: number;
  folder_id: number;
  task_id: number;
  created_at: string;
  updated_at: string;
  task_name: string;
  folder_name: string;
  project_name: string;
  project_id: number;
}

export type CreateTimeEntry = {
  time_entry: Omit<
    TimeEntry,
    | "id"
    | "user_id"
    | "end_date"
    | "created_at"
    | "updated_at"
    | "task_name"
    | "folder_name"
    | "project_name"
    | "project_id"
  >;
};

export interface TimeEntryWithTaskName extends TimeEntry {
  task_name: string;
}
