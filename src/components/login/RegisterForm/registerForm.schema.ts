import * as yup from "yup";

export const registerSchema = yup.object().shape({
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  email: yup
    .string()
    .email("Email must be a valid email")
    .required("Email is required"),
  confirmEmail: yup
    .string()
    .email()
    .required()
    .oneOf([yup.ref("email")], "Emails must match"),
  source: yup.string(),
});
