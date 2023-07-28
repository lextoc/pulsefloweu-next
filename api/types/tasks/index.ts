export interface Task {
  id: number;
  name: string;
  user_id: number;
  folder_id: number;
  created_at: string;
  updated_at: string;
  total_duration_of_time_entries: number;
}

export type CreateTask = Omit<
  Task,
  "id" | "user_id" | "created_at" | "updated_at"
>;
