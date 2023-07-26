export interface Task {
  id: number;
  name: string;
  user_id: number;
  folder_id: number;
  created_at: string;
  updated_at: string;
}

export type CreateTask = Omit<
  Task,
  "id" | "user_id" | "created_at" | "updated_at"
>;
