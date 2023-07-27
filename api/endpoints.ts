const h = (pathname: string) => `${process.env.NEXT_PUBLIC_API}${pathname}`;

export default {
  auth: h("/auth"),
  authSignIn: h("/auth/sign_in"),
  authValidateToken: h("/auth/validate_token"),
  createFolder: h("/folders"),
  createProject: h("/projects"),
  createTask: h("/tasks"),
  createTimesheet: h("/timesheets"),
  destroyFolder: (folderId: number) => h(`/folders/${folderId}`),
  destroyProject: (projectId: number) => h(`/projects/${projectId}`),
  destroyTask: (taskId: number) => h(`/tasks/${taskId}`),
  getFolder: (folderId: number) => h(`/folders/${folderId}`),
  getFoldersFromProject: (projectId: number) => h(`/projects/${projectId}/folders`),
  getProject: (projectId: number) => h(`/projects/${projectId}`),
  getProjects: h("/projects"),
  getTasksFromFolder: (folderId: number) => h(`/folders/${folderId}/tasks`),
  getTimesheetsFromTask: (taskId: number) => h(`/tasks/${taskId}/timesheets`),
  stopTimesheets: h("/misc/stop/all"),
};
