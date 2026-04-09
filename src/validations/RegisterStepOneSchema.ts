import * as yup from "yup";

export const RegisterStepOneSchema = yup.object().shape({
  email: yup
    .string()
    .required("this field is required")
    .email("please enter a valid email"),
});
