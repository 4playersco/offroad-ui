import { FC } from "react";
import { ErrorMessage } from "formik";

import Styles from "./formErrorMessage.module.scss";

interface FormErrorMessageProps {
  name: string;
}

const FormErrorMessage: FC<FormErrorMessageProps> = ({ name }) => (
  <div className={Styles["error-message"]}>
    <ErrorMessage name={name} />
  </div>
);

export default FormErrorMessage;
