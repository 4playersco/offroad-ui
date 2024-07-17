import Styles from "./errorMessage.module.scss";

interface ErrorMessageProps {
  error: any;
}

const ErrorMessage = ({ error }: ErrorMessageProps) => {
  if (!error || !error.message) return null;
  if (
    error.networkError &&
    error.networkError.result &&
    error.networkError.result.errors.length
  ) {
    return error.networkError.result.errors.map((error: any, i: number) => (
      <div className={Styles["error"]} key={i}>
        <p data-test="graphql-error">
          <strong>Shoot!</strong>
          {error.message.replace("GraphQL error: ", "")}
        </p>
      </div>
    ));
  }
  return (
    <div className={Styles["error"]}>
      <p data-test="graphql-error">
        <strong>Shoot!</strong>
        {error.message.replace("GraphQL error: ", "")}
      </p>
    </div>
  );
};

export default ErrorMessage;
