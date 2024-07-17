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
  joined: yup.date().max(new Date()).nullable(),
  phone: yup
    .string()
    .matches(
      new RegExp(/[0-9]{3}-[0-9]{3}-[0-9]{4}/),
      "Use proper format: 303-555-5555"
    )
    .required("Phone number is required"),
  street: yup.string().required("Street is required"),
  city: yup.string().required("City is required"),
  state: yup.string(),
  zip: yup
    .string()
    .matches(
      new RegExp(/^[0-9]{5}(?:-[0-9]{4})?$/),
      "Use proper format: '80206' or '80206-1919'"
    )
    .required("Zip code is required"),
  emergencyContactName: yup
    .string()
    .required("Emergency contact name is required"),
  emergencyContactPhone: yup
    .string()
    .matches(
      new RegExp(/[0-9]{3}-[0-9]{3}-[0-9]{4}/),
      "Use proper format: 303-555-5555"
    )
    .required("Emergency contact phone number is required"),
  comfortLevel: yup.string(),
});
//^(?=[0-9]{11})([0-9]{5})([0-9]{8})([0-9])$
