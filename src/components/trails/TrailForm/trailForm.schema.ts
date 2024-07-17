import * as yup from 'yup';

export const trailSchema = yup.object().shape({
  name: yup.string().required('Name is required'),
  slug: yup.string().required('Slug is required'),
  description: yup.string().nullable(),
  trailheadCoords: yup.string().nullable(),
  address: yup.string().nullable(),
});
