import React from "react";
import * as Sentry from "@sentry/react";

import Button from "../../common/Button";

import Styles from "./errorBoundary.module.scss";

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Toaster

    // You can also log the error to an error reporting service
    // logErrorToMyService(error, errorInfo);
    Sentry.captureException(error);
    console.error(error);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <div className={Styles["error"]}>
          <div className={Styles["error-msg"]}>
            <h2>Uh Oh...</h2>
            <p>Something went wrong. Try again?</p>
            <Button href="/">Home</Button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
