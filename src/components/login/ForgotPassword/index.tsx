import { useState, useCallback } from "react";
import { useMutation } from "@apollo/client";
import { Formik, Field } from "formik";
import * as yup from "yup";

import Loading from "@/components/utility/Loading";
import SuccessMessage from "@/components/utility/SuccessMessage";
import ErrorMessage from "@/components/utility/ErrorMessage";
import FormErrorMessage from "@/components/utility/FormErrorMessage";
import Button from "@/components/common/Button";
import Captcha from "@/components/common/Captcha";

import REQUEST_RESET_MUTATION from "./forgotPassword.graphql";
import Styles from "./forgotPassword.module.scss";

const forgotSchema = yup.object().shape({
  email: yup.string().email("email is a required field").required(),
});

const ForgotPassword = () => {
  const [validRecaptcha, setValidRecaptcha] = useState(false);
  const [requestReset, { data, error, loading }] = useMutation(
    REQUEST_RESET_MUTATION,
    {
      refetchQueries: ["CURRENT_USER_QUERY"],
    }
  );
  const handleCaptchaChange = useCallback(
    (isValid: boolean) => {
      setValidRecaptcha(isValid);
    },
    [setValidRecaptcha]
  );

  return (
    <>
      <h2>Forgot Password</h2>

      <p>
        Please enter your email address and you&apos;ll receive an email with a
        reset link.
      </p>

      {data && data.requestReset ? (
        <SuccessMessage message={data.requestReset.message} />
      ) : (
        <Formik
          initialValues={{
            email: "",
          }}
          validationSchema={forgotSchema}
          onSubmit={async ({ email }, { setSubmitting }) => {
            setSubmitting(true);
            await requestReset({
              variables: {
                email,
              },
            });
            setSubmitting(false);
          }}
        >
          {(formikProps) => (
            <div className={Styles["form"]}>
              <form onSubmit={formikProps.handleSubmit}>
                <div className={Styles["form-field-wrapper"]}>
                  <label className={Styles["form-label"]} htmlFor="email">
                    Email
                  </label>
                  <div className={Styles["form-field"]}>
                    <Field
                      type="email"
                      onChange={formikProps.handleChange}
                      id="email"
                      name="email"
                    />
                    <FormErrorMessage name="email" />
                  </div>
                </div>

                <div className={Styles["form-field-wrapper"]}>
                  <div />
                  <div>
                    <div className={Styles["recaptcha"]}>
                      <Captcha onChange={handleCaptchaChange} />
                    </div>

                    <Button
                      type="submit"
                      disabled={
                        !formikProps.dirty ||
                        !formikProps.isValid ||
                        formikProps.isSubmitting ||
                        loading ||
                        !validRecaptcha
                      }
                    >
                      Request Reset
                    </Button>
                    <Loading loading={loading} />
                    <ErrorMessage error={error} />
                  </div>
                </div>
              </form>
            </div>
          )}
        </Formik>
      )}
    </>
  );
};

export default ForgotPassword;
