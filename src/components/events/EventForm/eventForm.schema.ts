import * as yup from "yup";
import { startOfToday } from "date-fns";

export const runEventSchema = yup.object().shape({
  type: yup.string().required("Event type is required"),
  title: yup.string().required("Title is required"),
  description: yup.string(),
  startDateTime: yup
    .date()
    .min(startOfToday())
    .required("Start date is required"),
  endDateTime: yup.date().min(startOfToday()).required("End date is required"),
  address: yup.string().nullable(),
  trailDifficulty: yup.string(),
  // trailNotes: yup.string(),
  rallyAddress: yup.string(),
  membersOnly: yup.boolean(),
  host: yup.string(), // ID
  trail: yup.string(), // ID
  maxAttendees: yup.number().integer().min(-1),
  maxRigs: yup.number().integer().min(-1),
});

export const nonRunEventSchema = yup.object().shape({
  type: yup.string().required("Event type is required"),
  title: yup.string().required("Title is required"),
  description: yup.string(),
  startDateTime: yup
    .date()
    .min(startOfToday())
    .required("Start date is required"),
  endDateTime: yup.date().min(startOfToday()).required("End date is required"),
  address: yup.string().nullable(),
  membersOnly: yup.boolean(),
  host: yup.string(), // ID
  maxAttendees: yup.number().integer().min(-1),
  changeDisabled: yup.boolean(),
});
