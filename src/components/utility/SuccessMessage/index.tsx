import { FC } from "react";

import Styles from "./successMessage.module.scss";

interface SuccessMessageProps {
  message: String;
}

const SuccessMessage: FC<SuccessMessageProps> = ({ message }) => {
  if (!message) return null;

  return (
    <div className={Styles["success"]}>
      <p data-test="graphql-success">
        <strong>Success!</strong>
        {message}
      </p>
    </div>
  );
};

export default SuccessMessage;
