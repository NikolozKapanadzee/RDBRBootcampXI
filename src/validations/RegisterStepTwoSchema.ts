import * as yup from "yup";

export const RegisterStepTwoSchema = yup.object().shape({
  password: yup
    .string()
    .required("this field is required")
    .min(3, "password must be at least 3 characters"),
  confirmPassword: yup
    .string()
    .required("this field is required")
    .oneOf([yup.ref("password")], "passwords do not match"),
});
