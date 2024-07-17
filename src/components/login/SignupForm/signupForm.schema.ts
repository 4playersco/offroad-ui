import * as yup from "yup";

import { dateEighteenYearsAgo } from "@/lib";

export const userSchema = yup.object().shape({
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  username: yup.string().required("Username is required"),
  gender: yup.string(),
  birthdate: yup
    .date()
    .max(dateEighteenYearsAgo(), "You must be 18 years old to join")
    .required("Birthdate is required"),
  email: yup.string().email().required(),
  password: yup.string().min(8).required("Must be at least 8 characters"),
});
