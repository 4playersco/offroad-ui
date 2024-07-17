import * as yup from "yup";

export const rigSchema = yup.object().shape({
  year: yup.number().required(),
  make: yup.string().required(),
  model: yup.string().required(),
  trim: yup.string(),
  name: yup.string(),
  outfitLevel: yup
    .string()
    .matches(/(0|MODIFIED|STOCK)/)
    .required(),
  mods: yup.string(),
});
