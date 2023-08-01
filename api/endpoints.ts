const apiUrl = (pathname: string) =>
  `${process.env.NEXT_PUBLIC_API}${pathname}`;

const apiRoutes = {
  // Auth
  auth: apiUrl("/auth"),
  authSignIn: apiUrl("/auth/sign_in"),
  authValidateToken: apiUrl("/auth/validate_token"),

  // Folders
  createFolder: apiUrl("/folders"),
  destroyFolder: (folderId: number) => apiUrl(`/folders/${folderId}`),

  // Projects
  createProject: apiUrl("/projects"),
  destroyProject: (projectId: number) => apiUrl(`/projects/${projectId}`),

  // Tasks
  createTask: apiUrl("/tasks"),
  destroyTask: (taskId: number) => apiUrl(`/tasks/${taskId}`),
  getTask: (taskId: number) => apiUrl(`/tasks/${taskId}`),
  getTasks: apiUrl("/tasks"),
  getTasksFromFolder: (folderId: number) =>
    apiUrl(`/folders/${folderId}/tasks`),

  // Time Entries
  createTimeEntry: apiUrl("/time_entries"),
  destroyTimeEntry: (timeEntryId: number) =>
    apiUrl(`/time_entries/${timeEntryId}`),
  getTimeEntry: (timeEntryId: number) => apiUrl(`/time_entries/${timeEntryId}`),
  getTimeEntries: apiUrl("/time_entries"),
  getTimeEntriesFromTask: (taskId: number) =>
    apiUrl(`/tasks/${taskId}/time_entries`),

  // Misc
  getRunningTimers: apiUrl("/misc/running_timers"),
  getTimesheetsPerDay: apiUrl("/misc/timesheets_per_day"),
  getTimesheetsPerWeek: apiUrl("/misc/timesheets_per_week"),
  stopTimeEntries: apiUrl("/misc/stop/all"),

  // Other routes
  getFolder: (folderId: number) => apiUrl(`/folders/${folderId}`),
  getFoldersFromProject: (projectId: number) =>
    apiUrl(`/projects/${projectId}/folders`),
  getProject: (projectId: number) => apiUrl(`/projects/${projectId}`),
  getProjects: apiUrl("/projects"),
};

export default apiRoutes;
