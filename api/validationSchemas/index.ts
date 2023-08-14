import * as Yup from "yup";

export const projectValidationSchema = Yup.object().shape({
  project: Yup.object().shape({
    name: Yup.string()
      .required("Name is required")
      .max(100, "Name must be at most 100 characters"),
  }),
});

export const folderValidationSchema = Yup.object().shape({
  folder: Yup.object().shape({
    name: Yup.string()
      .required("Name is required")
      .max(100, "Name must be at most 100 characters"),
  }),
});

export const taskValidationSchema = Yup.object().shape({
  task: Yup.object().shape({
    name: Yup.string()
      .required("Name is required")
      .max(100, "Name must be at most 100 characters"),
  }),
});
