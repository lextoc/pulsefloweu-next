const h = (pathname: string) => `${process.env.NEXT_PUBLIC_API}${pathname}`;

export default {
  auth: h("/auth"),
  authSignIn: h("/auth/sign_in"),
  authValidateToken: h("/auth/validate_token"),
  createFolder: h("/folders"),
  createProject: h("/projects"),
  createTask: h("/tasks"),
  createTimeEntry: h("/time_entries"),
  destroyFolder: (folderId: number) => h(`/folders/${folderId}`),
  destroyProject: (projectId: number) => h(`/projects/${projectId}`),
  destroyTask: (taskId: number) => h(`/tasks/${taskId}`),
  destroyTimeEntry: (timeEntryId: number) => h(`/time_entries/${timeEntryId}`),
  getRunningTimers: h("/misc/running_timers"),
  getTimesheetsPerDay: h("/misc/timesheets_per_day"),
  getTimesheetsPerWeek: h("/misc/timesheets_per_week"),
  getTimeEntry: (timeEntryId: number) => h(`/time_entries/${timeEntryId}`),
  getTask: (taskId: number) => h(`/tasks/${taskId}`),
  getTasks: h("/tasks"),
  getTimeEntries: h("/time_entries"),
  getFolder: (folderId: number) => h(`/folders/${folderId}`),
  getFoldersFromProject: (projectId: number) =>
    h(`/projects/${projectId}/folders`),
  getProject: (projectId: number) => h(`/projects/${projectId}`),
  getProjects: h("/projects"),
  getTasksFromFolder: (folderId: number) => h(`/folders/${folderId}/tasks`),
  getTimeEntriesFromTask: (taskId: number) =>
    h(`/tasks/${taskId}/time_entries`),

  //misc
  stopTimeEntries: h("/misc/stop/all"),
};
