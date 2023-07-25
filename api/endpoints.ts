// h for host.. (prefix)
const h = (pathname: string) => `${process.env.NEXT_PUBLIC_API}${pathname}`;

export default {
  auth: h("/auth"),
  authSignIn: h("/auth/sign_in"),
  authValidateToken: h("/auth/validate_token"),
  createFolder: h("/folders"),
  createProject: h("/projects"),
  destroyProject: (projectId: number) => h(`/projects/${projectId}`),
  destroyFolder: (folderId: number) => h(`/folders/${folderId}`),
  getProjects: h("/projects"),
  getProject: (projectId: number) => h(`/projects/${projectId}`),
  getFoldersFromProject: (projectId: number) =>
    h(`/projects/${projectId}/folders`),
};
