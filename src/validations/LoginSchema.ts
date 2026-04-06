import * as yup from "yup";

export const LoginSchema = yup.object().shape({
  email: yup
    .string()
    .required("this field is required")
    .email("please enter a valid email"),
  password: yup
    .string()
    .required("this field is required")
    .min(8, "password must be at least 8 characters"),
});
