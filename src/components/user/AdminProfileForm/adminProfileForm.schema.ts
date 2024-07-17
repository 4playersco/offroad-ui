import * as yup from 'yup';

export const userSchema = yup.object().shape({
  titles: yup.array().of(yup.string()).nullable(),
  office: yup.string().nullable(),
  role: yup.string().required(),
  accountType: yup.string().required(),
  accountStatus: yup.string().required(),
});
