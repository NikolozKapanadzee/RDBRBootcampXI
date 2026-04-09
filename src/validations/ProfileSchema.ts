import * as yup from "yup";

export const ProfileSchema = yup.object().shape({
  fullName: yup
    .string()
    .required("Fullname is required")
    .min(3, "Name must be at least 3 characters")
    .max(50, "Name must not exceed 50 characters"),
  mobileNumber: yup
    .string()
    .required("Mobile number is required")
    .test(
      "valid-georgian-number",
      "Please enter a valid Georgian mobile number (9 digits starting with 5)",
      (value) => {
        if (!value) return false;
        const cleaned = value.replace(/\s/g, "");
        return /^5\d{8}$/.test(cleaned);
      },
    ),
  age: yup
    .number()
    .typeError("Age must be a number")
    .required("Age is required")
    .min(16, "You must be at least 16 years old to enroll")
    .max(120, "Please enter a valid age"),
});
