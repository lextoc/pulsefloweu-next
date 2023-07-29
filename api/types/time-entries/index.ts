export interface TimeEntry {
  id: number;
  start_date: string;
  end_date: string;
  user_id: number;
  folder_id: number;
  task_id: number;
  created_at: string;
  updated_at: string;
}

export type CreateTimeEntry = Omit<
  TimeEntry,
  "id" | "user_id" | "end_date" | "created_at" | "updated_at"
>;
