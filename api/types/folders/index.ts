export interface Folder {
  id: number;
  name: string;
  user_id: number;
  project_id: number;
  created_at: string;
  updated_at: string;
}

export type CreateFolder = {
  folder: Omit<Folder, "id" | "user_id" | "created_at" | "updated_at">;
};
