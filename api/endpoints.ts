const apiUrl = (pathname: string) =>
  `${process.env.NEXT_PUBLIC_API}${pathname}`;

const authRoutes = {
  main: apiUrl("/auth"),
  signIn: apiUrl("/auth/sign_in"),
  validateToken: apiUrl("/auth/validate_token"),
  password: apiUrl("/auth/password"),
};

const folderRoutes = {
  main: apiUrl("/folders"),
  detail: (folderId: number) => apiUrl(`/folders/${folderId}`),
};

const projectRoutes = {
  detail: (projectId: number) => apiUrl(`/projects/${projectId}`),
  main: apiUrl("/projects"),
};

const taskRoutes = {
  detail: (taskId: number) => apiUrl(`/tasks/${taskId}`),
  main: apiUrl("/tasks"),
};

const timeEntryRoutes = {
  detail: (timeEntryId: number) => apiUrl(`/time_entries/${timeEntryId}`),
  main: apiUrl("/time_entries"),
};

const miscRoutes = {
  runningTimeEntries: apiUrl("/misc/running_time_entries"),
  timesheetsPerDay: apiUrl("/misc/timesheets_per_day"),
  timesheetsPerWeek: apiUrl("/misc/timesheets_per_week"),
  stopAll: apiUrl("/misc/stop/all"),
};

const apiRoutes = {
  auth: authRoutes,
  folders: folderRoutes,
  projects: projectRoutes,
  tasks: taskRoutes,
  timeEntries: timeEntryRoutes,
  misc: miscRoutes,
};

export default apiRoutes;
