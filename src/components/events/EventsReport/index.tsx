import { useState, useCallback } from "react";
// import { useMutation } from '@apollo/client';
// import { Formik, Field, ErrorMessage as FormikErrorMessage } from 'formik';

// import { REGISTER_MUTATION } from './registerForm.graphql';
// import { registerSchema } from './registerForm.schema';
// import Loading from '../../utility/Loading';
// import ErrorMessage from '../../utility/ErrorMessage';
// import SuccessMessage from '../../utility/SuccessMessage';
// import FormErrorMessage from '../../utility/FormErrorMessage';
// import Button from '../../common/Button';
// import Captcha from '../../common/Captcha';

// import Styles from './registerForm.module.scss';

import RunReportForm from "../../reports/RunReportForm";

const EventsReport = () => {
  // Cannot report on upcoming event
  // Cannot report unless run leader

  return (
    <div>
      <RunReportForm />
    </div>
  );
};

export default EventsReport;
