export interface Project {
  id: number;
  name: string;
  user_id: number;
  created_at: string;
  updated_at: string;
}

export type CreateProject = Omit<
  Project,
  "id" | "user_id" | "created_at" | "updated_at"
>;

