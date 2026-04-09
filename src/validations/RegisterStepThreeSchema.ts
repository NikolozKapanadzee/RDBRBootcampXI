import * as yup from "yup";

export const RegisterStepThreeSchema = yup.object().shape({
  username: yup
    .string()
    .required("this field is required")
    .min(3, "username must be at least 3 characters"),
  avatar: yup.mixed().optional(),
});
